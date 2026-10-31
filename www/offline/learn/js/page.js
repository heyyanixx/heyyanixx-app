/* static pages: header stats + sound toggle */
(function(){try{const S=JSON.parse(localStorage.getItem('hxla.v1')||'{}');let xp=S.xp||0,lv=1,need=100;while(xp>=need){xp-=need;lv++;need=100+(lv-1)*60;}
document.getElementById('pillLvl').textContent='Lv '+lv;document.getElementById('pillStreak').textContent='🔥 '+(S.streak||0);
const b=document.getElementById('soundBtn');b.textContent=S.sound===false?'🔇':'🔊';b.addEventListener('click',()=>{S.sound=S.sound===false;localStorage.setItem('hxla.v1',JSON.stringify(S));b.textContent=S.sound===false?'🔇':'🔊';});}catch(e){}
const A=window.ADS||{};if(A.enabled&&A.client&&!/XXXX/.test(A.client)){/* static pages carry no ad slots */}})();
