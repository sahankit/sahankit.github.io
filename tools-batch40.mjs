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
<p id="chess-hint" class="tool-hint">Tap your piece, then tap a green square to move.</p>
<div id="chess-board" class="chess-board" role="grid" aria-label="Chess board"></div>
<button type="button" class="primary" id="chess-new">New game</button>
<button type="button" id="chess-flip">Flip board</button>
</div>
<style>
.chess-board{display:grid;grid-template-columns:repeat(8,1fr);gap:0;max-width:400px;border:3px solid #333;border-radius:4px;overflow:hidden;user-select:none}
.chess-board .sq{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:clamp(1.4rem,6vw,2.4rem);cursor:pointer;border:none;padding:0;line-height:1}
.chess-board .sq.light{background:#f0d9b5}
.chess-board .sq.dark{background:#b58863}
.chess-board .sq.sel{box-shadow:inset 0 0 0 3px #1b5e20;background:#c8e6c9 !important}
.chess-board .sq.legal{background:rgba(76,175,80,0.45) !important}
.chess-board .sq.cap{background:rgba(244,67,54,0.35) !important}
.chess-board .sq.dot::after{content:'';position:absolute;width:22%;height:22%;border-radius:50%;background:#2e7d32;opacity:0.85}
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
  const hintEl=document.getElementById('chess-hint');
  const modeEl=document.getElementById('chess-mode');
  var board, whiteTurn, castling, epSquare, sel, targets, gameOver, flipped, vsCpu, movedOnce, cpuBusy;

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
          if(white&&cast.K&&r===7&&c===4&&empty(b[7][5])&&empty(b[7][6])&&b[7][7]==='R'&&!inCheck(b,true,ep))
            add(7,4,7,6,{castle:'K'});
          if(white&&cast.Q&&r===7&&c===4&&empty(b[7][1])&&empty(b[7][2])&&empty(b[7][3])&&b[7][0]==='R'&&!inCheck(b,true,ep))
            add(7,4,7,2,{castle:'Q'});
          if(!white&&cast.k&&r===0&&c===4&&empty(b[0][5])&&empty(b[0][6])&&b[0][7]==='r'&&!inCheck(b,false,ep))
            add(0,4,0,6,{castle:'k'});
          if(!white&&cast.q&&r===0&&c===4&&empty(b[0][1])&&empty(b[0][2])&&empty(b[0][3])&&b[0][0]==='r'&&!inCheck(b,false,ep))
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

  function statusLine(){
    var white=whiteTurn;
    var moves=legalMoves(board,white,epSquare,castling);
    var chk=inCheck(board,white,epSquare);
    if(gameOver){
      return statusEl.textContent;
    }
    if(!moves.length){
      return chk?(white?'Checkmate. Black wins.':'Checkmate. White wins.'):'Stalemate. Draw.';
    }
    var t=white?'White':'Black';
    t+=' to move';
    if(chk) t+=' — check!';
    if(vsCpu&&white) t+=' (you are White)';
    return t;
  }

  function endIfNeeded(){
    var moves=legalMoves(board,whiteTurn,epSquare,castling);
  var chk=inCheck(board,whiteTurn,epSquare);
    if(!moves.length){
      gameOver=true;
      statusEl.textContent=chk?(whiteTurn?'Checkmate. Black wins.':'Checkmate. White wins.'):'Stalemate. Draw.';
      hintEl.textContent='Press New game to play again.';
    }
  }

  function pickCpuMove(){
    var moves=legalMoves(board,false,epSquare,castling);
    if(!moves.length) return null;
    var captures=moves.filter(function(m){ return !empty(board[m.tr][m.tc]); });
    var pool=captures.length?captures:moves;
    return pool[Math.floor(Math.random()*pool.length)];
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
        var isT=targets.some(function(t){return t.tr===r&&t.tc===c;});
        if(isT){
          if(empty(board[r][c])){ btn.classList.add('legal'); btn.classList.add('dot'); }
          else btn.classList.add('cap');
        }
        btn.dataset.r=String(r);
        btn.dataset.c=String(c);
        btn.addEventListener('click',function(ev){ ev.preventDefault(); onSq(r,c); });
        boardEl.appendChild(btn);
      }
    }
    statusEl.textContent=statusLine();
    if(sel&&targets.length) hintEl.textContent='Tap a green square to move ('+targets.length+' options).';
    else if(vsCpu&&!whiteTurn&&cpuBusy) hintEl.textContent='Computer is thinking…';
    else if(!gameOver) hintEl.textContent=vsCpu&&whiteTurn?'You are White — tap a piece, then a green square.':'Tap your piece, then a green square.';
  }

  function finishMove(m){
    var applied=applyMove(board,m,whiteTurn);
    board=applied.board;
    epSquare=applied.ep;
    castling=updateCastling(m,castling);
    whiteTurn=!whiteTurn;
    sel=null; targets=[];
    if(!movedOnce){ movedOnce=true; ${done} }
    endIfNeeded();
    render();
    if(gameOver) return;
    if(vsCpu&&whiteTurn===false){
      cpuBusy=true;
      statusEl.textContent='Computer thinking…';
      hintEl.textContent='';
      setTimeout(function(){
        var cm=pickCpuMove();
        cpuBusy=false;
        if(cm) finishMove(cm);
        else render();
      },120);
    }
  }

  function onSq(r,c){
    if(gameOver||cpuBusy) return;
    if(vsCpu&&whiteTurn===false) return;
    const p=board[r][c];
    if(sel){
      var mv=null;
      for(var i=0;i<targets.length;i++){ if(targets[i].tr===r&&targets[i].tc===c){ mv=targets[i]; break; } }
      if(mv){ finishMove(mv); return; }
      if(sel[0]===r&&sel[1]===c){ sel=null; targets=[]; render(); return; }
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
    hintEl.textContent=vsCpu?'You play White. Tap a pawn or piece to start.':'Tap your piece, then a green square.';
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