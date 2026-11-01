/** Batch 12 — OSINT and research helpers. */
export function batch12Tools(ad) {
  return [
    {
      path: "/osint-search.html",
      file: "osint-search.html",
      category: "seo",
      title: "OSINT Search Hub — Public Username, Domain & Dork Tools",
      desc: "Free OSINT helper: open public searches for usernames, domains, IPs, emails, and Google dorks. Browser-only link builder.",
      card: "OSINT search",
      cardDesc: "Public lookup links.",
      body: `
<h1>OSINT search hub</h1>
<p class="prose">Build links to <strong>public</strong> sources for security research, brand monitoring, and journalism. Use only on targets you are allowed to investigate. More tools on the <a href="/osint/">OSINT mini-site</a>. Sahankit does not run lookups on a server—links open third-party sites in a new tab.</p>
${ad}
<nav class="prose" aria-label="OSINT sections" style="margin:16px 0">
  <a href="#username">Username</a> ·
  <a href="#domain">Domain</a> ·
  <a href="#email">Email</a> ·
  <a href="#ip">IP</a> ·
  <a href="#dork">Google dork</a> ·
  <a href="#archive">Archive</a>
</nav>

<section id="username" class="tool-panel">
  <h2>Username search</h2>
  <p class="prose" style="font-size:0.9rem">Enter a handle or paste a profile URL (LinkedIn, GitHub, X, etc.)—we extract the username before building links.</p>
  <label for="user">Username or profile URL</label>
  <input id="user" placeholder="octocat or linkedin.com/in/yourname" autocapitalize="none" autocomplete="off" spellcheck="false" />
  <button type="button" class="primary" id="userLinks">Build links</button>
  <p id="userNorm" class="prose" style="font-size:0.85rem" hidden></p>
  <ul id="userOut" class="prose" style="list-style:none;padding:0"></ul>
</section>

<section id="domain" class="tool-panel" style="margin-top:20px">
  <h2>Domain &amp; certificate OSINT</h2>
  <label for="dom">Domain</label>
  <input id="dom" placeholder="example.com" autocapitalize="none" spellcheck="false" />
  <button type="button" class="primary" id="domLinks">Build links</button>
  <ul id="domOut" class="prose" style="list-style:none;padding:0"></ul>
</section>

<section id="email" class="tool-panel" style="margin-top:20px">
  <h2>Email (public breach index)</h2>
  <label for="email">Email address</label>
  <input id="email" type="email" placeholder="you@example.com" autocapitalize="none" />
  <button type="button" class="primary" id="emailLinks">Build links</button>
  <ul id="emailOut" class="prose" style="list-style:none;padding:0"></ul>
</section>

<section id="ip" class="tool-panel" style="margin-top:20px">
  <h2>IP address</h2>
  <label for="ip">IPv4 or IPv6</label>
  <input id="ip" placeholder="8.8.8.8" spellcheck="false" />
  <button type="button" class="primary" id="ipLinks">Build links</button>
  <ul id="ipOut" class="prose" style="list-style:none;padding:0"></ul>
</section>

<section id="dork" class="tool-panel" style="margin-top:20px">
  <h2>Google dork builder</h2>
  <label for="site">site: (optional)</label>
  <input id="site" placeholder="example.com" spellcheck="false" />
  <label for="dorkExtra">Extra operators</label>
  <input id="dorkExtra" placeholder='filetype:pdf OR intitle:"index of"' spellcheck="false" />
  <label for="dorkQ">Keywords</label>
  <input id="dorkQ" placeholder="password backup" spellcheck="false" />
  <button type="button" class="primary" id="dorkGo">Open Google search</button>
  <p id="dorkPreview" class="prose" style="font-size:0.85rem"></p>
</section>

<section id="archive" class="tool-panel" style="margin-top:20px">
  <h2>Wayback Machine</h2>
  <label for="archiveUrl">Full URL</label>
  <input id="archiveUrl" placeholder="https://example.com/" spellcheck="false" />
  <button type="button" class="primary" id="archiveGo">Open archive history</button>
</section>

<script>
function esc(s){ return encodeURIComponent(String(s).trim()); }
function li(name, href){
  const a=document.createElement('a');
  a.href=href; a.target='_blank'; a.rel='noopener noreferrer';
  a.textContent=name+' → '+href.replace(/^https:\\/\\//,'');
  const li=document.createElement('li');
  li.style.margin='8px 0';
  li.appendChild(a);
  return li;
}
function fillList(el, pairs){
  el.replaceChildren();
  for(const [n,u] of pairs) el.appendChild(li(n,u));
}

function normalizeUsername(raw){
  let s=String(raw||'').trim();
  if(!s) return '';
  s=s.replace(/^@+/,'');
  const tryUrl=(href)=>{
    try{
      const u=new URL(href);
      const host=u.hostname.replace(/^www\\./i,'').toLowerCase();
      const parts=u.pathname.split('/').filter(Boolean).map(p=>decodeURIComponent(p.split('?')[0]));
      if(host==='github.com'&&parts[0]) return parts[0].replace(/\\.git$/i,'');
      if(host==='gitlab.com'&&parts[0]) return parts[0];
      if(host==='linkedin.com'&&parts[0]==='in'&&parts[1]) return parts[1];
      if((host==='twitter.com'||host==='x.com')&&parts[0]&&parts[0]!=='i'&&parts[0]!=='intent') return parts[0];
      if(host==='reddit.com'&&parts[0]==='user'&&parts[1]) return parts[1];
      if(host==='news.ycombinator.com'){
        const id=u.searchParams.get('id');
        if(id) return id;
      }
      if(host==='keybase.io'&&parts[0]) return parts[0];
      if(parts.length) return parts[parts.length-1];
    }catch(_){}
    return '';
  };
  if(/^https?:\\/\\//i.test(s)) s=tryUrl(s)||s;
  else if(/^[a-z0-9.-]+\\//i.test(s)) s=tryUrl('https://'+s)||s;
  else s=s.replace(/^@+/,'').split('/').filter(Boolean).pop()||s;
  s=s.split('?')[0].split('#')[0].replace(/^@+/,'').trim();
  return s;
}

function pathUser(u){
  return encodeURIComponent(u).replace(/[!'()*]/g,c=>('%'+c.charCodeAt(0).toString(16).toUpperCase()));
}

document.getElementById('userLinks').onclick=()=>{
  const raw=document.getElementById('user').value.trim();
  const normEl=document.getElementById('userNorm');
  const outEl=document.getElementById('userOut');
  if(!raw){ normEl.hidden=true; outEl.replaceChildren(); return; }
  const u=normalizeUsername(raw);
  if(!u||u.includes('://')||/\\s/.test(u)){
    normEl.hidden=false;
    normEl.className='error';
    normEl.textContent='Could not extract a username. Try a handle like ankitkrsah or a profile URL.';
    outEl.replaceChildren();
    return;
  }
  normEl.hidden=false;
  normEl.className='prose';
  normEl.textContent='Using username: '+u+(raw!==u?' (from pasted URL)':'');
  const p=pathUser(u);
  fillList(outEl, [
    ['LinkedIn','https://www.linkedin.com/in/'+p+'/'],
    ['GitHub','https://github.com/'+p],
    ['GitLab','https://gitlab.com/'+p],
    ['Reddit','https://www.reddit.com/user/'+p],
    ['X (Twitter)','https://x.com/'+p],
    ['Hacker News','https://news.ycombinator.com/user?id='+esc(u)],
    ['Keybase','https://keybase.io/'+p],
    ['Pastebin search','https://www.google.com/search?q='+esc('site:pastebin.com '+u)],
    ['Google','https://www.google.com/search?q='+esc('"'+u+'" profile OR account')],
  ]);
};

document.getElementById('domLinks').onclick=()=>{
  let d=document.getElementById('dom').value.trim().replace(/^https?:\\/\\//,'').split('/')[0];
  if(!d) return;
  const e=esc(d);
  fillList(document.getElementById('domOut'), [
    ['Domain age (Sahankit)','/domain-age/?q='+e],
    ['crt.sh certificates','https://crt.sh/?q='+e],
    ['Google Public DNS','https://dns.google/query?name='+e+'&type=A'],
    ['SecurityTrails (web)','https://securitytrails.com/domain/'+e],
    ['WHOIS (who.is)','https://who.is/whois/'+e],
    ['VirusTotal domain','https://www.virustotal.com/gui/domain/'+e],
    ['Google site: search','https://www.google.com/search?q='+esc('site:'+d)],
    ['Subdomain Google dork','https://www.google.com/search?q='+esc('site:*.'+d+' -www')],
  ]);
};

document.getElementById('emailLinks').onclick=()=>{
  const m=document.getElementById('email').value.trim();
  if(!m||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(m)) {
    document.getElementById('emailOut').replaceChildren();
    const p=document.createElement('p');
    p.className='error'; p.textContent='Enter a valid email.'; 
    document.getElementById('emailOut').appendChild(p);
    return;
  }
  const e=esc(m);
  fillList(document.getElementById('emailOut'), [
    ['Have I Been Pwned','https://haveibeenpwned.com/account/'+e],
    ['Google exact email','https://www.google.com/search?q='+esc('"'+m+'"')],
    ['Hunter.io (web)','https://hunter.io/email-verifier/'+e],
  ]);
};

document.getElementById('ipLinks').onclick=()=>{
  const ip=document.getElementById('ip').value.trim();
  if(!ip) return;
  const e=esc(ip);
  fillList(document.getElementById('ipOut'), [
    ['ipinfo.io','https://ipinfo.io/'+e],
    ['BGP.he.net','https://bgp.he.net/ip/'+e],
    ['VirusTotal IP','https://www.virustotal.com/gui/ip-address/'+e],
    ['Shodan (login may be required)','https://www.shodan.io/host/'+e],
    ['AbuseIPDB (web)','https://www.abuseipdb.com/check/'+e],
  ]);
};

document.getElementById('dorkGo').onclick=()=>{
  const parts=[];
  const site=document.getElementById('site').value.trim();
  const extra=document.getElementById('dorkExtra').value.trim();
  const q=document.getElementById('dorkQ').value.trim();
  if(site) parts.push('site:'+site);
  if(extra) parts.push(extra);
  if(q) parts.push(q);
  const query=parts.join(' ').trim()||'site:example.com';
  document.getElementById('dorkPreview').textContent='Query: '+query;
  window.open('https://www.google.com/search?q='+esc(query), '_blank', 'noopener,noreferrer');
};

document.getElementById('archiveGo').onclick=()=>{
  let u=document.getElementById('archiveUrl').value.trim();
  if(!u) return;
  if(!/^https?:\\/\\//i.test(u)) u='https://'+u;
  window.open('https://web.archive.org/web/*/'+esc(u), '_blank', 'noopener,noreferrer');
};
</script>`,
    },
  ];
}
