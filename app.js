import {projects, content, steps} from './content.js?v=20261023-skin2';
const $ = id => document.getElementById(id);
let current='cobra',expanded=false;
const tabButtons=[...document.querySelectorAll('[role=tab]')];
function selectProject(id,{focus=false,scroll=false}={}) {
  if(!projects.includes(id)) id='cobra';
  const collapseAfterChange=id!==current&&expanded;
  if(id!==current){stopMedia();expanded=false;}
  current=id; const item=content[id];
  tabButtons.forEach(button=>{const selected=button.dataset.project===id;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected&&focus)button.focus({preventScroll:true});});
  projects.forEach(name=>$(`demo-${name}`).hidden=name!==id);
  $('experiment').setAttribute('aria-labelledby',`tab-${id}`);
  $('project-era').textContent=item.era; $('demo-kind').textContent=item.kind.charAt(0)+item.kind.slice(1).toLowerCase();
  $('project-title').textContent=item.title; $('project-intro').textContent=item.intro; $('project-teaser').textContent=item.teaser;
  $('story-summary').textContent=item.summary; $('method-body').innerHTML=item.method; $('scope-body').innerHTML=item.scope;
  $('method').open=false; $('scope').open=false;
  const index=projects.indexOf(id),next=projects[(index+1)%3];
  $('project-position').textContent=`${index+1} / 3`;
  const nextName={cobra:'Cobra Triangle',krakel:'Krakel',enhancer:'Winamp'}[next];
  $('next-name').textContent=`Nästa: ${nextName}`; $('next').setAttribute('aria-label',`Nästa experiment: ${nextName}`);
  history.replaceState(null,'',`#${id}`); $('standalone-link').href=`./#${id}`;
  updateExpansion();
  if(scroll||collapseAfterChange)requestScroll($('lab'));
  scheduleHeight();
}
tabButtons.forEach((button,index)=>{
  button.addEventListener('click',()=>selectProject(button.dataset.project));
  button.addEventListener('keydown',event=>{
    let destination;
    if(event.key==='ArrowRight')destination=(index+1)%3;
    if(event.key==='ArrowLeft')destination=(index+2)%3;
    if(event.key==='Home')destination=0;
    if(event.key==='End')destination=2;
    if(destination!==undefined){event.preventDefault();selectProject(projects[destination],{focus:true});}
  });
});
function navigate(delta){selectProject(projects[(projects.indexOf(current)+delta+3)%3],{focus:true,scroll:true});}
$('previous').addEventListener('click',()=>navigate(-1));$('next').addEventListener('click',()=>navigate(1));
window.addEventListener('hashchange',()=>selectProject(location.hash.slice(1)));

function updateExpansion(){
  $('lab').classList.toggle('is-expanded',expanded);
  $('expanded-content').hidden=!expanded;
  $('compact-preview').hidden=expanded;
  $('project-teaser').hidden=expanded;
  $('project-intro').hidden=!expanded;
  $('expand').setAttribute('aria-expanded',String(expanded));
  $('expand-label').textContent=expanded?'Visa mindre':content[current].action;
  $('expand-icon').className=expanded?'fi-x':'fi-arrow-right';
  document.querySelectorAll('[data-preview]').forEach(el=>el.hidden=el.dataset.preview!==current);
  scheduleHeight();
}
function setExpanded(value,{focus=false}={}){
  expanded=value;
  if(!expanded)stopMedia();
  updateExpansion();
  if(focus)$('expand').focus({preventScroll:true});
  requestScroll(expanded?$('project-heading'):$('lab'));
}
$('expand').addEventListener('click',()=>setExpanded(!expanded));
$('collapse-bottom').addEventListener('click',()=>setExpanded(false,{focus:true}));


function compare(value){$('comparison').style.setProperty('--split',`${value}%`);$('comparison-slider').value=value;$('comparison-slider').setAttribute('aria-valuetext',`${value} procent originalgrafik`);}
$('comparison-slider').addEventListener('input',event=>compare(event.target.value));
$('show-original').addEventListener('click',()=>compare(100));$('show-new').addEventListener('click',()=>compare(0));
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.step);
  document.querySelectorAll('[data-step]').forEach(b=>{const selected=Number(b.dataset.step)===index;b.setAttribute('aria-pressed',String(selected));b.classList.toggle('selected',selected);});
  $('step-title').textContent=steps[index].title;$('step-description').textContent=steps[index].description;scheduleHeight();
}));

const before=$('cobra-before-video'),after=$('cobra-after-video');
const cobraCaption=$('cobra-caption').textContent;
let videoPlaying=false,videoToken=0,videoFrame=0;
$('play-cobra').hidden=false;
function pauseVideo(){videoToken++;before.pause();after.pause();videoPlaying=false;cancelAnimationFrame(videoFrame);$('play-cobra').innerHTML='<i class="fi-play-video" aria-hidden="true"></i> Se sekvensen';}
function syncVideo(){if(!videoPlaying)return;if(Math.abs(after.currentTime-before.currentTime)>.035)after.currentTime=before.currentTime;videoFrame=requestAnimationFrame(syncVideo);}
$('play-cobra').addEventListener('click',async()=>{
  if(videoPlaying){pauseVideo();return;}
  const token=++videoToken;videoPlaying=true;
  if(!before.src){before.src='assets/cobra-original.mp4';after.src='assets/cobra-remaster.mp4';}
  before.hidden=false;after.hidden=false;
  before.currentTime=0;after.currentTime=0;
  $('play-cobra').innerHTML='Pausa';
  try{await Promise.all([before.play(),after.play()]);if(token!==videoToken||(current!=='cobra'||!expanded)){before.pause();after.pause();return;}after.currentTime=before.currentTime;$('cobra-caption').textContent=cobraCaption;syncVideo();}
  catch{if(token!==videoToken)return;pauseVideo();before.hidden=true;after.hidden=true;$('cobra-caption').textContent='Videon kunde inte starta. Du kan fortfarande jämföra stillbilderna med reglaget.';}
});
before.addEventListener('ended',()=>{pauseVideo();$('play-cobra').innerHTML='<i class="fi-play-video" aria-hidden="true"></i> Spela igen';});

let audioContext,audioBuffers,audioLoading,audioSources=[],audioGains=[],audioOn=false,audioPlaying=false,audioPending=false,audioOffset=0,audioStart=0,audioToken=0,audioFrame=0;
function audioUi(){
  $('eleven').setAttribute('aria-pressed',String(audioOn));
  $('effect-state').textContent=audioOn?'ELVA AKTIVERAD':'ORIGINALLJUD';
  document.querySelector('#demo-enhancer .enhancer-skin').classList.toggle('effect-on',audioOn);
  $('play-audio').innerHTML=audioPending?'Laddar…':audioPlaying?'Pausa':'<i class="fi-play-video" aria-hidden="true"></i> Lyssna';
  $('play-audio').disabled=audioPending;
  $('audio-state').textContent=audioPending?'LADDAR LJUD':audioPlaying?'SPELAR NU':audioOffset>0?'PAUSAD':'REDO ATT LYSSNA';
}
function audioDuration(){return audioBuffers?Math.min(...audioBuffers.map(b=>b.duration)):16;}
function audioPosition(){return audioPlaying?Math.max(0,Math.min(audioDuration(),audioOffset+audioContext.currentTime-audioStart)):audioOffset;}
function drawProgress(){const seconds=audioPosition(),percent=seconds/audioDuration()*100;$('audio-time').textContent=`0:${String(Math.floor(seconds)).padStart(2,'0')}`;$('audio-progress-fill').style.width=`${percent}%`;document.querySelector('.audio-progress').setAttribute('aria-valuenow',String(Math.round(percent)));drawMeters(seconds);if(audioPlaying)audioFrame=requestAnimationFrame(drawProgress);}
const meterRows=[...document.querySelectorAll('#demo-enhancer .meter-segments')].map(row=>[...row.children]);
function drawMeters(seconds){
  const buffer=audioBuffers?.[Number(audioOn)];
  meterRows.forEach((bars,channel)=>{
    let level=0;
    if(audioPlaying&&buffer){
      const data=buffer.getChannelData(Math.min(channel,buffer.numberOfChannels-1));
      const start=Math.floor(seconds*buffer.sampleRate),end=Math.min(data.length,start+1024);
      let sum=0;for(let i=start;i<end;i++)sum+=data[i]*data[i];
      level=Math.min(1,Math.sqrt(sum/Math.max(1,end-start))*3);
    }
    bars.forEach((bar,index)=>bar.classList.toggle('lit',index<Math.round(level*35)));
  });
}
$('skin-close').addEventListener('click',()=>setExpanded(false,{focus:true}));
function stopSources(){audioSources.forEach(source=>{source.onended=null;try{source.stop();}catch{}source.disconnect();});audioSources=[];audioGains.forEach(gain=>gain.disconnect());audioGains=[];}
function pauseAudio({reset=false}={}){audioToken++;if(audioPlaying)audioOffset=audioPosition();audioPlaying=false;audioPending=false;stopSources();cancelAnimationFrame(audioFrame);if(reset)audioOffset=0;audioUi();drawProgress();}
async function loadAudio(){
  if(!audioLoading)audioLoading=Promise.all(['dry','wet'].map(async name=>{const response=await fetch(`assets/enhancer-${name}.mp3`);if(!response.ok)throw Error('Ljudfil saknas');return audioContext.decodeAudioData(await response.arrayBuffer());})).then(buffers=>{if(Math.abs(buffers[0].duration-buffers[1].duration)>.03)throw Error('Ljudfilerna är inte synkroniserade');audioBuffers=buffers;return buffers;}).catch(error=>{audioLoading=null;throw error;});
  return audioLoading;
}
$('play-audio').addEventListener('click',async()=>{
  if(audioPlaying){pauseAudio();return;}
  const token=++audioToken;audioPending=true;audioUi();$('audio-error').hidden=true;
  try{
    const Context=window.AudioContext||window.webkitAudioContext;
    if(!Context)throw Error('Ljudspelaren stöds inte här');
    if(!audioContext)audioContext=new Context();
    await audioContext.resume();await loadAudio();
    if(token!==audioToken||(current!=='enhancer'||!expanded))return;
    if(audioOffset>=audioDuration()-.05)audioOffset=0;
    audioStart=audioContext.currentTime+.04;
    audioBuffers.forEach((buffer,index)=>{const source=audioContext.createBufferSource(),gain=audioContext.createGain();source.buffer=buffer;gain.gain.value=index===Number(audioOn)?1:0;source.connect(gain);gain.connect(audioContext.destination);source.start(audioStart,audioOffset);audioSources.push(source);audioGains.push(gain);});
    audioSources[0].onended=()=>{if(token===audioToken)pauseAudio({reset:true});};
    audioPlaying=true;audioPending=false;audioUi();drawProgress();
  }catch(error){if(token!==audioToken)return;pauseAudio();$('audio-error').textContent='Ljudet kunde inte starta. Tryck på Lyssna för att försöka igen, eller öppna demonstrationen separat.';$('audio-error').hidden=false;scheduleHeight();}
});
$('eleven').addEventListener('click',()=>{audioOn=!audioOn;if(audioPlaying){const time=audioContext.currentTime;audioGains.forEach((gain,index)=>{gain.gain.cancelScheduledValues(time);gain.gain.setValueAtTime(gain.gain.value,time);gain.gain.linearRampToValueAtTime(index===Number(audioOn)?1:0,time+.035);});}audioUi();});
function stopMedia(){pauseVideo();pauseAudio({reset:true});}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMedia();});window.addEventListener('pagehide',stopMedia);

const embedded=window.parent!==window;
let parentOrigin;
if(embedded){document.body.classList.add('embed-mode');document.querySelector('.lab-footer').hidden=false;try{parentOrigin=new URL(document.referrer).origin;}catch{parentOrigin=location.origin;}}
let heightFrame=0,lastHeight=0;
function scheduleHeight(){if(!embedded)return;cancelAnimationFrame(heightFrame);heightFrame=requestAnimationFrame(()=>{const height=Math.ceil($('lab').getBoundingClientRect().height);if(height!==lastHeight){lastHeight=height;window.parent.postMessage({type:'resize',height},parentOrigin);}});}
new ResizeObserver(scheduleHeight).observe($('lab'));
window.addEventListener('message',event=>{if(embedded&&event.source===window.parent&&event.origin===parentOrigin&&event.data?.type==='nt-retro:pause')stopMedia();});
let scrollFrame=0;
function requestScroll(element){
  cancelAnimationFrame(scrollFrame);
  scrollFrame=requestAnimationFrame(()=>{scrollFrame=requestAnimationFrame(()=>{
    const offset=Math.max(0,Math.round(element.getBoundingClientRect().top+window.scrollY));
    if(embedded)window.parent.postMessage({type:'nt-scroll',offset},parentOrigin);
    else window.scrollTo({top:offset,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });});
}
document.fonts.ready.then(scheduleHeight);
selectProject(location.hash.slice(1));audioUi();scheduleHeight();
