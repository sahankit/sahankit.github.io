/** Batch 38: high-search browser games (part 2). */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch38Tools(ad) {
  return [
    {
      path: "/connect-four.html",
      file: "connect-four.html",
      category: "games",
      title: "Connect Four — Play Online vs Computer",
      desc: "Drop discs and connect four in a row before the computer does. Free Connect 4 game in your browser.",
      card: "Connect Four",
      cardDesc: "Four in a row against the CPU.",
      body: `<h1>Connect four</h1>${ad}
<div class="tool-panel">
<div id="c4-drop" class="c4-drop"></div>
<div id="c4" class="c4-board"></div>
<p id="c4-msg" class="tool-feedback" role="status">Your turn (red)</p>
<button type="button" class="primary" id="c4-new">New game</button>
</div>
<style>.c4-drop,.c4-board{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;max-width:350px}.c4-drop{margin-bottom:6px}.c4-board{padding:10px;background:#1e40af;border-radius:12px}.c4-drop button,.c4-board button{aspect-ratio:1;border-radius:50%;border:2px solid #1e3a8a;background:#fff;cursor:pointer;font-size:0.85rem}.c4-board button{cursor:default}.c4-board button.r{background:#ef4444}.c4-board button.y{background:#eab308}.c4-drop button:disabled{cursor:default;opacity:0.5}</style>
<script>
(function(){
  const R=6,C=7; let grid, human, over;
  const dropRow=document.getElementById('c4-drop');
  const board=document.getElementById('c4');
  const msg=document.getElementById('c4-msg');
  function empty(){ return Array.from({length:R},()=>Array(C).fill(0)); }
  function drop(col, p){
    for(let r=R-1;r>=0;r--) if(!grid[r][col]){ grid[r][col]=p; return r; }
    return -1;
  }
  function win(p){
    for(let r=0;r<R;r++) for(let c=0;c<C;c++){
      if(grid[r][c]!==p) continue;
      for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){
        let n=1, rr=r, cc=c;
        while(true){ rr+=dr; cc+=dc; if(rr<0||cc<0||rr>=R||cc>=C||grid[rr][cc]!==p) break; n++; }
        rr=r; cc=c;
        while(true){ rr-=dr; cc-=dc; if(rr<0||cc<0||rr>=R||cc>=C||grid[rr][cc]!==p) break; n++; }
        if(n>=4) return true;
      }
    }
    return false;
  }
  function undo(col,p){
    for(let r=R-1;r>=0;r--) if(grid[r][col]===p){ grid[r][col]=0; break; }
  }
  function cpu(){
    for(let c=0;c<C;c++){
      const r=drop(c,2);
      if(r!==-1){ if(win(2)) return; undo(c,2); }
    }
    for(let c=0;c<C;c++){
      const r=drop(c,1);
      if(r!==-1){
        if(win(1)){ undo(c,1); drop(c,2); return; }
        undo(c,1);
      }
    }
    const cols=[...Array(C).keys()].sort(()=>Math.random()-0.5);
    for(const c of cols) if(drop(c,2)!==-1) return;
  }
  function render(){
    dropRow.innerHTML='';
    board.innerHTML='';
    for(let c=0;c<C;c++){
      const b=document.createElement('button');
      b.textContent='↓'; b.title='Drop in column '+(c+1);
      b.disabled=over||!human||grid[0][c];
      b.onclick=function(){
        if(over||!human) return;
        if(drop(c,1)===-1) return;
        ${done}
        if(win(1)){ over=true; msg.textContent='You win!'; render(); return; }
        if(grid[0].every(function(v){ return v; })){ over=true; msg.textContent='Board full — draw.'; render(); return; }
        human=false; msg.textContent='Computer…';
        setTimeout(function(){
          cpu();
          human=true;
          if(win(2)){ over=true; msg.textContent='Computer wins.'; }
          else msg.textContent='Your turn (red)';
          render();
        }, 400);
        render();
      };
      dropRow.appendChild(b);
    }
    for(let r=0;r<R;r++) for(let c=0;c<C;c++){
      const b=document.createElement('button');
      b.disabled=true;
      if(grid[r][c]===1) b.className='r';
      if(grid[r][c]===2) b.className='y';
      board.appendChild(b);
    }
  }
  function reset(){ grid=empty(); human=true; over=false; msg.textContent='Your turn (red)'; render(); }
  document.getElementById('c4-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/rock-paper-scissors-game.html",
      file: "rock-paper-scissors-game.html",
      category: "games",
      title: "Rock Paper Scissors — Play Online",
      desc: "Play rock paper scissors against the computer. Track wins, losses and draws.",
      card: "Rock paper scissors",
      cardDesc: "Best of quick rounds vs CPU.",
      body: `<h1>Rock paper scissors</h1>${ad}
<div class="tool-panel">
<p id="rps-score">You 0 – 0 Computer (0 draws)</p>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<button type="button" class="primary" data-rps="rock">🪨 Rock</button>
<button type="button" class="primary" data-rps="paper">📄 Paper</button>
<button type="button" class="primary" data-rps="scissors">✂️ Scissors</button>
</div>
<p id="rps-msg" class="tool-feedback" role="status">Pick one.</p>
</div>
<script>
(function(){
  const beats={rock:'scissors',paper:'rock',scissors:'paper'};
  const labels={rock:'Rock',paper:'Paper',scissors:'Scissors'};
  let w=0,l=0,d=0;
  const picks=['rock','paper','scissors'];
  document.querySelectorAll('[data-rps]').forEach(function(btn){
    btn.onclick=function(){
      const you=btn.getAttribute('data-rps');
      const cpu=picks[Math.floor(Math.random()*3)];
      let out;
      if(you===cpu){ d++; out='Draw.'; }
      else if(beats[you]===cpu){ w++; out='You win!'; }
      else { l++; out='Computer wins.'; }
      document.getElementById('rps-score').textContent='You '+w+' – '+l+' Computer ('+d+' draws)';
      document.getElementById('rps-msg').textContent='You: '+labels[you]+'. Computer: '+labels[cpu]+'. '+out;
      ${done}
    };
  });
})();
</script>`,
    },
    {
      path: "/whack-a-mole.html",
      file: "whack-a-mole.html",
      category: "games",
      title: "Whack-a-Mole — 30 Second Arcade Game",
      desc: "Click the moles as they pop up. Score as many points as you can in 30 seconds.",
      card: "Whack-a-mole",
      cardDesc: "30-second click arcade game.",
      body: `<h1>Whack-a-mole</h1>${ad}
<div class="tool-panel">
<p id="wm">Score: 0 · Time: 30s</p>
<div id="wm-grid" class="wm-grid"></div>
<button type="button" class="primary" id="wm-start">Start</button>
</div>
<style>.wm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:280px}.wm-grid button{aspect-ratio:1;border-radius:12px;border:2px solid var(--line);background:#dcfce7;font-size:2rem;cursor:pointer}.wm-grid button.up{background:#86efac}</style>
<script>
(function(){
  const N=9; let score, timeLeft, moleTimer, clockTimer, mole, running;
  const grid=document.getElementById('wm-grid');
  const stat=document.getElementById('wm');
  function render(){
    grid.innerHTML='';
    for(let i=0;i<N;i++){
      const b=document.createElement('button');
      b.textContent=mole===i?'🐹':'';
      if(mole===i) b.className='up';
      b.onclick=function(){ if(!running||mole!==i) return; score++; mole=-1; render(); stat.textContent='Score: '+score+' · Time: '+timeLeft+'s'; };
      grid.appendChild(b);
    }
  }
  function tick(){
    mole=Math.floor(Math.random()*N);
    render();
  }
  function start(){
    score=0; timeLeft=30; running=true; mole=-1;
    ${done}
    clearInterval(moleTimer);
    clearInterval(clockTimer);
    moleTimer=setInterval(tick, 750);
    clockTimer=setInterval(function(){
      timeLeft--;
      stat.textContent='Score: '+score+' · Time: '+timeLeft+'s';
      if(timeLeft<=0){
        clearInterval(clockTimer); clearInterval(moleTimer); running=false; mole=-1; render();
        stat.textContent='Finished! Score: '+score;
      }
    }, 1000);
    stat.textContent='Score: 0 · Time: 30s';
    render();
  }
  document.getElementById('wm-start').onclick=start;
  render();
})();
</script>`,
    },
    {
      path: "/simon-game.html",
      file: "simon-game.html",
      category: "games",
      title: "Simon Says — Memory Sequence Game",
      desc: "Watch the colour pattern and repeat it. Each round adds one more step in this Simon memory game.",
      card: "Simon game",
      cardDesc: "Repeat the flashing colour sequence.",
      body: `<h1>Simon game</h1>${ad}
<div class="tool-panel">
<p id="sim-lvl">Level: 0</p>
<div id="sim" class="sim-pad"></div>
<button type="button" class="primary" id="sim-start">Start</button>
<p id="sim-msg" class="tool-feedback" role="status"></p>
</div>
<style>.sim-pad{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:220px}.sim-pad button{aspect-ratio:1;border:none;border-radius:14px;opacity:0.45;cursor:pointer}.sim-pad button.lit{opacity:1;transform:scale(1.03)}.sim-pad button:nth-child(1){background:#ef4444}.sim-pad button:nth-child(2){background:#22c55e}.sim-pad button:nth-child(3){background:#3b82f6}.sim-pad button:nth-child(4){background:#eab308}</style>
<script>
(function(){
  const colors=['red','green','blue','yellow'];
  let seq=[], playing, input, dead;
  const pad=document.getElementById('sim');
  const msg=document.getElementById('sim-msg');
  colors.forEach(function(c,i){
    const b=document.createElement('button');
    b.title=c;
    b.onclick=function(){ if(playing||dead) return; playerHit(i); };
    pad.appendChild(b);
  });
  function flash(i){
    const b=pad.children[i];
    b.classList.add('lit');
    setTimeout(function(){ b.classList.remove('lit'); }, 350);
  }
  function playSeq(){
    playing=true; step=0;
    let i=0;
    const t=setInterval(function(){
      flash(seq[i]); i++;
      if(i>=seq.length){ clearInterval(t); playing=false; msg.textContent='Your turn'; }
    }, 550);
  }
  function playerHit(i){
    if(playing) return;
    flash(i);
    if(i!==seq[input]){ dead=true; msg.textContent='Wrong! You reached level '+seq.length+'. Press Start to try again.'; input=0; return; }
    input++;
    if(input===seq.length){
      seq.push(Math.floor(Math.random()*4));
      document.getElementById('sim-lvl').textContent='Level: '+seq.length;
      input=0;
      msg.textContent='Good! Watch…';
      setTimeout(playSeq, 600);
    }
  }
  function start(){
    seq=[Math.floor(Math.random()*4)];
    input=0; dead=false; ${done}
    document.getElementById('sim-lvl').textContent='Level: 1';
    msg.textContent='Watch the pattern…';
    setTimeout(playSeq, 400);
  }
  document.getElementById('sim-start').onclick=start;
})();
</script>`,
    },
    {
      path: "/number-guessing-game.html",
      file: "number-guessing-game.html",
      category: "games",
      title: "Number Guessing Game — 1 to 100",
      desc: "Guess the secret number between 1 and 100. The game tells you higher or lower until you win.",
      card: "Number guessing game",
      cardDesc: "Higher or lower from 1–100.",
      body: `<h1>Number guessing game</h1>${ad}
<div class="tool-panel">
<label for="ng">Your guess (1–100)</label>
<input id="ng" type="number" min="1" max="100" inputmode="numeric" />
<button type="button" class="primary" id="ng-go">Guess</button>
<button type="button" id="ng-new">New number</button>
<p id="ng-msg" class="tool-feedback" role="status"></p>
<p id="ng-tries" class="prose" style="font-size:0.85rem"></p>
</div>
<script>
(function(){
  let secret, tries, over;
  const msg=document.getElementById('ng-msg');
  function reset(){
    secret=Math.floor(Math.random()*100)+1;
    tries=0; over=false;
    msg.textContent='I picked a number from 1 to 100.';
    document.getElementById('ng-tries').textContent='';
    document.getElementById('ng').value='';
  }
  document.getElementById('ng-go').onclick=function(){
    if(over) return;
    const n=Number(document.getElementById('ng').value);
    if(!Number.isInteger(n)||n<1||n>100){ msg.textContent='Enter a whole number from 1 to 100.'; return; }
    tries++; ${done}
    if(n===secret){ over=true; msg.textContent='Correct! It was '+secret+' in '+tries+' tries.'; }
    else msg.textContent=n<secret?'Higher.':'Lower.';
    document.getElementById('ng-tries').textContent='Guesses: '+tries;
  };
  document.getElementById('ng-new').onclick=reset;
  reset();
})();
</script>`,
    },
    {
      path: "/pong-game.html",
      file: "pong-game.html",
      category: "games",
      title: "Pong Game — Play Classic Arcade Online",
      desc: "Classic pong in your browser. Move your paddle with the mouse or arrow keys and beat the computer.",
      card: "Pong game",
      cardDesc: "Arcade pong vs simple AI.",
      body: `<h1>Pong game</h1>${ad}
<div class="tool-panel">
<p id="pg-score">You 0 – 0 CPU</p>
<canvas id="pg" width="480" height="320" style="display:block;max-width:100%;background:#111;border-radius:10px;touch-action:none"></canvas>
<button type="button" class="primary" id="pg-new">Reset score</button>
</div>
<script>
(function(){
  const c=document.getElementById('pg'); const ctx=c.getContext('2d');
  let py=125, cy=125, ball, pw=10, ph=70, score=[0,0], started;
  function serve(toRight){
    ball={x:c.width/2,y:c.height/2,vx:(toRight?1:-1)*4,vy:(Math.random()>0.5?1:-1)*3};
  }
  function draw(){
    ctx.fillStyle='#111'; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle='#e8d4f8'; ctx.fillRect(8,py,pw,ph);
    ctx.fillStyle='#fbbf24'; ctx.fillRect(c.width-18,cy,pw,ph);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,8,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
    document.getElementById('pg-score').textContent='You '+score[0]+' – '+score[1]+' CPU';
  }
  function loop(){
    cy+=(ball.y-cy-ph/2)*0.09;
    cy=Math.max(0,Math.min(c.height-ph,cy));
    ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.y<8||ball.y>c.height-8) ball.vy*=-1;
    if(ball.x<26&&ball.y>py&&ball.y<py+ph){
      ball.vx=Math.abs(ball.vx)*1.04;
      ball.x=26;
      if(!started){ started=true; ${done} }
    }
    if(ball.x>c.width-26&&ball.y>cy&&ball.y<cy+ph){
      ball.vx=-Math.abs(ball.vx)*1.04;
      ball.x=c.width-26;
    }
    if(ball.x<0){ score[1]++; serve(true); }
    if(ball.x>c.width){ score[0]++; serve(false); }
    draw();
    requestAnimationFrame(loop);
  }
  c.addEventListener('mousemove',function(e){
    const r=c.getBoundingClientRect();
    py=(e.clientY-r.top)*(c.height/r.height)-ph/2;
    py=Math.max(0,Math.min(c.height-ph,py));
  });
  c.addEventListener('touchmove',function(e){
    const t=e.touches[0]; const r=c.getBoundingClientRect();
    py=(t.clientY-r.top)*(c.height/r.height)-ph/2;
    py=Math.max(0,Math.min(c.height-ph,py));
  },{passive:true});
  document.getElementById('pg-new').onclick=function(){ score=[0,0]; serve(Math.random()>0.5); };
  serve(true);
  loop();
})();
</script>`,
    },
    {
      path: "/brick-breaker-game.html",
      file: "brick-breaker-game.html",
      category: "games",
      title: "Brick Breaker Game — Breakout Online",
      desc: "Break all the bricks with the ball. Move the paddle with mouse or touch. Free breakout-style arcade game.",
      card: "Brick breaker",
      cardDesc: "Breakout arcade with mouse or touch.",
      body: `<h1>Brick breaker game</h1>${ad}
<div class="tool-panel">
<p id="bb-msg">Click or tap to launch</p>
<canvas id="bb" width="420" height="520" style="display:block;max-width:100%;background:#0f172a;border-radius:10px;touch-action:none"></canvas>
<button type="button" class="primary" id="bb-new">New level</button>
</div>
<script>
(function(){
  const c=document.getElementById('bb'); const ctx=c.getContext('2d');
  const W=c.width, H=c.height, bw=52, bh=18, rows=5, cols=7;
  let bricks, px, ball, vx, vy, live, started;
  const msg=document.getElementById('bb-msg');
  function reset(){
    bricks=[];
    for(let r=0;r<rows;r++) for(let col=0;col<cols;col++)
      bricks.push({x:14+col*(bw+6),y:50+r*(bh+6),w:bw,h:bh,hit:false});
    px=W/2-40; ball={x:W/2,y:H-50}; vx=0; vy=0; live=true; started=false;
    msg.textContent='Move paddle, then click to launch.';
  }
  function draw(){
    ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
    bricks.forEach(function(b){
      if(b.hit) return;
      ctx.fillStyle='#a855f7'; ctx.fillRect(b.x,b.y,b.w,b.h);
    });
    ctx.fillStyle='#e2e8f0'; ctx.fillRect(px,H-28,80,12);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,8,0,Math.PI*2); ctx.fillStyle='#f8fafc'; ctx.fill();
  }
  function step(){
    if(vx||vy){
      ball.x+=vx; ball.y+=vy;
      if(ball.x<8||ball.x>W-8) vx*=-1;
      if(ball.y<8) vy*=-1;
      if(ball.y>H-36&&ball.x>px&&ball.x<px+80){
        vy=-Math.abs(vy);
        vx+=(ball.x-(px+40))*0.08;
        if(!started){ started=true; ${done} }
      }
      if(live&&ball.y>H){ live=false; vx=0; vy=0; msg.textContent='Ball lost — press New level.'; }
      bricks.forEach(function(b){
        if(b.hit) return;
        if(ball.x>b.x&&ball.x<b.x+b.w&&ball.y>b.y&&ball.y<b.y+b.h){
          b.hit=true; vy*=-1;
        }
      });
      if(live&&bricks.every(b=>b.hit)){ live=false; vx=0; vy=0; msg.textContent='You cleared the bricks!'; }
    }
    draw();
    requestAnimationFrame(step);
  }
  function setPaddle(clientX){
    const r=c.getBoundingClientRect();
    px=(clientX-r.left)*(W/r.width)-40;
    px=Math.max(0,Math.min(W-80,px));
  }
  c.addEventListener('mousemove',function(e){ setPaddle(e.clientX); });
  c.addEventListener('touchmove',function(e){ setPaddle(e.touches[0].clientX); },{passive:true});
  c.addEventListener('click',function(){
    if(!live) return;
    if(!vx&&!vy){ vx=3*(Math.random()>0.5?1:-1); vy=-4; msg.textContent=''; }
  });
  document.getElementById('bb-new').onclick=reset;
  reset(); step();
})();
</script>`,
    },
    {
      path: "/flappy-bird-game.html",
      file: "flappy-bird-game.html",
      category: "games",
      title: "Flappy Bird Game — Tap to Fly Online",
      desc: "Tap or press space to fly between pipes. How far can you get in this free Flappy Bird-style game?",
      card: "Flappy Bird game",
      cardDesc: "Tap to dodge the pipes.",
      body: `<h1>Flappy Bird game</h1>${ad}
<div class="tool-panel">
<p id="fb-score">Score: 0</p>
<canvas id="fb" width="360" height="540" style="display:block;max-width:100%;background:#7dd3fc;border-radius:10px;touch-action:none"></canvas>
<button type="button" class="primary" id="fb-new">Restart</button>
<p class="prose" style="font-size:0.85rem">Space, click or tap to flap.</p>
</div>
<script>
(function(){
  const c=document.getElementById('fb'); const ctx=c.getContext('2d');
  const bx=70, br=14, pipeW=52, gapH=120;
  let bird, pipes, score, alive, started, frame;
  function reset(){
    bird={y:200,vy:0}; pipes=[]; score=0; alive=true; started=false; frame=0;
    document.getElementById('fb-score').textContent='Score: 0';
  }
  function flap(){
    if(!alive) return;
    if(!started){ started=true; ${done} }
    bird.vy=-6;
  }
  function pipeHit(p){
    if(bx+br<=p.x||bx-br>=p.x+pipeW) return false;
    if(bird.y-br>=p.gap&&bird.y+br<=p.gap+gapH) return false;
    return true;
  }
  function draw(){
    ctx.fillStyle='#7dd3fc'; ctx.fillRect(0,0,c.width,c.height);
    pipes.forEach(function(p){
      ctx.fillStyle='#22c55e';
      ctx.fillRect(p.x,0,pipeW,p.gap);
      ctx.fillRect(p.x,p.gap+gapH,pipeW,c.height);
    });
    ctx.fillStyle='#facc15'; ctx.beginPath(); ctx.arc(bx,bird.y,br,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.fillRect(bx+8,bird.y-3,8,6);
  }
  function step(){
    if(!alive){ draw(); requestAnimationFrame(step); return; }
    frame++;
    bird.vy+=0.35; bird.y+=bird.vy;
    if(frame%95===0){
      const top=70+Math.random()*(c.height-gapH-140);
      pipes.push({x:c.width,gap:top,scored:false});
    }
    pipes.forEach(function(p){ p.x-=2.5; });
    pipes.forEach(function(p){
      if(pipeHit(p)) alive=false;
      if(!p.scored&&p.x+pipeW<bx-br){
        p.scored=true; score++; document.getElementById('fb-score').textContent='Score: '+score;
      }
    });
    pipes=pipes.filter(function(p){ return p.x>-pipeW; });
    if(bird.y>c.height-br||bird.y<br) alive=false;
    draw();
    requestAnimationFrame(step);
  }
  c.addEventListener('click',flap);
  c.addEventListener('touchstart',function(e){ e.preventDefault(); flap(); },{passive:false});
  document.addEventListener('keydown',function(e){ if(e.code==='Space'){ e.preventDefault(); flap(); } });
  document.getElementById('fb-new').onclick=function(){ reset(); };
  reset(); step();
})();
</script>`,
    },
  ];
}