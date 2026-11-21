/** Batch 37: high-search browser games (part 1). */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch37Tools(ad) {
  return [
    {
      path: "/2048-game.html",
      file: "2048-game.html",
      category: "games",
      title: "2048 Game — Play Online Free",
      desc: "Play 2048 in your browser. Slide tiles with arrow keys or swipe. Merge numbers to reach 2048.",
      card: "2048 game",
      cardDesc: "Classic 2048 puzzle in the browser.",
      body: `<h1>2048 game</h1>${ad}
<div class="tool-panel">
<p id="score">Score: 0</p>
<div id="board" class="game-2048" tabindex="0" aria-label="2048 board"></div>
<p class="prose" style="font-size:0.85rem">Arrow keys or swipe. Press R to restart.</p>
<button type="button" class="primary" id="reset">New game</button>
<p id="msg" class="tool-feedback" role="status"></p>
</div>
<style>.game-2048{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:320px;padding:8px;background:#bbada0;border-radius:10px;outline:none}.game-2048 .cell{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.35rem;border-radius:6px;background:#cdc1b4;color:#776e65}.game-2048 .v2{background:#eee4da}.game-2048 .v4{background:#ede0c8}.game-2048 .v8{background:#f2b179;color:#f9f6f2}.game-2048 .v16{background:#f59563;color:#f9f6f2}.game-2048 .v32{background:#f67c5f;color:#f9f6f2}.game-2048 .v64{background:#f65e3b;color:#f9f6f2}.game-2048 .v128{background:#edcf72;color:#f9f6f2;font-size:1.1rem}.game-2048 .v256{background:#edcc61;color:#f9f6f2;font-size:1.1rem}.game-2048 .v512{background:#edc850;color:#f9f6f2;font-size:1rem}.game-2048 .v1024{background:#edc53f;color:#f9f6f2;font-size:0.95rem}.game-2048 .v2048{background:#edc22e;color:#f9f6f2;font-size:0.95rem}</style>
<script>
(function(){
  const W=4; let grid, score, over, won, moved;
  const board=document.getElementById('board');
  const scoreEl=document.getElementById('score');
  const msg=document.getElementById('msg');
  function empty(){ return Array.from({length:W},()=>Array(W).fill(0)); }
  function randCell(g){
    const free=[]; for(let y=0;y<W;y++) for(let x=0;x<W;x++) if(!g[y][x]) free.push([x,y]);
    if(!free.length) return;
    const [x,y]=free[Math.floor(Math.random()*free.length)];
    g[y][x]=Math.random()<0.9?2:4;
  }
  function slide(row){
    const nums=row.filter(v=>v); const out=[];
    for(let i=0;i<nums.length;i++){
      if(i+1<nums.length && nums[i]===nums[i+1]){ out.push(nums[i]*2); score+=nums[i]*2; i++; }
      else out.push(nums[i]);
    }
    while(out.length<W) out.push(0);
    return out;
  }
  function move(dir){
    if(over) return false;
    const before=JSON.stringify(grid);
    const g=empty();
    if(dir==='left'||dir==='right'){
      for(let y=0;y<W;y++){
        let row=grid[y].slice();
        if(dir==='right') row=row.reverse();
        row=slide(row);
        if(dir==='right') row=row.reverse();
        g[y]=row;
      }
    } else {
      for(let x=0;x<W;x++){
        let col=[]; for(let y=0;y<W;y++) col.push(grid[y][x]);
        if(dir==='down') col=col.reverse();
        col=slide(col);
        if(dir==='down') col=col.reverse();
        for(let y=0;y<W;y++) g[y][x]=col[y];
      }
    }
    grid=g;
  }
  function canMove(){
    for(let y=0;y<W;y++) for(let x=0;x<W;x++){
      const v=grid[y][x];
      if(!v) return true;
      if(x<W-1&&grid[y][x+1]===v) return true;
      if(y<W-1&&grid[y+1][x]===v) return true;
    }
    return false;
  }
  function render(){
    board.innerHTML='';
    for(let y=0;y<W;y++) for(let x=0;x<W;x++){
      const v=grid[y][x];
      const d=document.createElement('div');
      d.className='cell'+(v?' v'+v:'');
      d.textContent=v||'';
      board.appendChild(d);
    }
    scoreEl.textContent='Score: '+score;
    if(!won && grid.flat().includes(2048)){ won=true; msg.textContent='You reached 2048! Keep going or start a new game.'; }
    if(!canMove()){ over=true; msg.textContent='No moves left. Score '+score+'.'; }
  }
  function newGame(){
    grid=empty(); score=0; over=false; won=false; moved=false;
    msg.textContent='';
    randCell(grid); randCell(grid);
    render();
  }
  function act(dir){
    const before=JSON.stringify(grid);
    move(dir);
    if(JSON.stringify(grid)!==before){
      if(!moved){ moved=true; ${done} }
      randCell(grid);
      render();
    }
  }
  document.addEventListener('keydown',function(e){
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
      e.preventDefault();
      const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
      act(m[e.key]);
    }
    if(e.key==='r'||e.key==='R') newGame();
  });
  let tx,ty;
  board.addEventListener('touchstart',function(e){ const t=e.changedTouches[0]; tx=t.clientX; ty=t.clientY; },{passive:true});
  board.addEventListener('touchend',function(e){
    const t=e.changedTouches[0]; const dx=t.clientX-tx; const dy=t.clientY-ty;
    if(Math.abs(dx)<24&&Math.abs(dy)<24) return;
    if(Math.abs(dx)>Math.abs(dy)) act(dx>0?'right':'left');
    else act(dy>0?'down':'up');
  },{passive:true});
  document.getElementById('reset').onclick=newGame;
  newGame();
  board.focus();
})();
</script>`,
    },
    {
      path: "/snake-game.html",
      file: "snake-game.html",
      category: "games",
      title: "Snake Game — Play Online Free",
      desc: "Classic snake game in your browser. Eat food, grow longer, and avoid hitting the walls or yourself.",
      card: "Snake game",
      cardDesc: "Arrow keys or on-screen controls.",
      body: `<h1>Snake game</h1>${ad}
<div class="tool-panel">
<p id="sn-score">Score: 0</p>
<canvas id="sn" width="400" height="400" style="display:block;max-width:100%;background:#1d1527;border-radius:12px;touch-action:none" aria-label="Snake game board"></canvas>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
<button type="button" id="sn-up">▲</button><button type="button" id="sn-left">◀</button><button type="button" id="sn-down">▼</button><button type="button" id="sn-right">▶</button>
<button type="button" class="primary" id="sn-new">New game</button>
</div>
<p id="sn-msg" class="tool-feedback" role="status"></p>
</div>
<script>
(function(){
  const c=document.getElementById('sn'); const ctx=c.getContext('2d');
  const N=20, cell=c.width/N; let snake, dir, food, score, tick, alive, started;
  const msg=document.getElementById('sn-msg');
  function placeFood(){
    let f; do{
      f=[Math.floor(Math.random()*N),Math.floor(Math.random()*N)];
    }while(snake.some(s=>s[0]===f[0]&&s[1]===f[1]));
    food=f;
  }
  function draw(){
    ctx.fillStyle='#1d1527'; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle='#720e9e';
    snake.forEach(([x,y],i)=>{ ctx.fillStyle=i? '#9b4dca':'#e8d4f8'; ctx.fillRect(x*cell+1,y*cell+1,cell-2,cell-2); });
    ctx.fillStyle='#22c55e';
    ctx.fillRect(food[0]*cell+1,food[1]*cell+1,cell-2,cell-2);
  }
  function step(){
    if(!alive) return;
    const head=[snake[0][0]+dir[0], snake[0][1]+dir[1]];
    if(head[0]<0||head[1]<0||head[0]>=N||head[1]>=N|| snake.some(s=>s[0]===head[0]&&s[1]===head[1])){
      alive=false; msg.textContent='Game over. Score '+score+'.'; clearInterval(tick); return;
    }
    snake.unshift(head);
    if(head[0]===food[0]&&head[1]===food[1]){ score++; document.getElementById('sn-score').textContent='Score: '+score; placeFood(); if(!started){ started=true; ${done} } }
    else snake.pop();
    draw();
  }
  function setDir(d){ if(!alive) return; if(d[0]===-dir[0]&&d[1]===-dir[1]) return; dir=d; }
  function reset(){
    snake=[[5,10],[4,10],[3,10]]; dir=[1,0]; score=0; alive=true; started=false;
    document.getElementById('sn-score').textContent='Score: 0'; msg.textContent='';
    placeFood(); draw();
    clearInterval(tick); tick=setInterval(step, 120);
  }
  document.addEventListener('keydown',function(e){
    const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
    if(m[e.key]){ e.preventDefault(); setDir(m[e.key]); }
  });
  document.getElementById('sn-up').onclick=function(){ setDir([0,-1]); };
  document.getElementById('sn-down').onclick=function(){ setDir([0,1]); };
  document.getElementById('sn-left').onclick=function(){ setDir([-1,0]); };
  document.getElementById('sn-right').onclick=function(){ setDir([1,0]); };
  document.getElementById('sn-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/tic-tac-toe.html",
      file: "tic-tac-toe.html",
      category: "games",
      title: "Tic Tac Toe — Play Online vs Computer",
      desc: "Free tic tac toe game against a simple computer opponent. You are X and move first.",
      card: "Tic tac toe",
      cardDesc: "Play X and O against the computer.",
      body: `<h1>Tic tac toe</h1>${ad}
<div class="tool-panel">
<div id="ttt" class="ttt-board" role="grid" aria-label="Tic tac toe board"></div>
<p id="ttt-status" class="tool-feedback" role="status">Your turn (X)</p>
<button type="button" class="primary" id="ttt-new">New game</button>
</div>
<style>.ttt-board{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:280px}.ttt-board button{aspect-ratio:1;font-size:2rem;font-weight:700;border-radius:10px;border:2px solid var(--line);background:#fff;cursor:pointer}.ttt-board button:disabled{cursor:default}</style>
<script>
(function(){
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let cells, over, human;
  const board=document.getElementById('ttt');
  const status=document.getElementById('ttt-status');
  function winner(b){
    for(const L of lines){ const [a,c,d]=L; if(b[a]&&b[a]===b[c]&&b[a]===b[d]) return b[a]; }
    return b.includes('')?null:'draw';
  }
  function cpu(){
    const b=cells.slice();
    const empty=b.map((v,i)=>v?-1:i).filter(i=>i>=0);
    for(const i of empty){ b[i]='O'; if(winner(b)==='O'){ cells[i]='O'; return i; } b[i]=''; }
    for(const i of empty){ b[i]='X'; if(winner(b)==='X'){ cells[i]='O'; return i; } b[i]=''; }
    if(empty.includes(4)) return 4;
    return empty[Math.floor(Math.random()*empty.length)];
  }
  function render(){
    board.innerHTML='';
    cells.forEach(function(v,i){
      const btn=document.createElement('button');
      btn.textContent=v;
      btn.disabled=!!v||over||!human;
      btn.onclick=function(){
        if(v||over) return;
        cells[i]='X'; ${done}
        const w=winner(cells);
        if(w){ over=true; status.textContent=w==='draw'?'Draw.':(w==='X'?'You win!':'Computer wins.'); render(); return; }
        human=false; status.textContent='Computer thinking…';
        setTimeout(function(){
          cpu(); human=true;
          const w2=winner(cells);
          if(w2){ over=true; status.textContent=w2==='draw'?'Draw.':(w2==='X'?'You win!':'Computer wins.'); }
          else status.textContent='Your turn (X)';
          render();
        }, 350);
        render();
      };
      board.appendChild(btn);
    });
  }
  function reset(){ cells=Array(9).fill(''); over=false; human=true; status.textContent='Your turn (X)'; render(); }
  document.getElementById('ttt-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/sudoku-game.html",
      file: "sudoku-game.html",
      category: "games",
      title: "Sudoku Game — Play Easy Puzzles Online",
      desc: "Play Sudoku in the browser. Fill the grid so each row, column and 3×3 box has digits 1–9 once.",
      card: "Sudoku game",
      cardDesc: "Easy Sudoku with check and new puzzle.",
      body: `<h1>Sudoku game</h1>${ad}
<div class="tool-panel">
<div id="su" class="su-grid"></div>
<button type="button" class="primary" id="su-check">Check</button>
<button type="button" id="su-new">New puzzle</button>
<p id="su-msg" class="tool-feedback" role="status"></p>
</div>
<style>.su-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:1px;max-width:360px;background:#333;border:2px solid #333}.su-grid input{width:100%;aspect-ratio:1;text-align:center;font-size:1.1rem;border:none;padding:0}.su-grid input.fixed{background:#f3f0f7;font-weight:700}.su-grid input:nth-child(3n){border-right:2px solid #333}.su-grid input:nth-child(n+19):nth-child(-n+27),.su-grid input:nth-child(n+46):nth-child(-n+54){border-bottom:2px solid #333}</style>
<script>
(function(){
  const puzzle=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];
  const solution=[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];
  const box=document.getElementById('su');
  const msg=document.getElementById('su-msg');
  function render(){
    box.innerHTML='';
    puzzle.forEach(function(v,i){
      const inp=document.createElement('input');
      inp.inputMode='numeric'; inp.maxLength=1;
      if(v){ inp.value=v; inp.className='fixed'; inp.readOnly=true; }
      else inp.addEventListener('input',function(){ inp.value=inp.value.replace(/[^1-9]/g,'').slice(0,1); ${done}; });
      inp.dataset.i=i;
      box.appendChild(inp);
    });
  }
  document.getElementById('su-check').onclick=function(){
    const vals=[...box.querySelectorAll('input')].map(i=>Number(i.value)||0);
    let ok=true;
    vals.forEach(function(v,i){ if(v&&v!==solution[i]) ok=false; });
    if(vals.every((v,i)=>v===solution[i])) msg.textContent='Correct! Puzzle solved.';
    else msg.textContent=ok?'No conflicts so far, but not finished.':'Some cells are wrong.';
  };
  document.getElementById('su-new').onclick=function(){ msg.textContent=''; render(); };
  render();
})();
</script>`,
    },
    {
      path: "/wordle-game.html",
      file: "wordle-game.html",
      category: "games",
      title: "Wordle Game — Guess the 5-Letter Word",
      desc: "Free Wordle-style game. Guess the five-letter word in six tries. Green means correct spot, yellow means wrong spot.",
      card: "Wordle game",
      cardDesc: "Six guesses, colour hints.",
      body: `<h1>Wordle game</h1>${ad}
<div class="tool-panel">
<div id="wl-rows"></div>
<input id="wl-in" type="text" maxlength="5" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Type 5 letters" style="text-transform:uppercase;letter-spacing:0.3em;font-size:1.2rem;max-width:12rem" />
<button type="button" class="primary" id="wl-go">Guess</button>
<button type="button" id="wl-new">New word</button>
<p id="wl-msg" class="tool-feedback" role="status"></p>
</div>
<style>.wl-row{display:flex;gap:6px;margin-bottom:6px}.wl-cell{width:2.4rem;height:2.4rem;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid #c4b8d4;border-radius:4px;text-transform:uppercase}.wl-cell.good{background:#22c55e;border-color:#16a34a;color:#fff}.wl-cell.warn{background:#eab308;border-color:#ca8a04;color:#fff}.wl-cell.bad{background:#78716c;border-color:#57534e;color:#fff}</style>
<script>
(function(){
  const words=['BRAIN','CHART','DRIVE','FLAME','GLOBE','HAPPY','INDEX','JUICE','KNOCK','LEMON','MONEY','NIGHT','OCEAN','PIANO','QUICK','RIVER','SMART','TIGER','URBAN','VIVID','WATCH','YOUTH','ZEBRA','APPLE','BREAD','CLOUD','DANCE','EARTH','FOCUS','GRACE'];
  let answer, guesses, over;
  const rows=document.getElementById('wl-rows');
  const msg=document.getElementById('wl-msg');
  function paintRow(word, res){
    const r=document.createElement('div'); r.className='wl-row';
    for(let i=0;i<5;i++){
      const d=document.createElement('div');
      d.className='wl-cell '+(res[i]==='g'?'good':res[i]==='y'?'warn':'bad');
      d.textContent=word[i]||'';
      r.appendChild(d);
    }
    rows.appendChild(r);
  }
  function score(guess){
    const a=answer.split(''); const g=guess.split('');
    const res=Array(5).fill('b');
    const used=Array(5).fill(false);
    for(let i=0;i<5;i++) if(g[i]===a[i]){ res[i]='g'; used[i]=true; }
    for(let i=0;i<5;i++){
      if(res[i]==='g') continue;
      const j=a.findIndex((ch,idx)=>!used[idx]&&ch===g[i]);
      if(j>=0){ res[i]='y'; used[j]=true; }
    }
    return res;
  }
  function reset(){
    answer=words[Math.floor(Math.random()*words.length)];
    guesses=0; over=false; rows.innerHTML=''; msg.textContent='';
    document.getElementById('wl-in').value='';
  }
  function guess(){
    if(over) return;
    const w=document.getElementById('wl-in').value.toUpperCase().replace(/[^A-Z]/g,'');
    if(w.length!==5){ msg.textContent='Enter exactly 5 letters.'; return; }
    ${done}
    guesses++;
    const res=score(w); paintRow(w,res);
    document.getElementById('wl-in').value='';
    if(w===answer){ over=true; msg.textContent='You got it in '+guesses+'!'; return; }
    if(guesses>=6){ over=true; msg.textContent='Answer was '+answer+'.'; return; }
    msg.textContent='Guess '+(6-guesses)+' left.';
  }
  document.getElementById('wl-go').onclick=guess;
  document.getElementById('wl-in').addEventListener('keydown',function(e){ if(e.key==='Enter') guess(); });
  document.getElementById('wl-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/memory-game.html",
      file: "memory-game.html",
      category: "games",
      title: "Memory Card Game — Match Pairs Online",
      desc: "Flip cards and find matching pairs. Train your memory with this free concentration game.",
      card: "Memory game",
      cardDesc: "Match emoji pairs in fewest moves.",
      body: `<h1>Memory game</h1>${ad}
<div class="tool-panel">
<p id="mg-stat">Moves: 0</p>
<div id="mg" class="mg-board"></div>
<button type="button" class="primary" id="mg-new">Shuffle</button>
</div>
<style>.mg-board{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:320px}.mg-board button{aspect-ratio:1;font-size:1.6rem;border-radius:10px;border:2px solid var(--line);background:#fff;cursor:pointer}</style>
<script>
(function(){
  const icons=['🍎','🍌','🍇','🍊','🍋','🥝','🍓','🍑'];
  let cards, open, lock, moves, matched;
  const board=document.getElementById('mg');
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function render(){
    board.innerHTML='';
    cards.forEach(function(v,i){
      const b=document.createElement('button');
      b.textContent=matched.has(i)||open.includes(i)?icons[v]:'?';
      b.disabled=lock||matched.has(i)||open.includes(i);
      b.onclick=function(){
        if(lock||matched.has(i)) return;
        open.push(i); b.textContent=icons[v]; b.disabled=true;
        if(open.length===2){
          moves++; document.getElementById('mg-stat').textContent='Moves: '+moves;
          ${done}
          lock=true;
          const [a,c]=open;
          if(cards[a]===cards[c]){ matched.add(a); matched.add(c); open=[]; lock=false; render();
            if(matched.size===cards.length) document.getElementById('mg-stat').textContent='You won in '+moves+' moves!';
          } else setTimeout(function(){ open=[]; lock=false; render(); }, 650);
        }
      };
      board.appendChild(b);
    });
  }
  function reset(){
    cards=[0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7]; shuffle(cards);
    open=[]; lock=false; moves=0; matched=new Set();
    document.getElementById('mg-stat').textContent='Moves: 0';
    render();
  }
  document.getElementById('mg-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/hangman-game.html",
      file: "hangman-game.html",
      category: "games",
      title: "Hangman Game — Guess the Word Online",
      desc: "Free hangman game. Guess letters before the drawing is complete. New random words every round.",
      card: "Hangman game",
      cardDesc: "Guess the hidden word letter by letter.",
      body: `<h1>Hangman game</h1>${ad}
<div class="tool-panel">
<p id="hm-word" style="font-size:1.5rem;letter-spacing:0.35em;font-weight:700"></p>
<p id="hm-life">Lives: 6</p>
<div id="hm-keys" class="hm-keys"></div>
<button type="button" class="primary" id="hm-new">New word</button>
<p id="hm-msg" class="tool-feedback" role="status"></p>
</div>
<style>.hm-keys{display:flex;flex-wrap:wrap;gap:6px;max-width:360px}.hm-keys button{min-width:2.2rem;padding:0.4rem}</style>
<script>
(function(){
  const pool=['PYTHON','JAVASCRIPT','BROWSER','PUZZLE','GALAXY','ROCKET','TEMPLE','CASTLE','ISLAND','MANGO','TEMPLE','WINDOW','BRIDGE','ORANGE','MARKET','FRIEND','SCHOOL','PLANET','GUITAR','FLOWER'];
  let word, guessed, lives, over;
  const show=document.getElementById('hm-word');
  const msg=document.getElementById('hm-msg');
  const keys=document.getElementById('hm-keys');
  function renderWord(){
    show.textContent=word.split('').map(ch=>guessed.has(ch)?ch:'_').join(' ');
  }
  function buildKeys(){
    keys.innerHTML='';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(L){
      const b=document.createElement('button');
      b.textContent=L; b.disabled=guessed.has(L)||over;
      b.onclick=function(){
        if(over) return;
        guessed.add(L); ${done}
        if(!word.includes(L)){ lives--; document.getElementById('hm-life').textContent='Lives: '+lives;
          if(lives<=0){ over=true; msg.textContent='Out of lives. Word was '+word+'.'; buildKeys(); return; }
        }
        renderWord(); buildKeys();
        if(word.split('').every(ch=>guessed.has(ch))){ over=true; msg.textContent='You won!'; buildKeys(); }
      };
      keys.appendChild(b);
    });
  }
  function reset(){
    word=pool[Math.floor(Math.random()*pool.length)];
    guessed=new Set(); lives=6; over=false;
    document.getElementById('hm-life').textContent='Lives: 6';
    msg.textContent='';
    renderWord(); buildKeys();
  }
  document.getElementById('hm-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/minesweeper-game.html",
      file: "minesweeper-game.html",
      category: "games",
      title: "Minesweeper Game — Play Beginner Grid Online",
      desc: "Classic minesweeper in the browser. Clear the 9×9 beginner board without hitting a mine. Flag with right-click or long-press.",
      card: "Minesweeper game",
      cardDesc: "9×9 beginner board with flags.",
      body: `<h1>Minesweeper game</h1>${ad}
<div class="tool-panel">
<p id="ms-stat">Mines left: 10</p>
<div id="ms" class="ms-grid"></div>
<button type="button" class="primary" id="ms-new">New game</button>
<p id="ms-msg" class="tool-feedback" role="status"></p>
</div>
<style>.ms-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:2px;max-width:324px;user-select:none}.ms-grid button{aspect-ratio:1;font-size:0.85rem;font-weight:700;padding:0;border:1px solid #aaa;background:#e8e2f0;cursor:pointer}.ms-grid button.open{background:#fff}.ms-grid button.flag{background:#fde68a}.ms-grid button.mine{background:#ef4444;color:#fff}</style>
<script>
(function(){
  const S=9, M=10;
  let mines, revealed, flags, over, first;
  const grid=document.getElementById('ms');
  const msg=document.getElementById('ms-msg');
  function idx(x,y){ return y*S+x; }
  function neighbours(x,y){
    const n=[];
    for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++){
      if(!dx&&!dy) continue;
      const nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<S&&ny<S) n.push([nx,ny]);
    }
    return n;
  }
  function place(sx,sy){
    mines=new Set();
    while(mines.size<M){
      const i=Math.floor(Math.random()*S*S);
      if(i===idx(sx,sy)) continue;
      mines.add(i);
    }
    revealed=new Set(); flags=new Set(); over=false;
  }
  function count(x,y){
    return neighbours(x,y).filter(([nx,ny])=>mines.has(idx(nx,ny))).length;
  }
  function flood(x,y){
    const q=[[x,y]];
    while(q.length){
      const [cx,cy]=q.pop();
      const id=idx(cx,cy);
      if(revealed.has(id)||flags.has(id)) continue;
      revealed.add(id);
      if(count(cx,cy)===0) neighbours(cx,cy).forEach(p=>q.push(p));
    }
  }
  function render(){
    grid.innerHTML='';
    for(let y=0;y<S;y++) for(let x=0;x<S;x++){
      const id=idx(x,y);
      const b=document.createElement('button');
      const isRev=revealed.has(id);
      const isFlag=flags.has(id);
      if(isRev) b.className='open';
      if(isFlag) b.className='flag';
      if(over&&mines.has(id)) b.className='mine';
      if(isRev) b.textContent=count(x,y)||'';
      else if(isFlag) b.textContent='🚩';
      b.oncontextmenu=function(e){ e.preventDefault(); if(over||isRev) return; if(flags.has(id)) flags.delete(id); else flags.add(id); document.getElementById('ms-stat').textContent='Mines left: '+(M-flags.size); render(); };
      b.addEventListener('touchstart',function(e){
        if(e.touches.length>1||e.target._hold) return;
        e.target._hold=setTimeout(function(){ b.oncontextmenu(e); e.target._hold=null; }, 500);
      },{passive:true});
      b.addEventListener('touchend',function(e){ if(e.target._hold){ clearTimeout(e.target._hold); e.target._hold=null; } });
      b.onclick=function(){
        if(over||isFlag||isRev) return;
        if(first){ first=false; place(x,y); ${done} }
        if(mines.has(id)){ over=true; msg.textContent='Boom! Mine hit.'; render(); return; }
        flood(x,y);
        if(revealed.size===S*S-M){ over=true; msg.textContent='You cleared the board!'; }
        render();
      };
      grid.appendChild(b);
    }
  }
  function reset(){ first=true; mines=new Set(); revealed=new Set(); flags=new Set(); over=false; msg.textContent=''; document.getElementById('ms-stat').textContent='Mines left: '+M; render(); }
  document.getElementById('ms-new').onclick=reset;
  reset();
})();
</script>`,
    },
  ];
}