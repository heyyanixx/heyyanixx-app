/* HEYYANIXX Learn Arcade — 🎬 Video Editing Zone
   Shortcut Rush · Timeline Fixer · Which Tool? · Phone Editor Quiz · Export Settings Challenge · Ease Eye (motion basics)
   Practice games — not affiliated with Adobe or Blackmagic Design. App names used descriptively only. */
(function(){
'use strict';
const {h,esc,shuffle,register}=HX;const V=window.BANK_VID;const nextBtn=HX.nextBtn;
const ZONE='vid';
const one=a=>a[Math.floor(Math.random()*a.length)];
const APP={pr:{n:'Premiere Pro',c:'#9b8cff'},ae:{n:'After Effects',c:'#c79bff'},dv:{n:'DaVinci Resolve',c:'#ff9b6a'}};
const mk=(it)=>{const opts=shuffle([it[1],...it[2]]);return{opts,a:opts.indexOf(it[1]),ans:it[1]};};

/* ---------- MCQ round engine (same feel as the Commerce zone) ---------- */
function mcqGame(api,cfg){
 const st={i:-1,score:0,correct:0,wrong:0,combo:0,maxCombo:0,grid:[],review:[],over:false};
 let tl=null,timer=null,keyH=null,cur=null,m=null,cleanupQ=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'+(cfg.cls?' '+cfg.cls:'')});sc.append(inner);api.stage.append(sc);
 function hud(){api.setHud(`<span class="h">Q <b>${Math.max(1,st.i+1)}/${cfg.total}</b></span><span class="h">Sahi <b>${st.correct}</b></span><span class="h">Combo ${st.combo>=5?'<span class="combo fire">🔥 '+st.combo+'</span>':'<b>'+st.combo+'</b>'}</span>`);}
 function next(){clearTimeout(timer);if(cleanupQ){cleanupQ();cleanupQ=null;}if(st.over)return;st.i++;if(st.i>=cfg.total)return done();
  cur=cfg.gen(st.i,st);if(!cur)return done();inner.innerHTML='';hud();
  const card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',{html:cur.kicker||''}),h('span',null,cur.meta||'')),h('div',{class:'qt',html:cur.qhtml||esc(cur.q)}));
  inner.append(card);if(cur.mount)cleanupQ=cur.mount(card)||null;
  m=HX.mcq(card,{opts:cur.opts,correct:cur.a,onAnswer:(ok)=>{tl&&tl.stop();after(ok,false,card);}});
  if(cfg.qtime)tl=HX.timerLoop(api,cfg.qtime,()=>{m.lock();after(false,true,card);});}
 function after(ok,to,card){if(st.over)return;const left=tl?tl.left:0;api.setTime(null);
  if(ok){st.correct++;st.combo++;st.maxCombo=Math.max(st.maxCombo,st.combo);st.grid.push('✅');st.score+=cfg.points(cur,left,st.combo);api.sfx.ok();if(st.combo%5===0)api.toast('🔥 '+st.combo+' ka combo!',1200);}
  else{st.wrong++;st.combo=0;st.grid.push(to?'⏱':'❌');api.sfx.no();api.vibrate(60);
   st.review.push(`<b>${esc(cur.rev||cur.q)}</b><br>Sahi: <span class="a">${esc(cur.ans)}</span><br>${esc(cur.why||'')}`);}
  api.setScore(st.score);hud();
  card.append(h('div',{class:'why',html:(ok?'✅ <b>Sahi!</b> ':to?'⏱ <b>Time up.</b> ':'❌ <b>Galat.</b> ')+(cur.whyhtml||esc(cur.why||''))}));
  const last=st.i+1>=cfg.total;card.append(nextBtn(last?'Result ›':'Next ›',last?done:next));sc.scrollTop=sc.scrollHeight;}
 function done(){if(st.over)return;st.over=true;clearTimeout(timer);tl&&tl.stop();if(cleanupQ){cleanupQ();cleanupQ=null;}removeEventListener('keydown',keyH);api.setTime(null);api.end(cfg.result(st));}
 keyH=e=>{if(st.over||e.target.matches&&e.target.matches('input'))return;const k=e.key.toLowerCase();const map={a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3};
  if(k in map&&m){const btn=inner.querySelectorAll('.opts .opt')[map[k]];if(btn&&!btn.disabled)btn.click();}else if(k==='enter'){const nb=inner.querySelector('.btn-gold.btn-block');if(nb)nb.click();}};
 addEventListener('keydown',keyH);next();
 return()=>{st.over=true;clearTimeout(timer);tl&&tl.stop();if(cleanupQ)cleanupQ();removeEventListener('keydown',keyH);};
}
const pts=(base)=>(q,left,combo)=>base+Math.round(left*8)+Math.min(combo,10)*10;
const srcNote=(ids)=>h('div',{class:'why vz-src'},h('b',null,'📌 Source: '),ids.map(i=>V.SRC[i]).join(' · '),h('br'),h('small',null,'Practice ke liye — Adobe / Blackmagic Design se affiliated nahi.'));

/* =============== 1. SHORTCUT RUSH =============== */
function kbd(s){return s.split(/( \/ | or |, )/).map(p=>/^( \/ | or |, )$/.test(p)?`<span class="vz-sep">${p.trim()}</span>`:p.split(' + ').map(k=>`<kbd>${esc(k)}</kbd>`).join('<span class="vz-plus">+</span>')).join(' ');}
function shortcutGame(api,mode){const N=12;const mac=mode.id==='mac';const apps=mode.id==='pr'||mode.id==='ae'||mode.id==='dv'?[mode.id]:['pr','ae','dv'];
 const pool=shuffle(V.keys.filter(k=>apps.includes(k.app)));let pi=0;const used=new Set();
 return mcqGame(api,{total:N,qtime:10,cls:'vz',
  gen(){let it;do{it=pool[pi++%pool.length];}while(used.has(it)&&used.size<pool.length);used.add(it);
   const key=mac?'m':'w';const right=it[key];const same=V.keys.filter(k=>k.app===it.app&&k[key]!==right);
   const wrong=[];shuffle(same).forEach(k=>{if(wrong.length<3&&!wrong.includes(k[key]))wrong.push(k[key]);});
   const opts=shuffle([right,...wrong]);const A=APP[it.app];
   return{kicker:`<span class="vz-app" style="--ac:${A.c}">${A.n}</span>`,meta:mac?'🍎 Mac':'🪟 Windows',
    qhtml:`${esc(it.h)}<small class="vz-cmd">Command: ${esc(it.n)}</small>`,q:A.n+': '+it.h,
    opts:opts.map(o=>o),a:opts.indexOf(right),ans:right,
    mount(card){setTimeout(()=>card.querySelectorAll('.opt span:last-child').forEach((s,i)=>{s.innerHTML=kbd(opts[i]);}),0);},
    whyhtml:`🪟 ${kbd(it.w)} &nbsp; 🍎 ${kbd(it.m)}<br><small>Source: ${esc(V.SRC[it.s])}</small>`,why:`Windows: ${it.w} · Mac: ${it.m} (${V.SRC[it.s]})`};},
  points:pts(100),
  result(st){const acc=Math.round(st.correct/N*100);
   return{score:st.score,correct:st.correct,total:N,res:st.correct>=10?'Shortcut Ninja! ⌨️':st.correct>=7?'Fast hands 🔥':'Practice karo',stat:`${st.correct}/${N} sahi · ${acc}%`,grid:st.grid.join(''),review:st.review,
    extra:srcNote(apps.includes('dv')&&apps.length===1?['dv']:apps.length===1&&apps[0]==='pr'?['pr','prjkl']:apps.length===1?['ae']:['pr','ae','dv']),badges:st.correct>=10?['scninja']:[]};}});}
register({id:'sc',zone:ZONE,name:'Shortcut Rush',icon:'⌨️',tag:'Premiere Pro · After Effects · DaVinci Resolve ki asli keyboard shortcuts — 10 sec me sahi key chuno',glow:'rgba(155,140,255,.25)',
 desc:'127 official shortcuts · Windows + Mac · 3 apps.',
 how:['Kaam dikhega (jaise “Ripple Delete”) → <b>sahi shortcut</b> chuno. 12 sawaal · 10 sec each.','Har app ka alag mode — ya <b>Mix</b>. <b>Mac mode</b> me Mac keys.','Har shortcut <b>official docs</b> se check kiya: Adobe Help Center aur Blackmagic ka DaVinci Resolve 20 Beginner’s Guide. Default keys hain — agar tumne customize kiya hai to alag ho sakti hain.','Keyboard pe <b>A/B/C/D</b> ya <b>1–4</b> se bhi answer.'],
 note:'Practice game — not affiliated with Adobe or Blackmagic Design. Premiere Pro & After Effects are Adobe trademarks (Adobe’s help pages now title the editor “Premiere”); DaVinci Resolve is a Blackmagic Design trademark.',
 modes:[{id:'mix',name:'Mix — sab apps',desc:'Windows keys · 12 Qs',icon:'🎬'},{id:'pr',name:'Premiere Pro',desc:'41 shortcuts',icon:'🟪'},{id:'ae',name:'After Effects',desc:'42 shortcuts',icon:'🟣'},{id:'dv',name:'DaVinci Resolve',desc:'44 shortcuts · pages, color, Fusion',icon:'🟠'},{id:'mac',name:'Mac mode (Mix)',desc:'Cmd / Option keys',icon:'🍎'}],
 start(api,mode){return shortcutGame(api,mode);}});

/* =============== 2. TIMELINE FIXER =============== */
function orderGame(api){const R=V.order.length;let r=0,score=0,correct=0,grid=[],review=[],over=false,sel=-1,cur=null,tries=0,tl=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function hud(){api.setHud(`<span class="h">Edit <b>${Math.min(r+1,R)}/${R}</b></span><span class="h">Perfect <b>${correct}</b></span>`);}
 function round(){if(over)return;if(r>=R)return finish();tries=0;sel=-1;const [title,clips]=V.order[r];let arr;do{arr=shuffle(clips.map((c,i)=>i));}while(arr.every((v,i)=>v===i));cur={title,clips,arr};render();
  tl&&tl.stop();tl=HX.timerLoop(api,45,()=>{check(true);});}
 function render(){inner.innerHTML='';hud();
  inner.append(h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'🎞️ Story order'),h('span',null,'Try '+(tries+1)+'/2')),h('div',{class:'qt'},cur.title),h('p',{class:'vz-hint'},'Do clips pe tap karo → swap. Sahi order banao: Hook se CTA tak.')));
  const tlx=h('div',{class:'vz-tl',role:'list','aria-label':'Timeline clips'});
  cur.arr.forEach((ci,pos)=>{tlx.append(h('button',{class:'vz-clip'+(sel===pos?' sel':''),role:'listitem','data-pos':pos,'aria-label':'Clip '+(pos+1)+': '+cur.clips[ci],onclick:()=>tap(pos)},h('span',{class:'vz-n'},String(pos+1)),h('span',null,cur.clips[ci])));});
  inner.append(tlx,h('button',{class:'btn btn-gold btn-block',style:'margin-top:12px',onclick:()=>check(false)},'✅ Check order'));}
 function tap(pos){api.sfx.tap();if(sel<0){sel=pos;}else if(sel===pos){sel=-1;}else{const a=cur.arr;[a[sel],a[pos]]=[a[pos],a[sel]];sel=-1;}render();}
 function check(timeout){if(over)return;const ok=cur.arr.every((v,i)=>v===i);
  if(!ok&&!timeout&&tries===0){tries++;api.sfx.no();api.vibrate(40);const right=cur.arr.filter((v,i)=>v===i).length;api.toast(`${right}/${cur.arr.length} sahi jagah pe — ek try aur!`,1600);render();return;}
  tl&&tl.stop();api.setTime(null);
  if(ok){correct++;score+=tries===0?300:180;grid.push(tries===0?'💎':'✅');api.sfx.ok();}else{grid.push(timeout?'⏱':'❌');api.sfx.no();review.push(`<b>${esc(cur.title)}</b><br>Sahi order: <span class="a">${cur.clips.map(esc).join(' → ')}</span>`);}
  api.setScore(score);inner.innerHTML='';hud();
  inner.append(h('div',{class:'qcard'},h('div',{class:'qt'},(ok?'✅ Perfect edit! ':'❌ Order thoda alag. ')+cur.title),h('ol',{class:'vz-right'},cur.clips.map(c=>h('li',null,c))),h('div',{class:'why'},'Short-form ka recommended structure: pehle 1–3 sec me hook, phir context, action, payoff, aur end pe CTA/loop.'),
   nextBtn(r+1>=R?'Result ›':'Agla edit ›',()=>{r++;round();})));}
 function finish(){if(over)return;over=true;tl&&tl.stop();api.setTime(null);api.end({score,correct,total:R,res:correct>=R?'Story Editor! 🎞️':correct>=3?'Achha flow':'Practice karo',stat:`${correct}/${R} edits perfect`,grid:grid.join(''),review,badges:correct>=R?['timeline']:[]});}
 round();return()=>{over=true;tl&&tl.stop();};}

function beatGame(api){const BPM=100,SPB=60/BPM,BEATS=16,LEAD=2;const total=(BEATS+LEAD+1)*SPB;
 let t=-0.6,raf,last=performance.now(),over=false,score=0,hits=0,perfect=0,miss=0,grid=[],taps=[];const beatT=[...Array(BEATS)].map((_,i)=>(i+LEAD)*SPB);const done=new Array(BEATS).fill(false);
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner',style:'text-align:center'});sc.append(inner);api.stage.append(sc);
 inner.append(h('p',{class:'kicker'},'🎵 Beat Cut · '+BPM+' BPM'),h('p',{class:'vz-hint'},'Playhead jab gold beat marker pe pahunche → CUT dabao (ya Space / C). 16 beats.'));
 const track=h('div',{class:'vz-beat'});const ph=h('i',{class:'vz-ph'});const flash=h('div',{class:'vz-flash'});
 beatT.forEach((bt,i)=>track.append(h('span',{class:'vz-mk','data-i':i,style:`left:${(bt/total*100).toFixed(2)}%`})));
 track.append(ph);const cut=h('button',{class:'btn btn-gold vz-cut','aria-label':'Cut on beat'},'✂️ CUT');const fb=h('div',{class:'vz-fb',role:'status'},'Ready…');
 inner.append(h('div',{class:'vz-stagebox'},flash,track),fb,cut);
 function hud(){api.setHud(`<span class="h">Hits <b>${hits}/${BEATS}</b></span><span class="h">Perfect <b>${perfect}</b></span>`);}hud();
 let lastBeat=-1;
 function loop(n){if(over)return;const dt=Math.min(.1,(n-last)/1000);last=n;if(!api.paused)t+=dt;
  ph.style.left=Math.max(0,Math.min(100,t/total*100))+'%';
  const bi=Math.floor((t-LEAD*SPB)/SPB+1e-6);if(t>=0&&Math.floor(t/SPB)!==lastBeat){lastBeat=Math.floor(t/SPB);flash.classList.remove('on');void flash.offsetWidth;flash.classList.add('on');}
  beatT.forEach((bt,i)=>{if(!done[i]&&t>bt+0.18){done[i]=true;miss++;grid.push('❌');mark(i,'miss');fb.textContent='Miss!';}});
  api.setTime(Math.max(0,1-t/total));
  if(t>=total)return finish();raf=requestAnimationFrame(loop);}
 function mark(i,cls){const el=track.querySelector('.vz-mk[data-i="'+i+'"]');if(el)el.classList.add(cls);}
 function doCut(){if(over)return;let bi=-1,bd=9;beatT.forEach((bt,i)=>{const d=Math.abs(t-bt);if(!done[i]&&d<bd){bd=d;bi=i;}});
  track.append(h('span',{class:'vz-cutmk',style:`left:${(Math.max(0,t)/total*100).toFixed(2)}%`}));
  if(bi<0||bd>0.18){score=Math.max(0,score-20);fb.textContent='Off-beat ✂️ (−20)';api.sfx.no();api.setScore(score);return;}
  done[bi]=true;hits++;if(bd<=0.06){perfect++;score+=100;grid.push('💎');fb.textContent='PERFECT! +100';mark(bi,'perf');api.sfx.ok();}else{score+=60;grid.push('✅');fb.textContent='Good +60 ('+Math.round(bd*1000)+' ms)';mark(bi,'good');api.sfx.tap();}
  api.setScore(score);hud();}
 cut.addEventListener('click',doCut);const kh=e=>{if(e.code==='Space'||e.key==='c'||e.key==='C'){e.preventDefault();doCut();}};addEventListener('keydown',kh);
 function finish(){if(over)return;over=true;cancelAnimationFrame(raf);removeEventListener('keydown',kh);api.setTime(null);
  api.end({score,correct:hits,total:BEATS,res:perfect>=10?'Beat Sync God! 🎵':hits>=12?'On the beat 🔥':'Rhythm practice karo',stat:`${hits}/${BEATS} beats · ${perfect} perfect`,grid:grid.join(''),
   extra:h('div',{class:'why'},h('b',null,'💡 Real edit me: '),'music play karo, har beat pe M (marker) dabao — Premiere aur DaVinci dono me M = Add Marker. Phir cuts/zoom markers pe snap karo.'),badges:perfect>=10?['beatsync']:[]});}
 raf=requestAnimationFrame(loop);return()=>{over=true;cancelAnimationFrame(raf);removeEventListener('keydown',kh);};}

function fixGame(api){const N=Math.min(10,V.fix.length);const deck=shuffle(V.fix).slice(0,N);
 return mcqGame(api,{total:N,qtime:20,gen(i){const it=deck[i];return Object.assign(mk(it),{kicker:'🩹 Fix the edit',meta:'Problem '+(i+1),q:it[0],why:it[3]});},points:pts(100),
  result(st){return{score:st.score,correct:st.correct,total:N,res:st.correct>=8?'Edit Doctor! 🩺':st.correct>=6?'Achha eye 👀':'Practice karo',stat:`${st.correct}/${N} fixes sahi`,grid:st.grid.join(''),review:st.review,badges:st.correct>=9?['timeline']:[]};}});}
register({id:'tl',zone:ZONE,name:'Timeline Fixer',icon:'🎞️',tag:'Clips ka order sahi karo, beat pe cut lagao, toota hua edit theek karo',glow:'rgba(255,155,106,.22)',
 desc:'Story order · Beat cut rhythm · Fix the edit.',
 how:['<b>Story Order</b>: clips shuffle hain — 2 clips tap karke swap karo, Hook → CTA order banao. 2 try.','<b>Beat Cut</b>: playhead gold marker pe pahunche tab ✂️ CUT (ya Space). ±60 ms = Perfect.','<b>Fix the Edit</b>: jump cut, audio pop, black flash… sahi fix chuno.'],
 note:'Story structures “recommended” creator practice hain, koi fixed rule nahi.',
 modes:[{id:'order',name:'Story Order',desc:'5 edits · tap to swap',icon:'🎞️'},{id:'beat',name:'Beat Cut',desc:'16 beats · rhythm',icon:'🎵'},{id:'fix',name:'Fix the Edit',desc:'10 problems',icon:'🩹'}],
 start(api,mode){return mode.id==='beat'?beatGame(api):mode.id==='fix'?fixGame(api):orderGame(api);}});

/* =============== 3. WHICH TOOL? =============== */
function toolGame(api,mode){const pool=mode.id==='mix'?V.tool:V.tool.filter(t=>t[4]===mode.app);const N=Math.min(12,pool.length);const deck=shuffle(pool).slice(0,N);
 return mcqGame(api,{total:N,qtime:15,gen(i){const it=deck[i];return Object.assign(mk(it),{kicker:'🛠️ Ye effect kaise banega?',meta:it[4],q:it[0],why:it[3]});},points:pts(100),
  result(st){return{score:st.score,correct:st.correct,total:N,res:st.correct>=N-2?'Tool Guru! 🛠️':st.correct>=N/2?'Sahi direction':'Practice karo',stat:`${st.correct}/${N} sahi`,grid:st.grid.join(''),review:st.review,badges:st.correct>=N-2?['toolguru']:[]};}});}
register({id:'wt',zone:ZONE,name:'Which Tool?',icon:'🛠️',tag:'“Ye effect kaise banega?” — sahi tool / panel / page chuno',glow:'rgba(199,155,255,.22)',
 desc:'Keyframes, masks, tracking, Lumetri, Fusion, Fairlight…',
 how:['Effect ka description aayega — speed ramp, green screen, tracking, grading… <b>sahi tool</b> chuno.','Premiere Pro, After Effects, DaVinci Resolve + general concepts.','15 sec per sawaal · har answer ke baad short explanation.'],
 note:'Practice game — not affiliated with Adobe or Blackmagic Design.',
 modes:[{id:'mix',name:'Mix',desc:'12 Qs · sab apps',icon:'🎬'},{id:'pr',app:'Premiere Pro',name:'Premiere Pro',desc:'Lumetri, Time Remap…',icon:'🟪'},{id:'ae',app:'After Effects',name:'After Effects',desc:'Pre-comp, Roto, Keylight…',icon:'🟣'},{id:'dv',app:'DaVinci Resolve',name:'DaVinci Resolve',desc:'Pages + nodes',icon:'🟠'}],
 start(api,mode){return toolGame(api,mode);}});

/* =============== 4. PHONE EDITOR QUIZ =============== */
function phoneGame(api,mode){const N=12;const deck=shuffle(V.phone).slice(0,N);
 return mcqGame(api,{total:N,qtime:mode.id==='speed'?8:15,gen(i){const it=deck[i];return Object.assign(mk(it),{kicker:'📱 Phone editing',meta:mode.id==='speed'?'⚡ 8 sec':'15 sec',q:it[0],why:it[3]});},points:pts(mode.id==='speed'?140:100),
  result(st){return{score:st.score,correct:st.correct,total:N,res:st.correct>=10?'Mobile Editor Pro! 📱':st.correct>=7?'Reel-ready':'Practice karo',stat:`${st.correct}/${N} sahi`,grid:st.grid.join(''),review:st.review,badges:st.correct>=10?['mobilepro']:[]};}});}
register({id:'ph',zone:ZONE,name:'Phone Editor Quiz',icon:'📱',tag:'Mobile editing ke concepts — keyframes, chroma key, speed ramp, 9:16, safe zone',glow:'rgba(61,220,132,.2)',
 desc:'CapCut / VN / Alight Motion / KineMaster style workflows.',
 how:['Phone editing ke <b>general concepts</b> — jo almost har editor app me milte hain (naam app ke hisaab se thoda alag ho sakta hai).','12 sawaal · Normal (15 sec) ya Speed (8 sec, zyada points).','Shorts/Reels ke liye vertical 9:16, safe zone, beat sync, copyright-safe music.'],
 note:'App names used descriptively only; features differ by app and version. Not affiliated with any app maker.',
 modes:[{id:'normal',name:'Normal',desc:'12 Qs · 15 sec',icon:'📱'},{id:'speed',name:'Speed Round',desc:'12 Qs · 8 sec',icon:'⚡'}],
 start(api,mode){return phoneGame(api,mode);}});

/* =============== 5. EXPORT SETTINGS CHALLENGE =============== */
function exportGame(api,mode){const N=mode.id==='scen'?V.scen.length:12;const deck=mode.id==='scen'?shuffle(V.scen):shuffle(V.export).slice(0,N);
 return mcqGame(api,{total:N,qtime:mode.id==='scen'?25:15,gen(i){const it=deck[i];const src=it[4];
   return Object.assign(mk(it),{kicker:mode.id==='scen'?'🎯 Scenario':'📤 Export',meta:src?(src==='ig'?'Instagram Help':'YouTube Help'):'recommended',q:it[0],why:it[3]+(src?' — '+V.SRC[src]:'')});},points:pts(mode.id==='scen'?200:100),
  result(st){return{score:st.score,correct:st.correct,total:N,res:st.correct>=N-1?'Export Pro! 📤':st.correct>=N/2?'Almost upload-ready':'Practice karo',stat:`${st.correct}/${N} sahi`,grid:st.grid.join(''),review:st.review,
   extra:srcNote(['yt','ytar','ytsh','ig']),badges:st.correct>=N-1?['exportpro']:[]};}});}
register({id:'ex',zone:ZONE,name:'Export Settings Challenge',icon:'📤',tag:'YT Shorts, Reels, long-form — sahi resolution, fps, codec, bitrate',glow:'rgba(255,90,95,.18)',
 desc:'Official YouTube & Instagram Help numbers.',
 how:['<b>Facts mode</b>: YouTube/Instagram ke official help pages ke numbers — MP4, H.264, 48 kHz, 8/12 Mbps, 9:16…','<b>Scenario mode</b>: “Free Fire 60fps Short” jaisi situation → poora export preset chuno.','Jo number official page pe nahi, use <b>recommended</b> likha hai.'],
 note:'Numbers as printed on YouTube Help and Instagram Help Center pages (read Oct 31, 2026); platforms change them — check before big uploads.',
 modes:[{id:'facts',name:'Facts Mode',desc:'12 Qs · official numbers',icon:'📤'},{id:'scen',name:'Scenario Mode',desc:'4 real uploads · 2x points',icon:'🎯'}],
 start(api,mode){return exportGame(api,mode);}});

/* =============== 6. EASE EYE — motion graphics basics =============== */
function curveSVG(b){const [x1,y1,x2,y2]=b;const P=(x,y)=>`${(8+x*84).toFixed(1)},${(92-y*70).toFixed(1)}`;
 return `<svg class="vz-curve" viewBox="0 0 100 100" aria-hidden="true"><rect x="8" y="22" width="84" height="70" fill="none" stroke="rgba(255,255,255,.12)"/><path d="M${P(0,0)} C${P(x1,y1)} ${P(x2,y2)} ${P(1,1)}" fill="none" stroke="#e3b65a" stroke-width="3"/><line x1="8" y1="92" x2="${(8+x1*84).toFixed(1)}" y2="${(92-y1*70).toFixed(1)}" stroke="rgba(255,255,255,.35)" stroke-dasharray="2 2"/><line x1="92" y1="22" x2="${(8+x2*84).toFixed(1)}" y2="${(92-y2*70).toFixed(1)}" stroke="rgba(255,255,255,.35)" stroke-dasharray="2 2"/></svg>`;}
function easeGame(api){const N=10;const E=V.ease;let kinds=shuffle(['dot','dot','dot','dot','graph','graph','stagger','q','q','q']);const qs=shuffle(V.motion);let qi=0;
 return mcqGame(api,{total:N,qtime:20,cls:'vz',
  gen(i){const kind=kinds[i];
   if(kind==='q'){const it=qs[qi++];return Object.assign(mk(it),{kicker:'🧠 Motion basics',meta:'Concept',q:it[0],why:it[3]});}
   if(kind==='stagger'){const st=Math.random()<.5;const right=st?'Stagger (ek ke baad ek)':'Sab ek saath (no stagger)';const opts=shuffle([right,st?'Sab ek saath (no stagger)':'Stagger (ek ke baad ek)','Random order','Ulta (reverse)']);
    return{kicker:'👁️ Watch',meta:'Stagger?',q:'Ye 4 dots kaise animate ho rahe hain?',opts,a:opts.indexOf(right),ans:right,why:'Stagger = same move, har item thode delay ke baad. Lists/titles ko premium feel deta hai.',
     mount(card){const box=h('div',{class:'vz-anim tall'});const dots=[0,1,2,3].map(k=>h('i',{class:'vz-dot',style:`top:${14+k*22}%`}));box.append(...dots);card.insertBefore(box,card.querySelector('.qt').nextSibling);
      const an=dots.map((d,k)=>d.animate([{left:'6%'},{left:'82%'}],{duration:900,delay:st?k*160:0,endDelay:st?(3-k)*160+500:500,easing:'cubic-bezier(.65,0,.35,1)',iterations:Infinity}));return()=>an.forEach(a=>a.cancel());}};}
   const e=one(E);const opts=shuffle(E.map(x=>x[1])).filter(x=>x!==e[1]).slice(0,3);opts.push(e[1]);const o=shuffle(opts);
   if(kind==='graph')return{kicker:'📈 Graph read',meta:'Value graph',qhtml:'Ye curve (time → value) kaunsi easing hai?'+curveSVG(e[3]),q:'Curve: '+e[1],opts:o,a:o.indexOf(e[1]),ans:e[1],why:e[4]};
   return{kicker:'👁️ Watch',meta:'Easing?',q:'Dot ki movement dekho — kaunsi easing hai?',opts:o,a:o.indexOf(e[1]),ans:e[1],whyhtml:esc(e[4])+curveSVG(e[3]),why:e[4],
    mount(card){const box=h('div',{class:'vz-anim'});const d=h('i',{class:'vz-dot',style:'top:40%'});const gh=h('i',{class:'vz-goal'});box.append(gh,d);card.insertBefore(box,card.querySelector('.qt').nextSibling);
     const a=d.animate([{left:'6%'},{left:'78%'}],{duration:1300,endDelay:600,easing:e[2],iterations:Infinity,fill:'both'});return()=>a.cancel();}};},
  points:pts(100),
  result(st){return{score:st.score,correct:st.correct,total:N,res:st.correct>=9?'Motion Eye! 👁️':st.correct>=6?'Smooth operator':'Practice karo',stat:`${st.correct}/${N} sahi`,grid:st.grid.join(''),review:st.review,badges:st.correct>=9?['motioneye']:[]};}});}
register({id:'mo',zone:ZONE,name:'Ease Eye',icon:'👁️',tag:'Motion graphics basics — easing, overshoot, stagger ko aankh se pehchano',glow:'rgba(227,182,90,.25)',
 desc:'Linear vs ease in/out vs overshoot · graphs · stagger.',
 how:['Dot animate hoga — <b>easing</b> pehchano: Linear, Ease In, Ease Out, Ease In-Out, Overshoot.','<b>Graph</b> rounds: curve dekh ke batao. <b>Stagger</b> round + motion concept sawaal.','Ye wahi basics hain jo After Effects, DaVinci Fusion, phone apps ya code-based motion tools sab me kaam aate hain.'],
 note:'Curves are standard CSS cubic-bezier easings, shown for learning.',
 modes:[{id:'mix',name:'Ease Eye',desc:'10 rounds · watch + graph + concepts',icon:'👁️'}],
 start(api,mode){return easeGame(api,mode);}});
})();
