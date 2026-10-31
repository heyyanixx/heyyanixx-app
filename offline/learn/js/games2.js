/* HEYYANIXX Learn Arcade — Prompt Master, Edit Sense, FF Brain, FF Quiz Run */
(function(){
'use strict';
const {h,esc,shuffle,pick,register}=HX;const B=window.BANK;const nextBtn=HX.nextBtn;

/* ================= PROMPT MASTER ================= */
const EMO=['⬛','🟨','🟩'];
function puzzle(api,daily){
 const dn=api.dayNum();const today=api.dayStr();let idx,rnd;
 const already=daily&&api.S.puz[today]&&api.S.puz[today].done;
 if(daily&&!already){idx=((dn%B.puz.length)+B.puz.length)%B.puz.length;rnd=api.seeded(dn*7919+13);}else{idx=Math.random()*B.puz.length|0;rnd=Math.random;}
 if(already)api.toast('Aaj ka daily ho gaya ✅ — ye practice puzzle hai',2200);
 const isDaily=daily&&!already;const P=B.puz[idx];const MAXT=4;
 const slots=P.slots.map(s=>({n:s.n,o:api.sshuffle(s.o,rnd),sel:-1,known:{},lock:false}));
 let tries=0,rows=[],over=false,openI=0;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function hud(){api.setHud(`<span class="h">${isDaily?'📅 Daily #'+(dn+1):'🎲 Practice'}</span><span class="h">Try <b>${Math.min(tries+1,MAXT)}/${MAXT}</b></span>`);}
 function render(){inner.innerHTML='';hud();
  inner.append(h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'🎯 Goal'),h('span',null,'Perfect prompt banao')),h('div',{class:'qt'},P.goal),h('p',{class:'note',style:'text-align:left;margin:6px 0 0'},'Har slot me best option chuno → Check. 🟩 best · 🟨 thoda vague · ⬛ galat. 4 tries.')));
  slots.forEach((s,i)=>{const g=s.lock?2:(s.sel>=0&&s.known[s.sel]!=null&&rows.length?s.known[s.sel]:null);
   const cls='slot'+(s.lock?' g2':'')+(openI===i&&!s.lock&&!over?' open':'');
   const sv=s.sel>=0?h('span',{class:'sv'},s.o[s.sel].t):h('span',{class:'sv empty'},'Tap karke choose karo…');
   const head=h('button',{onclick:()=>{if(s.lock||over)return;openI=openI===i?-1:i;render();},'aria-expanded':String(openI===i)},h('span',{class:'sn'},s.n),sv);
   const so=h('div',{class:'sopts'});s.o.forEach((o,k)=>{const kn=s.known[k];so.append(h('button',{class:'sopt'+(kn===0?' x':kn===1?' y':'')+(s.sel===k?' sel':''),onclick:()=>{s.sel=k;api.sfx.tap();openI=slots.findIndex((x,j)=>j>i&&!x.lock&&x.sel<0);if(openI<0)openI=-1;render();}},o.t));});
   inner.append(h('div',{class:cls},head,so));});
  if(rows.length)inner.append(h('div',{class:'hist','aria-label':'Tries'},rows.map(r=>h('div',null,r))));
  if(!over){const ready=slots.every(s=>s.sel>=0);inner.append(h('button',{class:'btn btn-gold btn-block',style:'margin-top:12px',disabled:!ready||null,onclick:check},ready?'✔ Check prompt':'Saare 5 slots choose karo'));}}
 function check(){tries++;let row='';slots.forEach(s=>{const g=s.o[s.sel].g;s.known[s.sel]=g;row+=EMO[g];if(g===2)s.lock=true;});rows.push(row);
  const win=slots.every(s=>s.lock);
  if(win){api.sfx.win();api.confetti(100);}else{api.sfx[row.includes('⬛')?'no':'tick']();slots.forEach(s=>{if(!s.lock)s.sel=-1;});}
  openI=slots.findIndex(s=>!s.lock);
  if(win||tries>=MAXT){over=true;render();const best=slots.map(s=>s.o.find(o=>o.g===2).t).join(' ');
   inner.append(h('div',{class:'qmeta',style:'margin-top:14px'},h('span',null,win?'✅ Tumhara perfect prompt':'💡 Perfect prompt ye tha')),h('div',{class:'final-prompt'},best),h('div',{class:'why',html:'<b>Tip:</b> '+esc(P.tip)}));
   const score=win?[1000,800,600,400][tries-1]:slots.filter(s=>s.lock).length*60;
   if(isDaily){api.S.puz[today]={done:true,tries:win?tries:'X'};api.save();}
   const grid=`🧠 Prompt Master ${isDaily?'#'+(dn+1):'practice'} ${win?tries:'X'}/${MAXT}\n`+rows.join('\n');
   inner.append(nextBtn('Result + share ›',()=>api.end({score,solved:win&&isDaily,practice:!isDaily,correct:win?1:0,win,res:win?(tries<=2?'Prompt genius! 🧠':'Solved!'):'Next time pakka',stat:`${win?tries:'X'}/${MAXT} tries`,grid,badges:win&&tries<=2?['prompt']:[]})));}
  else render();}
 render();return()=>{over=true;};
}
function duel(api){
 const items=pick(B.duel,8);let i=-1,score=0,correct=0,grid=[],review=[],tl=null,over=false;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 function next(){i++;if(i>=items.length)return done();const it=items[i];inner.innerHTML='';api.setHud(`<span class="h">Round <b>${i+1}/${items.length}</b></span><span class="h">Sahi <b>${correct}</b></span>`);
  const goodFirst=Math.random()<.5;const opts=goodFirst?[it.good,it.weak]:[it.weak,it.good];
  const card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'⚔️ Prompt Duel'),h('span',null,'12 sec')),h('div',{class:'qt'},'Goal: '+it.goal),h('p',{class:'note',style:'text-align:left;margin:4px 0 0'},'Kaunsa prompt better answer dilayega?'));inner.append(card);
  const m=HX.mcq(card,{opts,correct:goodFirst?0:1,keys:'AB',onAnswer:ok=>{tl&&tl.stop();after(ok);}});
  function after(ok,to){if(ok){correct++;score+=150+Math.round((tl?tl.left:0)*10);grid.push('✅');api.sfx.ok();}else{grid.push(to?'⏱':'❌');api.sfx.no();review.push(`<b>${esc(it.goal)}</b><br>Better: <span class="a">${esc(it.good)}</span><br>${esc(it.tip)}`);}
   api.setScore(score);api.setTime(null);card.append(h('div',{class:'why',html:'<b>Kyun?</b> '+esc(it.tip)}),nextBtn(i+1<items.length?'Next duel ›':'Result ›',next));}
  tl=HX.timerLoop(api,12,()=>{m.lock();after(false,true);});}
 function done(){if(over)return;over=true;tl&&tl.stop();api.end({score,correct,total:items.length,practice:true,res:'Duel done',stat:`${correct}/${items.length} sahi`,grid:grid.join(''),review});}
 next();return()=>{over=true;tl&&tl.stop();};
}
register({id:'prompt',name:'Prompt Master',icon:'🤖',tag:'Roz ek Prompt Puzzle — Wordle style, emoji grid share karo',glow:'rgba(180,140,255,.22)',
 desc:'Daily AI-prompt puzzle + prompt duels.',
 how:['Har din <b>1 naya puzzle</b>: goal ke liye Role, Task, Context, Format, Limit choose karo.','Check karo → 🟩 best · 🟨 vague · ⬛ galat. <b>4 tries</b> me perfect prompt banao.','Result ka <b>emoji grid</b> dosto ko bhejo — Wordle jaisa 😎','<b>Prompt Duel</b>: do prompts me better wala pakdo.'],
 modes:[{id:'daily',name:'Daily Prompt Puzzle',desc:'Aaj ka puzzle · ek baar',icon:'📅',daily:true},{id:'practice',name:'Practice Puzzle',desc:'Random puzzle · unlimited',icon:'🎲'},{id:'duel',name:'Prompt Duel',desc:'Better prompt pakdo · 8 rounds',icon:'⚔️'}],
 start(api,mode){if(mode.id==='duel')return duel(api);return puzzle(api,mode.id==='daily');}});

/* ================= EDIT SENSE ================= */
const CONFLICT=[['Color correction','White balance','Color grading','LUT'],['9:16','1080×1920','Aspect ratio','16:9','4:5'],['16:9','1280×720'],['Match cut','Cut on action','Jump cut'],['FPS','24 fps']];
function conflicts(a,b){return CONFLICT.some(g=>g.includes(a)&&g.includes(b));}
function swipeGame(api){
 const gl=shuffle(B.edit);const deck=[];
 gl.slice(0,26).forEach((e,i)=>{if(i%2===0)deck.push({term:e.t,mean:e.m,v:true,ans:e.m});else{const o=shuffle(B.edit).find(x=>x.t!==e.t&&!conflicts(x.t,e.t));deck.push({term:e.t,mean:o.m,v:false,ans:e.m});}});
 B.editTF.forEach(s=>deck.splice(Math.floor(Math.random()*deck.length),0,{stmt:s.s,v:s.v,why:s.why}));
 const LIMIT=60;let t=0,i=0,score=0,combo=0,correct=0,wrong=0,grid=[],review=[],over=false,raf,last=performance.now();
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner',style:'text-align:center'});sc.append(inner);api.stage.append(sc);
 const area=h('div',{class:'swipe-area'});const btnN=h('button',{class:'n','aria-label':'Galat (swipe left)'},'✗');const btnY=h('button',{class:'y','aria-label':'Sahi (swipe right)'},'✓');
 inner.append(h('p',{class:'kicker'},'⬅ Galat · Sahi ➡'),area,h('div',{class:'swbtns'},btnN,btnY),h('p',{class:'note'},'Swipe ya buttons. Keyboard: ← →'));
 function cardEl(c,back){const el=h('div',{class:'scard'+(back?' back':'')},h('span',{class:'lbl yes'},'Sahi'),h('span',{class:'lbl nope'},'Galat'));
  if(c.stmt){el.append(h('div',{class:'eq'},'Sach ya jhooth?'),h('div',{class:'stmt'},c.stmt));}else{el.append(h('div',{class:'term'},c.term),h('div',{class:'eq'},'matlab'),h('div',{class:'mean'},c.mean));}return el;}
 let cur=null,curEl=null;
 function show(){area.innerHTML='';if(i>=deck.length)return end();cur=deck[i];if(deck[i+1])area.append(cardEl(deck[i+1],true));curEl=cardEl(cur,false);area.append(curEl);bind(curEl);}
 function hud(){api.setHud(`<span class="h">Sahi <b>${correct}</b></span><span class="h">Galat <b>${wrong}</b></span><span class="h">Combo ${combo>=5?'<span class="combo fire">🔥 x2</span>':'<b>'+combo+'</b>'}</span>`);}
 function decide(yes){if(over||!cur)return;const ok=yes===cur.v;const el=curEl;el.style.transition='transform .3s,opacity .3s';el.style.transform=`translateX(${yes?420:-420}px) rotate(${yes?24:-24}deg)`;el.style.opacity='0';
  if(ok){correct++;combo++;score+=50+Math.min(combo,10)*10*(combo>=5?2:1);grid.push('✅');api.sfx.ok();}
  else{wrong++;combo=0;grid.push('❌');api.sfx.no();api.vibrate(50);const fix=cur.stmt?cur.why:`${cur.term} = ${cur.ans}`;api.toast((cur.stmt?(cur.v?'Ye SACH tha: ':'Ye JHOOTH tha: '):'❌ ')+fix,2600);review.push(cur.stmt?`<b>${esc(cur.stmt)}</b><br><span class="a">${cur.v?'Sach':'Jhooth'}</span> — ${esc(cur.why)}`:`<b>${esc(cur.term)}</b> = <span class="a">${esc(cur.ans)}</span>`);}
  api.setScore(score);hud();cur=null;i++;setTimeout(show,180);}
 function bind(el){let sx=0,dx=0,drag=false;el.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;dx=0;el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(!drag)return;dx=e.clientX-sx;el.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`;el.querySelector('.yes').style.opacity=Math.max(0,dx/90);el.querySelector('.nope').style.opacity=Math.max(0,-dx/90);});
  const up=()=>{if(!drag)return;drag=false;if(Math.abs(dx)>80)decide(dx>0);else{el.style.transition='transform .2s';el.style.transform='';el.querySelectorAll('.lbl').forEach(l=>l.style.opacity=0);setTimeout(()=>el.style.transition='',220);}};
  el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);}
 btnN.onclick=()=>decide(false);btnY.onclick=()=>decide(true);
 const key=e=>{if(e.key==='ArrowLeft')decide(false);if(e.key==='ArrowRight')decide(true);};addEventListener('keydown',key);
 function loop(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!api.paused&&!over){t+=dt;api.setTime(1-t/LIMIT);if(t>=LIMIT)return end();}raf=requestAnimationFrame(loop);}
 function end(){if(over)return;over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);api.setTime(null);const acc=correct+wrong?Math.round(correct/(correct+wrong)*100):0;
  api.end({score,correct,total:correct+wrong,res:correct>=15?'Editor brain! 🎬':'Time up',stat:`${correct} sahi · ${acc}% accuracy`,grid:grid.slice(0,30).join(''),review,badges:correct>=15?['edit']:[]});}
 hud();show();raf=requestAnimationFrame(loop);
 return()=>{over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);};
}
register({id:'edit',name:'Edit Sense',icon:'🎬',tag:'Swipe right = sahi, left = galat — editing terms in 60 sec',glow:'rgba(255,90,140,.2)',
 desc:'Swipe-match: 9:16, J-cut, LUT, fps…',
 how:['Card par editing term + matlab aata hai. <b>Sahi → right swipe</b>, galat → left.','60 second. 5 ka combo = <b>🔥 x2</b>.','Galat hone par turant sahi matlab dikhta hai — Shorts/Reels editing ke liye kaam ki cheezein.'],
 modes:[{id:'swipe',name:'Swipe Match · 60 sec',desc:'Cuts, ratios, fps, colour, hooks',icon:'👉'}],
 start(api){return swipeGame(api);}});

/* ================= FF BRAIN — survive the zone ================= */
function zoneGame(api){
 const qs=pick(B.ff,10);const N=qs.length;let i=-1,hp=100,alive=50,score=0,correct=0,grid=[],review=[],tl=null,over=false,raf;
 let R=1,Rt=1,flash=0;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'});sc.append(inner);api.stage.append(sc);
 const zc=h('div',{class:'zone'});const C=HX.makeCanvas(zc);const hpBar=h('div',{class:'bar'},h('i'));const hpRow=h('div',{class:'hp'},h('span',null,'HP'),hpBar,h('span',{class:'hpv'},'100'));
 const qbox=h('div');inner.append(zc,hpRow,qbox);
 function draw(){const x=C.ctx,W=C.W,H=C.H;x.clearRect(0,0,W,H);const cx=W/2,cy=H/2,M=Math.min(W,H)*.48;
  x.fillStyle='#0d1310';x.beginPath();x.ellipse(cx,cy,M*1.9,M,0,0,7);x.fill();
  x.fillStyle='rgba(60,90,70,.35)';for(let k=0;k<7;k++){x.beginPath();x.arc(cx+Math.cos(k*1.7)*M*1.1,cy+Math.sin(k*2.3)*M*.6,M*.18,0,7);x.fill();}
  R+=(Rt-R)*.08;const r=M*.95*R;
  x.save();x.beginPath();x.rect(0,0,W,H);x.moveTo(cx+r,cy);x.arc(cx,cy,r,0,Math.PI*2,true);x.closePath();x.fillStyle='rgba(80,120,255,.28)';x.fill('evenodd');x.restore();
  x.strokeStyle='#fff';x.lineWidth=2.5;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();
  x.fillStyle='#e3b65a';x.beginPath();x.arc(cx,cy,6,0,7);x.fill();x.strokeStyle='rgba(227,182,90,.5)';x.beginPath();x.arc(cx,cy,12+Math.sin(performance.now()/200)*3,0,7);x.stroke();
  x.fillStyle='#fff';x.font='800 12px Inter,Arial';x.textAlign='left';x.fillText('ALIVE '+alive,10,18);x.textAlign='right';x.fillText('ZONE '+Math.round(R*100)+'%',W-10,18);
  if(flash>0){x.fillStyle='rgba(255,60,60,'+flash+')';x.fillRect(0,0,W,H);flash*=.9;if(flash<.02)flash=0;}
  raf=requestAnimationFrame(draw);}
 function stats(){hpBar.querySelector('i').style.width=hp+'%';hpRow.querySelector('.hpv').textContent=hp;api.setHud(`<span class="h">Q <b>${Math.min(i+1,N)}/${N}</b></span><span class="h">👥 Alive <b>${alive}</b></span><span class="h">❤️ <b>${hp}</b></span>`);}
 function next(){i++;if(i>=N||hp<=0)return finish();const q=qs[i];qbox.innerHTML='';stats();const opts=shuffle([q.a,...q.o]);
  const card=h('div',{class:'qcard',style:'margin-top:10px'},h('div',{class:'qmeta'},h('span',null,'🎯 FF Brain'),h('span',null,'12 sec')),h('div',{class:'qt'},q.q));qbox.append(card);
  const m=HX.mcq(card,{opts,correct:opts.indexOf(q.a),onAnswer:ok=>{tl&&tl.stop();after(ok,q,card);}});
  tl=HX.timerLoop(api,12,()=>{m.lock();after(false,q,card,true);});}
 function after(ok,q,card,to){if(over)return;api.setTime(null);
  if(ok){correct++;alive=Math.max(1,50-Math.round(correct*49/N));score+=120+Math.round((tl?tl.left:0)*10);grid.push('🎯');api.sfx.ok();}
  else{hp=Math.max(0,hp-25);Rt=Math.max(.2,Rt-.2);flash=.5;grid.push(to?'⏱':'🩸');api.sfx.no();api.vibrate(90);review.push(`<b>${esc(q.q)}</b><br>Sahi: <span class="a">${esc(q.a)}</span> — ${esc(q.why)}`);}
  api.setScore(score);stats();
  card.append(h('div',{class:'why',html:(ok?'<b>✅ Enemy down!</b> ':'<b>💥 Zone damage −25 HP.</b> ')+esc(q.why)}),nextBtn(hp<=0?'Eliminated… result ›':i+1>=N?'Final circle ›':'Next ›',next));}
 function finish(){if(over)return;over=true;tl&&tl.stop();cancelAnimationFrame(raf);C.stop();const win=hp>0;if(win)score+=hp*5;
  api.end({score,correct,total:N,win,booyah:win,res:win?'Survived the zone':'Eliminated · Rank #'+alive,stat:`${correct}/${N} sahi · HP ${hp}`,grid:grid.join('')+(win?' 🏆':' 💀'),review,badges:win?['booyah']:[]});}
 raf=requestAnimationFrame(draw);next();
 return()=>{over=true;tl&&tl.stop();cancelAnimationFrame(raf);C.stop();};
}
register({id:'ff',name:'FF Brain',icon:'🎯',tag:'Survive the zone — galat answer = zone damage. Booyah tak pahuncho!',glow:'rgba(80,120,255,.22)',
 desc:'Free Fire tactics quiz · fan-made.',
 how:['10 questions: rotations, zone, guns, character skills, basics.','<b>Galat ya time-up = −25 HP</b> aur safe zone chhota. 0 HP = eliminated.','Sahi answer = enemies kam. Survive karo → <b>BOOYAH!</b> 🏆'],
 note:'Fan-made quiz. Not affiliated with or endorsed by Garena. Game details can change with updates.',
 modes:[{id:'zone',name:'Survive the Zone',desc:'10 Qs · 100 HP',icon:'🌀'}],
 start(api){return zoneGame(api);}});

/* ================= FF QUIZ RUN — Craftland-style quiz runner ================= */
function runGame(api){
 const NQ=15,CP=5;let pool=shuffle(B.ff);const draw1=()=>{if(!pool.length)pool=shuffle(B.ff);return pool.pop();};
 const wrap=h('div',{style:'position:absolute;inset:0;max-width:640px;margin:0 auto'});const cvBox=h('div',{style:'position:absolute;inset:0'});const qEl=h('div',{class:'runq'});const lb=h('div',{class:'lanebtns',style:'grid-template-columns:repeat(3,1fr)'});
 wrap.append(cvBox,qEl,lb);api.stage.append(wrap);const C=HX.makeCanvas(cvBox),x=C.ctx;
 let qn=0,lives=3,score=0,combo=0,correct=0,lane=1,px=1,state='run',d=1.4,T=8,q=null,opts=[],grid=[],review=[],over=false,raf,last=performance.now(),scroll=0,fallT=0,msg='',msgT=0,shake=0,booyahD=-1,runT=0,checkpoint=0,passT=0;
 const lbBtns=[0,1,2].map(k=>{const b=h('button',{onclick:()=>setLane(k)},'');lb.append(b);return b;});
 function setLane(k){if(state!=='run')return;lane=k;api.sfx.tap();lbBtns.forEach((b,j)=>b.classList.toggle('sel',j===k));}
 function hud(){api.setHud(`<span class="h">${'❤️'.repeat(lives)}${'🖤'.repeat(3-lives)}</span><span class="h">Q <b>${Math.min(qn+1,NQ)}/${NQ}</b></span><span class="h">🚩 CP <b>${Math.floor(checkpoint/CP)}</b></span>`);}
 function newQ(){q=draw1();opts=shuffle([q.a,...pick(q.o,2)]);d=1.25;T=Math.max(4.6,7.6-qn*.22);qEl.innerHTML='';qEl.append(h('small',null,`Q ${qn+1}/${NQ} · checkpoint har ${CP} Qs pe`),document.createTextNode(q.q));opts.forEach((o,k)=>{lbBtns[k].textContent=o;});setLane(lane);hud();}
 function proj(z){const hz=C.H*.30,by=C.H-(lb.offsetHeight||70)-26;const s=1/(1+Math.max(z,-.12)*6.5);return{s,y:hz+(by-hz)*s,hw:C.W*.47*s,cx:C.W/2};}
 // swipe
 let sx=null;cvBox.addEventListener('pointerdown',e=>{sx=e.clientX;});cvBox.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>30)setLane(Math.max(0,Math.min(2,lane+(dx>0?1:-1))));else{const r=cvBox.getBoundingClientRect();setLane(Math.max(0,Math.min(2,Math.floor((e.clientX-r.left)/r.width*3))));}});
 const key=e=>{if(e.key==='ArrowLeft')setLane(Math.max(0,lane-1));if(e.key==='ArrowRight')setLane(Math.min(2,lane+1));};addEventListener('keydown',key);
 function judge(){const ok=opts[lane]===q.a;if(ok){correct++;combo++;qn++;score+=150+combo*20+Math.round(T*5);grid.push('🟩');api.sfx.ok();passT=.5;msg=qn%CP===0&&qn<NQ?'🚩 CHECKPOINT!':combo>=3?'🔥 x'+combo:'NICE!';msgT=1;if(qn%CP===0)checkpoint=qn;api.setScore(score);
   if(qn>=NQ){state='booyah';booyahD=1.3;qEl.innerHTML='<small>FINAL</small>Booyah platform ki taraf daudo! 🏆';lb.style.visibility='hidden';hud();return;}
   state='gap';setTimeout(()=>{if(over)return;state='run';newQ();},650);}
  else{combo=0;lives--;grid.push('🟥');api.sfx.no();api.vibrate(120);shake=14;state='fall';fallT=0;review.push(`<b>${esc(q.q)}</b><br>Sahi gate: <span class="a">${esc(q.a)}</span> — ${esc(q.why)}`);msg='KNOCKED! 💥';msgT=1.2;
   setTimeout(()=>{if(over)return;if(lives<=0)return end(false);qn=checkpoint;api.toast(checkpoint?`🚩 Checkpoint ${checkpoint/CP} se respawn`:'Start se respawn',1600);state='run';newQ();},1400);}
  hud();}
 function drawChar(cx,by,s,fall){const sc=1.05*(fall?Math.max(.1,1-fallT):1);const y=by+(fall?fallT*120:0);const legs=Math.sin(runT*14)*7;
  x.save();x.translate(cx,y);x.scale(sc,sc);x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.ellipse(0,4,22,6,0,0,7);x.fill();
  x.strokeStyle='#1a1408';x.lineWidth=7;x.lineCap='round';x.beginPath();x.moveTo(-6,-22);x.lineTo(-8+legs,0);x.moveTo(6,-22);x.lineTo(8-legs,0);x.stroke();
  x.fillStyle='#e3b65a';HX.rr(x,-14,-56,28,38,12);x.fill();x.fillStyle='#b88a36';x.fillRect(-14,-34,28,5);
  x.fillStyle='#f6d892';x.beginPath();x.arc(0,-66,13,0,7);x.fill();x.fillStyle='#0b0b10';HX.rr(x,-10,-71,20,9,4);x.fill();x.fillStyle='#7ad7ff';x.fillRect(-7,-69,6,3);
  x.strokeStyle='#e3b65a';x.lineWidth=6;x.beginPath();x.moveTo(-14,-48);x.lineTo(-22,-34-legs*.6);x.moveTo(14,-48);x.lineTo(22,-34+legs*.6);x.stroke();x.restore();}
 function wrapText(t,maxW,font){x.font=font;const words=t.replace(/\//g,'/ ').split(' ');const lines=[];let cur='';for(const w of words){const tt=cur?(cur.endsWith('/')?cur+w:cur+' '+w):w;if(x.measureText(tt).width>maxW&&cur){lines.push(cur);cur=w;}else cur=tt;}if(cur)lines.push(cur);return lines.slice(0,3);}
 function render(dt){const W=C.W,H=C.H;x.save();x.clearRect(0,0,W,H);if(shake>0){x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.88;if(shake<.5)shake=0;}
  const sky=x.createLinearGradient(0,0,0,H*.4);sky.addColorStop(0,'#07070c');sky.addColorStop(1,'#3a2a10');x.fillStyle=sky;x.fillRect(-20,-20,W+40,H+40);
  x.fillStyle='#e3b65a';x.globalAlpha=.85;x.beginPath();x.arc(W/2,H*.3,46,Math.PI,0);x.fill();x.globalAlpha=1;
  const vg=x.createLinearGradient(0,H*.3,0,H);vg.addColorStop(0,'#120e08');vg.addColorStop(1,'#050507');x.fillStyle=vg;x.fillRect(-20,H*.3,W+40,H);
  for(let k=0;k<26;k++){const sx2=(k*97%W),sy=H*.34+((k*53+scroll*80)%(H*.66));x.fillStyle='rgba(227,182,90,.25)';x.fillRect(sx2,sy,2,2);}
  const far=proj(1.6),near=proj(-.12);
  x.fillStyle='#1b1712';x.beginPath();x.moveTo(far.cx-far.hw,far.y);x.lineTo(far.cx+far.hw,far.y);x.lineTo(near.cx+near.hw,near.y);x.lineTo(near.cx-near.hw,near.y);x.closePath();x.fill();
  for(let k=0;k<14;k++){const z1=((k-scroll)%14)/14*1.6,z2=z1+.055;if(z1<-.1)continue;const a=proj(z1),b=proj(z2);x.fillStyle='rgba(227,182,90,.10)';x.beginPath();x.moveTo(a.cx-a.hw,a.y);x.lineTo(a.cx+a.hw,a.y);x.lineTo(b.cx+b.hw,b.y);x.lineTo(b.cx-b.hw,b.y);x.fill();}
  x.strokeStyle='#e3b65a';x.lineWidth=3;x.beginPath();x.moveTo(far.cx-far.hw,far.y);x.lineTo(near.cx-near.hw,near.y);x.moveTo(far.cx+far.hw,far.y);x.lineTo(near.cx+near.hw,near.y);x.stroke();
  x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=1.5;x.setLineDash([10,12]);[-1/3,1/3].forEach(f=>{x.beginPath();x.moveTo(far.cx+far.hw*f,far.y);x.lineTo(near.cx+near.hw*f,near.y);x.stroke();});x.setLineDash([]);
  // gates
  if((state==='run'||state==='fall')&&q&&d>-.12){const p=proj(d);const lw=p.hw*2/3;x.textAlign='center';x.textBaseline='middle';
   opts.forEach((o,k)=>{const gx=p.cx-p.hw+lw*k+lw/2;const gw=lw*.86,gh=Math.max(14,190*p.s);const top=p.y-gh;
    x.fillStyle=k===lane?'rgba(227,182,90,.28)':'rgba(255,255,255,.10)';HX.rr(x,gx-gw/2,top,gw,gh,Math.max(3,10*p.s));x.fill();
    x.strokeStyle=k===lane?'#f6d892':'rgba(255,255,255,.55)';x.lineWidth=Math.max(1,3*p.s);x.stroke();
    let fs=Math.max(7,Math.min(17,40*p.s)),lines=wrapText(o,gw-8,`800 ${fs}px Inter,Arial`);while(fs>6&&lines.some(l=>x.measureText(l).width>gw-6)){fs-=1;lines=wrapText(o,gw-8,`800 ${fs}px Inter,Arial`);}if(lines.some(l=>x.measureText(l).width>gw-4)){x.save();x.beginPath();x.rect(gx-gw/2,top,gw,gh);x.clip();}const clipped=lines.some(l=>x.measureText(l).width>gw-4);x.fillStyle='#fff';lines.forEach((ln,j)=>x.fillText(ln,gx,top+gh*.35+(j-(lines.length-1)/2)*fs*1.15));if(clipped)x.restore();});}
  // booyah platform
  if(state==='booyah'||state==='won'){const p=proj(Math.max(booyahD,0));x.fillStyle='#e3b65a';x.beginPath();x.ellipse(p.cx,p.y,p.hw*.9,p.hw*.25,0,0,7);x.fill();x.fillStyle='#060608';x.font=`${Math.max(10,60*p.s)}px Anton,Impact,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('BOOYAH',p.cx,p.y);}
  // character
  const pp=proj(0);px+=(lane-px)*Math.min(1,dt*12);const lw0=pp.hw*2/3;const cxp=pp.cx-pp.hw+lw0*px+lw0/2;drawChar(cxp,pp.y+18,pp.s,state==='fall');
  if(passT>0){x.fillStyle='rgba(61,220,132,'+passT*.5+')';x.fillRect(0,0,W,H);}
  if(state==='fall'){x.fillStyle='rgba(255,40,40,'+Math.min(.35,fallT*.4)+')';x.fillRect(0,0,W,H);}
  if(msgT>0){x.globalAlpha=Math.min(1,msgT*2);x.fillStyle=msg.startsWith('KNOCK')?'#ff5a5f':'#f6d892';x.font='34px Anton,Impact,sans-serif';x.textAlign='center';x.fillText(msg,W/2,H*.47);x.globalAlpha=1;}
  x.restore();}
 function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!api.paused&&!over){runT+=dt;const spd=state==='fall'?0:(state==='gap'?1.2:1/T*1.6);scroll=(scroll+dt*spd*6)%14;passT=Math.max(0,passT-dt);msgT=Math.max(0,msgT-dt);
   if(state==='run'){d-=dt*1.25/T;api.setTime(Math.max(0,d/1.25));if(d<=0){api.setTime(null);judge();}}
   else if(state==='fall'){fallT+=dt*1.4;d-=dt*.5;}
   else if(state==='booyah'){booyahD-=dt*.7;if(booyahD<=0){state='won';end(true);}}}
  render(dt);if(!over)raf=requestAnimationFrame(loop);}
 function end(win){if(over)return;over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);C.stop();if(win)score+=lives*200;
  api.end({score,correct:qn,total:NQ,win,booyah:win,res:win?'Craft Run complete':'Knocked out · reached Q'+(qn+1),stat:`${qn}/${NQ} gates · ${lives} ❤️ left`,grid:grid.join('')+(win?' 🏆':' 💀'),review,badges:win?['runner']:[]});}
 newQ();raf=requestAnimationFrame(loop);
 return()=>{over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);C.stop();};
}
register({id:'run',name:'FF Quiz Run',icon:'🏃',tag:'Craftland-style quiz runner — sahi gate se daudo, galat = girna!',glow:'rgba(255,170,60,.25)',wide:true,
 desc:'Run, choose the right gate, reach the Booyah platform.',
 how:['Character aage daudta hai, <b>question aata hai</b> aur 3 answer gates.','<b>Swipe / tap</b> karke sahi lane chuno. Galat gate = <b>knock out</b> → checkpoint se respawn.','Har 5 Qs pe 🚩 checkpoint. Speed badhti jayegi. 15 gates = <b>BOOYAH platform</b> 🏆'],
 note:'Fan-made, original art. Not affiliated with or endorsed by Garena.',
 modes:[{id:'run',name:'Quiz Run · 15 gates',desc:'3 lives · checkpoints',icon:'🏃'}],
 start(api){return runGame(api);}});
})();
