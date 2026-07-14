/* ============================================================
   AN Psixoloji — ABA Platforması · Nüvə (core.js) · çoxdilli
============================================================ */
window.toggleNav = function(){ document.getElementById('navLinks')?.classList.toggle('open'); };
(function(){
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    markCompletedTools();
    initBackTop();
    initHeroParallax();
  });
})();

/* yuxarı qayıt düyməsi — bütün səhifələrdə işləyir */
function initBackTop(){
  const b=document.createElement('button'); b.className='back-top'; b.setAttribute('aria-label','Yuxarı qayıt'); b.type='button';
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(b);
  window.addEventListener('scroll',()=>{ b.classList.toggle('show', window.scrollY>300); },{passive:true});
  b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

/* hero-art (loqo + halqalar), hero-box və blob-lar üçün çoxqatlı, dərin parallax — scroll + siçan */
function initHeroParallax(){
  const art=document.querySelector('.hero-art'); const box=document.querySelector('.hero-box');
  const blobs=document.querySelectorAll('.hero-blob');
  const ringOuter=document.getElementById('ringOuter'), ringMiddle=document.getElementById('ringMiddle'), logoMark=document.getElementById('logoMark');
  if(!art && !box) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let mx=0,my=0,sy=0;
  function paint(){
    if(art) art.style.transform=`translate3d(${mx*.5}px,${my*.5+sy}px,0) rotate(${mx*.015}deg)`;
    if(box) box.style.transform=`translate3d(${mx*-.3}px,${(my+sy)*-.2}px,0)`;
    if(ringOuter) ringOuter.style.transform=`translate3d(${mx*.35}px,${my*.3+sy*.4}px,0)`;
    if(ringMiddle) ringMiddle.style.transform=`translate3d(${mx*-.9}px,${my*-.7+sy*.7}px,0)`;
    if(logoMark) logoMark.style.transform=`translate3d(${mx*1.7}px,${my*1.5+sy*.2}px,0) scale(${1+Math.min(Math.abs(mx)/400,.04)})`;
    blobs.forEach(function(b,i){ const sp=(i+1)*.08; b.style.transform=`translate3d(${mx*(i+1)*.4}px,${sy*sp*3}px,0)`; });
  }
  window.addEventListener('scroll',()=>{ sy=Math.min(window.scrollY*0.1,55); paint(); },{passive:true});
  if(window.innerWidth>900){
    document.querySelector('.hero')?.addEventListener('mousemove',(e)=>{
      const r=(art||box).getBoundingClientRect();
      mx=((e.clientX-r.left-r.width/2)/r.width)*34;
      my=((e.clientY-r.top-r.height/2)/r.height)*24;
      paint();
    });
    document.querySelector('.hero')?.addEventListener('mouseleave',()=>{ mx=0;my=0; paint(); });
  } else {
    // toxunma cihazlarında meyl sensoru ilə yüngül parallax (dəstəklənirsə)
    window.addEventListener('deviceorientation',(e)=>{
      if(e.gamma==null||e.beta==null) return;
      mx=Math.max(-16,Math.min(16,e.gamma*.6));
      my=Math.max(-12,Math.min(12,(e.beta-45)*.35));
      paint();
    },{passive:true});
  }
}

/* fokus / tam ekran */
function toggleFocus(){
  const on=document.body.classList.toggle('focus');
  try{ if(on){document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();}
       else{document.exitFullscreen&&document.fullscreenElement&&document.exitFullscreen();} }catch(e){}
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('fullscreenchange',()=>{ if(!document.fullscreenElement) document.body.classList.remove('focus'); });

/* localStorage */
const ABA={
  PKEY:'aba_profile_v1', RKEY:'aba_results_v1',
  getProfile(){ try{return JSON.parse(localStorage.getItem(this.PKEY))||{};}catch(e){return {};} },
  setProfile(p){ localStorage.setItem(this.PKEY,JSON.stringify(p)); },
  getResults(){ try{return JSON.parse(localStorage.getItem(this.RKEY))||{};}catch(e){return {};} },
  saveResult(id,data){ const a=this.getResults(); a[id]=Object.assign({date:new Date().toISOString()},data); localStorage.setItem(this.RKEY,JSON.stringify(a)); },
  clearAll(){ localStorage.removeItem(this.RKEY); localStorage.removeItem(this.PKEY); }
};
function markCompletedTools(){ const r=ABA.getResults(); document.querySelectorAll('[data-tool]').forEach(el=>{ if(r[el.getAttribute('data-tool')]) el.classList.add('completed'); }); }
function libOf(key){ return (window.DOMAIN_LIB&&window.DOMAIN_LIB[key])||null; }

/* profil sahəsi */
function renderProfileBar(){
  const p=ABA.getProfile(), el=document.getElementById('profileBar'); if(!el) return;
  el.innerHTML=`<label>👤 ${t('pf_child')}:</label><input id="pfName" placeholder="${t('pf_name_ph')}" value="${p.name||''}">
    <label>${t('pf_age')}:</label><input id="pfAge" style="width:90px" placeholder="${t('pf_age_ph')}" value="${p.age||''}">
    <label>${t('pf_spec')}:</label><input id="pfSpec" style="width:150px" placeholder="${t('pf_spec_ph')}" value="${p.spec||''}">`;
  ['pfName','pfAge','pfSpec'].forEach(id=>el.querySelector('#'+id).addEventListener('input',()=>{
    ABA.setProfile({name:el.querySelector('#pfName').value.trim(),age:el.querySelector('#pfAge').value.trim(),spec:el.querySelector('#pfSpec').value.trim()});
  }));
}

/* ===== QİYMƏTLƏNDİRMƏ MOTORu ===== */
const ASSESS={
  domains:[], answers:{}, toolId:'', toolName:'', mode:'scale', fba:null, lastResult:null,
  initScale(toolId){
    const td=window.TOOLS_DATA[toolId];
    this.toolId=toolId; this.toolName=tr(td.name); this.mode='scale'; this.answers={};
    this.domains=td.domains.map(d=>({key:d.key, name:tr(d.name), nameT:d.name, hint:tr(d.hint), q:d.q.map(tr)}));
    renderProfileBar(); this.render(); this.updateMeter();
  },
  initFBA(){
    const fd=window.FBA_DATA; this.fba=fd; this.toolId='fba'; this.toolName=tr(fd.name); this.mode='single'; this.answers={};
    this.domains=[{name:'', hint:'', options:fd.funcs.map(tr), q:fd.q.map(tr)}];
    renderProfileBar(); this.render(); this.updateMeter();
  },
  total(){ return this.domains.reduce((s,d)=>s+d.q.length,0); },
  answered(){ return Object.keys(this.answers).length; },
  render(){
    const host=document.getElementById('domains'); host.innerHTML='';
    this.domains.forEach((dm,di)=>{
      const wrap=document.createElement('div'); wrap.className='domain reveal in';
      const head = this.mode==='single' ? '' : `<div class="domain-head"><h3><span class="num">${String(di+1).padStart(2,'0')}</span>${dm.name}</h3><small>${dm.hint||''}</small></div>`;
      wrap.innerHTML=head + dm.q.map((q,qi)=>{
        const btns = this.mode==='single'
          ? `<div class="opts single" data-d="${di}" data-q="${qi}">`+dm.options.map((o,oi)=>`<button type="button" data-v="${oi}" onclick="ASSESS.pick(${di},${qi},${oi},this)">${o}</button>`).join('')+`</div>`
          : `<div class="opts" data-d="${di}" data-q="${qi}">
              <button type="button" data-v="2" onclick="ASSESS.pick(${di},${qi},2,this)">${t('opt_yes')}</button>
              <button type="button" data-v="1" onclick="ASSESS.pick(${di},${qi},1,this)">${t('opt_part')}</button>
              <button type="button" data-v="0" onclick="ASSESS.pick(${di},${qi},0,this)">${t('opt_no')}</button></div>`;
        return `<div class="qrow"><span class="qt">${q}</span>${btns}</div>`;
      }).join('');
      host.appendChild(wrap);
    });
  },
  pick(d,q,v,btn){ this.answers[d+'-'+q]=v; btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('sel')); btn.classList.add('sel'); this.updateMeter(); },
  updateMeter(){ const m=document.getElementById('meter'); if(m) m.style.width=(this.answered()/this.total()*100)+'%'; },
  scoreDomains(){
    return this.domains.map((dm,di)=>{ let got=0,max=dm.q.length*2; dm.q.forEach((_,qi)=>got+=(this.answers[di+'-'+qi]||0));
      return {name:dm.name, key:dm.key||'', nameT:dm.nameT||null, pct:Math.round(got/max*100)}; });
  },
  calculate(){
    if(this.answered()<this.total()){ alert(t('fill_all')+' ('+this.answered()+'/'+this.total()+')');
      const e=[...document.querySelectorAll('.qrow')].find(r=>!r.querySelector('.sel')); e?.scrollIntoView({behavior:'smooth',block:'center'}); return; }
    if(this.mode==='single') return this.calcFBA();
    const scores=this.scoreDomains();
    const overall=Math.round(scores.reduce((s,x)=>s+x.pct,0)/scores.length);
    const level=overall>=75?3:overall>=45?2:1;
    const color=level===3?'var(--teal)':level===2?'var(--gold-2)':'var(--accent)';
    const weak=[...scores].sort((a,b)=>a.pct-b.pct).slice(0,2);
    const recos=weak.map(w=>{ const lib=libOf(w.key); const s=lib&&lib.steps?tr(lib.steps[0]):t('focus_area'); return '<b>'+w.name+'</b> — '+s; })
      .concat([t('rec_l'+level), t('rec_data')]);
    this.lastResult={kind:'scale', toolName:this.toolName, overall, level, levelName:t('lvl'+level),
      scores:scores.map(s=>({name:s.name,pct:s.pct})), recos:recos.map(x=>x.replace(/<[^>]+>/g,''))};
    this.renderResults({overall,scores,level,levelName:t('lvl'+level),levelDesc:t('lvl'+level+'_desc'),color,recos});
    ABA.saveResult(this.toolId,{type:'scale',toolId:this.toolId,overall,level,scores:scores.map(s=>({key:s.key,nameT:s.nameT,pct:s.pct}))});
  },
  calcFBA(){
    const fd=this.fba, tally=[0,0,0,0];
    Object.values(this.answers).forEach(v=>{tally[v]=(tally[v]||0)+1;});
    let best=0; for(let i=1;i<4;i++) if(tally[i]>tally[best]) best=i;
    const azName=fd.funcs[best].az, dk=['att','esc','tan','sen'][best];
    const behavior=(document.getElementById('targetBehavior')||{}).value||'';
    const desc=tr(fd.descMap[dk])+(behavior?' “'+behavior+'”.':'');
    const recos=(fd.recos[azName]||[]).map(tr), parent=(fd.parent[azName]||[]).map(tr), func=tr(fd.funcs[best]);
    this.lastResult={kind:'fba', toolName:this.toolName, func, desc, recos, parent};
    this.renderFBA({func, desc, recos, parent, tally, funcs:fd.funcs.map(tr), best});
    ABA.saveResult('fba',{type:'fba',toolId:'fba',funcKey:best,behavior,tally});
  },
  renderResults(r){
    const circ=2*Math.PI*54, off=circ*(1-r.overall/100);
    const bars=r.scores.map(s=>{ const c=s.pct>=75?'var(--teal)':s.pct>=45?'var(--gold)':'var(--low)';
      return `<div class="bar"><div class="bl"><span>${s.name}</span><span>${s.pct}%</span></div><div class="track"><div class="fill" style="background:${c}" data-w="${s.pct}"></div></div></div>`; }).join('');
    document.getElementById('results').innerHTML=`
      <div class="res-top">
        <div class="ring"><svg width="130" height="130"><circle cx="65" cy="65" r="54" fill="none" stroke="var(--cream)" stroke-width="11"/>
          <circle cx="65" cy="65" r="54" fill="none" stroke="${r.color}" stroke-width="11" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" id="ringFill"/></svg>
          <div class="rt"><b>${r.overall}%</b><span>${t('overall')}</span></div></div>
        <div><span class="level-badge"><span class="lv" style="color:${r.color}">${r.level}</span>${r.levelName}</span>
          <p class="muted" style="margin-top:10px;max-width:380px">${r.levelDesc}</p></div></div>
      <h4 style="margin:6px 0 8px;color:var(--bordo)">${t('domain_profile')}</h4>${bars}
      <div class="reco"><h4>${svgIcon('target')} ${t('reco_dir')}</h4><ul>${r.recos.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="res-actions"><button class="btn btn-gold" onclick="downloadReport()">${svgIcon('download')} ${t('dl_report')}</button>
        <a class="btn btn-teal" href="../proqram.html">${svgIcon('clipboard')} ${t('go_program')}</a></div>
      <div class="saved-note show">${svgIcon('check')} ${t('saved')}</div>`;
    this._showResults(off);
  },
  renderFBA(r){
    const total=r.tally.reduce((a,b)=>a+b,0)||1;
    const bars=r.funcs.map((nm,i)=>{ const pct=Math.round(r.tally[i]/total*100); const c=i===r.best?'var(--accent)':'var(--gold)';
      return `<div class="bar"><div class="bl"><span>${nm}</span><span>${r.tally[i]} · ${pct}%</span></div><div class="track"><div class="fill" style="background:${c}" data-w="${pct}"></div></div></div>`; }).join('');
    document.getElementById('results').innerHTML=`
      <span class="level-badge"><span class="lv">⚑</span>${t('likely_func')}: ${r.func}</span>
      <p class="muted" style="margin:12px 0">${r.desc}</p>
      <h4 style="margin:14px 0 8px;color:var(--bordo)">${t('func_profile')}</h4>${bars}
      <div class="reco"><h4>${svgIcon('target')} ${t('ther_strat')}</h4><ul>${r.recos.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="reco" style="background:#fff;border:1px dashed var(--gold)"><h4>${svgIcon('parent')} ${t('parent_tasks')}</h4><ul>${r.parent.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="res-actions"><button class="btn btn-gold" onclick="downloadReport()">${svgIcon('download')} ${t('dl_report')}</button>
        <a class="btn btn-teal" href="../proqram.html">${svgIcon('clipboard')} ${t('go_program')}</a></div>
      <div class="saved-note show">${svgIcon('check')} ${t('saved')}</div>`;
    this._showResults(null);
  },
  _showResults(off){
    const box=document.getElementById('results'); box.classList.add('show');
    setTimeout(()=>{ if(off!=null){ const rf=document.getElementById('ringFill'); if(rf){rf.style.transition='stroke-dashoffset 1.1s var(--ease)'; rf.style.strokeDashoffset=off;} }
      box.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%'); },80);
    box.scrollIntoView({behavior:'smooth',block:'start'});
  },
  reset(){ this.answers={}; document.querySelectorAll('.opts button').forEach(b=>b.classList.remove('sel'));
    document.getElementById('results').classList.remove('show'); this.updateMeter(); window.scrollTo({top:0,behavior:'smooth'}); }
};

/* HTML hesabat (cari dildə) */
function downloadReport(){
  const p=ABA.getProfile(), r=ASSESS.lastResult;
  if(!r){ alert(t('calc_first')); return; }
  const date=new Date().toLocaleDateString();
  let body='';
  if(r.kind==='scale'){
    body=`<table><tr><th>${t('domain')}</th><th>${t('score')}</th></tr>`+
      r.scores.map(s=>`<tr><td>${s.name}</td><td><div class="b"><div class="f" style="width:${s.pct}%"></div></div>${s.pct}%</td></tr>`).join('')+
      `</table><p class="lv">${t('level')} ${r.level} — ${r.levelName} · ${t('overall')} ${r.overall}%</p>`;
  } else { body=`<p class="lv">${t('likely_func')}: ${r.func}</p><p>${r.desc}</p>`; }
  const recos=(r.recos||[]).map(x=>`<li>${x}</li>`).join('');
  const parent=(r.parent||[]).map(x=>`<li>${x}</li>`).join('');
  const parentBlock=parent?`<div class="reco" style="border-left-color:#D2A55D"><h3>${t('parent_tasks')}</h3><ul>${parent}</ul></div>`:'';
  const html=`<!DOCTYPE html><html lang="${getLang()}"><head><meta charset="UTF-8"><title>${r.toolName} — ${t('report')}</title><style>
body{font-family:'Segoe UI',Arial,sans-serif;max-width:740px;margin:30px auto;padding:0 22px;color:#2a1c1c;line-height:1.6}
.hd{background:linear-gradient(135deg,#4a0000,#6A0000);color:#fff;padding:26px;border-radius:14px}.hd h1{margin:0;color:#D2A55D;font-size:1.5rem}.hd p{margin:4px 0 0;color:#e7d6c2}
.meta{background:#F3ECE0;border-radius:12px;padding:16px;margin:18px 0;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:.92rem}.meta b{color:#6A0000}
table{width:100%;border-collapse:collapse;margin:16px 0}th,td{text-align:left;padding:9px;border-bottom:1px solid #e3d8c8;font-size:.92rem}th{color:#6A0000}
.b{height:10px;background:#F3ECE0;border-radius:6px;overflow:hidden;margin-bottom:4px}.f{height:100%;background:#2A9D8F}.lv{font-weight:700;color:#6A0000;font-size:1.05rem;margin-top:14px}
.reco{background:#F3ECE0;border-left:4px solid #2A9D8F;padding:14px 18px;border-radius:10px;margin-top:14px}.reco h3{color:#6A0000;margin:0 0 8px}.reco li{margin:5px 0;font-size:.92rem}
.ft{margin-top:26px;padding-top:16px;border-top:1px solid #e3d8c8;font-size:.82rem;color:#8a7a72;text-align:center}.ft a{color:#b9863a;font-weight:700;text-decoration:none}</style></head><body>
<div class="hd"><h1>${r.toolName}</h1><p>AN Psixoloji · ${t('report')}</p></div>
<div class="meta"><span><b>${t('pf_child')}:</b> ${p.name||'—'}</span><span><b>${t('pf_age')}:</b> ${p.age||'—'}</span><span><b>${t('pf_spec')}:</b> ${p.spec||'—'}</span><span><b>${t('date')}:</b> ${date}</span></div>
${body}<div class="reco"><h3>${t('recommend')}</h3><ul>${recos}</ul></div>${parentBlock}
<div class="ft">AN Psixoloji Dəstək və Reabilitasiya Mərkəzi · Bakı, Nizami r., Rizvan Teymurov 59 · +994 55 415 72 15<br>
<a href="https://instagram.com/s_akhundoff">@s_akhundoff</a> · ${t('disclaimer')}</div></body></html>`;
  const blob=new Blob([html],{type:'text/html'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=`${r.toolName.replace(/[^a-zA-Z0-9]+/g,'_')}_${(p.name||'usaq').replace(/\s+/g,'_')}.html`; a.click(); URL.revokeObjectURL(a.href);
}

function svgIcon(n){const i={
 target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
 download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v3h16v-3"/></svg>',
 clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h6"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="16" height="16"><path d="M5 12l4 4L19 6"/></svg>',
 parent:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 20c0-2 1-3.5 2.5-3.5S20.5 18 20.5 20"/></svg>'
};return i[n]||'';}

/* ===================== PWA ===================== */
if('serviceWorker' in navigator){
  window.addEventListener('load',function(){
    var m=document.querySelector('link[rel="manifest"]');
    var base=m?m.getAttribute('href').replace('manifest.json',''):'';
    navigator.serviceWorker.register(base+'sw.js').catch(function(){});
  });
}
var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){ e.preventDefault(); deferredPrompt=e; showInstall(); });
function showInstall(){
  if(document.getElementById('pwaInstall')) return;
  var b=document.createElement('button'); b.id='pwaInstall'; b.className='pwa-install';
  b.innerHTML='⬇️ <span>'+(typeof t==='function'?t('install'):'Yüklə')+'</span>';
  b.onclick=function(){ if(!deferredPrompt) return; deferredPrompt.prompt(); deferredPrompt.userChoice.finally(function(){ deferredPrompt=null; b.remove(); }); };
  document.body.appendChild(b);
}
window.addEventListener('appinstalled',function(){ var b=document.getElementById('pwaInstall'); if(b) b.remove(); });

/* ============================================================
   TELEFON DOĞRULAMA — qiymətləndirməyə başlamazdan əvvəl
   (Ad Soyad + İş yeri + Telefon SMS OTP), 30 gün etibarlı
============================================================ */
const ABA_FB_CONFIG = {
  apiKey: "AIzaSyCBhyGNzZRGgQShP_C9kwAzTm_g_0zJlzg",
  authDomain: "an-psixoloji-33442.firebaseapp.com",
  databaseURL: "https://an-psixoloji-33442-default-rtdb.firebaseio.com",
  projectId: "an-psixoloji-33442",
  storageBucket: "an-psixoloji-33442.firebasestorage.app",
  messagingSenderId: "528809299356",
  appId: "1:528809299356:web:59cae89a64e446dc520c59"
};
const ABA_VERIFY_KEY='aba_verified_until', ABA_VERIFY_DAYS=30, ABA_FB_SDK='10.13.1';

function abaLoadScript(src){ return new Promise((res,rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }
let _abaFbReady=null;
function abaEnsureFirebase(){
  if(_abaFbReady) return _abaFbReady;
  _abaFbReady=abaLoadScript(`https://www.gstatic.com/firebasejs/${ABA_FB_SDK}/firebase-app-compat.js`)
    .then(()=>Promise.all([
      abaLoadScript(`https://www.gstatic.com/firebasejs/${ABA_FB_SDK}/firebase-auth-compat.js`),
      abaLoadScript(`https://www.gstatic.com/firebasejs/${ABA_FB_SDK}/firebase-database-compat.js`)
    ]))
    .then(()=>{ if(!firebase.apps.length) firebase.initializeApp(ABA_FB_CONFIG); });
  return _abaFbReady;
}
function abaIsVerified(){ try{ return Date.now() < parseInt(localStorage.getItem(ABA_VERIFY_KEY)||'0',10); }catch(e){ return false; } }
function abaNormalizePhone(v){
  let s=(v||'').replace(/[^\d+]/g,'');
  if(s.startsWith('00')) s='+'+s.slice(2);
  if(s.startsWith('0')) s='+994'+s.slice(1);
  if(!s.startsWith('+')) s='+994'+s;
  return /^\+994\d{9}$/.test(s) ? s : null;
}

let _abaRecaptcha=null, _abaConfirmation=null, _abaPendingCb=null;

function abaBuildModal(){
  if(document.getElementById('verifyOverlay')) return;
  const el=document.createElement('div'); el.id='verifyOverlay'; el.className='verify-overlay';
  el.innerHTML=`<div class="verify-modal">
    <button class="verify-close" type="button" aria-label="Bağla">×</button>
    <h3>Davam etmək üçün qeydiyyat</h3>
    <p class="muted">Qiymətləndirməni keçirmək üçün bir dəfə qeydiyyatdan keçin. Təsdiqləmə 30 gün etibarlıdır.</p>
    <div id="verifyStep1">
      <label>Ad Soyad</label><input id="vName" type="text" placeholder="Ad Soyad" autocomplete="name">
      <label>İş yeri</label><input id="vWork" type="text" placeholder="Məs. AN Psixoloji Mərkəzi">
      <label>Telefon nömrəsi</label><input id="vPhone" type="tel" placeholder="+994 XX XXX XX XX" autocomplete="tel">
      <div id="recaptcha-container"></div>
      <div class="verify-err" id="vErr1"></div>
      <button class="btn btn-primary btn-block" id="vSendCode" type="button">Kod göndər</button>
    </div>
    <div id="verifyStep2" style="display:none">
      <label>SMS kodu</label><input id="vCode" type="text" inputmode="numeric" maxlength="6" placeholder="123456">
      <div class="verify-err" id="vErr2"></div>
      <button class="btn btn-primary btn-block" id="vConfirmCode" type="button">Təsdiqlə</button>
    </div>
  </div>`;
  document.body.appendChild(el);
  el.querySelector('.verify-close').onclick=abaCloseModal;
  el.addEventListener('click',(e)=>{ if(e.target===el) abaCloseModal(); });
  el.querySelector('#vSendCode').onclick=abaSendCode;
  el.querySelector('#vConfirmCode').onclick=abaConfirmCode;
}
function abaCloseModal(){ const el=document.getElementById('verifyOverlay'); if(el) el.classList.remove('show'); }
function openVerifyModal(onSuccess){
  _abaPendingCb=onSuccess;
  abaBuildModal();
  document.getElementById('verifyOverlay').classList.add('show');
  document.getElementById('verifyStep1').style.display='block';
  document.getElementById('verifyStep2').style.display='none';
  document.getElementById('vErr1').textContent=''; document.getElementById('vErr2').textContent='';
}
async function abaSendCode(){
  const err=document.getElementById('vErr1'); err.textContent='';
  const name=document.getElementById('vName').value.trim();
  const work=document.getElementById('vWork').value.trim();
  const phone=abaNormalizePhone(document.getElementById('vPhone').value);
  if(!name||!work){ err.textContent='Ad Soyad və İş yeri mütləqdir.'; return; }
  if(!phone){ err.textContent='Telefon nömrəsini düzgün daxil edin (+994...).'; return; }
  const btn=document.getElementById('vSendCode'); btn.disabled=true; btn.textContent='Göndərilir…';
  try{
    await abaEnsureFirebase();
    if(!_abaRecaptcha) _abaRecaptcha=new firebase.auth.RecaptchaVerifier('recaptcha-container',{size:'invisible'});
    _abaConfirmation=await firebase.auth().signInWithPhoneNumber(phone,_abaRecaptcha);
    document.getElementById('verifyStep1').style.display='none';
    document.getElementById('verifyStep2').style.display='block';
  }catch(e){ err.textContent='Kod göndərilmədi: '+(e.message||e.code||'xəta'); }
  btn.disabled=false; btn.textContent='Kod göndər';
}
async function abaConfirmCode(){
  const err=document.getElementById('vErr2'); err.textContent='';
  const code=document.getElementById('vCode').value.trim();
  if(!code||!_abaConfirmation){ err.textContent='Kodu daxil edin.'; return; }
  const btn=document.getElementById('vConfirmCode'); btn.disabled=true; btn.textContent='Yoxlanılır…';
  try{
    const res=await _abaConfirmation.confirm(code);
    const user=res.user;
    await firebase.database().ref('aba_terapiya/registrations/'+user.uid).set({
      adSoyad:document.getElementById('vName').value.trim(),
      isYeri:document.getElementById('vWork').value.trim(),
      phone:user.phoneNumber, ts:Date.now()
    });
    localStorage.setItem(ABA_VERIFY_KEY,String(Date.now()+ABA_VERIFY_DAYS*86400000));
    abaCloseModal();
    if(typeof _abaPendingCb==='function'){ const cb=_abaPendingCb; _abaPendingCb=null; cb(); }
  }catch(e){ err.textContent='Kod yanlışdır və ya vaxtı bitib.'; }
  btn.disabled=false; btn.textContent='Təsdiqlə';
}

/* Alət səhifələrində ilk cavab klikinə qədər gözləyir, sonra doğrulama tələb edir */
window.LICENSE = {
  init(selector){
    const host=document.querySelector(selector); if(!host) return;
    host.addEventListener('click',function(e){
      const btn=e.target.closest('.opts button'); if(!btn) return;
      if(abaIsVerified()) return;
      e.preventDefault(); e.stopPropagation();
      openVerifyModal(()=>btn.click());
    },true);
  }
};
