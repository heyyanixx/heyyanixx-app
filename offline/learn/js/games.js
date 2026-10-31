/* HEYYANIXX Learn Arcade — Type Rush, Code Crash, Quiz Blitz */
(function(){
'use strict';
const {h,esc,shuffle,pick,register}=HX;const B=window.BANK;

/* shared: canvas helper */
function makeCanvas(parent){const c=h('canvas',{class:'full'});parent.append(c);const ctx=c.getContext('2d');const st={c,ctx,W:0,H:0,dpr:1};
 function fit(){const r=parent.getBoundingClientRect();st.dpr=Math.min(2,window.devicePixelRatio||1);st.W=Math.max(1,r.width);st.H=Math.max(1,r.height);c.width=Math.round(st.W*st.dpr);c.height=Math.round(st.H*st.dpr);ctx.setTransform(st.dpr,0,0,st.dpr,0,0);}
 fit();let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(fit);ro.observe(parent);}else addEventListener('resize',fit);st.fit=fit;st.stop=()=>{ro&&ro.disconnect();removeEventListener('resize',fit);};return st;}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
HX.makeCanvas=makeCanvas;HX.rr=rr;

/* shared MCQ renderer */
function mcq(parent,{opts,correct,onAnswer,keys}){const box=h('div',{class:'opts'});let done=false;const btns=opts.map((o,i)=>{const b=h('button',{class:'opt',onclick:()=>choose(i)},h('span',{class:'k'},(keys||'ABCD')[i]),h('span',null,o));box.append(b);return b;});
 function choose(i){if(done)return;done=true;btns.forEach((b,j)=>{b.disabled=true;if(j===correct)b.classList.add('ok');else if(j===i)b.classList.add('no');});onAnswer(i===correct,i);}
 parent.append(box);return{lock(){if(done)return;done=true;btns.forEach((b,j)=>{b.disabled=true;if(j===correct)b.classList.add('ok');});}};}
HX.mcq=mcq;
function timerLoop(api,secs,onTimeout){let left=secs,last=performance.now(),raf,stopped=false;function f(t){if(stopped)return;const dt=Math.min(.1,(t-last)/1000);last=t;if(!api.paused)left-=dt;api.setTime(left/secs);if(left<=0){stopped=true;api.setTime(0);onTimeout();return;}raf=requestAnimationFrame(f);}raf=requestAnimationFrame(f);return{stop(){stopped=true;cancelAnimationFrame(raf);},get left(){return Math.max(0,left);}};}
HX.timerLoop=timerLoop;
function nextBtn(label,fn){return h('button',{class:'btn btn-gold btn-block',style:'margin-top:12px',onclick:fn},label||'Next ›');}
HX.nextBtn=nextBtn;

/* ================= TYPE RUSH ================= */
function blaster(api,mode){
 const set=B.type[mode.id];const wrap=h('div',{class:'tr-wrap'});const cv=h('div',{class:'cv'});
 const inp=h('input',{type:'text',autocomplete:'off',autocorrect:'off',autocapitalize:'off',spellcheck:'false',enterkeyhint:'go','aria-label':'Type the falling words here',placeholder:'Yahan type karo…'});
 wrap.append(cv,h('div',{class:'tr-input'},inp));api.stage.append(wrap);
 const C=makeCanvas(cv),ctx=C.ctx;
 let E=[],bul=[],parts=[],target=null,lives=3,score=0,combo=0,good=0,bad=0,t=0,spawn=0.6,shake=0,kills=0,grid=[],over=false,raf,last=performance.now(),scroll=0;
 const LIMIT=90;
 function newWord(){const alive=E.filter(e=>!e.dead);for(let k=0;k<30;k++){const w=set.words[Math.random()*set.words.length|0];if(!alive.some(e=>e.w[0]===w[0]||e.w===w))return w;}return set.words[Math.random()*set.words.length|0];}
 function spawnX(){const near=E.filter(e=>!e.dead&&e.y<.25);let best=.5,bd=-1;for(let k=0;k<8;k++){const c=.15+Math.random()*.7;const d=near.length?Math.min(...near.map(e=>Math.abs(e.x-c))):1;if(d>bd){bd=d;best=c;}}return best;}
 function spawnE(){E.push({w:newWord(),x:spawnX(),y:-.04,typed:0,dead:false,vy:(.055+t*.0011)*(mode.id==='home'?.85:1)*(.85+Math.random()*.3),wob:Math.random()*6});}
 function hud(){api.setHud(`<span class="h">${'❤️'.repeat(lives)}${'🖤'.repeat(3-lives)}</span><span class="h">WPM <b>${wpm()}</b></span><span class="h">Combo <b>x${1+Math.floor(combo/5)}</b></span><span class="h">⏱ <b>${Math.max(0,Math.ceil(LIMIT-t))}s</b></span>`);}
 function wpm(){return t>3?Math.round((good/5)/(t/60)):0;}
 function burst(x,y,col,n){for(let i=0;i<(n||14);i++)parts.push({x,y,vx:(Math.random()-.5)*260,vy:(Math.random()-.5)*260,l:.6,c:col||'#e3b65a'});}
 function ship(){return{x:C.W/2,y:C.H-34};}
 function epos(e){return{x:e.x*C.W,y:e.y*(C.H-60)};}
 function kill(e){e.dead=true;kills++;grid.push('💥');const mult=1+Math.floor(combo/5);score+=e.w.length*10*mult;api.setScore(score);const p=epos(e);burst(p.x,p.y,'#f6d892',18);api.sfx.boom();}
 function onInput(){if(over)return;let v=inp.value.toLowerCase().replace(/\s+/g,'');if(!v){if(target&&target.typed===0)target=null;return;}
  if(!target){const c=E.filter(e=>!e.dead&&e.w.startsWith(v[0])).sort((a,b)=>b.y-a.y);if(!c.length){bad++;combo=0;shake=6;api.sfx.no();inp.value='';return;}target=c[0];target.typed=0;}
  if(target.w.startsWith(v)){const n=v.length-target.typed;for(let i=0;i<n;i++){good++;combo++;const s=ship(),p=epos(target);bul.push({x0:s.x,y0:s.y-14,x1:p.x,y1:p.y,l:.18});api.sfx.shot();}target.typed=v.length;if(v===target.w){kill(target);target=null;inp.value='';}}
  else{bad++;combo=0;shake=5;api.sfx.no();api.vibrate(30);inp.value=target.w.slice(0,target.typed);}
 }
 inp.addEventListener('input',onInput);
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();}if(e.key==='Escape'){inp.value='';if(target)target.typed=0;target=null;}});
 cv.addEventListener('pointerdown',()=>inp.focus());
 function end(){if(over)return;over=true;cancelAnimationFrame(raf);const acc=good+bad?Math.round(good/(good+bad)*100):0;const w=wpm();
  api.end({score,wpm:w,acc,correct:kills,res:lives>0?'Time up — survived!':'Base destroyed',stat:`${w} WPM · ${acc}% accuracy · ${kills} words`,grid:grid.slice(0,24).join('')});}
 function draw(dt){const W=C.W,H=C.H;ctx.save();ctx.clearRect(0,0,W,H);if(shake>0){ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.85;if(shake<.4)shake=0;}
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#08080b');g.addColorStop(1,'#141007');ctx.fillStyle=g;ctx.fillRect(-10,-10,W+20,H+20);
  // runner speed grid
  const vx=W/2,vy=-H*.15;ctx.strokeStyle='rgba(227,182,90,.12)';ctx.lineWidth=1;for(let i=-6;i<=6;i++){ctx.beginPath();ctx.moveTo(vx,vy);ctx.lineTo(W/2+i*W*.22,H);ctx.stroke();}
  scroll=(scroll+dt*(.35+t*.004))%1;for(let i=0;i<10;i++){const p=((i+scroll)/10);const y=vy+(H-vy)*p*p;ctx.strokeStyle='rgba(227,182,90,'+(.04+p*.12)+')';ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // danger line
  ctx.strokeStyle='rgba(255,90,95,.35)';ctx.setLineDash([6,6]);ctx.beginPath();ctx.moveTo(0,H-60);ctx.lineTo(W,H-60);ctx.stroke();ctx.setLineDash([]);
  // bullets
  bul.forEach(b=>{ctx.strokeStyle='rgba(246,216,146,'+(b.l/.18)+')';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(b.x0,b.y0);ctx.lineTo(b.x1,b.y1);ctx.stroke();});
  // enemies
  ctx.font='700 16px ui-monospace,Menlo,Consolas,monospace';ctx.textBaseline='middle';
  E.forEach(e=>{if(e.dead)return;const p=epos(e);const tw=ctx.measureText(e.w).width;let x=Math.max(tw/2+12,Math.min(W-tw/2-12,p.x));e.px=x;
   ctx.fillStyle='#1d1a12';ctx.strokeStyle=e===target?'#ff5a5f':'rgba(227,182,90,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,p.y+22,9,0,7);ctx.fill();ctx.stroke();
   if(e===target){ctx.strokeStyle='#ff5a5f';ctx.beginPath();ctx.arc(x,p.y+22,15,0,7);ctx.stroke();}
   rr(ctx,x-tw/2-9,p.y-14,tw+18,28,9);ctx.fillStyle=e===target?'rgba(40,14,14,.95)':'rgba(16,16,22,.92)';ctx.fill();ctx.strokeStyle=e===target?'#ff5a5f':'rgba(227,182,90,.45)';ctx.lineWidth=1.5;ctx.stroke();
   const done=e.w.slice(0,e.typed),rest=e.w.slice(e.typed);const sx=x-tw/2;ctx.fillStyle='#e3b65a';ctx.textAlign='left';ctx.fillText(done,sx,p.y+1);ctx.fillStyle='#fff';ctx.fillText(rest,sx+ctx.measureText(done).width,p.y+1);});
  // particles
  parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.l/.6);ctx.fillStyle=p.c;ctx.fillRect(p.x-2,p.y-2,4,4);});ctx.globalAlpha=1;
  // ship
  const s=ship();ctx.fillStyle='#e3b65a';ctx.beginPath();ctx.moveTo(s.x,s.y-22);ctx.lineTo(s.x+20,s.y+12);ctx.lineTo(s.x,s.y+4);ctx.lineTo(s.x-20,s.y+12);ctx.closePath();ctx.fill();ctx.fillStyle='#060608';ctx.font='900 9px Inter,Arial';ctx.textAlign='center';ctx.fillText('HX',s.x,s.y);
  if(t<4){ctx.fillStyle='rgba(255,255,255,.85)';ctx.font='700 15px Inter,Arial';ctx.textAlign='center';ctx.fillText('Word type karo → blast! 💥',W/2,H*.42);}
  ctx.restore();}
 let hudT=0;
 function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!api.paused&&!over){t+=dt;spawn-=dt;if(spawn<=0){spawnE();spawn=Math.max(.95,2.3-t*.016)*(mode.id==='code'?1.25:1);}
   E.forEach(e=>{if(e.dead)return;e.y+=e.vy*dt;if(e.y*(C.H-60)>=C.H-60){e.dead=true;lives--;grid.push('💔');combo=0;shake=12;api.sfx.boom();api.vibrate(80);if(e===target){target=null;inp.value='';}burst(e.px||C.W/2,C.H-60,'#ff5a5f',20);}});
   E=E.filter(e=>!e.dead||false);bul.forEach(b=>b.l-=dt);bul=bul.filter(b=>b.l>0);parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;});parts=parts.filter(p=>p.l>0);
   hudT-=dt;if(hudT<=0){hud();hudT=.25;}if(lives<=0||t>=LIMIT){draw(dt);end();return;}}
  draw(dt);raf=requestAnimationFrame(loop);}
 hud();setTimeout(()=>inp.focus(),60);raf=requestAnimationFrame(loop);
 return()=>{over=true;cancelAnimationFrame(raf);C.stop();};
}
function race(api,mode){
 const lvl=mode.id.split('-')[1];const set=B.type[lvl];const text=pick(set.race,3).join(' ');
 const key='ghost_'+lvl;const base=lvl==='code'?16:24;const ghost=Math.max(base,Math.round((api.S[key]||0)));
 const wrap=h('div',{class:'race'});const lanes=h('div',{class:'top2'});
 const you=h('div',{class:'lane'},h('i'),h('span',null,'You'),h('em',null,'🏎️'));const gh=h('div',{class:'lane ghost'},h('i'),h('span',null,`Ghost · ${ghost} WPM`),h('em',null,'👻'));
 lanes.append(you,gh);const pas=h('div',{class:'passage','aria-label':'Passage to type'});
 const inp=h('input',{type:'text',autocomplete:'off',autocorrect:'off',autocapitalize:'off',spellcheck:'false','aria-label':'Type the passage here',placeholder:'Type shuru karo — timer start ho jayega'});
 wrap.append(lanes,pas,h('div',{class:'tr-input'},inp));api.stage.append(wrap);
 let started=false,t=0,last=0,keys=0,errs=0,prev='',over=false,raf;const LIMIT=75;
 function render(v){let out='';for(let i=0;i<text.length;i++){const ch=esc(text[i]);if(i<v.length)out+=`<span class="${v[i]===text[i]?'c':'w'}">${ch}</span>`;else if(i===v.length)out+=`<span class="cur p">${ch}</span>`;else out+=`<span class="p">${ch}</span>`;}pas.innerHTML=out;const cur=pas.querySelector('.cur');if(cur&&cur.offsetTop>pas.scrollTop+pas.clientHeight-40)pas.scrollTop=cur.offsetTop-40;}
 function correctCount(v){let c=0;for(let i=0;i<v.length;i++)if(v[i]===text[i])c++;return c;}
 function wpm(){return t>1?Math.round((correctCount(inp.value)/5)/(t/60)):0;}
 function upd(){const v=inp.value;const yp=Math.min(1,v.length/text.length);const gp=Math.min(1,(ghost*5*t/60)/text.length);you.querySelector('i').style.width=yp*100+'%';you.querySelector('em').style.left=Math.max(8,yp*100)+'%';gh.querySelector('i').style.width=gp*100+'%';gh.querySelector('em').style.left=Math.max(8,gp*100)+'%';
  api.setHud(`<span class="h">WPM <b>${wpm()}</b></span><span class="h">Accuracy <b>${keys?Math.round((keys-errs)/keys*100):100}%</b></span><span class="h">⏱ <b>${Math.ceil(LIMIT-t)}s</b></span>`);api.setScore(wpm());return{yp,gp};}
 inp.addEventListener('input',()=>{if(over)return;let v=inp.value;if(v.length>text.length)v=inp.value=v.slice(0,text.length);if(!started){started=true;last=performance.now();raf=requestAnimationFrame(loop);}
  if(v.length>prev.length){for(let i=prev.length;i<v.length;i++){keys++;if(v[i]!==text[i]){errs++;api.sfx.no();}else api.sfx.tick();}}prev=v;render(v);upd();if(v===text)end(true);});
 function loop(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!api.paused&&!over){t+=dt;const p=upd();if(t>=LIMIT){end(false);return;}}raf=requestAnimationFrame(loop);}
 function end(finished){if(over)return;over=true;cancelAnimationFrame(raf);const w=wpm();const acc=keys?Math.round((keys-errs)/keys*100):0;const ghostDone=ghost*5*t/60>=text.length;const beat=finished&&!ghostDone;
  if(w>(api.S[key]||0)){api.S[key]=w;api.save();}
  const score=Math.round(w*10*(acc/100))+(beat?200:0);
  api.end({score,wpm:w,acc,correct:Math.round(correctCount(inp.value)/5),win:beat,res:beat?'Ghost ko hara diya! 👻💨':(finished?'Finish! Ghost aage tha':'Time up'),stat:`${w} WPM · ${acc}% accuracy`,grid:(beat?'🏎️💨👻':'👻💨🏎️')+' '+w+' WPM'});}
 render('');upd();setTimeout(()=>inp.focus(),60);
 return()=>{over=true;cancelAnimationFrame(raf);};
}
register({id:'type',name:'Type Rush',icon:'⌨️',tag:'Words type karo, blast karo — ZType style typing shooter',glow:'rgba(227,182,90,.25)',
 desc:'Typing shooter + ghost race. WPM badhao.',
 how:['Words upar se girte hain — <b>type karo</b>, laser se uda do 💥','Word danger line tak pahuncha → <b>❤️ gaya</b>. 3 lives, 90 sec.','<b>Ghost Race</b>: apne pichle best WPM wale ghost se race karo.'],
 modes:[{id:'home',name:'Blaster · Home Row',desc:'a s d f j k l — beginners',icon:'🟡'},{id:'words',name:'Blaster · Words',desc:'Common English words',icon:'🔤'},{id:'code',name:'Blaster · Code',desc:'printf, scanf, i++ …',icon:'💻'},{id:'hinglish',name:'Blaster · Hinglish',desc:'bhai, padhai, booyah …',icon:'🇮🇳'},{id:'nums',name:'Blaster · Numbers',desc:'1 se 9, 100, 2026 … number row practice',icon:'🔢'},{id:'race-words',name:'Ghost Race · Sentences',desc:'Race vs your best WPM',icon:'👻'},{id:'race-code',name:'Ghost Race · Code',desc:'Type real C lines',icon:'🏁'}],
 start(api,mode){return mode.id.startsWith('race')?race(api,mode):blaster(api,mode);}});

/* ================= CODE CRASH ================= */
function codeLines(lines,mark){return lines.map((l,i)=>(i===mark?'► ':'  ')+l).join('\n');}
function crash(api,mode){
 const py=mode.id==='py';let pool=B.codeOut.filter(q=>py?q.lang==='py':q.lang==='c');
 let qs=pick(pool,py?8:9).map(q=>({kind:'out',q}));
 if(!py){pick(B.codeBug,3).forEach(b=>qs.splice(1+Math.floor(Math.random()*qs.length),0,{kind:'fix',q:b}));}
 const N=qs.length;
 const root=h('div',{class:'cc'});const qa=h('div',{class:'qa'});const field=h('div',{class:'field'});root.append(qa,field);api.stage.append(root);
 let qi=-1,score=0,combo=0,junk=0,correct=0,blocks=[],active=false,raf,last=performance.now(),over=false,grid=[],review=[],H=0,curQ=null,wait=null;
 const MAXJ=5;
 function hud(){api.setHud(`<span class="h">Q <b>${Math.min(qi+1,N)}/${N}</b></span><span class="h">Combo <b>${combo}</b></span><span class="h">🐞 Bug rows <b>${junk}/${MAXJ}</b></span>`);}
 function drawJunk(){field.querySelectorAll('.junk').forEach(j=>j.remove());for(let i=0;i<junk;i++)field.append(h('div',{class:'junk',style:`bottom:${i*26}px`},'BUG'));}
 function next(){qi++;hud();if(qi>=N||junk>=MAXJ)return finish();const it=qs[qi];curQ=it;qa.innerHTML='';blocks.forEach(b=>b.el.remove());blocks=[];
  const card=h('div',{class:'qcard'});const topic=it.kind==='out'?it.q.topic:'Bug fix';
  card.append(h('div',{class:'qmeta'},h('span',null,(it.q.lang==='py'?'Python · ':'C · ')+topic),h('span',null,`${qi+1}/${N}`)));
  let opts;
  if(it.kind==='out'){card.append(h('div',{class:'qt'},'Output kya hoga? Sahi block TAP karo 👇'));const code=(it.q.pre?it.q.pre+'\n\n// main() ke andar:\n':'')+it.q.code;card.append(h('pre',{class:'code'},code));opts=[it.q.a,...it.q.o];}
  else{card.append(h('div',{class:'qt'},'► wali line me bug hai. Sahi line TAP karo 👇'));card.append(h('pre',{class:'code'},codeLines(it.q.lines,it.q.bug)));opts=[it.q.fix,it.q.lines[it.q.bug].trim()];}
  qa.append(card);
  H=field.clientHeight;const cols=shuffle([0,1,2]).slice(0,opts.length);const starts=shuffle([-50,-150,-250]);const T=Math.max(4.2,8.5-qi*.4);const v=(H+120)/T;
  opts.forEach((o,i)=>{const el=h('button',{class:'blk'+(i%3===1?' b2':i%3===2?' b3':''),style:`left:calc(${cols[i]*33.33}% + 5px)`},o);const b={el,ok:i===0,y:starts[i],v,text:o};el.addEventListener('pointerdown',e=>{e.preventDefault();tap(b);});el.addEventListener('click',e=>{if(e.detail===0)tap(b);});field.append(el);blocks.push(b);});
  active=true;}
 function showWhy(ok,txt){const w=h('div',{class:'why',html:(ok?'<b>✅ Sahi!</b> ':'<b>❌ Sahi answer:</b> <code>'+esc(txt.a)+'</code> — ')+esc(txt.why)});qa.querySelector('.qcard').append(w);}
 function resolve(ok,b){active=false;const it=curQ;const ans=it.kind==='out'?it.q.a:it.q.fix;const why=it.q.why;
  blocks.forEach(x=>{if(x.ok){x.el.style.outline='3px solid #3ddc84';}});
  if(ok){correct++;combo++;const bonus=Math.round(Math.max(0,(H-b.y))/H*60);score+=100+bonus+combo*15;if(combo%3===0&&junk>0){junk--;drawJunk();api.toast('Combo x'+combo+'! Ek bug row clear 🧹',1400);}grid.push(combo>=3?'🔥':'✅');api.sfx.ok();field.classList.remove('flash-ok');void field.offsetWidth;field.classList.add('flash-ok');}
  else{combo=0;junk++;drawJunk();grid.push('🐞');api.sfx.no();api.vibrate(60);root.classList.remove('shake');void root.offsetWidth;root.classList.add('shake');review.push(`<b>${esc(it.kind==='out'?it.q.code.split('\n').slice(-1)[0]:it.q.lines[it.q.bug])}</b><br>Sahi: <span class="a">${esc(ans)}</span> — ${esc(why)}`);}
  api.setScore(score);showWhy(ok,{a:ans,why});hud();
  wait=setTimeout(()=>{wait=null;if(junk>=MAXJ)return finish();next();},ok?1500:2600);}
 function tap(b){if(!active||over)return;if(b.ok){b.el.classList.add('hit');b.el.style.transform+=' scale(1.3)';resolve(true,b);}else{b.el.style.background='#ff5a5f';resolve(false,b);}}
 function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!api.paused&&active&&!over){const floor=H-junk*26;for(const b of blocks){if(b.gone)continue;b.y+=b.v*dt;const bh=b.el.offsetHeight;if(b.y+bh>=floor){if(b.ok){b.y=floor-bh;resolve(false,b);break;}else{b.gone=true;b.el.style.opacity='.15';}}b.el.style.transform=`translateY(${b.y}px)`;}}raf=requestAnimationFrame(loop);}
 function finish(){if(over)return;over=true;cancelAnimationFrame(raf);clearTimeout(wait);const clear=junk<MAXJ;
  api.end({score,correct,total:N,res:clear?'Level clear! 🧹':'Stack overflow! 🐞',stat:`${correct}/${N} sahi`,grid:grid.join(''),review,badges:correct>=10?['bug']:[],win:clear&&correct>=N-1});}
 setTimeout(()=>{next();raf=requestAnimationFrame(loop);},50);
 return()=>{over=true;cancelAnimationFrame(raf);clearTimeout(wait);};
}
function bugHunt(api){
 const items=pick(B.codeBug,6);let i=-1,score=0,correct=0,grid=[],review=[],tl=null,over=false;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function next(){i++;if(i>=items.length)return done();const it=items[i];inner.innerHTML='';api.setHud(`<span class="h">Bug <b>${i+1}/${items.length}</b></span><span class="h">Sahi <b>${correct}</b></span>`);
  const card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'Bug Hunt'),h('span',null,'20 sec')),h('div',{class:'qt'},'Is code me 1 line galat hai. Usse TAP karo 🐞'));
  const lines=h('div',{class:'lines'});let answered=false;
  const btns=it.lines.map((l,k)=>{const b=h('button',{class:'ln',onclick:()=>ans(k)},h('span',{class:'n'},k+1),h('span',null,l));lines.append(b);return b;});
  card.append(lines);inner.append(card);
  function ans(k){if(answered)return;answered=true;tl&&tl.stop();const ok=k===it.bug;btns[it.bug].classList.add('ok');if(!ok&&k>=0)btns[k].classList.add('no');
   if(ok){correct++;score+=100+Math.round((tl?tl.left:0)*8);grid.push('✅');api.sfx.ok();}else{grid.push('🐞');api.sfx.no();review.push(`<b>${esc(it.lines[it.bug])}</b><br>Fix: <span class="a">${esc(it.fix)}</span> — ${esc(it.why)}`);}
   api.setScore(score);api.setHud(`<span class="h">Bug <b>${i+1}/${items.length}</b></span><span class="h">Sahi <b>${correct}</b></span>`);card.append(h('div',{class:'why',html:`<b>Fix:</b> <code>${esc(it.fix)}</code><br>${esc(it.why)}`}),nextBtn(i+1<items.length?'Next bug ›':'Result dekho ›',next));}
  tl=HX.timerLoop(api,20,()=>ans(-1));}
 function done(){if(over)return;over=true;tl&&tl.stop();api.end({score,correct,total:items.length,res:'Bug Hunt done',stat:`${correct}/${items.length} bugs pakde`,grid:grid.join(''),review,badges:correct>=6?['bug']:[]});}
 next();return()=>{over=true;tl&&tl.stop();};
}
function lineUp(api){
 const items=pick(B.codeOrder,4);let i=-1,score=0,grid=[],over=false,tl=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function next(){i++;if(i>=items.length)return done();const it=items[i];inner.innerHTML='';let pos=0,miss=0;api.setHud(`<span class="h">Puzzle <b>${i+1}/${items.length}</b></span>`);
  const card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'Line Up'),h('span',null,it.name)),h('div',{class:'qt'},'Program sahi order me banao — lines TAP karo'));
  const build=h('div',{class:'build'});const pool=h('div',{class:'lines'});
  shuffle(it.lines.map((l,k)=>({l,k}))).forEach(o=>{const b=h('button',{class:'ln',onclick:()=>tap(o,b)},h('span',null,o.l));pool.append(b);});
  card.append(build,h('div',{class:'qmeta',style:'margin-top:12px'},h('span',null,'Lines')),pool);inner.append(card);
  function tap(o,b){if(pos>=it.lines.length)return;if(o.l===it.lines[pos]){pos++;api.sfx.tap();b.classList.add('used');build.append(h('div',{class:'ln placed'},h('span',{class:'n'},pos),h('span',null,o.l)));
    if(pos===it.lines.length){tl&&tl.stop();const pts=Math.max(40,220-miss*40)+Math.round((tl?tl.left:0)*3);score+=pts;api.setScore(score);grid.push(miss===0?'🟩':miss<3?'🟨':'🟥');api.sfx.ok();card.append(h('div',{class:'why',html:`<b>✅ Program ready!</b> ${esc(it.why)}`}),nextBtn(i+1<items.length?'Next puzzle ›':'Result ›',next));}}
   else{miss++;api.sfx.no();b.classList.add('no');setTimeout(()=>b.classList.remove('no'),400);}}
  tl=HX.timerLoop(api,45,()=>{if(pos<it.lines.length){grid.push('⬛');pos=it.lines.length;card.append(h('div',{class:'why',html:'<b>⏱ Time up.</b> Sahi order: <br><code>'+it.lines.map(esc).join('<br>')+'</code>'}),nextBtn('Next ›',next));}});}
 function done(){if(over)return;over=true;tl&&tl.stop();api.end({score,correct:grid.filter(g=>g==='🟩'||g==='🟨').length,total:items.length,res:'Line Up done',stat:`${grid.filter(g=>g!=='⬛').length}/${items.length} programs banaye`,grid:grid.join('')});}
 next();return()=>{over=true;tl&&tl.stop();};
}
register({id:'code',name:'Code Crash',icon:'💻',tag:'Girte code blocks — sahi wala tap karo, stack overflow se bacho!',glow:'rgba(122,215,255,.22)',
 desc:'C + Python: output, bug fix, line order.',
 how:['Code ka output/fix wale <b>blocks girte hain</b> — sahi block tap karo.','Galat tap ya sahi block neeche gira → <b>bug row</b> stack hoti hai. 5 rows = Stack overflow!','3 ka combo = ek bug row clear 🧹. Har answer ke baad short explanation.','Questions tumhare BCA Sem-1 <b>Fundamentals of C</b> syllabus se: data types, operators, if-else, loops, arrays, functions.'],
 modes:[{id:'c',name:'Crash · C Programming',desc:'12 Qs · output + bug fix',icon:'🧱'},{id:'py',name:'Crash · Python basics',desc:'8 Qs · Python output',icon:'🐍'},{id:'bug',name:'Bug Hunt',desc:'Galat line dhoondo · 6 bugs',icon:'🐞'},{id:'line',name:'Line Up',desc:'Program ki lines arrange karo',icon:'🧩'}],
 start(api,mode){if(mode.id==='bug')return bugHunt(api);if(mode.id==='line')return lineUp(api);return crash(api,mode);}});

/* ================= QUIZ BLITZ ================= */
const CATS=[{id:'ai',n:'AI',e:'🤖',c:'#3a2f17'},{id:'comp',n:'Computer',e:'💻',c:'#151a24'},{id:'elec',n:'Electronics',e:'⚡',c:'#2a2211'},{id:'math',n:'Maths',e:'📐',c:'#181820'},{id:'bonus',n:'2x Bonus',e:'⭐',c:'#3d3014'},{id:'pick',n:'Choose',e:'👑',c:'#121216'}];
function blitz(api){
 const pools={};['ai','comp','elec','math'].forEach(k=>pools[k]=shuffle(B.quiz[k]));
 const N=10;let n=0,hearts=3,score=0,combo=0,correct=0,rot=0,got={ai:0,comp:0,elec:0,math:0},grid=[],review=[],over=false,tl=null,spinT=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function hud(){api.setHud(`<span class="h">${'❤️'.repeat(hearts)}${'🖤'.repeat(3-hearts)}</span><span class="h">Q <b>${Math.min(n+1,N)}/${N}</b></span><span class="h">Combo ${combo>=3?'<span class="combo fire">🔥 x2</span>':'<b>'+combo+'</b>'}</span>`);}
 function crowns(){return h('div',{class:'crowns'},['ai','comp','elec','math'].map(k=>{const c=CATS.find(x=>x.id===k);return h('div',{class:'crown'+(got[k]>=2?' full':got[k]===1?' half':'')},h('div',{class:'e'},c.e),c.n+' '+Math.min(2,got[k])+'/2');}));}
 function wheelView(){inner.innerHTML='';hud();api.setTime(null);
  const segs=CATS.map((c,i)=>`${c.c} ${i*60}deg ${(i+1)*60}deg`).join(',');
  const wheel=h('div',{class:'wheel',style:`background:conic-gradient(${segs});transform:rotate(${rot}deg)`});
  CATS.forEach((c,i)=>{wheel.append(h('div',{style:`position:absolute;left:50%;top:50%;width:0;height:0;transform:rotate(${i*60+30}deg)`},h('div',{style:'position:absolute;left:-40px;top:calc(-1 * min(300px,78vw)/2 + 14px);width:80px;text-align:center;font-weight:800;font-size:12px;line-height:1.1'},h('div',{style:'font-size:24px'},c.e),c.n)));});
  const ww=h('div',{class:'wheel-wrap'},h('div',{class:'wheel-pin'}),wheel,h('div',{class:'wheel-hub'},'SPIN'));
  const btn=h('button',{class:'btn btn-gold btn-block',style:'margin-top:16px'},'🎡 SPIN');
  inner.append(h('p',{class:'kicker',style:'text-align:center'},'Wheel ghumao → category → question'),ww,btn,crowns(),h('p',{class:'note',style:'text-align:center'},'Har category me 2 sahi = 👑 crown. 4 crowns = +500 bonus!'));
  let spun=false;const go=()=>{if(spun)return;spun=true;btn.disabled=true;const idx=Math.random()*6|0;const target=360-(idx*60+30)+(Math.random()*30-15);rot=Math.ceil((rot+1440)/360)*360+target;wheel.style.transform=`rotate(${rot}deg)`;
   let k=0;const tick=setInterval(()=>{api.sfx.spin();if(++k>14)clearInterval(tick);},140);spinT=setTimeout(()=>{clearInterval(tick);landed(CATS[idx]);},2750);};
  btn.onclick=go;ww.onclick=go;}
 function landed(c){if(over)return;if(c.id==='pick'){inner.innerHTML='';inner.append(h('h3',{class:'disp',style:'font-size:30px;text-align:center;margin:10px 0'},'👑 Category choose karo'),h('div',{class:'modes'},['ai','comp','elec','math'].map(k=>{const cc=CATS.find(x=>x.id===k);return h('button',{class:'mode',onclick:()=>ask(k,false)},h('span',{class:'mi'},cc.e),h('span',null,h('b',null,cc.n),h('small',null,got[k]>=2?'Crown mil gaya':'Crown progress '+got[k]+'/2')));})));return;}
  if(c.id==='bonus'){const k=['ai','comp','elec','math'][Math.random()*4|0];api.toast('⭐ 2x BONUS — '+CATS.find(x=>x.id===k).n,1500);return ask(k,true);}ask(c.id,false);}
 function ask(cat,dbl){inner.innerHTML='';hud();if(!pools[cat].length)pools[cat]=shuffle(B.quiz[cat]);const q=pools[cat].pop();const c=CATS.find(x=>x.id===cat);
  const opts=shuffle([q.a,...q.o]);const ci=opts.indexOf(q.a);
  const card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,c.e+' '+c.n+(dbl?' · ⭐2x':'')),h('span',null,'12 sec')),h('div',{class:'qt'},q.q));inner.append(card);
  const m=mcq(card,{opts,correct:ci,onAnswer:(ok)=>{tl&&tl.stop();after(ok,q,cat,dbl,card);}});
  tl=HX.timerLoop(api,12,()=>{m.lock();after(false,q,cat,dbl,card,true);});}
 function after(ok,q,cat,dbl,card,timeout){if(over)return;n++;
  if(ok){correct++;combo++;got[cat]++;const pts=Math.round((100+Math.round((tl?tl.left:0)*10))*(combo>=3?2:1)*(dbl?2:1));score+=pts;grid.push(combo>=3?'🔥':'✅');api.sfx.ok();if(got[cat]===2){api.toast('👑 '+CATS.find(x=>x.id===cat).n+' crown!',1500);api.sfx.win();}}
  else{combo=0;hearts--;grid.push(timeout?'⏱':'❌');api.sfx.no();api.vibrate(60);review.push(`<b>${esc(q.q)}</b><br>Sahi: <span class="a">${esc(q.a)}</span> — ${esc(q.why)}`);}
  api.setScore(score);hud();api.setTime(null);
  card.append(h('div',{class:'why',html:(ok?'<b>✅ Sahi!</b> ':timeout?'<b>⏱ Time up.</b> ':'<b>❌ Galat.</b> ')+esc(q.why)}));
  const allC=['ai','comp','elec','math'].every(k=>got[k]>=2);
  card.append(nextBtn(hearts<=0||n>=N||allC?'Result dekho ›':'Spin again 🎡 ›',()=>{if(hearts<=0||n>=N||allC)finish();else wheelView();}));}
 function finish(){if(over)return;over=true;tl&&tl.stop();clearTimeout(spinT);const nc=['ai','comp','elec','math'].filter(k=>got[k]>=2).length;if(nc===4)score+=500;
  api.end({score,correct,total:n,win:nc===4,res:nc===4?'All 4 crowns! 👑':hearts<=0?'Out of hearts':'Blitz done',stat:`${correct}/${n} sahi · ${nc}/4 👑`,grid:grid.join('')+' '+'👑'.repeat(nc),review,badges:nc===4?['crown']:[]});}
 wheelView();return()=>{over=true;tl&&tl.stop();clearTimeout(spinT);};
}
register({id:'quiz',name:'Quiz Blitz',icon:'🧠',tag:'Wheel ghumao, crowns jeeto — AI, Computer, Electronics, Maths',glow:'rgba(61,220,132,.2)',
 desc:'Spin-wheel MCQ with combos & crowns.',
 how:['<b>Spin</b> karo → category milegi → 12 sec me answer.','3 sahi lagataar = <b>🔥 x2 points</b>. ⭐ = double bonus.','Har category me 2 sahi = <b>👑 crown</b>. 3 galat = game over.','Har answer ke baad short explanation — exam ke MCQ ke liye perfect.'],
 modes:[{id:'blitz',name:'Spin Blitz',desc:'10 questions · 3 hearts',icon:'🎡'}],
 start(api){return blitz(api);}});
})();
