/** Batch 36: high-search tools that were not already on the site. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch36Tools(ad) {
  return [
    {
      path: "/percentile-calculator.html",
      file: "percentile-calculator.html",
      category: "student",
      title: "Percentile Calculator — Rank from Scores Below You",
      desc: "Calculate a percentile from how many candidates scored equal to or below you and how many wrote the exam. This is the rank-style percentile used for competitive results.",
      card: "Percentile calculator",
      cardDesc: "Exam percentile from scores below you.",
      body: `<h1>Percentile calculator</h1>${ad}
<div class="tool-panel">
<label for="below">Candidates who scored equal to or below you</label><input id="below" type="number" min="1" value="80000" />
<label for="total">Total candidates</label><input id="total" type="number" min="1" value="100000" />
<button type="button" class="primary" id="go">Calculate percentile</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Percentile = 100 × (candidates with a raw score less than or equal to yours) ÷ total candidates. A percentage of marks is a different number.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const below=Number(document.getElementById('below').value);
  const total=Number(document.getElementById('total').value);
  if(!(below>=0)||!(total>0)||below>total){ document.getElementById('out').textContent='The first number cannot be larger than the total.'; return; }
  const p=100*below/total;
  document.getElementById('out').textContent=p.toFixed(4)+' percentile · about '+(total-below).toLocaleString('en-IN')+' candidates scored above you';
  ${done}
};
</script>`,
    },
    {
      path: "/nsc-calculator.html",
      file: "nsc-calculator.html",
      category: "india",
      title: "NSC Calculator — National Savings Certificate Maturity",
      desc: "Estimate National Savings Certificate maturity. Interest compounds yearly and is paid at the end of the term. The default rate is 7.7% for October–December 2026.",
      card: "NSC calculator",
      cardDesc: "5-year National Savings Certificate maturity.",
      body: `<h1>NSC calculator</h1>${ad}
<div class="tool-panel">
<label for="amount">Amount invested (₹)</label><input id="amount" type="number" min="1000" step="1" value="10000" />
<label for="rate">Annual rate (%)</label><input id="rate" type="number" min="0" step="0.01" value="7.7" />
<label for="years">Years</label><input id="years" type="number" min="1" max="10" value="5" />
<button type="button" class="primary" id="go">Estimate maturity</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">NSC (VIII Issue) is a 5-year certificate. Interest compounds once a year and is paid with the principal at maturity. 7.7% is the rate notified for 1 October–31 December 2026. A certificate keeps the rate of the quarter you buy it.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('amount').value);
  const r=Number(document.getElementById('rate').value)/100;
  const y=Number(document.getElementById('years').value);
  if(!(p>0)||!(r>=0)||!(y>=1)){ document.getElementById('out').textContent='Enter an amount, a rate and the years.'; return; }
  const maturity=p*Math.pow(1+r,y);
  const inr=function(n){return '₹'+Math.round(n).toLocaleString('en-IN');};
  document.getElementById('out').textContent='Maturity '+inr(maturity)+' · invested '+inr(p)+' · interest '+inr(maturity-p);
  ${done}
};
</script>`,
    },
    {
      path: "/scss-calculator.html",
      file: "scss-calculator.html",
      category: "india",
      title: "SCSS Calculator — Senior Citizen Savings Scheme Interest",
      desc: "Estimate the quarterly interest from a Senior Citizen Savings Scheme deposit. Interest is paid out each quarter and is not compounded. Default rate 8.2% for October–December 2026.",
      card: "SCSS calculator",
      cardDesc: "Quarterly interest on a senior citizen deposit.",
      body: `<h1>SCSS calculator</h1>${ad}
<div class="tool-panel">
<label for="amount">Deposit (₹)</label><input id="amount" type="number" min="1000" step="1" value="100000" />
<label for="rate">Annual rate (%)</label><input id="rate" type="number" min="0" step="0.01" value="8.2" />
<label for="years">Years</label><input id="years" type="number" min="1" max="8" value="5" />
<button type="button" class="primary" id="go">Calculate interest</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">SCSS pays interest every quarter. It is not added back to the deposit, so the quarterly amount stays the same. 8.2% is the rate notified for 1 October–31 December 2026. The scheme is for people aged 60 and above, with a lower age in some retirement cases. The maximum deposit is set by the scheme rules.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('amount').value);
  const r=Number(document.getElementById('rate').value)/100;
  const y=Number(document.getElementById('years').value);
  if(!(p>0)||!(r>=0)||!(y>=1)){ document.getElementById('out').textContent='Enter a deposit, a rate and the years.'; return; }
  const quarter=p*r/4;
  const total=quarter*4*y;
  const inr=function(n){return '₹'+Math.round(n).toLocaleString('en-IN');};
  document.getElementById('out').textContent='Quarterly interest '+inr(quarter)+' · interest over '+y+' years '+inr(total)+' · principal returned '+inr(p);
  ${done}
};
</script>`,
    },
    {
      path: "/home-loan-eligibility-calculator.html",
      file: "home-loan-eligibility-calculator.html",
      category: "india",
      title: "Home Loan Eligibility Calculator — How Much You Can Borrow",
      desc: "Estimate a home-loan amount from monthly income, existing EMIs, interest rate and tenure. Uses a 50% income share for all EMIs. A bank’s sanction can differ.",
      card: "Home loan eligibility",
      cardDesc: "Loan amount from income and existing EMIs.",
      body: `<h1>Home loan eligibility calculator</h1>${ad}
<div class="tool-panel">
<label for="income">Net monthly income (₹)</label><input id="income" type="number" min="0" value="80000" />
<label for="existing">Existing EMIs (₹ / month)</label><input id="existing" type="number" min="0" value="5000" />
<label for="foir">Share of income that can go to EMIs (%)</label><input id="foir" type="number" min="1" max="80" value="50" />
<label for="rate">Interest rate (% per year)</label><input id="rate" type="number" min="0" step="0.01" value="8.5" />
<label for="years">Tenure (years)</label><input id="years" type="number" min="1" max="30" value="20" />
<button type="button" class="primary" id="go">Estimate eligibility</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Many lenders cap all EMIs at about half of net income. Your bank also looks at age, credit score, employer and the property. This is not a sanction.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const income=Number(document.getElementById('income').value);
  const existing=Number(document.getElementById('existing').value)||0;
  const foir=Number(document.getElementById('foir').value);
  const annual=Number(document.getElementById('rate').value);
  const years=Number(document.getElementById('years').value);
  if(!(income>0)||!(foir>0)||!(years>=1)||!(annual>=0)){ document.getElementById('out').textContent='Enter income, rate and tenure.'; return; }
  const emi=income*foir/100-existing;
  const inr=function(n){return '₹'+Math.round(n).toLocaleString('en-IN');};
  if(emi<=0){ document.getElementById('out').textContent='Existing EMIs already use the share of income set above.'; return; }
  const r=annual/12/100;
  const n=Math.round(years*12);
  const loan=r===0?emi*n:emi*(1-Math.pow(1+r,-n))/r;
  document.getElementById('out').textContent='Estimated loan '+inr(loan)+' · maximum new EMI '+inr(emi)+' for '+n+' months';
  ${done}
};
</script>`,
    },
    {
      path: "/brokerage-calculator.html",
      file: "brokerage-calculator.html",
      category: "india",
      title: "Brokerage Calculator — Stock Profit After Charges",
      desc: "Estimate delivery-trade profit after a flat brokerage per order and STT. Defaults are ₹20 an order and 0.1% STT. Change both if your broker or the tax rule differs.",
      card: "Brokerage calculator",
      cardDesc: "Buy, sell, brokerage and STT.",
      body: `<h1>Brokerage calculator</h1>${ad}
<div class="tool-panel">
<label for="buy">Buy price (₹)</label><input id="buy" type="number" min="0" step="0.01" value="100" />
<label for="sell">Sell price (₹)</label><input id="sell" type="number" min="0" step="0.01" value="110" />
<label for="qty">Quantity</label><input id="qty" type="number" min="1" value="100" />
<label for="brok">Brokerage per order (₹)</label><input id="brok" type="number" min="0" step="0.01" value="20" />
<label for="stt">STT on buy and on sell (%)</label><input id="stt" type="number" min="0" step="0.001" value="0.1" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Two orders are charged: one buy and one sell. Exchange fees, GST on brokerage, stamp duty and SEBI charges are not included. STT of 0.1% is a common delivery rate — confirm the rate in force on the trade date.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const buy=Number(document.getElementById('buy').value);
  const sell=Number(document.getElementById('sell').value);
  const qty=Number(document.getElementById('qty').value);
  const brok=Number(document.getElementById('brok').value)||0;
  const sttRate=Number(document.getElementById('stt').value)||0;
  if(!(buy>=0)||!(sell>=0)||!(qty>0)){ document.getElementById('out').textContent='Enter buy price, sell price and quantity.'; return; }
  const buyV=buy*qty, sellV=sell*qty;
  const brokerage=brok*2;
  const stt=(buyV+sellV)*sttRate/100;
  const gross=sellV-buyV;
  const net=gross-brokerage-stt;
  const inr=function(n){return (n<0?'-':'')+'₹'+Math.abs(Math.round(n)).toLocaleString('en-IN');};
  document.getElementById('out').textContent='Net '+inr(net)+' · gross '+inr(gross)+' · brokerage '+inr(brokerage)+' · STT '+inr(stt);
  ${done}
};
</script>`,
    },
    {
      path: "/budget-50-30-20.html",
      file: "budget-50-30-20.html",
      category: "calculators",
      title: "50/30/20 Budget Calculator — Needs, Wants and Savings",
      desc: "Split monthly take-home pay into 50% needs, 30% wants and 20% savings. Change the three shares if you want a different split.",
      card: "50/30/20 budget",
      cardDesc: "Needs, wants and savings from take-home pay.",
      body: `<h1>50/30/20 budget calculator</h1>${ad}
<div class="tool-panel">
<label for="income">Monthly take-home pay (₹)</label><input id="income" type="number" min="0" value="60000" />
<label for="needs">Needs (%)</label><input id="needs" type="number" min="0" max="100" value="50" />
<label for="wants">Wants (%)</label><input id="wants" type="number" min="0" max="100" value="30" />
<label for="save">Savings (%)</label><input id="save" type="number" min="0" max="100" value="20" />
<button type="button" class="primary" id="go">Split the pay</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Needs are rent, food, travel to work and bills. Wants are eating out and shopping. Savings include investments and an emergency fund. The three shares should add up to 100.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const income=Number(document.getElementById('income').value);
  const needs=Number(document.getElementById('needs').value);
  const wants=Number(document.getElementById('wants').value);
  const save=Number(document.getElementById('save').value);
  if(!(income>=0)){ document.getElementById('out').textContent='Enter take-home pay.'; return; }
  const sum=needs+wants+save;
  if(Math.abs(sum-100)>0.01){ document.getElementById('out').textContent='Needs, wants and savings must add up to 100. They add up to '+sum+'.'; return; }
  const inr=function(n){return '₹'+Math.round(income*n/100).toLocaleString('en-IN');};
  document.getElementById('out').textContent='Needs '+inr(needs)+' · wants '+inr(wants)+' · savings '+inr(save);
  ${done}
};
</script>`,
    },
    {
      path: "/border-radius-generator.html",
      file: "border-radius-generator.html",
      category: "design",
      title: "CSS Border Radius Generator — Rounded Corners",
      desc: "Set each corner in pixels, preview the box, and copy the border-radius CSS. One value rounds all four corners.",
      card: "Border radius generator",
      cardDesc: "Rounded corners with a CSS preview.",
      body: `<h1>CSS border radius generator</h1>${ad}
<div class="tool-panel">
<label><input id="link" type="checkbox" checked /> Use one value for every corner</label>
<label for="all">All corners (px)</label><input id="all" type="number" min="0" value="16" />
<label for="tl">Top left (px)</label><input id="tl" type="number" min="0" value="16" />
<label for="tr">Top right (px)</label><input id="tr" type="number" min="0" value="16" />
<label for="br">Bottom right (px)</label><input id="br" type="number" min="0" value="16" />
<label for="bl">Bottom left (px)</label><input id="bl" type="number" min="0" value="16" />
<div id="preview" style="margin:1rem 0;height:96px;background:#720e9e"></div>
<label for="css">CSS</label><input id="css" type="text" readonly spellcheck="false" />
<button type="button" class="primary" id="copy">Copy CSS</button>
</div>
<script>
function num(id){ return Math.max(0, Number(document.getElementById(id).value)||0); }
function paint(){
  const linked=document.getElementById('link').checked;
  const a=num('all');
  const tl=linked?a:num('tl'), tr=linked?a:num('tr'), br=linked?a:num('br'), bl=linked?a:num('bl');
  const css=tl+'px '+tr+'px '+br+'px '+bl+'px';
  document.getElementById('preview').style.borderRadius=css;
  document.getElementById('css').value='border-radius: '+css+';';
}
['link','all','tl','tr','br','bl'].forEach(function(id){
  document.getElementById(id).addEventListener('input', function(){ paint(); ${done} });
});
document.getElementById('copy').onclick=function(){ navigator.clipboard.writeText(document.getElementById('css').value); };
paint();
</script>`,
    },
    {
      path: "/yes-or-no.html",
      file: "yes-or-no.html",
      category: "productivity",
      title: "Yes or No Generator — A Random Answer",
      desc: "Get a random yes or no. Each click is a fresh coin flip in your browser. It is a decision toy, not advice.",
      card: "Yes or no",
      cardDesc: "A random yes or no.",
      body: `<h1>Yes or no</h1>${ad}
<div class="tool-panel">
<p class="speed-num" id="answer">?</p>
<button type="button" class="primary" id="go">Ask</button>
<p class="tool-hint">Yes and no are equally likely. Ask again for a new answer.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const buf=new Uint32Array(1);
  crypto.getRandomValues(buf);
  document.getElementById('answer').textContent=buf[0]%2===0?'Yes':'No';
  ${done}
};
</script>`,
    },
    {
      path: "/username-generator.html",
      file: "username-generator.html",
      category: "writing",
      title: "Username Generator — Ideas from Your Name",
      desc: "Turn a name into username ideas with dots, underscores and numbers. Nothing is checked against Instagram, Gmail or any other site.",
      card: "Username generator",
      cardDesc: "Username ideas from a name.",
      body: `<h1>Username generator</h1>${ad}
<div class="tool-panel">
<label for="name">Name</label><input id="name" type="text" value="Ankit Sah" maxlength="40" autocomplete="off" />
<button type="button" class="primary" id="go">Generate usernames</button>
<pre id="out" class="tool-hint"></pre>
<p class="tool-hint">These are spelling ideas only. A site may already have taken them.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const raw=document.getElementById('name').value.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
  const parts=raw.split(/\\s+/).filter(Boolean);
  if(!parts.length){ document.getElementById('out').textContent='Type a name.'; return; }
  const joined=parts.join('');
  const dot=parts.join('.');
  const under=parts.join('_');
  const buf=new Uint32Array(2);
  crypto.getRandomValues(buf);
  const n1=100+buf[0]%900;
  const n2=10+buf[1]%90;
  const year=new Date().getFullYear();
  const list=[joined, dot, under, joined+n1, dot+n2, parts[0]+year, parts[0]+'_'+parts[parts.length-1], parts[0][0]+parts[parts.length-1]];
  const seen={};
  document.getElementById('out').textContent=list.filter(function(u){ if(!u||seen[u]) return false; seen[u]=1; return true; }).join('\\n');
  ${done}
};
</script>`,
    },
  ];
}
