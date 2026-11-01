/** Batch 20 — Video to MP3 (local files, ffmpeg.wasm). */

const LOCAL_NOTE = `<p class="prose" style="font-size:0.88rem;color:var(--muted)">Pick a <strong>video file on your device</strong> (MP4, WebM, MOV, etc.). Conversion runs in your browser with WebAssembly—nothing is uploaded. Does not accept YouTube or reel links; download those with official apps first if allowed.</p>`;

export function batch20Tools(ad) {
  return [
    {
      path: "/video-to-mp3.html",
      file: "video-to-mp3.html",
      category: "documents",
      title: "Video to MP3 Converter — Extract Audio Online",
      desc: "Convert a local video file to MP3 in your browser. Private WebAssembly conversion—no upload, no account.",
      card: "Video to MP3",
      cardDesc: "Local file → MP3.",
      body: `
<h1>Video to MP3 converter</h1>
${LOCAL_NOTE}
${ad}
<div class="tool-panel">
  <label for="file">Video file</label>
  <input id="file" type="file" accept="video/*,audio/*,.mp4,.webm,.mkv,.mov,.m4v" />
  <label for="quality">MP3 quality</label>
  <select id="quality">
    <option value="320">320 kbps (large)</option>
    <option value="192" selected>192 kbps (recommended)</option>
    <option value="128">128 kbps (smaller)</option>
    <option value="96">96 kbps (voice)</option>
  </select>
  <button type="button" class="primary" id="go" disabled>Convert to MP3</button>
  <p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
  <p id="hint" class="prose" style="font-size:0.82rem;color:var(--muted)">First run downloads ~25 MB WASM encoder (one time per browser). Large videos need free RAM.</p>
</div>
<script type="module">
const fileInp=document.getElementById('file');
const btn=document.getElementById('go');
const status=document.getElementById('status');
let ffmpeg=null, loading=null;

fileInp.onchange=()=>{
  btn.disabled=!fileInp.files.length;
  status.textContent='';
};

async function getFfmpeg(){
  if(ffmpeg) return ffmpeg;
  if(loading) return loading;
  loading=(async()=>{
    const { FFmpeg }=await import('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/+esm');
    const { fetchFile, toBlobURL }=await import('https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/+esm');
    const ff=new FFmpeg();
    ff.on('log',({ message })=>{ if(message) console.log('[ffmpeg]', message); });
    ff.on('progress',({ progress })=>{
      if(progress>0&&progress<1){
        const m='Encoding… '+Math.round(progress*100)+'%';
        if(window.ToolBusy) ToolBusy.setMessage(status,m); else status.textContent=m;
      }
    });
    const base='https://cdn.jsdelivr.net/npm/@ffmpeg/core-st@0.12.10/dist/umd';
    status.className='tool-feedback';
    const loadMsg='Loading encoder (first time may take a minute)…';
    if(window.ToolBusy) ToolBusy.setMessage(status,loadMsg); else status.textContent=loadMsg;
    await ff.load({
      coreURL: await toBlobURL(base+'/ffmpeg-core.js','text/javascript'),
      wasmURL: await toBlobURL(base+'/ffmpeg-core.wasm','application/wasm'),
    });
    ffmpeg=ff;
    ffmpeg._fetchFile=fetchFile;
    return ff;
  })();
  return loading;
}

btn.onclick=async()=>{
  const f=fileInp.files[0];
  if(!f) return;
  btn.disabled=true;
  status.className='tool-feedback';
  status.textContent='Starting…';
  try{
    const ff=await getFfmpeg();
    const fetchFile=ff._fetchFile;
    const ext=(f.name.split('.').pop()||'mp4').replace(/[^a-z0-9]/gi,'')||'mp4';
    const inName='input.'+ext;
    const outName='output.mp3';
    const kbps=document.getElementById('quality').value;
    status.textContent='Reading file…';
    await ff.writeFile(inName, await fetchFile(f));
    status.textContent='Extracting audio…';
    await ff.exec(['-i', inName, '-vn', '-acodec', 'libmp3lame', '-b:a', kbps+'k', outName]);
    const data=await ff.readFile(outName);
    const blob=new Blob([data.buffer], { type: 'audio/mpeg' });
    const base=(f.name||'audio').replace(/\\.[^.]+$/,'')||'audio';
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=base+'.mp3';
    a.click();
    URL.revokeObjectURL(a.href);
    try{ await ff.deleteFile(inName); await ff.deleteFile(outName); }catch(_){}
    status.className='ok';
    status.textContent='Downloaded '+base+'.mp3';
  }catch(e){
    status.className='error';
    status.textContent=(e&&e.message)||String(e)||'Conversion failed. Try a smaller clip or MP4 with AAC audio.';
  }finally{
    btn.disabled=!fileInp.files.length;
  }
};
</script>`,
    },
  ];
}
