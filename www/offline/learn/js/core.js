/* HEYYANIXX Learn Arcade — core (state, XP, ads, share, game shell) */
(function(){
'use strict';
const LINKS={ig:'https://instagram.com/heyyy.anixx_',yt:'https://youtube.com/@smart_anish69',pf:'https://heyyanixx.sites.tab.bot/'};
const SITE_URL='https://heyyanixx-learn.sites.tab.bot/';
const $=(s,r)=>(r||document).querySelector(s);
function h(tag,attrs,...kids){const e=document.createElement(tag);if(attrs)for(const k in attrs){const v=attrs[k];if(v==null||v===false)continue;if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v===true?'':v);}for(const k of kids.flat()){if(k==null||k===false)continue;e.append(k.nodeType?k:document.createTextNode(String(k)));}return e;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function seeded(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
function sshuffle(a,rnd){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function pick(a,n){return shuffle(a).slice(0,n);}
function dayStr(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function dayNum(d){d=d||new Date();return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(2026,9,1))/864e5);}

/* ---------- state ---------- */
const KEY='hxla.v1';
const defaults=()=>({xp:0,best:{},plays:{},streak:0,lastDay:'',badges:[],daily:{},sound:true,wpm:0,puz:{},total:0});
let S;try{S=Object.assign(defaults(),JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){S=defaults();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const TITLES=['Noob','Rookie','Learner','Coder','Grinder','Pro','Elite','Master','Grandmaster','Legend'];
function levelInfo(xp){let lv=1,need=100,acc=0;while(xp>=acc+need){acc+=need;lv++;need=100+(lv-1)*60;}return{lv,cur:xp-acc,need,title:TITLES[Math.min(TITLES.length-1,Math.floor((lv-1)/2))]};}

/* ---------- sound ---------- */
let AC=null;
function beep(f,d,type,vol,slide){if(!S.sound)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();const o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,AC.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(slide,AC.currentTime+d);g.gain.setValueAtTime(vol||.08,AC.currentTime);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d+.02);}catch(e){}}
const sfx={ok(){beep(660,.09,'triangle',.08);setTimeout(()=>beep(990,.12,'triangle',.07),70);},no(){beep(180,.25,'sawtooth',.06,90);},tick(){beep(1200,.03,'square',.03);},shot(){beep(900,.06,'square',.03,300);},boom(){beep(120,.3,'sawtooth',.07,40);},win(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,.16,'triangle',.08),i*110));},tap(){beep(520,.04,'sine',.05);},spin(){beep(300,.05,'square',.03);}};
function vibrate(p){try{navigator.vibrate&&navigator.vibrate(p);}catch(e){}}

/* ---------- toast ---------- */
let tT;function toast(msg,ms){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),ms||2200);}

/* ---------- ads (nothing loads while disabled) ---------- */
const ADS=window.ADS||{enabled:false,slots:{}};
const adsLive=!!(ADS.enabled&&ADS.client&&!/XXXX/.test(ADS.client));
let adsScript=false;
function adsInit(){
  const qs=new URLSearchParams(location.search);
  if(adsLive){document.documentElement.classList.add('ads-on');
    if(!adsScript){adsScript=true;const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(ADS.client);document.head.appendChild(s);}
    document.querySelectorAll('.ad[data-slot]').forEach(fillAd);
  } else if(qs.has('adpreview')) document.documentElement.classList.add('ads-preview');
}
function fillAd(box){if(!adsLive||box.dataset.filled)return;const slot=(ADS.slots||{})[box.dataset.slot];if(!slot)return;box.dataset.filled='1';const b=box.querySelector('.ad-box');b.innerHTML='';const ins=document.createElement('ins');ins.className='adsbygoogle';ins.style.display='block';ins.setAttribute('data-ad-client',ADS.client);ins.setAttribute('data-ad-slot',slot);ins.setAttribute('data-ad-format','auto');ins.setAttribute('data-full-width-responsive','true');b.append(ins);try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}}
function adBox(slot,label){const d=h('div',{class:'ad','data-slot':slot},h('span',{class:'ad-label'},'Advertisement'),h('div',{class:'ad-box'},'Ad slot · '+label));return d;}

/* ---------- confetti ---------- */
function confetti(n){const c=h('canvas',{class:'confetti'});document.body.append(c);const W=c.width=innerWidth,H=c.height=innerHeight,x=c.getContext('2d');const cols=['#e3b65a','#f6d892','#ffffff','#3ddc84','#ff5a5f','#7ad7ff'];const P=Array.from({length:n||120},()=>({x:W/2+(Math.random()-.5)*W*.4,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+3,c:cols[Math.random()*cols.length|0],a:Math.random()*6}));let t=0;(function f(){t++;x.clearRect(0,0,W,H);for(const p of P){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);x.restore();}if(t<130)requestAnimationFrame(f);else c.remove();})();}

/* ---------- badges ---------- */
const BADGES=[
 {id:'first',e:'🎮',n:'Pehla Kadam',d:'Koi bhi game khelo'},
 {id:'s3',e:'🔥',n:'3-Day Streak',d:'3 din lagataar'},
 {id:'s7',e:'☄️',n:'7-Day Streak',d:'7 din lagataar'},
 {id:'wpm30',e:'⌨️',n:'Speedster',d:'30+ WPM'},
 {id:'wpm50',e:'⚡',n:'Lightning Keys',d:'50+ WPM'},
 {id:'bug',e:'🐞',n:'Bug Hunter',d:'Code Crash 10+ sahi'},
 {id:'prompt',e:'🧠',n:'Prompt Pro',d:'Prompt puzzle 1-2 try me'},
 {id:'crown',e:'👑',n:'Quiz King',d:'Quiz Blitz me 4 crowns'},
 {id:'edit',e:'🎬',n:'Cut Master',d:'Edit Sense 15+ sahi'},
 {id:'booyah',e:'🏆',n:'Booyah Brain',d:'FF Brain survive'},
 {id:'runner',e:'🏃',n:'Craft Runner',d:'FF Quiz Run finish'},
 {id:'daily',e:'🎯',n:'Daily Doer',d:'Daily challenge pura'},
 {id:'voucher',e:'🧾',n:'Voucher Master',d:'GST Voucher 12+ sahi'},
 {id:'ledger',e:'📒',n:'Ledger Legend',d:'Debit-Credit 15+ sahi / CA Survival'},
 {id:'bsheet',e:'⚖️',n:'Balance Boss',d:'Sorter me 25+ sahi'},
 {id:'gstguru',e:'🧮',n:'GST Guru',d:'Sprint me 15+ sahi'},
 {id:'brain130',e:'🧠',n:'Genius Mode',d:'Brain Score 130+'},
 {id:'sarkari',e:'🏛️',n:'Sarkari Champ',d:'GK Run level 10+'},
 {id:'scninja',e:'⌨️',n:'Shortcut Ninja',d:'Shortcut Rush 10+ sahi'},
 {id:'timeline',e:'🎞️',n:'Story Editor',d:'Timeline Fixer: saare edits perfect / 9+ fixes'},
 {id:'beatsync',e:'🎵',n:'Beat Sync God',d:'Beat Cut me 10+ perfect'},
 {id:'toolguru',e:'🛠️',n:'Tool Guru',d:'Which Tool? me max 2 galti'},
 {id:'mobilepro',e:'📱',n:'Mobile Editor Pro',d:'Phone Editor Quiz 10+ sahi'},
 {id:'exportpro',e:'📤',n:'Export Pro',d:'Export Challenge me max 1 galti'},
 {id:'motioneye',e:'👁️',n:'Motion Eye',d:'Ease Eye 9+ sahi'},
 {id:'all',e:'🌟',n:'All-Rounder',d:'Saare games khelo'},
 {id:'lv5',e:'🥇',n:'Level 5',d:'Level 5 tak pahuncho'},
];
function award(id){if(S.badges.includes(id))return null;S.badges.push(id);return BADGES.find(b=>b.id===id);}

/* ---------- games registry + daily ---------- */
const GAMES=[];
function register(g){GAMES.push(g);}
const DAILY={
 type:{txt:'Type Rush me 25+ WPM banao',ok:r=>(r.wpm||0)>=25},
 code:{txt:'Code Crash me 8+ sahi answers',ok:r=>(r.correct||0)>=8},
 prompt:{txt:'Aaj ka Prompt Puzzle solve karo',ok:r=>!!r.solved},
 quiz:{txt:'Quiz Blitz me 7+ sahi answers',ok:r=>(r.correct||0)>=7},
 edit:{txt:'Edit Sense me 12+ sahi swipes',ok:r=>(r.correct||0)>=12},
 ff:{txt:'FF Brain me Booyah tak survive karo',ok:r=>!!r.win},
 run:{txt:'FF Quiz Run me checkpoint 2 (10 Qs) cross karo',ok:r=>(r.correct||0)>=10},
 tally:{txt:'GST Voucher Master me 10+ sahi answers',ok:r=>(r.correct||0)>=10},
 dc:{txt:'Debit-Credit Swipe me 12+ sahi entries',ok:r=>(r.correct||0)>=12},
 bs:{txt:'Balance Sheet Sorter me 20+ items sahi sort karo',ok:r=>(r.correct||0)>=20},
 gst:{txt:'GST & % Sprint me 60 sec me 10+ sahi',ok:r=>(r.correct||0)>=10},
 brain:{txt:'Brain Test me Brain Score 120+ lao',ok:r=>(r.score||0)>=120},
 gk:{txt:'Sarkari GK Run me safe level Q5 cross karo',ok:r=>(r.level||0)>=5},
 sc:{txt:'Shortcut Rush me 8+ sahi shortcuts',ok:r=>(r.correct||0)>=8},
 tl:{txt:'Timeline Fixer me 3+ perfect edits / 12+ beats / 7+ fixes',ok:r=>(r.correct||0)>=(r.total===16?12:r.total===5?3:7)},
 wt:{txt:'Which Tool? me 8+ sahi answers',ok:r=>(r.correct||0)>=Math.min(8,(r.total||12)-1)},
 ph:{txt:'Phone Editor Quiz me 9+ sahi',ok:r=>(r.correct||0)>=9},
 ex:{txt:'Export Settings Challenge me 9+ sahi (ya Scenario 3/4)',ok:r=>(r.correct||0)>=(r.total===4?3:9)},
 mo:{txt:'Ease Eye me 7+ sahi',ok:r=>(r.correct||0)>=7},
};
function dailyGame(){const order=['code','sc','tally','type','tl','dc','quiz','wt','gst','prompt','ph','bs','ff','ex','brain','edit','mo','gk','run'];return order[((dayNum()%order.length)+order.length)%order.length];}
function dailyDone(){return S.daily[dayStr()]===true;}

/* ---------- streak ---------- */
function touchStreak(){const t=dayStr();if(S.lastDay===t)return;const y=new Date();y.setDate(y.getDate()-1);S.streak=(S.lastDay===dayStr(y))?S.streak+1:1;S.lastDay=t;}

/* ---------- share ---------- */
function shareUrl(gid,score){return SITE_URL+'?vs='+encodeURIComponent(gid)+'&s='+encodeURIComponent(score);}
function drawCard(g,r){const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');
 const gr=x.createRadialGradient(860,120,40,860,120,900);gr.addColorStop(0,'rgba(227,182,90,.35)');gr.addColorStop(1,'rgba(6,6,8,0)');x.fillStyle='#060608';x.fillRect(0,0,1080,1350);x.fillStyle=gr;x.fillRect(0,0,1080,1350);
 x.strokeStyle='#e3b65a';x.lineWidth=6;x.strokeRect(40,40,1000,1270);
 x.fillStyle='#e3b65a';x.font='700 34px Inter,Arial';x.textAlign='center';x.fillText('HEYYANIXX LEARN ARCADE',540,130);
 x.font='140px Anton,Impact,sans-serif';x.fillStyle='#fff';x.fillText(g.icon,540,330);
 x.font='86px Anton,Impact,sans-serif';x.fillStyle='#fff';x.fillText(g.name.toUpperCase(),540,470);
 x.font='700 36px Inter,Arial';x.fillStyle='#b9bdc9';x.fillText(r.res||'MERA SCORE',540,560);
 x.font='230px Anton,Impact,sans-serif';x.fillStyle='#e3b65a';x.fillText(String(r.score),540,800);
 x.font='600 40px Inter,Arial';x.fillStyle='#eceef3';x.fillText(r.stat||'',540,880);
 if(r.grid){x.font='54px sans-serif';const rows=String(r.grid).split('\n').slice(0,4);rows.forEach((row,i)=>x.fillText(row,540,980+i*64));}
 x.font='800 46px Inter,Arial';x.fillStyle='#fff';x.fillText('Can you beat me? 😎',540,1180);
 x.font='600 32px Inter,Arial';x.fillStyle='#e3b65a';x.fillText('heyyanixx-learn.sites.tab.bot',540,1250);
 return c;}
function shareText(g,r){if(r.share)return r.share+'\n👇';return `${g.icon} ${g.name}: ${r.score}${r.stat?' ('+r.stat+')':''}\n${r.grid?r.grid+'\n':''}Kya tum mujhe beat kar sakte ho? 👇`;}
async function doShare(g,r){const url=shareUrl(g.id,r.score);const text=shareText(g,r);sfx.tap();
 try{const c=drawCard(g,r);const blob=await new Promise(res=>c.toBlob(res,'image/png'));const file=blob&&new File([blob],'heyyanixx-score.png',{type:'image/png'});
  if(file&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:text+'\n'+url,title:'HEYYANIXX Learn Arcade'});return;}
 }catch(e){if(e&&e.name==='AbortError')return;}
 try{if(navigator.share){await navigator.share({title:'HEYYANIXX Learn Arcade',text,url});return;}}catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(text+'\n'+url);toast('Score + link copy ho gaya — WhatsApp/Insta pe paste karo ✅');}catch(e){toast('Link: '+url,4000);}
}
function waLink(g,r){return 'https://wa.me/?text='+encodeURIComponent(shareText(g,r)+'\n'+shareUrl(g.id,r.score));}
function saveCard(g,r){try{const c=drawCard(g,r);const a=document.createElement('a');a.download='heyyanixx-'+g.id+'-score.png';a.href=c.toDataURL('image/png');a.click();}catch(e){}}

/* ---------- game layer ---------- */
const L={cur:null,cleanup:null,paused:false,score:0,timer:null};
const layer=()=>$('#layer');const stage=()=>$('#stage');
function setScore(n){L.score=n;const e=$('#gScore');if(e)e.textContent=n;}
function setHud(html){const e=$('#hud');if(e)e.innerHTML=html||'';}
function setTime(frac){const tb=$('#timebar');if(frac==null){tb.hidden=true;return;}tb.hidden=false;tb.querySelector('i').style.transform='scaleX('+Math.max(0,Math.min(1,frac))+')';tb.classList.toggle('low',frac<.3);}
function clearStage(){const tt=$('#toast');if(tt)tt.classList.remove('show');if(L.cleanup){try{L.cleanup();}catch(e){console.warn(e);}L.cleanup=null;}stage().innerHTML='';setHud('');setTime(null);setScore(0);}
function soundIcon(){const i=S.sound?'🔊':'🔇';document.querySelectorAll('#soundBtn,#gSound').forEach(b=>{b.textContent=i;b.setAttribute('aria-pressed',S.sound);});}
function toggleSound(){S.sound=!S.sound;save();soundIcon();if(S.sound)sfx.tap();}

function openGame(id,opts){const g=GAMES.find(x=>x.id===id);if(!g)return;L.cur=g;L.opts=opts||{};clearStage();
 $('#gTitle').textContent=g.icon+' '+g.name;layer().classList.add('open');document.body.style.overflow='hidden';
 if(location.hash!=='#play/'+id)history.pushState({g:id},'','#play/'+id);
 showIntro(g);}
function closeGame(fromPop){clearStage();L.cur=null;L.paused=false;$('#pause').classList.remove('show');layer().classList.remove('open');document.body.style.overflow='';if(!fromPop&&location.hash.startsWith('#play/'))history.back();if(window.HX_refresh)window.HX_refresh();}

function showIntro(g){clearStage();const vs=L.opts.vs;const best=S.best[g.id]||0;const isDaily=dailyGame()===g.id&&!dailyDone();
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner intro'});
 inner.append(h('div',{class:'big','aria-hidden':'true'},g.icon),h('h2',null,g.name),h('p',{class:'tl'},g.tag));
 if(vs)inner.append(h('div',{class:'why',style:'margin-top:12px;text-align:center'},h('b',null,'Dost ka challenge: '),`${vs} score beat karo! 💪`));
 if(isDaily)inner.append(h('div',{class:'why',style:'margin-top:12px;text-align:center'},h('b',null,'🎯 Aaj ka challenge: '),DAILY[g.id].txt+' → +150 XP'));
 inner.append(h('ul',{class:'how'},g.how.map(t=>h('li',{html:t}))));
 const modes=h('div',{class:'modes'});
 g.modes.forEach(m=>modes.append(h('button',{class:'mode'+(m.daily?' daily-mode':''),onclick:()=>startGame(g,m)},h('span',{class:'mi','aria-hidden':'true'},m.icon||'▶'),h('span',null,h('b',null,m.name),h('small',null,m.desc||'')),h('span',{class:'go','aria-hidden':'true'},'›'))));
 inner.append(modes);
 inner.append(h('p',{class:'note'},'Best: ',h('b',{class:'gold'},String(best)),' · Plays: '+(S.plays[g.id]||0)));
 inner.append(h('div',{class:'chips'},h('a',{class:'chip',href:LINKS.ig,target:'_blank',rel:'noopener'},'📸 Follow @heyyy.anixx_'),h('a',{class:'chip',href:LINKS.yt,target:'_blank',rel:'noopener'},'▶ Subscribe')));
 if(g.note)inner.append(h('p',{class:'note'},g.note));
 sc.append(inner);stage().append(sc);}

function startGame(g,mode){clearStage();sfx.tap();L.mode=mode;L.paused=false;
 const api={stage:stage(),mode,setScore,setHud,setTime,sfx,toast,vibrate,shuffle,pick,h,esc,confetti,seeded,sshuffle,dayNum,dayStr,S,save,
  get paused(){return L.paused;},
  end:(r)=>finish(g,mode,r),
  replay:()=>startGame(g,mode)};
 try{L.cleanup=g.start(api,mode)||null;}catch(e){console.error(e);toast('Oops, game load nahi hua');}
}

function finish(g,mode,r){if(L.cleanup){try{L.cleanup();}catch(e){}L.cleanup=null;}setTime(null);setHud('');
 stage().innerHTML='';r=Object.assign({score:0},r);r.score=Math.max(0,Math.round(r.score));setScore(r.score);
 const prevBest=S.best[g.id]||0;const isBest=r.score>prevBest&&r.score>0;if(isBest)S.best[g.id]=r.score;
 S.plays[g.id]=(S.plays[g.id]||0)+1;S.total=(S.total||0)+1;
 const before=levelInfo(S.xp);let xp=Math.min(400,20+Math.round(r.score/20));
 touchStreak();const unlocked=[];const push=b=>{if(b)unlocked.push(b);};
 let dailyNow=false;if(dailyGame()===g.id&&!dailyDone()&&!r.practice&&DAILY[g.id].ok(r)){S.daily[dayStr()]=true;xp+=150;dailyNow=true;push(award('daily'));}
 S.xp+=xp;const after=levelInfo(S.xp);
 push(award('first'));if(S.streak>=3)push(award('s3'));if(S.streak>=7)push(award('s7'));
 if(r.wpm>=30)push(award('wpm30'));if(r.wpm>=50)push(award('wpm50'));if(r.wpm&&r.wpm>(S.wpm||0))S.wpm=r.wpm;
 (r.badges||[]).forEach(id=>push(award(id)));
 if(GAMES.every(x=>S.plays[x.id]))push(award('all'));if(after.lv>=5)push(award('lv5'));
 save();
 if(r.win||isBest||dailyNow){sfx.win();confetti(r.win?160:90);}
 if(after.lv>before.lv)setTimeout(()=>toast('⬆️ LEVEL UP! Level '+after.lv+' — '+after.title,2600),600);
 const sc=h('div',{class:'scroll'});const inner=h('div',{class:'inner end'});
 if(r.booyah)inner.append(h('div',{class:'booyah'},'BOOYAH!'));
 inner.append(h('div',{class:'res'},r.res||'Game Over'),h('div',{class:'score'},String(r.score)),h('div',{class:'sub'},(r.stat||'')+' · Best '+Math.max(prevBest,r.score)));
 if(isBest)inner.append(h('div',null,h('span',{class:'newbest'},'NEW BEST!')));
 if(r.grid)inner.append(h('div',{class:'grid-emo','aria-label':'Result grid'},r.grid));
 const xb=h('div',{class:'xpbox card'},h('div',{class:'row'},h('span',null,'Level '+after.lv+' · '+after.title),h('span',null,h('b',null,'+'+xp+' XP'))),h('div',{class:'bar'},h('i',{style:'width:'+Math.round(after.cur/after.need*100)+'%'})),h('div',{class:'row',style:'margin-top:6px'},h('span',null,'🔥 Streak: '+S.streak+' din'),h('span',null,dailyNow?'🎯 Daily done!':'')));
 inner.append(xb);
 if(r.extra)inner.append(r.extra);
 if(unlocked.length)inner.append(h('div',{class:'unlock'},unlocked.map(b=>h('span',null,b.e+' '+b.n+' unlocked!'))));
 const share=h('button',{class:'btn btn-gold full',onclick:()=>doShare(g,r)},'📤 Share score');
 inner.append(h('div',{class:'btnrow'},share,
  h('a',{class:'btn btn-wa',href:waLink(g,r),target:'_blank',rel:'noopener'},'💬 WhatsApp'),
  h('button',{class:'btn btn-ghost',onclick:()=>saveCard(g,r)},'🖼 Save card'),
  h('button',{class:'btn btn-ghost',onclick:()=>startGame(g,mode)},'🔁 Play again'),
  h('button',{class:'btn btn-ghost',onclick:()=>showIntro(g)},'☰ Modes')));
 inner.append(h('div',{class:'promo'},h('p',{html:'Game pasand aaya? <b>HEYYANIXX</b> ko support karo — naye games, coding tips aur Free Fire content 🔥'}),
  h('a',{class:'btn btn-ig',href:LINKS.ig,target:'_blank',rel:'noopener'},'📸 Follow @heyyy.anixx_'),
  h('a',{class:'btn btn-yt',href:LINKS.yt,target:'_blank',rel:'noopener'},'▶ Subscribe @smart_anish69'),
  h('a',{class:'btn btn-ghost',href:LINKS.pf,target:'_blank',rel:'noopener'},'🌐 Visit portfolio')));
 const ad=adBox('end','game over');inner.append(ad);fillAd(ad);
 if(r.review&&r.review.length){const rv=h('div',{class:'review'},h('h4',null,'Seekho: jo galat hua'));r.review.slice(0,8).forEach(it=>rv.append(h('div',{class:'it',html:it})));inner.append(rv);}
 inner.append(h('button',{class:'btn btn-ghost btn-block',style:'margin-top:14px',onclick:()=>closeGame()},'🏠 Arcade home'));
 sc.append(inner);stage().append(sc);sc.scrollTop=0;
}

/* pause on blur */
document.addEventListener('visibilitychange',()=>{if(document.hidden&&L.cur&&L.cleanup){L.paused=true;$('#pause').classList.add('show');}});
function resume(){L.paused=false;$('#pause').classList.remove('show');}

/* viewport height for keyboard */
function vv(){const v=window.visualViewport;const H=v?v.height:innerHeight;document.documentElement.style.setProperty('--vvh',H+'px');}
if(window.visualViewport){visualViewport.addEventListener('resize',vv);visualViewport.addEventListener('scroll',vv);}addEventListener('resize',vv);vv();

window.HX={$,h,esc,shuffle,pick,seeded,sshuffle,S,save,sfx,toast,register,GAMES,BADGES,DAILY,dailyGame,dailyDone,levelInfo,openGame,closeGame,resume,toggleSound,soundIcon,adsInit,dayStr,dayNum,LINKS,L,confetti};
})();
