const missions=[
 {id:"market",tag:"ECONOMY",title:"Market Runner",desc:"Deliver supplies to a local market.",reward:80,xp:35},
 {id:"landmark",tag:"EXPLORATION",title:"Discover the City",desc:"Visit a landmark and record your discovery.",reward:60,xp:25},
 {id:"community",tag:"COMMUNITY",title:"Help a Neighbor",desc:"Complete a community support task.",reward:100,xp:45},
 {id:"quiz",tag:"KNOWLEDGE",title:"City Scholar",desc:"Answer a city trivia challenge.",reward:90,xp:40},
 {id:"treasure",tag:"TREASURE",title:"Hidden Cache",desc:"Search for a legendary treasure.",reward:120,xp:55}
];
const destinations=[["Lagos","Nigeria · West Africa"],["Abuja","Nigeria · West Africa"],["Benin City","Nigeria · West Africa"],["Osogbo","Nigeria · West Africa"],["Nairobi","Kenya · East Africa"],["Tokyo","Japan · East Asia"],["New York","USA · North America"]];
const KEY="world-quest-save-v2";
const $=id=>document.getElementById(id);
const defaults={coins:250,xp:0,level:1,completed:[],city:"Lagos",discoveries:["Lagos"],lastDaily:"",streak:0,journal:["Your adventure began in Lagos."]};
let state;
try{state={...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")};}catch{state={...defaults};}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function log(msg){state.journal.unshift(new Date().toLocaleDateString()+" · "+msg);state.journal=state.journal.slice(0,20);}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300);}
function render(){
 $("coins").textContent=state.coins.toLocaleString();
 $("level").textContent=state.level;
 $("xp").textContent=state.xp+" / 100";
 $("rep").textContent=state.level<3?"Rookie":state.level<5?"Explorer":state.level<10?"Trailblazer":"Legend";
 $("count").textContent=state.completed.length+" completed";
 $("missions").innerHTML=missions.map(m=>{const done=state.completed.includes(m.id);return `<article class="mission"><span class="tag">${m.tag}</span><h3>${m.title}</h3><p>${m.desc}</p><button data-mission="${m.id}" ${done?"disabled":""}>${done?"✓ Completed":`Complete · +${m.reward} coins`}</button></article>`;}).join("");
 document.querySelectorAll("[data-mission]").forEach(b=>b.addEventListener("click",()=>complete(b.dataset.mission)));
 $("cityGrid").innerHTML=destinations.map(([name,region])=>`<button class="city ${state.city===name?"active":""}" data-city="${name}"><b>${name}</b><small>${region}</small><small>${state.discoveries.includes(name)?"✓ Discovered":"Explore destination"}</small></button>`).join("");
 document.querySelectorAll("[data-city]").forEach(b=>b.addEventListener("click",()=>travel(b.dataset.city)));
 $("journal").innerHTML=state.journal.length?state.journal.map(x=>`<p class="journal-entry">${escapeHtml(x)}</p>`).join(""):"<p class='muted'>Your adventure log is empty.</p>";
 $("daily").textContent=state.lastDaily===dayKey()?"Daily bonus claimed ✓":"Claim daily bonus · +50 coins";
 $("daily").disabled=state.lastDaily===dayKey();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function dayKey(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function travel(city){state.city=city;if(!state.discoveries.includes(city)){state.discoveries.push(city);state.coins+=20;state.xp+=15;log("Discovered "+city+" · +20 coins, +15 XP");awardXP(0);toast("Destination discovered · +20 coins, +15 XP");}else toast("Destination selected: "+city);persist();render();document.querySelector(".hero .pill").textContent=city.toUpperCase()+" · WORLD DESTINATION";}
function awardXP(amount){state.xp+=amount;while(state.xp>=100){state.xp-=100;state.level++;toast("Level up! Level "+state.level);}}
function complete(id){const m=missions.find(x=>x.id===id);if(!m||state.completed.includes(id))return;if(id==="quiz"){const qs=[["Which city is Nigeria's capital?",["Lagos","Abuja","Osogbo"],1],["Which city is in Japan?",["Nairobi","Tokyo","Benin City"],1],["Which city is famous for the ancient Benin Kingdom?",["Benin City","New York","Abuja"],0]];const q=qs[Math.floor(Math.random()*qs.length)];const answer=prompt(q[0]+"\n"+q[1].map((a,i)=>(i+1)+". "+a).join("\n")+"\nEnter 1, 2, or 3");if(answer===null)return;if(Number(answer)!==q[2]+1){toast("Incorrect answer. Try again!");return;}}if(id==="treasure"&&!state.discoveries.length){toast("Discover a destination first.");return;}state.completed.push(id);state.coins+=m.reward;awardXP(m.xp);log(m.title+" completed · +"+m.reward+" coins, +"+m.xp+" XP");persist();render();toast(m.title+" complete · +"+m.reward+" coins");}
$("travel").addEventListener("click",()=>{if(!state.discoveries.includes(state.city))travel(state.city);else toast("Exploring "+state.city+" · choose a mission below");});
$("daily").addEventListener("click",()=>{if(state.lastDaily===dayKey())return;const yesterday=new Date(Date.now()-86400000);const y=yesterday.getFullYear()+"-"+String(yesterday.getMonth()+1).padStart(2,"0")+"-"+String(yesterday.getDate()).padStart(2,"0");state.streak=state.lastDaily===y?state.streak+1:1;state.lastDaily=dayKey();state.coins+=50;awardXP(10);log("Daily expedition bonus claimed · +50 coins, +10 XP");persist();render();toast("Daily bonus claimed! +50 coins · +10 XP");});
render();