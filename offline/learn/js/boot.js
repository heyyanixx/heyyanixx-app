/* HEYYANIXX Learn Arcade — home hub */
(function(){
'use strict';
const {h,S,GAMES,BADGES,DAILY,levelInfo,openGame,closeGame,dailyGame,dailyDone,$}=HX;
const isNew=id=>!S.plays[id];
function refresh(){const li=levelInfo(S.xp);
 $('#lvl').textContent=li.lv;$('#ptitle').textContent=li.title;$('#xpbar').style.width=Math.round(li.cur/li.need*100)+'%';$('#ring').style.setProperty('--p',Math.round(li.cur/li.need*100));
 $('#xpTxt').textContent=S.xp;$('#stTxt').textContent=S.streak;$('#bdTxt').textContent=S.badges.length;$('#pillLvl').textContent='Lv '+li.lv;$('#pillStreak').textContent='🔥 '+S.streak;
 const dg=GAMES.find(g=>g.id===dailyGame());const done=dailyDone();
 $('#dailyH').textContent=dg.icon+' '+dg.name;$('#dailyTxt').textContent=DAILY[dg.id].txt;$('#dailyTag').textContent=done?'✅ Aaj ka done!':'Aaj ka challenge';$('#dailyGo').textContent=done?'Phir khelo':'Play';
 const grid=$('#gameGrid');grid.innerHTML='';const zg=$('#examGrid');if(zg)zg.innerHTML='';const vg=$('#vidGrid');if(vg)vg.innerHTML='';
 GAMES.forEach(g=>{const b=h('button',{class:'gcard'+(g.wide?' wide':''),style:g.glow?'--glow:'+g.glow:null,onclick:()=>openGame(g.id),'aria-label':'Play '+g.name},
   isNew(g.id)?h('span',{class:'new'},'NEW'):null,h('span',{class:'ic','aria-hidden':'true'},g.icon),h('h3',null,g.name),h('p',null,g.desc),h('span',{class:'best'},'Best ',h('b',null,String(S.best[g.id]||0)),dailyGame()===g.id&&!done?' · 🎯 daily':''));(g.zone==='vid'&&vg?vg:g.zone&&zg?zg:grid).append(b);});
 const bg=$('#badgeGrid');bg.innerHTML='';BADGES.forEach(b=>bg.append(h('div',{class:'badge'+(S.badges.includes(b.id)?' got':''),title:b.d},h('span',{class:'e','aria-hidden':'true'},b.e),h('b',null,b.n),h('br'),h('span',null,b.d))));
 $('#bdCount').textContent=S.badges.length+' / '+BADGES.length;}
window.HX_refresh=refresh;
// friend challenge link ?vs=game&s=score
const qs=new URLSearchParams(location.search);const vsG=qs.get('vs'),vsS=parseInt(qs.get('s')||'',10);let vsOpt=null;
if(vsG&&GAMES.find(g=>g.id===vsG)&&vsS>0&&vsS<1e6){const g=GAMES.find(x=>x.id===vsG);vsOpt={vs:vsS};const c=$('#vsCard');c.classList.add('show');
 c.append(h('span',{class:'tag',style:'background:#3ddc84'},'⚔️ Challenge mila!'),h('h3',{class:'disp',style:'font-size:26px;margin:8px 0 2px'},`Dost ne ${g.icon} ${g.name} me ${vsS} score kiya`),h('p',{style:'margin:0;color:var(--ink2)'},'Kya tum beat kar sakte ho?'),h('button',{class:'btn btn-gold btn-sm',style:'margin-top:10px',onclick:()=>openGame(vsG,vsOpt)},'Accept challenge ›'));}
$('#dailyGo').addEventListener('click',()=>openGame(dailyGame()));
$('#soundBtn').addEventListener('click',HX.toggleSound);$('#gSound').addEventListener('click',HX.toggleSound);
$('#gClose').addEventListener('click',()=>closeGame());$('#resume').addEventListener('click',HX.resume);
addEventListener('popstate',()=>{const m=location.hash.match(/^#play\/(\w+)/);if(!m&&HX.L.cur)closeGame(true);else if(m&&!HX.L.cur)openGame(m[1]);});
addEventListener('keydown',e=>{if(e.key==='Escape'&&HX.L.cur&&!document.activeElement.matches('input'))closeGame();});
HX.soundIcon();refresh();HX.adsInit();
const m=location.hash.match(/^#play\/(\w+)/);if(m&&GAMES.find(g=>g.id===m[1])){history.replaceState(null,'',location.pathname+location.search);openGame(m[1],vsOpt&&vsG===m[1]?vsOpt:null);}
if('serviceWorker' in navigator&&location.protocol==='https:'){addEventListener('load',()=>{try{navigator.serviceWorker.register('sw.js').catch(()=>{});}catch(e){}});}
})();
