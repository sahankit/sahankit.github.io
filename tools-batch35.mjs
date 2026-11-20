/** Batch 35: tools that were not already on the site. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch35Tools(ad) {
  return [
    {
      path: "/box-shadow-generator.html",
      file: "box-shadow-generator.html",
      category: "design",
      title: "CSS Box Shadow Generator — Preview and Copy",
      desc: "Build a CSS box-shadow with offset, blur, spread, colour and inset, then copy the declaration. The preview updates in the browser.",
      card: "Box shadow generator",
      cardDesc: "Preview a CSS box-shadow and copy it.",
      body: `<h1>CSS box shadow generator</h1>${ad}
<div class="tool-panel">
<label for="x">Horizontal offset (px)</label><input id="x" type="number" value="0" />
<label for="y">Vertical offset (px)</label><input id="y" type="number" value="8" />
<label for="blur">Blur (px)</label><input id="blur" type="number" min="0" value="24" />
<label for="spread">Spread (px)</label><input id="spread" type="number" value="0" />
<label for="color">Colour</label><input id="color" type="color" value="#720e9e" />
<label for="alpha">Opacity (%)</label><input id="alpha" type="number" min="0" max="100" value="25" />
<label><input id="inset" type="checkbox" /> Inset</label>
<div id="preview" style="margin:1rem 0;height:88px;border-radius:12px;background:#fff"></div>
<label for="css">CSS</label><input id="css" type="text" readonly spellcheck="false" />
<button type="button" class="primary" id="copy">Copy CSS</button>
</div>
<script>
function hexToRgb(hex){
  const n=parseInt(hex.slice(1),16);
  return [(n>>16)&255,(n>>8)&255,n&255];
}
function paint(){
  const x=Number(document.getElementById('x').value)||0;
  const y=Number(document.getElementById('y').value)||0;
  const blur=Math.max(0,Number(document.getElementById('blur').value)||0);
  const spread=Number(document.getElementById('spread').value)||0;
  const rgb=hexToRgb(document.getElementById('color').value);
  const a=Math.min(100,Math.max(0,Number(document.getElementById('alpha').value)||0))/100;
  const inset=document.getElementById('inset').checked?'inset ':'';
  const css=inset+x+'px '+y+'px '+blur+'px '+spread+'px rgba('+rgb.join(',')+','+a+')';
  document.getElementById('preview').style.boxShadow=css;
  document.getElementById('css').value='box-shadow: '+css+';';
}
['x','y','blur','spread','color','alpha','inset'].forEach(function(id){
  document.getElementById(id).addEventListener('input', function(){ paint(); ${done} });
});
document.getElementById('copy').onclick=function(){ navigator.clipboard.writeText(document.getElementById('css').value); };
paint();
</script>`,
    },
    {
      path: "/leap-year-checker.html",
      file: "leap-year-checker.html",
      category: "productivity",
      title: "Leap Year Checker — Is This Year a Leap Year?",
      desc: "Check whether a year is a leap year. A year is a leap year when it is divisible by 4, except century years, which must be divisible by 400.",
      card: "Leap year checker",
      cardDesc: "See if a year has 366 days.",
      body: `<h1>Leap year checker</h1>${ad}
<div class="tool-panel">
<label for="year">Year</label><input id="year" type="number" min="1" value="2028" />
<button type="button" class="primary" id="go">Check year</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const y=Number(document.getElementById('year').value);
  if(!Number.isInteger(y)||y<1){ document.getElementById('out').textContent='Enter a whole year.'; return; }
  const leap=(y%4===0 && y%100!==0) || y%400===0;
  document.getElementById('out').textContent=y+(leap?' is a leap year (366 days).':' is not a leap year (365 days).');
  ${done}
};
</script>`,
    },
    {
      path: "/age-difference-calculator.html",
      file: "age-difference-calculator.html",
      category: "productivity",
      title: "Age Difference Calculator — Years, Months and Days",
      desc: "Find the exact gap between two dates in years, months and days, plus the total number of days.",
      card: "Age difference calculator",
      cardDesc: "Years, months and days between two dates.",
      body: `<h1>Age difference calculator</h1>${ad}
<div class="tool-panel">
<label for="a">First date</label><input id="a" type="date" value="1998-04-12" />
<label for="b">Second date</label><input id="b" type="date" value="2003-11-02" />
<button type="button" class="primary" id="go">Find the difference</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  let d1=new Date(document.getElementById('a').value+'T00:00:00');
  let d2=new Date(document.getElementById('b').value+'T00:00:00');
  if(isNaN(d1.getTime())||isNaN(d2.getTime())){ document.getElementById('out').textContent='Pick both dates.'; return; }
  if(d1>d2){ const t=d1; d1=d2; d2=t; }
  let years=d2.getFullYear()-d1.getFullYear();
  let months=d2.getMonth()-d1.getMonth();
  let days=d2.getDate()-d1.getDate();
  if(days<0){ months--; const prev=new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); days+=prev; }
  if(months<0){ years--; months+=12; }
  const total=Math.round((d2-d1)/86400000);
  document.getElementById('out').textContent=years+' years, '+months+' months, '+days+' days · '+total.toLocaleString('en-IN')+' days in total';
  ${done}
};
</script>`,
    },
    {
      path: "/notice-period-calculator.html",
      file: "notice-period-calculator.html",
      category: "india",
      title: "Notice Period Calculator — Last Working Day",
      desc: "Enter your resignation date and notice length to get the last working day. An estimate for planning. Your appointment letter decides the real date.",
      card: "Notice period calculator",
      cardDesc: "Last working day from a resignation date.",
      body: `<h1>Notice period calculator</h1>${ad}
<div class="tool-panel">
<label for="start">Resignation date</label><input id="start" type="date" />
<label for="days">Notice period (days)</label><input id="days" type="number" min="1" value="30" />
<button type="button" class="primary" id="go">Find last day</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Counts calendar days, including weekends. If notice starts on the resignation date, day 1 is that date. Employers sometimes start the count the next day — check the letter.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const start=new Date(document.getElementById('start').value+'T00:00:00');
  const days=Number(document.getElementById('days').value);
  if(isNaN(start.getTime())||!(days>=1)){ document.getElementById('out').textContent='Pick a date and a notice length.'; return; }
  const end=new Date(start.getTime());
  end.setDate(end.getDate()+Math.floor(days)-1);
  const fmt=function(d){return d.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});};
  document.getElementById('out').textContent='Last working day: '+fmt(end)+' ('+Math.floor(days)+' calendar days from '+fmt(start)+').';
  ${done}
};
(function(){
  const t=new Date();
  document.getElementById('start').value=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
})();
</script>`,
    },
    {
      path: "/business-days-calculator.html",
      file: "business-days-calculator.html",
      category: "productivity",
      title: "Business Days Calculator — Weekdays Between Two Dates",
      desc: "Count Monday-to-Friday days between two dates. Weekends are skipped. Public holidays are not, unless you subtract them yourself.",
      card: "Business days calculator",
      cardDesc: "Weekdays between two dates.",
      body: `<h1>Business days calculator</h1>${ad}
<div class="tool-panel">
<label for="a">Start date</label><input id="a" type="date" value="2026-01-01" />
<label for="b">End date</label><input id="b" type="date" value="2026-01-31" />
<button type="button" class="primary" id="go">Count weekdays</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  let d1=new Date(document.getElementById('a').value+'T00:00:00');
  let d2=new Date(document.getElementById('b').value+'T00:00:00');
  if(isNaN(d1.getTime())||isNaN(d2.getTime())){ document.getElementById('out').textContent='Pick both dates.'; return; }
  if(d1>d2){ const t=d1; d1=d2; d2=t; }
  let n=0, cur=new Date(d1.getTime());
  while(cur<=d2){
    const day=cur.getDay();
    if(day!==0 && day!==6) n++;
    cur.setDate(cur.getDate()+1);
  }
  const total=Math.round((d2-d1)/86400000)+1;
  document.getElementById('out').textContent=n+' weekdays · '+total+' calendar days, including both dates';
  ${done}
};
</script>`,
    },
    {
      path: "/data-usage-calculator.html",
      file: "data-usage-calculator.html",
      category: "calculators",
      title: "Data Usage Calculator — How Long a Data Plan Lasts",
      desc: "See the daily data you have left from a plan, and how many days the remaining data lasts at your current pace.",
      card: "Data usage calculator",
      cardDesc: "Daily data left in a mobile plan.",
      body: `<h1>Data usage calculator</h1>${ad}
<div class="tool-panel">
<label for="plan">Plan size (GB)</label><input id="plan" type="number" min="0" step="0.1" value="2" />
<label for="used">Data already used (GB)</label><input id="used" type="number" min="0" step="0.1" value="0.8" />
<label for="cycle">Days in the billing cycle</label><input id="cycle" type="number" min="1" value="28" />
<label for="elapsed">Days already passed</label><input id="elapsed" type="number" min="0" value="10" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const plan=Number(document.getElementById('plan').value);
  const used=Number(document.getElementById('used').value);
  const cycle=Number(document.getElementById('cycle').value);
  const elapsed=Number(document.getElementById('elapsed').value);
  if(!(plan>=0)||!(used>=0)||!(cycle>=1)||!(elapsed>=0)||elapsed>cycle){ document.getElementById('out').textContent='Check the plan, usage and days.'; return; }
  const leftGb=Math.max(0, plan-used);
  const daysLeft=Math.max(1, cycle-elapsed);
  const perDay=leftGb/daysLeft;
  const pace=elapsed>0?used/elapsed:0;
  const lasts=pace>0?leftGb/pace:Infinity;
  const lastsText=lasts===Infinity?'no usage yet':(lasts>=daysLeft?'the rest of the cycle':lasts.toFixed(1)+' days at this pace');
  document.getElementById('out').textContent=leftGb.toFixed(2)+' GB left · '+perDay.toFixed(2)+' GB per remaining day · lasts '+lastsText;
  ${done}
};
</script>`,
    },
    {
      path: "/dpi-calculator.html",
      file: "dpi-calculator.html",
      category: "design",
      title: "DPI Calculator — Pixels, Inches and Resolution",
      desc: "Convert pixel width and print size into DPI, or turn inches and DPI into a pixel size. Useful for photos, posters and passport-size prints.",
      card: "DPI calculator",
      cardDesc: "Pixels, inches and dots per inch.",
      body: `<h1>DPI calculator</h1>${ad}
<div class="tool-panel">
<label for="px">Width (pixels)</label><input id="px" type="number" min="1" value="1200" />
<label for="inch">Width (inches)</label><input id="inch" type="number" min="0.01" step="0.01" value="4" />
<label for="dpi">DPI</label><input id="dpi" type="number" min="1" value="300" />
<button type="button" class="primary" id="fromSize">DPI from pixels and inches</button>
<button type="button" class="secondary" id="fromDpi">Pixels from inches and DPI</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">300 DPI is a common print target. Screens are often about 72–150 DPI. Passport photos are usually asked for in pixels or in millimetres, not DPI alone.</p>
</div>
<script>
document.getElementById('fromSize').onclick=function(){
  const px=Number(document.getElementById('px').value);
  const inch=Number(document.getElementById('inch').value);
  if(!(px>0)||!(inch>0)){ document.getElementById('out').textContent='Enter pixels and inches.'; return; }
  const dpi=px/inch;
  document.getElementById('dpi').value=String(Math.round(dpi));
  document.getElementById('out').textContent=Math.round(dpi)+' DPI · '+(inch*25.4).toFixed(1)+' mm wide';
  ${done}
};
document.getElementById('fromDpi').onclick=function(){
  const inch=Number(document.getElementById('inch').value);
  const dpi=Number(document.getElementById('dpi').value);
  if(!(inch>0)||!(dpi>0)){ document.getElementById('out').textContent='Enter inches and DPI.'; return; }
  const px=Math.round(inch*dpi);
  document.getElementById('px').value=String(px);
  document.getElementById('out').textContent=px+' pixels wide';
  ${done}
};
</script>`,
    },
    {
      path: "/team-generator.html",
      file: "team-generator.html",
      category: "productivity",
      title: "Random Team Generator — Split a List into Groups",
      desc: "Paste one name per line and split the list into random teams of equal size, as far as the count allows. Shuffled in the browser.",
      card: "Random team generator",
      cardDesc: "Split a name list into random groups.",
      body: `<h1>Random team generator</h1>${ad}
<div class="tool-panel">
<label for="names">Names, one per line</label><textarea id="names" rows="8">Asha
Rahul
Meera
Imran
Priya
Kabir</textarea>
<label for="teams">Number of teams</label><input id="teams" type="number" min="2" value="2" />
<button type="button" class="primary" id="go">Make teams</button>
<pre id="out" class="tool-hint"></pre>
</div>
<script>
document.getElementById('go').onclick=function(){
  const names=document.getElementById('names').value.split(/\\n/).map(function(s){return s.trim();}).filter(Boolean);
  const teams=Math.floor(Number(document.getElementById('teams').value));
  if(names.length<2||!(teams>=2)||teams>names.length){ document.getElementById('out').textContent='Need at least two names, and fewer teams than names.'; return; }
  for(let i=names.length-1;i>0;i--){
    const buf=new Uint32Array(1); crypto.getRandomValues(buf);
    const j=buf[0]%(i+1);
    const tmp=names[i]; names[i]=names[j]; names[j]=tmp;
  }
  const groups=Array.from({length:teams}, function(){return [];});
  names.forEach(function(name,i){ groups[i%teams].push(name); });
  document.getElementById('out').textContent=groups.map(function(g,i){return 'Team '+(i+1)+': '+g.join(', ');}).join('\\n');
  ${done}
};
</script>`,
    },
    {
      path: "/meta-length-checker.html",
      file: "meta-length-checker.html",
      category: "seo",
      title: "Title and Meta Description Length Checker",
      desc: "Count characters in a title and a meta description and see whether they fit the length Google usually shows in search results.",
      card: "Meta length checker",
      cardDesc: "Title and description character counts.",
      body: `<h1>Title and meta description length</h1>${ad}
<div class="tool-panel">
<label for="title">Title</label><input id="title" type="text" value="GST Calculator India — Add or Remove GST" />
<label for="desc">Meta description</label><textarea id="desc" rows="4">Add or remove GST at 5%, 12%, 18% or 28%. See the base price and the tax. Free, in the browser.</textarea>
<button type="button" class="primary" id="go">Check length</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Google often shows about 50–60 characters of a title and about 120–160 of a description. Longer text can be cut off. These are display limits, not ranking scores.</p>
</div>
<script>
function band(n, lo, hi){ if(n<lo) return 'short'; if(n>hi) return 'long'; return 'in range'; }
document.getElementById('go').onclick=function(){
  const title=document.getElementById('title').value.trim();
  const desc=document.getElementById('desc').value.trim();
  document.getElementById('out').textContent='Title '+title.length+' characters ('+band(title.length,50,60)+' for 50–60) · description '+desc.length+' characters ('+band(desc.length,120,160)+' for 120–160)';
  ${done}
};
</script>`,
    },
  ];
}
