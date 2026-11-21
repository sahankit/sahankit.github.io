/** Batch 40: chess and related games. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch40Tools(ad) {
  return [
    {
      path: "/chess-game.html",
      file: "chess-game.html",
      category: "games",
      title: "Chess Game — Play Online Free",
      desc: "Play chess in your browser. Standard rules: castling, en passant, pawn promotion, check and checkmate. Two players on one device or vs a simple computer.",
      card: "Chess game",
      cardDesc: "Full rules chess in the browser.",
      body: `<h1>Chess game</h1>${ad}
<div class="tool-panel">
<label for="chess-mode">Mode</label>
<select id="chess-mode"><option value="human">Two players (same screen)</option><option value="cpu">You (White) vs computer</option></select>
<p id="chess-status" class="tool-feedback" role="status">White to move</p>
<div id="chess-board" class="chess-board" role="grid" aria-label="Chess board"></div>
<button type="button" class="primary" id="chess-new">New game</button>
<button type="button" id="chess-flip">Flip board</button>
</div>
<style>
.chess-board{display:grid;grid-template-columns:repeat(8,1fr);gap:0;max-width:400px;border:3px solid #333;border-radius:4px;overflow:hidden;user-select:none}
.chess-board .sq{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:clamp(1.4rem,6vw,2.4rem);cursor:pointer;border:none;padding:0;line-height:1}
.chess-board .sq.light{background:#f0d9b5}
.chess-board .sq.dark{background:#b58863}
.chess-board .sq.sel{box-shadow:inset 0 0 0 3px #720e9e}
.chess-board .sq.dot{position:relative}
.chess-board .sq.dot::after{content:'';width:28%;height:28%;border-radius:50%;background:rgba(114,14,158,0.55)}
.chess-board .sq.cap::after{content:'';position:absolute;inset:6%;border-radius:50%;border:3px solid rgba(114,14,158,0.65)}
.chess-board .sq.check{box-shadow:inset 0 0 0 3px #c62828}
.chess-board .sq{position:relative}
</style>
<script>
(function(){
  const SYM={K:'\\u2654',Q:'\\u2655',R:'\\u2656',B:'\\u2657',N:'\\u2658',P:'\\u2659',k:'\\u265A',q:'\\u265B',r:'\\u265C',b:'\\u265D',n:'\\u265E',p:'\\u265F'};
  const VAL={p:1,n:3,b:3,r:5,q:9,k:0,P:1,N:3,B:3,R:5,Q:9,K:0};
  const START=['rnbqkbnr','pppppppp','........','........','........','........','PPPPPPPP','RNBQKBNR'].map(function(r){return r.split('');});
  const boardEl=document.getElementById('chess-board');
  const statusEl=document.getElementById('chess-status');
  const modeEl=document.getElementById('chess-mode');
  let board, whiteTurn, castling, epSquare, sel, targets, gameOver, flipped, vsCpu, movedOnce, cpuBusy;

  function isW(p){ return p>='A'&&p<='Z'; }
  function isB(p){ return p>='a'&&p<='z'; }
  function empty(p){ return !p||p==='.'; }
  function inB(r,c){ return r>=0&&r<8&&c>=0&&c<8; }
  function cloneB(b){ return b.map(function(row){ return row.slice(); }); }
  function findK(b,white){
    const k=white?'K':'k';
    for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(b[r][c]===k) return [r,c];
    return null;
  }
  function attacked(b,r,c,byWhite,ep){
    const pawn=byWhite?'P':'p';
    const dir=byWhite?-1:1;
    for(const dc of [-1,1]){ const pr=r-dir,pc=c+dc; if(inB(pr,pc)&&b[pr][pc]===pawn) return true; }
    if(ep&&ep[0]===r&&ep[1]===c){
      const er=byWhite?r+1:r-1;
      if(inB(er,c)&&b[er][c]===pawn) return true;
    }
    const kn=byWhite?'N':'n';
    const km=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    for(const [dr,dc] of km){ const nr=r+dr,nc=c+dc; if(inB(nr,nc)&&b[nr][nc]===kn) return true; }
    const diag=[[-1,-1],[-1,1],[1,-1],[1,1]];
    for(const [dr,dc] of diag){
      let nr=r+dr,nc=c+dc;
      while(inB(nr,nc)){ const p=b[nr][nc]; if(!empty(p)){ if(p.toUpperCase()==='B'||p.toUpperCase()==='Q'){ const hit=byWhite?isW(p):isB(p); if(hit) return true; } break; } nr+=dr; nc+=dc; }
    }
    const straight=[[-1,0],[1,0],[0,-1],[0,1]];
    for(const [dr,dc] of straight){
      let nr=r+dr,nc=c+dc;
      while(inB(nr,nc)){ const p=b[nr][nc]; if(!empty(p)){ if(p.toUpperCase()==='R'||p.toUpperCase()==='Q'){ const hit=byWhite?isW(p):isB(p); if(hit) return true; } break; } nr+=dr; nc+=dc; }
    }
    const king=byWhite?'K':'k';
    for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
      if(!dr&&!dc) continue;
      const nr=r+dr,nc=c+dc;
      if(inB(nr,nc)&&b[nr][nc]===king) return true;
    }
    return false;
  }
  function inCheck(b,white,ep){ const k=findK(b,white); return k&&attacked(b,k[0],k[1],!white,ep); }

  function genPseudo(b,white,ep,cast){
    const moves=[];
    function add(fr,fc,tr,tc,extra){
      moves.push({fr:fr,fc:fc,tr:tr,tc:tc,extra:extra||null});
    }
    for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const p=b[r][c];
      if(empty(p)) continue;
      if(white&&!isW(p)) continue;
      if(!white&&!isB(p)) continue;
      const u=p.toUpperCase();
      if(u==='P'){
        const dir=white?-1:1;
        const start=white?6:1;
        const prom=white?0:7;
        const nr=r+dir;
        if(inB(nr,c)&&empty(b[nr][c])){
          if(nr===prom) add(r,c,nr,c,{promo:white?'Q':'q'});
          else add(r,c,nr,c,null);
          if(r===start){
            const nr2=r+2*dir;
            if(empty(b[nr2][c])) add(r,c,nr2,c,{ep:true});
          }
        }
        for(const dc of [-1,1]){
          const nc=c+dc;
          if(!inB(nr,nc)) continue;
          const tgt=b[nr][nc];
          if(!empty(tgt)&&(white?isB(tgt):isW(tgt))){
            if(nr===prom) add(r,c,nr,nc,{promo:white?'Q':'q'});
            else add(r,c,nr,nc,null);
          } else if(ep&&ep[0]===nr&&ep[1]===nc){
            add(r,c,nr,nc,{epCap:true});
          }
        }
      } else if(u==='N'){
        const km=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
        for(const [dr,dc] of km){
          const nr=r+dr,nc=c+dc;
          if(!inB(nr,nc)) continue;
          const tgt=b[nr][nc];
          if(empty(tgt)||(white?isB(tgt):isW(tgt))) add(r,c,nr,nc,null);
        }
      } else if(u==='K'){
        for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){
          if(!dr&&!dc) continue;
          const nr=r+dr,nc=c+dc;
          if(!inB(nr,nc)) continue;
          const tgt=b[nr][nc];
          if(empty(tgt)||(white?isB(tgt):isW(tgt))) add(r,c,nr,nc,null);
        }
        if(cast){
          if(white&&castling.K&&r===7&&c===4&&empty(b[7][5])&&empty(b[7][6])&&b[7][7]==='R'&&!inCheck(b,true,ep))
            add(7,4,7,6,{castle:'K'});
          if(white&&castling.Q&&r===7&&c===4&&empty(b[7][1])&&empty(b[7][2])&&empty(b[7][3])&&b[7][0]==='R'&&!inCheck(b,true,ep))
            add(7,4,7,2,{castle:'Q'});
          if(!white&&castling.k&&r===0&&c===4&&empty(b[0][5])&&empty(b[0][6])&&b[0][7]==='r'&&!inCheck(b,false,ep))
            add(0,4,0,6,{castle:'k'});
          if(!white&&castling.q&&r===0&&c===4&&empty(b[0][1])&&empty(b[0][2])&&empty(b[0][3])&&b[0][0]==='r'&&!inCheck(b,false,ep))
            add(0,4,0,2,{castle:'q'});
        }
      } else {
        const dirs=u==='R'?[[-1,0],[1,0],[0,-1],[0,1]]:u==='B'?[[-1,-1],[-1,1],[1,-1],[1,1]]:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
        for(const [dr,dc] of dirs){
          let nr=r+dr,nc=c+dc;
          while(inB(nr,nc)){
            const tgt=b[nr][nc];
            if(empty(tgt)){ add(r,c,nr,nc,null); }
            else { if(white?isB(tgt):isW(tgt)) add(r,c,nr,nc,null); break; }
            nr+=dr; nc+=dc;
          }
        }
      }
    }
    return moves;
  }

  function applyMove(b,m,white){
    const nb=cloneB(b);
    const piece=nb[m.fr][m.fc];
    let ep=null;
    nb[m.tr][m.tc]=m.extra&&m.extra.promo?m.extra.promo:piece;
    nb[m.fr][m.fc]='.';
    if(m.extra&&m.extra.epCap){
      const capR=white?m.tr+1:m.tr-1;
      nb[capR][m.tc]='.';
    }
    if(m.extra&&m.extra.ep) ep=[m.fr+(white?-1:1),m.fc];
    if(m.extra&&m.extra.castle){
      if(m.extra.castle==='K'){ nb[7][5]='R'; nb[7][7]='.'; }
      if(m.extra.castle==='Q'){ nb[7][3]='R'; nb[7][0]='.'; }
      if(m.extra.castle==='k'){ nb[0][5]='r'; nb[0][7]='.'; }
      if(m.extra.castle==='q'){ nb[0][3]='r'; nb[0][0]='.'; }
    }
    return {board:nb,ep:ep};
  }

  function castleSafe(b,m,white,ep){
    if(!m.extra||!m.extra.castle) return true;
    const row=white?7:0;
  const kingC=4;
    if(m.extra.castle==='K'||m.extra.castle==='k'){
      for(const c of [5,6]) if(attacked(b,row,c,!white,ep)) return false;
    } else {
      for(const c of [3,2]) if(attacked(b,row,c,!white,ep)) return false;
    }
    return true;
  }

  function legalMoves(b,white,ep,cast){
    const pseudo=genPseudo(b,white,ep,cast);
    const out=[];
    for(const m of pseudo){
      if(!castleSafe(b,m,white,ep)) continue;
      const {board:nb,ep:nep}=applyMove(b,m,white);
      if(!inCheck(nb,white,nep)) out.push(m);
    }
    return out;
  }

  function updateCastling(m,cast){
    const nc=Object.assign({},cast);
    if(m.fr===7&&m.fc===4||m.tr===7&&m.tc===4) nc.K=nc.Q=false;
    if(m.fr===0&&m.fc===4||m.tr===0&&m.tc===4) nc.k=nc.q=false;
    if(m.fr===7&&m.fc===0||m.tr===7&&m.tc===0) nc.Q=false;
    if(m.fr===7&&m.fc===7||m.tr===7&&m.tc===7) nc.K=false;
    if(m.fr===0&&m.fc===0||m.tr===0&&m.tc===0) nc.q=false;
    if(m.fr===0&&m.fc===7||m.tr===0&&m.tc===7) nc.k=false;
    return nc;
  }

  function statusText(){
    const white=whiteTurn;
    const moves=legalMoves(board,white,epSquare,castling);
    const chk=inCheck(board,white,epSquare);
    if(!moves.length){
      gameOver=true;
      return chk?(white?'Checkmate. Black wins.':'Checkmate. White wins.'):'Stalemate. Draw.';
    }
    let t=white?'White':'Black';
    t+=' to move';
    if(chk) t+=' — check!';
    return t;
  }

  function pickCpuMove(){
    const moves=legalMoves(board,false,epSquare,castling);
    if(!moves.length) return null;
    let best=null, bestSc=-1e9;
    for(const m of moves){
      const {board:nb}=applyMove(board,m,false);
      const reply=legalMoves(nb,true,null,castling);
      let sc=Math.random()*0.1;
      const cap=board[m.tr][m.tc];
      if(!empty(cap)) sc+=VAL[cap]||0;
      if(m.extra&&m.extra.promo) sc+=8;
      let worst=1e9;
      for(const r of reply){
        const {board:nb2}=applyMove(nb,r,true);
        const tr=legalMoves(nb2,false,null,castling);
        let s=0;
        for(let i=0;i<8;i++) for(let j=0;j<8;j++){
          const p=nb2[i][j];
          if(isB(p)) s+=(VAL[p]||0);
          if(isW(p)) s-=(VAL[p]||0);
        }
        if(tr.length===0&&inCheck(nb2,false,null)) s+=500;
        worst=Math.min(worst,s);
      }
      sc+=worst*-0.02;
      if(sc>bestSc){ bestSc=sc; best=m; }
    }
    return best||moves[Math.floor(Math.random()*moves.length)];
  }

  function render(){
    boardEl.innerHTML='';
    const kPos=findK(board,whiteTurn);
    const chk=inCheck(board,whiteTurn,epSquare);
    for(let vi=0;vi<8;vi++){
      for(let vj=0;vj<8;vj++){
        const r=flipped?7-vi:vi;
        const c=flipped?7-vj:vj;
        const btn=document.createElement('button');
        btn.type='button';
        const light=(r+c)%2===0;
        btn.className='sq '+(light?'light':'dark');
        const p=board[r][c];
        if(!empty(p)) btn.textContent=SYM[p]||p;
        if(sel&&sel[0]===r&&sel[1]===c) btn.classList.add('sel');
        if(kPos&&chk&&kPos[0]===r&&kPos[1]===c) btn.classList.add('check');
        const isT=targets.some(function(t){return t.tr===r&&t.tc===c;});
        if(isT){
          const cap=!empty(board[r][c]);
          btn.classList.add(cap?'cap':'dot');
        }
        (function(rr,cc){
          btn.onclick=function(){ onSq(rr,cc); };
        })(r,c);
        boardEl.appendChild(btn);
      }
    }
    statusEl.textContent=gameOver?statusText():statusText();
  }

  function finishMove(m){
    const {board:nb,ep:nep}=applyMove(board,m,whiteTurn);
    board=nb;
    epSquare=nep;
    castling=updateCastling(m,castling);
    whiteTurn=!whiteTurn;
    sel=null; targets=[];
    if(!movedOnce){ movedOnce=true; ${done} }
    render();
    if(gameOver) return;
    if(vsCpu&&whiteTurn===false&&!gameOver){
      cpuBusy=true;
      setTimeout(function(){
        const cm=pickCpuMove();
        cpuBusy=false;
        if(cm) finishMove(cm);
        else render();
      },250);
    }
  }

  function onSq(r,c){
    if(gameOver||cpuBusy) return;
    if(vsCpu&&!whiteTurn) return;
    const p=board[r][c];
    if(sel){
      const m=targets.find(function(t){return t.tr===r&&t.tc===c;});
      if(m){ finishMove(m); return; }
    }
    if(!empty(p)&&(whiteTurn?isW(p):isB(p))){
      sel=[r,c];
      targets=legalMoves(board,whiteTurn,epSquare,castling).filter(function(m){return m.fr===r&&m.fc===c;});
      render();
      return;
    }
    sel=null; targets=[]; render();
  }

  function reset(){
    board=cloneB(START);
    whiteTurn=true;
    castling={K:true,Q:true,k:true,q:true};
    epSquare=null;
    sel=null; targets=[];
    gameOver=false;
    flipped=false;
    vsCpu=modeEl.value==='cpu';
    movedOnce=false;
    cpuBusy=false;
    statusEl.textContent='White to move';
    render();
  }

  document.getElementById('chess-new').onclick=reset;
  document.getElementById('chess-flip').onclick=function(){ flipped=!flipped; render(); };
  modeEl.onchange=reset;
  reset();
})();
</script>`,
    },
  ];
}