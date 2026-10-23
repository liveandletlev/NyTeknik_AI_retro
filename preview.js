const frame=document.getElementById('retro-frame');
const params=new URLSearchParams(location.search);
const widths=[320,390,768,800];
function width(value){document.getElementById('article').style.width=`min(${value}px, 100%)`;document.querySelectorAll('[data-width]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.width)===value)));}
document.querySelectorAll('[data-width]').forEach(b=>b.addEventListener('click',()=>width(Number(b.dataset.width))));
if(widths.includes(Number(params.get('width'))))width(Number(params.get('width')));
window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
  if(event.data?.type==='resize'&&Number.isFinite(event.data.height)){
    frame.style.height=`${Math.min(7000,Math.max(200,event.data.height))}px`;
  }
  if(event.data?.type==='nt-scroll'&&Number.isFinite(event.data.offset)){
    const offset=Math.max(0,Math.min(frame.clientHeight,event.data.offset));
    const top=Math.max(0,frame.getBoundingClientRect().top+window.scrollY+offset-110);
    window.scrollTo({top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)frame.contentWindow.postMessage({type:'nt-retro:pause'},location.origin);},{threshold:0}).observe(frame);
document.addEventListener('visibilitychange',()=>{if(document.hidden)frame.contentWindow.postMessage({type:'nt-retro:pause'},location.origin);});
