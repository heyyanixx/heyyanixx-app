/* HEYYANIXX Learn Arcade — Commerce • CA • Sarkari Exam Zone
   GST Voucher Master · Debit-Credit Swipe · Balance Sheet Sorter · GST & % Sprint · Brain Test · Sarkari GK Run */
(function(){
'use strict';
const {h,esc,shuffle,pick,register}=HX;const C=window.BANK_COM;const nextBtn=HX.nextBtn;
const ZONE='com';
const inr=n=>'₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:2});
const num=n=>Number(n).toLocaleString('en-IN',{maximumFractionDigits:2});
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const one=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- shared: practice ghost leaderboard (clearly labelled, not real players) ---------- */
const GHOSTS=['Aarav_CA','Priya.SSC','Rohit_Bank','Neha_BCom','Kabir_IBPS','Simran_CAF','Vikas_RRB','Ananya_CMA','Ishaan_CGL','Pooja_PO','Arjun_GST','Meera_Acc'];
function ghostBoard(gid,score,lo,hi){const rnd=HX.seeded(HX.dayNum()*131+gid.length*977+gid.charCodeAt(0));
 const rows=HX.sshuffle(GHOSTS,rnd).slice(0,9).map(n=>({n:'👻 '+n,s:Math.round(lo+(hi-lo)*Math.pow(rnd(),0.8))}));rows.push({n:'⭐ Tum',s:score,me:true});
 rows.sort((a,b)=>b.s-a.s||(a.me?-1:1));const rank=rows.findIndex(r=>r.me)+1;
 const box=h('div',{class:'ghost card'},h('div',{class:'gh-h'},h('b',null,'🏅 Aaj ka Practice Exam Rank: #'+rank+' / 10'),h('small',null,'Ghost scores — practice ke liye, asli players nahi')));
 const ol=h('ol',null);rows.forEach((r,i)=>ol.append(h('li',{class:r.me?'me':null},h('span',null,(i+1)+'. '+r.n),h('b',null,num(r.s)))));box.append(ol);return box;}

/* ---------- shared: MCQ round engine ---------- */
function entryEl(lines){return h('span',{class:'entry'},lines.map(l=>h('span',{class:'el'+(/^Cr/.test(l)?' cr':'')},l)));}
function mcqGame(api,cfg){
 const st={i:-1,score:0,correct:0,wrong:0,combo:0,maxCombo:0,grid:[],review:[],lives:cfg.lives||0,left:[],over:false};
 let tl=null,gt=null,timer=null,keyH=null,cur=null,m=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner'+(cfg.cls?' '+cfg.cls:'')});sc.append(inner);api.stage.append(sc);
 function hud(){let s=`<span class="h">Q <b>${Math.max(1,st.i+1)}${cfg.total<1e9?'/'+cfg.total:''}</b></span><span class="h">Sahi <b>${st.correct}</b></span>`;
  if(cfg.lives)s+=`<span class="h">${'❤️'.repeat(Math.max(0,st.lives))}${'🖤'.repeat(Math.max(0,cfg.lives-st.lives))}</span>`;
  s+=`<span class="h">Combo ${st.combo>=5?'<span class="combo fire">🔥 '+st.combo+'</span>':'<b>'+st.combo+'</b>'}</span>`;api.setHud(s);}
 function next(){clearTimeout(timer);if(st.over)return;st.i++;if(st.i>=cfg.total||(cfg.lives&&st.lives<=0))return done();
  cur=cfg.gen(st.i,st);if(!cur)return done();inner.innerHTML='';hud();
  const card=h('div',{class:'qcard'+(cur.boss?' boss':'')},h('div',{class:'qmeta'},h('span',null,cur.kicker||''),h('span',null,cur.meta||'')),
   cur.boss?h('div',{class:'bossbar'},'⚠️ BOSS CASE · double points'):null,h('div',{class:'qt',html:cur.qhtml||esc(cur.q)}));
  inner.append(card);
  m=HX.mcq(card,{opts:cur.opts,correct:cur.a,keys:cur.keys,onAnswer:(ok)=>{tl&&tl.stop();after(ok,false,card);}});
  if(cfg.qtime)tl=HX.timerLoop(api,cfg.qtime,()=>{m.lock();after(false,true,card);});}
 function after(ok,to,card){if(st.over)return;const left=tl?tl.left:0;if(!cfg.gtime)api.setTime(null);
  if(ok){st.correct++;st.combo++;st.maxCombo=Math.max(st.maxCombo,st.combo);st.grid.push(cur.boss?'💎':'✅');st.left.push(cfg.qtime?left/cfg.qtime:1);
   const pts=cfg.points(cur,left,st.combo);st.score+=pts;api.sfx.ok();if(st.combo>0&&st.combo%5===0){api.toast('🔥 '+st.combo+' ka combo!',1200);}}
  else{st.wrong++;st.combo=0;st.grid.push(to?'⏱':'❌');st.left.push(0);if(cfg.lives)st.lives--;api.sfx.no();api.vibrate(60);
   st.review.push(`<b>${esc(cur.q||cur.rev||'')}</b><br>Sahi: <span class="a">${esc(cur.ans||cur.opts[cur.a])}</span><br>${esc(cur.why||'')}`);}
  api.setScore(st.score);hud();
  card.append(h('div',{class:'why',html:(ok?'✅ <b>Sahi!</b> ':to?'⏱ <b>Time up.</b> ':'❌ <b>Galat.</b> ')+esc(cur.why||'')}));
  const last=st.i+1>=cfg.total||(cfg.lives&&st.lives<=0);
  if(cfg.auto&&!last){timer=setTimeout(next,ok?(cfg.autoOk||900):(cfg.autoNo||2200));card.append(h('button',{class:'btn btn-ghost btn-block btn-sm',style:'margin-top:10px',onclick:next},'Next ›'));}
  else card.append(nextBtn(last?'Result ›':'Next ›',last?done:next));
  sc.scrollTop=sc.scrollHeight;}
 function done(){if(st.over)return;st.over=true;clearTimeout(timer);tl&&tl.stop();gt&&gt.stop();removeEventListener('keydown',keyH);api.setTime(null);api.end(cfg.result(st));}
 keyH=e=>{if(st.over)return;const k=e.key.toLowerCase();const map={a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3};if(k in map&&m){const btn=inner.querySelectorAll('.opts .opt')[map[k]];if(btn&&!btn.disabled)btn.click();}else if(k==='enter'){const nb=inner.querySelector('.btn-gold.btn-block, .btn-ghost.btn-block');if(nb)nb.click();}};
 addEventListener('keydown',keyH);
 if(cfg.gtime)gt=HX.timerLoop(api,cfg.gtime,()=>{if(m)m.lock();done();});
 next();
 return()=>{st.over=true;clearTimeout(timer);tl&&tl.stop();gt&&gt.stop();removeEventListener('keydown',keyH);};
}
/* distractors: given correct value c and plausible wrongs, return 4 shuffled unique options + index */
function numOpts(c,wrongs,fmt){fmt=fmt||num;const vals=[c];const ok=v=>Number.isFinite(v)&&v>0&&!vals.some(x=>Math.abs(x-v)<1e-9);
 wrongs.forEach(w=>{w=Math.round(w*100)/100;if(vals.length<4&&ok(w))vals.push(w);});
 const step=Math.max(1,Math.round(Math.abs(c)*0.1/ (Math.abs(c)>=100?10:1))*(Math.abs(c)>=100?10:1));let k=1;
 while(vals.length<4&&k<40){[c+step*k,c-step*k].forEach(v=>{if(vals.length<4&&ok(v))vals.push(v);});k++;}
 const sh=shuffle(vals);return{opts:sh.map(fmt),a:sh.findIndex(v=>v===c),ans:fmt(c)};}

/* =============== 1. GST VOUCHER MASTER (Tally-style practice) =============== */
const VTYPES=['Sales','Purchase','Payment','Receipt','Contra','Journal','Credit Note','Debit Note'];
function genVoucher(){const it=one(C.vouch);const wrong=shuffle(VTYPES.filter(v=>v!==it.v)).slice(0,3);const opts=shuffle([it.v,...wrong]);
 return{kicker:'🧾 Voucher pick',meta:'Kaunsa voucher?',q:it.t,opts,a:opts.indexOf(it.v),ans:it.v+' ('+C.vkeys[it.v]+')',why:it.why+' TallyPrime key: '+C.vkeys[it.v]+'.',v:'A'};}
function genSplit(){const rate=one([5,12,18,28]);let base;do{base=ri(5,250)*(rate===5?200:100);}while(!Number.isInteger(base*rate/200));
 const intra=Math.random()<.5;const s1=one(C.states);const s2=intra?s1:one(C.states.filter(s=>s!==s1));const tax=base*rate/100,half=tax/2;
 const good=intra?`CGST ${inr(half)} + SGST ${inr(half)}`:`IGST ${inr(tax)}`;
 const bad=intra?[`IGST ${inr(tax)}`,`CGST ${inr(tax)} + SGST ${inr(tax)}`,`IGST ${inr(half)}`]:[`CGST ${inr(half)} + SGST ${inr(half)}`,`IGST ${inr(half)}`,`CGST ${inr(tax)} + SGST ${inr(tax)}`];
 const opts=shuffle([good,...bad]);
 return{kicker:'🗺️ GST split',meta:rate+'% GST',q:`Seller: ${s1} → Buyer: ${s2}. Taxable value ${inr(base)} @ ${rate}%. Tax kaise lagega?`,opts,a:opts.indexOf(good),ans:good,
  why:(intra?`Same state (intra-state) → CGST + SGST, dono ${rate/2}%: ${inr(half)} + ${inr(half)}.`:`Alag state (inter-state) → poora IGST ${rate}% = ${inr(tax)}.`),v:'B'};}
function genInvoice(){const rate=one([5,12,18,28]);const base=ri(5,300)*100;const tax=base*rate/100;const total=base+tax;
 if(Math.random()<.5){const o=numOpts(total,[base+tax/2,base*(1+rate/1000),total+tax,base+rate*10],inr);
  return Object.assign(o,{kicker:'🧮 Invoice total',meta:rate+'% GST',q:`Taxable value ${inr(base)} + GST ${rate}%. Invoice total kitna?`,why:`${rate}% of ${inr(base)} = ${inr(tax)} → total ${inr(total)}.`,v:'C'});}
 const wrongB=Math.round(total*(100-rate)/100);const o=numOpts(base,[wrongB,total-Math.round(tax/2),total-tax*2,Math.round(total/1.1)],inr);
 return Object.assign(o,{kicker:'↩️ Back-calculate',meta:'GST inclusive',q:`Invoice ${inr(total)} (${rate}% GST included). Taxable value kitni?`,why:`Taxable = Total × 100/${100+rate} = ${inr(base)}. (Total − ${rate}% karna galat trick hai: ${inr(wrongB)})`,v:'C'});}
function genKey(){const it=one(C.tkeys);const pool=['F2','F4','F5','F6','F7','F8','F9','F11','Alt+F5','Alt+F6','Alt+F8','Ctrl+F8','Ctrl+F9','Ctrl+A','Alt+G'];
 const opts=shuffle([it.a,...shuffle(pool.filter(k=>k!==it.a)).slice(0,3)]);
 return{kicker:'⌨️ TallyPrime shortcut',meta:'Key drill',q:it.q,opts,a:opts.indexOf(it.a),ans:it.a,why:`TallyPrime: ${it.q.replace(' ki key?','').replace(' kholne','')} → ${it.a} (official TallyHelp).`,v:'D'};}
function tallyGame(api,mode){const N=15;const kinds=mode.id==='keys'?['D']:mode.id==='gst'?['B','C']:['A','A','A','B','C','D'];
 const used=new Set();
 return mcqGame(api,{total:N,qtime:mode.id==='keys'?8:15,cls:'tally',
  gen(i){let q,k=0;do{const kind=one(kinds);q=kind==='A'?genVoucher():kind==='B'?genSplit():kind==='C'?genInvoice():genKey();k++;}while(used.has(q.q)&&k<25);used.add(q.q);q.meta=(q.meta||'');return q;},
  points:(q,left,combo)=>100+Math.round(left*8)+Math.min(combo,10)*10,
  result(st){const acc=Math.round(st.correct/N*100);const box=ghostBoard('tally',st.score,600,2100);
   return{score:st.score,correct:st.correct,total:N,res:st.correct>=12?'Voucher Master! 🧾':st.correct>=8?'Accountant ready':'Practice karo',stat:`${st.correct}/${N} sahi · ${acc}%`,grid:st.grid.join(''),review:st.review,extra:box,badges:st.correct>=12?['voucher']:[]};}});}
register({id:'tally',zone:ZONE,name:'GST Voucher Master',icon:'🧾',tag:'Tally-style practice: sahi voucher chuno, GST split karo, invoice total nikaalo',glow:'rgba(110,200,255,.22)',
 desc:'Voucher type, CGST/SGST vs IGST, invoice total + TallyPrime keys.',
 how:['Transaction aaya → sahi <b>voucher</b> chuno: Sales, Purchase, Payment, Receipt, Contra, Journal, Credit Note, Debit Note.','<b>GST split</b>: same state = CGST + SGST · alag state = IGST. <b>Invoice</b> total aur back-calculation.','Har jawab ke baad <b>TallyPrime shortcut key</b> (F4–F9, Alt+F5/F6) — official TallyHelp se check ki hui.','15 sawaal · 15 sec each · combo bonus.'],
 note:'Practice game — not affiliated with or endorsed by Tally Solutions. TallyPrime is a trademark of its owner. GST rates yahan sirf maths practice ke liye hain.',
 modes:[{id:'mix',name:'Voucher + GST Mix',desc:'15 sawaal · sab type',icon:'🧾'},{id:'gst',name:'GST Calc Only',desc:'CGST/SGST/IGST + invoice',icon:'🗺️'},{id:'keys',name:'Shortcut Key Drill',desc:'TallyPrime keys · 8 sec',icon:'⌨️'}],
 start(api,mode){return tallyGame(api,mode);}});

/* =============== 2. DEBIT-CREDIT SWIPE =============== */
const ac=s=>s+' A/c';
function dcSwipe(api){
 const deck=shuffle(C.dc).map((it,i)=>{const show=Math.random()<.5;const bad=show?null:(Math.random()<.6?it.bad[0]:it.bad[1]);return{it,v:show,dr:show?it.ok[0]:bad[0],cr:show?it.ok[1]:bad[1]};});
 const LIMIT=75;let t=0,i=0,score=0,combo=0,correct=0,wrong=0,grid=[],review=[],over=false,raf,last=performance.now();
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner',style:'text-align:center'});sc.append(inner);api.stage.append(sc);
 const area=h('div',{class:'swipe-area dc-area'});const btnN=h('button',{class:'n','aria-label':'Galat entry (swipe left)'},'✗');const btnY=h('button',{class:'y','aria-label':'Sahi entry (swipe right)'},'✓');
 const why=h('div',{class:'why dc-why',role:'status'},h('b',null,'Golden rules: '),'Personal: receiver Dr, giver Cr · Real: jo aaye Dr, jo jaaye Cr · Nominal: kharcha/loss Dr, income/gain Cr');
 inner.append(h('p',{class:'kicker'},'⬅ Galat entry · Sahi entry ➡'),area,h('div',{class:'swbtns'},btnN,btnY),why);
 function cardEl(c,back){const el=h('div',{class:'scard dc'+(back?' back':'')},h('span',{class:'lbl yes'},'Sahi'),h('span',{class:'lbl nope'},'Galat'),
   h('div',{class:'eq'},'Transaction'),h('div',{class:'stmt'},c.it.t),h('div',{class:'jr'},h('div',{class:'dr'},h('i',null,'Dr'),ac(c.dr)),h('div',{class:'cr'},h('i',null,'Cr'),'To '+ac(c.cr))));return el;}
 let cur=null,curEl=null;
 function show(){area.innerHTML='';if(i>=deck.length)return end();cur=deck[i];if(deck[i+1])area.append(cardEl(deck[i+1],true));curEl=cardEl(cur,false);area.append(curEl);bind(curEl);}
 function hud(){api.setHud(`<span class="h">Sahi <b>${correct}</b></span><span class="h">Galat <b>${wrong}</b></span><span class="h">Combo ${combo>=5?'<span class="combo fire">🔥 x2</span>':'<b>'+combo+'</b>'}</span>`);}
 function decide(yes){if(over||!cur)return;const ok=yes===cur.v;const el=curEl;const c=cur;cur=null;el.style.transition='transform .3s,opacity .3s';el.style.transform=`translateX(${yes?420:-420}px) rotate(${yes?24:-24}deg)`;el.style.opacity='0';
  const right=`Dr ${ac(c.it.ok[0])} / Cr ${ac(c.it.ok[1])}`;
  const pv='<small class="pv">Pichhla: '+esc(c.it.t)+'</small>';
  if(ok){correct++;combo++;score+=50+Math.min(combo,10)*10*(combo>=5?2:1);grid.push('✅');api.sfx.ok();why.innerHTML=pv+'✅ <b>Sahi!</b> '+esc(c.it.why);}
  else{wrong++;combo=0;grid.push('❌');api.sfx.no();api.vibrate(50);why.innerHTML=pv+'❌ <b>'+(c.v?'Ye entry SAHI thi.':'Galat entry thi.')+'</b> Sahi: '+esc(right)+' — '+esc(c.it.why);
   review.push(`<b>${esc(c.it.t)}</b><br>Sahi: <span class="a">${esc(right)}</span><br>${esc(c.it.why)}`);}
  api.setScore(score);hud();i++;setTimeout(show,220);}
 function bind(el){let sx=0,dx=0,drag=false;el.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;dx=0;el.setPointerCapture&&el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(!drag)return;dx=e.clientX-sx;el.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`;el.querySelector('.yes').style.opacity=Math.max(0,dx/90);el.querySelector('.nope').style.opacity=Math.max(0,-dx/90);});
  const up=()=>{if(!drag)return;drag=false;if(Math.abs(dx)>80)decide(dx>0);else{el.style.transition='transform .2s';el.style.transform='';el.querySelectorAll('.lbl').forEach(l=>l.style.opacity=0);setTimeout(()=>el.style.transition='',220);}};
  el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);}
 btnN.onclick=()=>decide(false);btnY.onclick=()=>decide(true);
 const key=e=>{if(e.key==='ArrowLeft')decide(false);if(e.key==='ArrowRight')decide(true);};addEventListener('keydown',key);
 function loop(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!api.paused&&!over){t+=dt;api.setTime(1-t/LIMIT);if(t>=LIMIT)return end();}raf=requestAnimationFrame(loop);}
 function end(){if(over)return;over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);api.setTime(null);const acc=correct+wrong?Math.round(correct/(correct+wrong)*100):0;
  api.end({score,correct,total:correct+wrong,res:correct>=15?'Ledger Legend! 📒':'Time up',stat:`${correct} sahi · ${acc}% accuracy`,grid:grid.slice(0,30).join(''),review,badges:correct>=15?['ledger']:[]});}
 hud();show();raf=requestAnimationFrame(loop);
 return()=>{over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);};
}
function dcSurvival(api){const simple=shuffle(C.dc),boss=shuffle(C.dcBoss);const N=25;
 return mcqGame(api,{total:N,lives:3,qtime:20,cls:'dcs',
  gen(i){if(i%5===4){const b=boss[(i/5|0)%boss.length];const idx=shuffle([0,1,2]);
    return{boss:true,kicker:'👹 Boss case',meta:'Compound / adjustment',q:b.t,opts:idx.map(k=>entryEl(b.opts[k])),a:idx.indexOf(0),keys:'ABC',ans:b.opts[0].join(' · '),why:b.why};}
   const it=simple[i%simple.length];const ent=[it.ok,it.bad[0],it.bad[1]];const idx=shuffle([0,1,2]);
   return{kicker:'📒 Journal entry',meta:'Sahi entry chuno',q:it.t,opts:idx.map(k=>entryEl(['Dr '+ac(ent[k][0]),'Cr '+ac(ent[k][1])])),a:idx.indexOf(0),keys:'ABC',ans:`Dr ${ac(it.ok[0])} / Cr ${ac(it.ok[1])}`,why:it.why};},
  points:(q,left,combo)=>(q.boss?2:1)*(100+Math.round(left*5))+Math.min(combo,10)*10,
  result(st){const win=st.lives>0;return{score:st.score,correct:st.correct,total:st.correct+st.wrong,win,res:win?'CA Survivor! 🏆':'Out of lives',stat:`${st.correct} sahi · ${st.lives} ❤️ bache`,grid:st.grid.join(''),review:st.review,badges:win?['ledger']:[]};}});}
register({id:'dc',zone:ZONE,name:'Debit-Credit Swipe',icon:'📒',tag:'Transaction + entry aaya — sahi hai to right swipe, galat to left',glow:'rgba(61,220,132,.2)',
 desc:'Golden rules se journal entry pakdo. CA Foundation / B.Com / Class 11.',
 how:['Card par <b>transaction</b> + ek <b>journal entry</b>. Entry sahi → <b>right swipe</b>, galat → left.','Golden rules: <b>Personal</b> receiver Dr / giver Cr · <b>Real</b> jo aaye Dr / jo jaaye Cr · <b>Nominal</b> kharcha Dr / income Cr.','75 sec · 5 ka combo = <b>🔥 x2</b>. Har swipe ke baad explanation.','<b>CA Survival</b>: 3 lives, har 5th sawaal <b>BOSS case</b> (compound / adjustment entry).'],
 modes:[{id:'swipe',name:'Swipe · 75 sec',desc:'Sahi/galat entry swipe',icon:'👉'},{id:'survival',name:'CA Survival',desc:'3 lives · boss cases · 25 Qs',icon:'👹'}],
 start(api,mode){return mode.id==='survival'?dcSurvival(api):dcSwipe(api);}});

/* =============== 3. BALANCE SHEET SORTER =============== */
const BINS=[{k:'a',n:'Asset',e:'🏦'},{k:'l',n:'Liability',e:'💳'},{k:'c',n:'Capital',e:'👤'}];
function sorter(api){
 const MAX=40;let q=[],idx=0,lives=3,score=0,combo=0,correct=0,wrong=0,grid=[],review=[],over=false,raf,last=performance.now();
 let item=null,y=0,fall=6.5,busy=false,drag=null;
 const wrap=h('div',{class:'bs-wrap'});const field=h('div',{class:'bs-field'});const chip=h('div',{class:'bs-chip',role:'status','aria-live':'polite'});field.append(h('div',{class:'bs-line'}),chip);
 const bins=h('div',{class:'bs-bins'});const bEls=BINS.map((b,i)=>{const el=h('button',{class:'bin','data-k':b.k,'aria-label':'Put in '+b.n,onclick:()=>choose(b.k)},h('span',{class:'be'},b.e),h('b',null,b.n),h('small',null,['← / 1','↓ / 2','→ / 3'][i]));bins.append(el);return el;});
 wrap.append(field,bins);api.stage.append(wrap);
 function deal(){if(idx>=MAX||lives<=0)return end();if(!q.length)q=shuffle(C.bs);item=q.pop();idx++;y=0;busy=false;
  chip.textContent=item[0];chip.className='bs-chip';chip.style.transform='';hud();}
 function hud(){api.setHud(`<span class="h">Item <b>${idx}/${MAX}</b></span><span class="h">${'❤️'.repeat(Math.max(0,lives))}${'🖤'.repeat(3-Math.max(0,lives))}</span><span class="h">Combo ${combo>=5?'<span class="combo fire">🔥 '+combo+'</span>':'<b>'+combo+'</b>'}</span>`);}
 function choose(k,miss){if(over||busy||!item)return;busy=true;const it=item;const ok=!miss&&k===it[1];const bn=BINS.find(b=>b.k===it[1]).n;
  if(ok){correct++;combo++;const pts=10+Math.round((1-y)*10)+Math.min(combo,10)*2;score+=pts;grid.push('✅');api.sfx.ok();chip.classList.add('in');const be=bEls[BINS.findIndex(b=>b.k===k)];be.classList.add('hit');setTimeout(()=>be.classList.remove('hit'),300);}
  else{wrong++;combo=0;lives--;grid.push(miss?'⬇️':'❌');api.sfx.no();api.vibrate(80);chip.classList.add('bad');HX.toast((miss?'⬇️ Gir gaya! ':'❌ ')+it[0]+' = '+bn+' · '+it[2],2600);
   review.push(`<b>${esc(it[0])}</b> → <span class="a">${bn}</span><br>${esc(it[2])}`);}
  fall=Math.max(2.4,fall*0.955);api.setScore(score);hud();setTimeout(deal,ok?260:700);}
 // drag the chip onto a bin
 chip.addEventListener('pointerdown',e=>{if(busy)return;drag={x:e.clientX,y:e.clientY};chip.setPointerCapture&&chip.setPointerCapture(e.pointerId);chip.classList.add('drag');});
 chip.addEventListener('pointermove',e=>{if(!drag)return;chip.style.transform=`translate(calc(-50% + ${e.clientX-drag.x}px), ${e.clientY-drag.y}px)`;});
 const up=e=>{if(!drag)return;const moved=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);drag=null;chip.classList.remove('drag');chip.style.transform='';
  if(moved>20){chip.style.visibility='hidden';const el=document.elementFromPoint(e.clientX,e.clientY);chip.style.visibility='';const b=el&&el.closest('.bin');if(b)choose(b.dataset.k);}};
 chip.addEventListener('pointerup',up);chip.addEventListener('pointercancel',up);
 const key=e=>{const m={ArrowLeft:'a','1':'a',ArrowDown:'l','2':'l',ArrowRight:'c','3':'c'};if(m[e.key]){e.preventDefault();choose(m[e.key]);}};addEventListener('keydown',key);
 function loop(now){const dt=Math.min(.1,(now-last)/1000);last=now;if(!api.paused&&!over&&item&&!busy&&!drag){y+=dt/fall;if(y>=1){y=1;choose(null,true);}}
  if(!drag)chip.style.top=(4+y*80)+'%';raf=requestAnimationFrame(loop);}
 function end(){if(over)return;over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);const acc=correct+wrong?Math.round(correct/(correct+wrong)*100):0;
  api.end({score,correct,total:correct+wrong,win:idx>=MAX&&lives>0,res:lives>0?'Balance ho gaya! ⚖️':'Out of lives',stat:`${correct} sahi · ${acc}% accuracy`,grid:grid.slice(0,40).join(''),review,badges:correct>=25?['bsheet']:[]});}
 deal();raf=requestAnimationFrame(loop);
 return()=>{over=true;cancelAnimationFrame(raf);removeEventListener('keydown',key);};
}
register({id:'bs',zone:ZONE,name:'Balance Sheet Sorter',icon:'⚖️',tag:'Girte items ko Asset / Liability / Capital me daalo — speed badhti jayegi',glow:'rgba(255,197,61,.2)',
 desc:'Cash, Creditors, Drawings, Goodwill… sahi side pe daalo.',
 how:['Upar se item girta hai (Cash, Creditors, Capital…). Neeche sahi <b>bin</b> tap karo — ya chip ko bin pe <b>drag</b> karo.','<b>Asset</b> = jo business ka hai · <b>Liability</b> = jo dena hai · <b>Capital</b> = owner ka hissa (Drawings/Loss minus, Profit add).','Har sahi ke baad speed badhti hai. 3 lives · 40 items.'],
 modes:[{id:'sort',name:'Sort Rush',desc:'40 items · 3 lives',icon:'⚖️'}],
 start(api){return sorter(api);}});

/* =============== 4. GST & % SPRINT (all answers computed here) =============== */
const GEN={
 gstAdd(){const r=one([5,12,18,28]),b=ri(5,200)*100,t=b*r/100,c=b+t;const o=numOpts(c,[t,b+t/2,b*(1+(r+2)/100),c+100],inr);
  return Object.assign(o,{kicker:'GST add',q:`${inr(b)} + ${r}% GST = ?`,why:`Trick: ${r}% of ${inr(b)} = ${inr(t)} → ${inr(c)}. (18% = 10% + 8%)`});},
 gstIncl(){const r=one([5,12,18,28]),b=ri(5,200)*100,t=b*r/100,c=b+t;const o=numOpts(t,[Math.round(c*r/100),t/2,t+r*5,Math.round(c*r/(100+r)+b/50)],inr);
  return Object.assign(o,{kicker:'GST inclusive',q:`${inr(c)} (${r}% GST included). GST kitna hai?`,why:`Trick: GST = Total × ${r}/${100+r} = ${inr(t)}. Total × ${r}% karna galat hai.`});},
 cgst(){const r=one([5,12,18,28]);let b;do{b=ri(5,200)*100;}while(!Number.isInteger(b*r/200));const cg=b*r/200;const o=numOpts(cg,[b*r/100,cg/2,cg*3],inr);
  return Object.assign(o,{kicker:'CGST',q:`${inr(b)} pe ${r}% GST (same state sale). CGST kitna?`,why:`Same state → CGST = SGST = ${r/2}% each → ${inr(cg)}.`});},
 profit(){const p=one([5,10,15,20,25,30,40,50]),cp=ri(2,40)*100,sp=cp*(100+p)/100;const o=numOpts(p,[Math.round((sp-cp)/sp*1000)/10,p+5,p-5,p*2],v=>v+'%');
  return Object.assign(o,{kicker:'Profit %',q:`CP ${inr(cp)}, SP ${inr(sp)}. Profit % = ?`,why:`Profit % hamesha CP pe: ${inr(sp-cp)} / ${inr(cp)} × 100 = ${p}%.`});},
 loss(){const p=one([5,10,15,20,25,30,40]),cp=ri(2,40)*100,sp=cp*(100-p)/100;const o=numOpts(p,[Math.round((cp-sp)/sp*1000)/10,p+5,p-5,p*2],v=>v+'%');
  return Object.assign(o,{kicker:'Loss %',q:`CP ${inr(cp)}, SP ${inr(sp)}. Loss % = ?`,why:`Loss % bhi CP pe: ${inr(cp-sp)} / ${inr(cp)} × 100 = ${p}%.`});},
 discount(){const d=one([5,10,15,20,25,30,40,50]),mp=ri(4,60)*100,sp=mp*(100-d)/100;const o=numOpts(sp,[mp*d/100,mp-d*10,sp+mp/10],inr);
  return Object.assign(o,{kicker:'Discount',q:`MRP ${inr(mp)} pe ${d}% off. Selling price?`,why:`Trick: SP = MRP × ${100-d}% = ${inr(sp)}.`});},
 succ(){const a=one([10,20,25,30,40,50]),b=one([10,20,25,30,40,50]),e=a+b-a*b/100;const o=numOpts(e,[a+b,e+5,e-5,a*b/100],v=>num(v)+'%');
  return Object.assign(o,{kicker:'Successive discount',q:`Pehle ${a}% phir ${b}% discount = kul kitna %?`,why:`Shortcut: a + b − ab/100 = ${a} + ${b} − ${num(a*b/100)} = ${num(e)}%.`});},
 si(){const P=ri(2,40)*500,R=one([4,5,6,8,10,12]),T=one([2,3,4,5]),I=P*R*T/100;const o=numOpts(I,[P*R/100,I+P/10,P*(Math.pow(1+R/100,T)-1)],inr);
  return Object.assign(o,{kicker:'Simple Interest',q:`P = ${inr(P)}, R = ${R}% p.a., T = ${T} saal. SI = ?`,why:`SI = P×R×T/100 = ${inr(I)}.`});},
 ci(){const R=one([5,10,20]);let P;do{P=ri(1,30)*(R===5?400:500);}while(!Number.isInteger(P*((100+R)*(100+R)-10000)/10000));const I=P*((100+R)*(100+R)-10000)/10000;const si=P*R*2/100;const o=numOpts(I,[si,I+P/100,si/2],inr);
  return Object.assign(o,{kicker:'Compound Interest',q:`${inr(P)} pe ${R}% CI, 2 saal. CI = ?`,why:`2 saal shortcut: ${R}% + ${R}% + ${R}×${R}/100 = ${num(2*R+R*R/100)}% of P = ${inr(I)}.`});},
 pctOf(){const x=one([5,10,12,15,20,25,30,40,60,75]);let y;do{y=ri(2,60)*20;}while(!Number.isInteger(x*y/100));const v=x*y/100;const o=numOpts(v,[v*2,v/2,v+10,y/x],num);
  return Object.assign(o,{kicker:'Percent of',q:`${x}% of ${num(y)} = ?`,why:`Trick: ${x}% of ${num(y)} = ${num(y)} × ${x}/100 = ${num(v)}.`});},
 change(){const p=one([10,20,25,40,50]),a=ri(4,40)*100,up=Math.random()<.5,b=up?a*(100+p)/100:a*(100-p)/100;const o=numOpts(p,[Math.round(Math.abs(b-a)/b*1000)/10,p+5,p*2],v=>num(v)+'%');
  return Object.assign(o,{kicker:'% change',q:`${num(a)} se ${num(b)} hua. Kitne % ${up?'badha':'ghata'}?`,why:`% change = change ÷ purani value × 100 = ${num(Math.abs(b-a))}/${num(a)} × 100 = ${p}%.`});}
};
const SETS={mix:Object.keys(GEN),gst:['gstAdd','gstIncl','cgst','pctOf'],pl:['profit','loss','discount','succ','si','ci','change']};
function sprint(api,mode){const keys=SETS[mode.id]||SETS.mix;let prev='';
 return mcqGame(api,{total:1e9,gtime:60,auto:true,autoOk:650,autoNo:2300,cls:'sprint',
  gen(){let k;do{k=one(keys);}while(k===prev&&keys.length>1);prev=k;const q=GEN[k]();q.meta='60 sec sprint';return q;},
  points:(q,left,combo)=>100+Math.min(combo,10)*15,
  result(st){const tot=st.correct+st.wrong;const acc=tot?Math.round(st.correct/tot*100):0;
   return{score:st.score,correct:st.correct,total:tot,res:st.correct>=15?'Calculator brain! 🧮':st.correct>=10?'Exam ready!':'Time up',stat:`${st.correct} sahi in 60s · ${acc}%`,grid:st.grid.slice(0,30).join(''),review:st.review,extra:ghostBoard('gst'+mode.id,st.score,500,2100),badges:st.correct>=15?['gstguru']:[]};}});}
register({id:'gst',zone:ZONE,name:'GST & % Sprint',icon:'🧮',tag:'60 second mental maths — GST, profit-loss, discount, interest',glow:'rgba(255,140,60,.2)',
 desc:'SSC / Bank style calculation sprint + shortcuts.',
 how:['<b>60 second</b>, jitne sawaal ho sake. Sahi = +100, combo = bonus.','GST add/inclusive, CGST, profit-loss %, discount, successive discount, SI, CI, % change.','Har jawab ke baad <b>shortcut trick</b> — SSC CGL, CHSL, Bank PO/Clerk, RRB ke liye kaam ki.'],
 note:'Har answer code me calculate hota hai. GST rates yahan sirf maths practice ke liye hain.',
 modes:[{id:'mix',name:'Mixed Sprint',desc:'Sab topics · 60 sec',icon:'⚡'},{id:'gst',name:'GST Sprint',desc:'GST + percent · 60 sec',icon:'🧾'},{id:'pl',name:'Profit-Loss & Interest',desc:'P&L, discount, SI/CI · 60 sec',icon:'📈'}],
 start(api,mode){return sprint(api,mode);}});

/* =============== 5. BRAIN TEST =============== */
function brainLabel(s){return s>=135?'Genius mode 🤯':s>=120?'Topper brain 🧠':s>=105?'Sharp 🔥':s>=90?'Warming up 💡':'Practice more 💪';}
function gauge(score){const c=h('canvas',{class:'gauge',width:600,height:340,'aria-label':'Brain score meter '+score});const x=c.getContext('2d');
 const cx=300,cy=300,R=230;const f=Math.max(0,Math.min(1,(score-70)/80));
 x.lineCap='round';x.lineWidth=34;x.strokeStyle='rgba(255,255,255,.08)';x.beginPath();x.arc(cx,cy,R,Math.PI,2*Math.PI);x.stroke();
 const g=x.createLinearGradient(70,0,530,0);g.addColorStop(0,'#ff5a5f');g.addColorStop(.5,'#ffc53d');g.addColorStop(1,'#3ddc84');
 x.strokeStyle=g;x.beginPath();x.arc(cx,cy,R,Math.PI,Math.PI+Math.PI*f);x.stroke();
 const a=Math.PI+Math.PI*f;x.strokeStyle='#e3b65a';x.lineWidth=8;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*(R-40),cy+Math.sin(a)*(R-40));x.stroke();
 x.fillStyle='#e3b65a';x.beginPath();x.arc(cx,cy,16,0,7);x.fill();
 x.fillStyle='#8a8f9c';x.font='700 22px Inter,Arial';x.textAlign='left';x.fillText('70',40,330);x.textAlign='right';x.fillText('150',560,330);
 return h('div',{class:'brainbox card'},h('div',{class:'kicker'},'🧠 Brain Score meter'),c,h('div',{class:'blabel'},brainLabel(score)),h('small',null,'Fun reasoning score — asli IQ test nahi 🙂'));}
function brainGame(api){const N=12;const items=pick(C.brain,N);
 return mcqGame(api,{total:N,qtime:20,cls:'brain',
  gen(i){const it=items[i];return{kicker:'🧩 '+it.k,meta:'20 sec',q:it.q,opts:it.o,a:it.a,why:it.why};},
  points:(q,left)=>100+Math.round(left*5),
  result(st){const sp=st.left.reduce((a,b)=>a+b,0)/N;const bs=Math.round(70+st.correct/N*62+sp*18);
   return{score:bs,correct:st.correct,total:N,res:'MERA BRAIN SCORE',stat:`${st.correct}/${N} sahi · ${brainLabel(bs)}`,grid:st.grid.join(''),review:st.review,
    share:`🧠 Mera Brain Score ${bs} — tum beat karo! (${st.correct}/${N} sahi)\n${st.grid.join('')}`,extra:h('div',null,gauge(bs),ghostBoard('brain',bs,88,138)),badges:bs>=130?['brain130']:[]};}});}
register({id:'brain',zone:ZONE,name:'Brain Test',icon:'🧠',tag:'Series, odd one out, coding-decoding, direction — apna Brain Score nikalo',glow:'rgba(180,140,255,.22)',
 desc:'Reasoning for SSC/Bank + "Brain Score" share karo.',
 how:['<b>12 sawaal</b>, har ek 20 sec: number series, odd one out, coding-decoding, direction, analogy, blood relation.','Sahi + jaldi = zyada <b>Brain Score</b> (70–150).','Score card dosto ko bhejo: <b>"Mera Brain Score 142 🧠 — tum beat karo"</b>.'],
 note:'Brain Score ek fun reasoning score hai, asli IQ test nahi.',
 modes:[{id:'test',name:'Brain Score Test',desc:'12 reasoning Qs · 20 sec each',icon:'🧠'}],
 start(api){return brainGame(api);}});

/* =============== 6. SARKARI GK RUN — money-ladder (static GK only) =============== */
const LADDER=[100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,750000];const SAFE=[4,9];
function gkGame(api,mode){
 const pool=d=>shuffle(C.gk.filter(q=>q.d===d));const P={1:pool(1),2:pool(2),3:pool(3)};
 const plan=[1,1,1,1,1,2,2,2,2,2,3,3,3,3,3];
 const take=d=>{if(!P[d].length)P[d]=pool(d);return P[d].pop();};
 let lvl=0,won=0,over=false,tl=null,cur=null,m=null,grid=[],review=[],correct=0,life={ff:true,poll:true,skip:true},card=null,opts=null;
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner gk'});sc.append(inner);api.stage.append(sc);
 function hud(){api.setHud(`<span class="h">Level <b>${lvl+1}/15</b></span><span class="h">Jeeta <b>${num(won)} 🪙</b></span><span class="h">Safe <b>${num(safeVal())} 🪙</b></span>`);}
 function safeVal(){let s=0;SAFE.forEach(i=>{if(lvl>i)s=LADDER[i];});return s;}
 function ladderEl(){const l=h('div',{class:'ladder','aria-label':'Ladder'});LADDER.forEach((v,i)=>l.append(h('span',{class:'st'+(i===lvl?' now':'')+(i<lvl?' done':'')+(SAFE.includes(i)?' safe':'')},num(v))));
  setTimeout(()=>{const n=l.querySelector('.now');if(n)l.scrollLeft=n.offsetLeft-l.clientWidth/2+n.clientWidth/2;},0);return l;}
 function ask(){if(over)return;if(lvl>=LADDER.length)return finish(true);cur=take(plan[lvl]);render();}
 function render(){inner.innerHTML='';hud();inner.append(ladderEl());
  card=h('div',{class:'qcard'},h('div',{class:'qmeta'},h('span',null,'🏛️ '+cur.s),h('span',null,'Sawaal '+(lvl+1)+' · '+num(LADDER[lvl])+' 🪙')),h('div',{class:'qt'},cur.q));inner.append(card);
  m=HX.mcq(card,{opts:cur.o,correct:cur.a,onAnswer:ok=>{tl&&tl.stop();answer(ok);}});opts=card.querySelectorAll('.opt');
  const ll=h('div',{class:'lifelines'},
   h('button',{class:'ll',disabled:!life.ff||null,onclick:ff},'50:50'),
   h('button',{class:'ll',disabled:!life.poll||null,onclick:poll},'📊 Audience'),
   h('button',{class:'ll',disabled:!life.skip||null,onclick:skip},'🔄 Flip'),
   h('button',{class:'ll quit',disabled:lvl===0||null,onclick:()=>{tl&&tl.stop();m.lock();finish(false,true);}},'🚪 Yahin ruko'));
  inner.append(ll);tl=HX.timerLoop(api,30,()=>{m.lock();answer(false,true);});}
 function ff(){if(!life.ff)return;life.ff=false;api.sfx.tap();const wrong=shuffle([0,1,2,3].filter(i=>i!==cur.a)).slice(0,2);wrong.forEach(i=>{opts[i].disabled=true;opts[i].style.opacity=.25;});inner.querySelectorAll('.ll')[0].disabled=true;}
 function poll(){if(!life.poll)return;life.poll=false;api.sfx.tap();const p=[0,0,0,0];let rest=100;const top=45+Math.floor(Math.random()*25);p[cur.a]=top;rest-=top;const others=[0,1,2,3].filter(i=>i!==cur.a&&!opts[i].disabled);
  others.forEach((i,k)=>{const v=k===others.length-1?rest:Math.floor(Math.random()*rest);p[i]=v;rest-=v;});
  opts.forEach((o,i)=>{if(!o.disabled)o.append(h('span',{class:'pp'},p[i]+'%'));});inner.querySelectorAll('.ll')[1].disabled=true;api.toast('Audience poll — 100% guarantee nahi 😉',1600);}
 function skip(){if(!life.skip)return;life.skip=false;tl&&tl.stop();api.sfx.tap();cur=take(plan[lvl]);render();}
 function answer(ok,to){if(over)return;const it=cur;card.append(h('div',{class:'why',html:(ok?'✅ <b>Sahi!</b> ':to?'⏱ <b>Time up.</b> ':'❌ <b>Galat.</b> ')+esc(it.why)}));
  inner.querySelectorAll('.ll').forEach(b=>b.disabled=true);
  if(ok){correct++;grid.push('✅');won=LADDER[lvl];api.sfx.ok();lvl++;api.setScore(won);hud();if(SAFE.includes(lvl-1))api.toast('🔒 Safe level! '+num(won)+' 🪙 pakke',1800);
   card.append(nextBtn(lvl>=LADDER.length?'Result ›':'Agla sawaal ('+num(LADDER[lvl])+' 🪙) ›',ask));}
  else{grid.push(to?'⏱':'❌');api.sfx.no();api.vibrate(80);review.push(`<b>${esc(it.q)}</b><br>Sahi: <span class="a">${esc(it.o[it.a])}</span><br>${esc(it.why)}`);
   card.append(nextBtn('Result ›',()=>finish(false)));}
  sc.scrollTop=sc.scrollHeight;}
 function finish(all,quit){if(over)return;over=true;tl&&tl.stop();api.setTime(null);const score=all?LADDER[14]:quit?won:safeVal();
  api.end({score,correct,total:correct+(all||quit?0:1),win:all,level:lvl,res:all?'SARKARI CHAMPION! 🏆':quit?'Smart exit 🚪':'Game over',stat:`Level ${lvl}/15 · ${num(score)} 🪙`,grid:grid.join(''),review,
   extra:ghostBoard('gk',score,2000,64000),badges:lvl>=10?['sarkari']:[]});}
 ask();return()=>{over=true;tl&&tl.stop();};
}
register({id:'gk',zone:ZONE,name:'Sarkari GK Run',icon:'🏛️',tag:'KBC style ladder — 15 sawaal, lifelines, safe levels. Static GK only',glow:'rgba(227,182,90,.25)',
 desc:'Polity, Constitution, geography, history, science — SSC/Railway/Bank.',
 how:['<b>15 sawaal</b>, har sahi pe 🪙 coins badhte hain (100 → 7,50,000). 30 sec per sawaal.','<b>Safe levels</b>: Q5 aur Q10 — galat hua to wahan tak ke coins pakke.','Lifelines: <b>50:50</b>, <b>Audience poll</b>, <b>Flip</b> (sawaal badlo). Ya <b>Yahin ruko</b> aur coins le jao.','Sirf static GK — Constitution, polity, geography, history, science. Current affairs nahi.'],
 note:'Coins sirf game ke points hain — koi asli inaam nahi.',
 modes:[{id:'run',name:'Sarkari Ladder',desc:'15 Qs · 3 lifelines',icon:'🏛️'}],
 start(api,mode){return gkGame(api,mode);}});
HX.COM_GEN={GEN,genSplit,genInvoice,genVoucher,genKey,numOpts};
})();
