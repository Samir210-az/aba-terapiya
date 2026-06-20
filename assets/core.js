/* ============================================================
   AN Psixoloji — ABA Platforması · Paylaşılan nüvə (core.js)
============================================================ */
(function(){
  // ---- Mobil naviqasiya ----
  window.toggleNav = function(){
    document.getElementById('navLinks')?.classList.toggle('open');
  };
  // ---- Scroll reveal ----
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    markCompletedTools();
  });
})();

/* ===================== LOCALSTORAGE ===================== */
const ABA = {
  PKEY:'aba_profile_v1',
  RKEY:'aba_results_v1',
  getProfile(){ try{return JSON.parse(localStorage.getItem(this.PKEY))||{};}catch(e){return {};} },
  setProfile(p){ localStorage.setItem(this.PKEY, JSON.stringify(p)); },
  getResults(){ try{return JSON.parse(localStorage.getItem(this.RKEY))||{};}catch(e){return {};} },
  saveResult(toolId, data){
    const all=this.getResults();
    all[toolId]=Object.assign({date:new Date().toISOString()}, data);
    localStorage.setItem(this.RKEY, JSON.stringify(all));
  },
  clearAll(){ localStorage.removeItem(this.RKEY); localStorage.removeItem(this.PKEY); }
};

/* Kataloq səhifəsində tamamlanmış alətləri işarələ */
function markCompletedTools(){
  const res = ABA.getResults();
  document.querySelectorAll('[data-tool]').forEach(el=>{
    if(res[el.getAttribute('data-tool')]) el.classList.add('completed');
  });
}

/* ===================== TƏMƏL: PROFİL SAHƏSİ ===================== */
function renderProfileBar(){
  const p = ABA.getProfile();
  const el = document.getElementById('profileBar');
  if(!el) return;
  el.innerHTML = `
    <label>👤 Uşaq:</label>
    <input class="pf-name" id="pfName" placeholder="Ad, soyad" value="${p.name||''}">
    <label>Yaş:</label>
    <input id="pfAge" style="width:90px" placeholder="məs. 4 yaş" value="${p.age||''}">
    <label>Mütəxəssis:</label>
    <input id="pfSpec" style="width:150px" placeholder="ABA terapisti" value="${p.spec||''}">`;
  ['pfName','pfAge','pfSpec'].forEach(id=>{
    el.querySelector('#'+id).addEventListener('input',()=>{
      ABA.setProfile({
        name:el.querySelector('#pfName').value.trim(),
        age:el.querySelector('#pfAge').value.trim(),
        spec:el.querySelector('#pfSpec').value.trim()
      });
    });
  });
}

/* ===================== QİYMƏTLƏNDİRMƏ MOTORu ===================== */
/* Hər alət səhifəsi DOMAINS massivini təyin edir, sonra ASSESS.init() çağırır */
const ASSESS = {
  domains:[], answers:{}, toolId:'', toolName:'', mode:'scale', // scale | single
  init(cfg){
    this.domains=cfg.domains; this.toolId=cfg.toolId; this.toolName=cfg.toolName;
    this.mode=cfg.mode||'scale'; this.answers={};
    this.interpret=cfg.interpret; this.recommend=cfg.recommend;
    renderProfileBar();
    this.render();
    this.updateMeter();
  },
  total(){ return this.domains.reduce((s,d)=>s+d.q.length,0); },
  answered(){ return Object.keys(this.answers).length; },
  render(){
    const host=document.getElementById('domains'); host.innerHTML='';
    this.domains.forEach((dm,di)=>{
      const wrap=document.createElement('div'); wrap.className='domain reveal';
      const opts = this.mode==='single' ? dm.options : null;
      wrap.innerHTML=`<div class="domain-head"><h3><span class="num">${String(di+1).padStart(2,'0')}</span>${dm.name}</h3>
        <small>${dm.hint||''}</small></div>` +
        dm.q.map((q,qi)=>{
          const buttons = this.mode==='single'
            ? `<div class="opts single" data-d="${di}" data-q="${qi}">`+
                opts.map((o,oi)=>`<button data-v="${oi}" onclick="ASSESS.pick(${di},${qi},${oi},this)">${o}</button>`).join('')+`</div>`
            : `<div class="opts" data-d="${di}" data-q="${qi}">
                <button data-v="2" onclick="ASSESS.pick(${di},${qi},2,this)">Bəli</button>
                <button data-v="1" onclick="ASSESS.pick(${di},${qi},1,this)">Qismən</button>
                <button data-v="0" onclick="ASSESS.pick(${di},${qi},0,this)">Xeyr</button></div>`;
          return `<div class="qrow"><span class="qt">${q}</span>${buttons}</div>`;
        }).join('');
      host.appendChild(wrap);
    });
    document.querySelectorAll('#domains .reveal').forEach(el=>el.classList.add('in'));
  },
  pick(d,q,v,btn){
    this.answers[d+'-'+q]=v;
    btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('sel'));
    btn.classList.add('sel');
    this.updateMeter();
  },
  updateMeter(){
    const m=document.getElementById('meter');
    if(m) m.style.width=(this.answered()/this.total()*100)+'%';
  },
  scoreDomains(){
    return this.domains.map((dm,di)=>{
      let got=0,max=dm.q.length*2;
      dm.q.forEach((_,qi)=>got+=(this.answers[di+'-'+qi]||0));
      return {name:dm.name, pct:Math.round(got/max*100), got, max};
    });
  },
  calculate(){
    if(this.answered() < this.total()){
      alert('Zəhmət olmasa bütün bəndləri cavablandırın ('+this.answered()+'/'+this.total()+')');
      const firstEmpty=[...document.querySelectorAll('.qrow')].find(r=>!r.querySelector('.sel'));
      firstEmpty?.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    if(this.mode==='single'){ return this.calculateSingle(); }
    const scores=this.scoreDomains();
    const overall=Math.round(scores.reduce((s,x)=>s+x.pct,0)/scores.length);
    const interp=this.interpret(overall, scores);
    const weak=[...scores].sort((a,b)=>a.pct-b.pct).slice(0,2);
    const recos=this.recommend(interp.level, weak, scores);
    this.renderResults({overall, scores, interp, weak, recos});
    ABA.saveResult(this.toolId,{
      tool:this.toolName, overall, level:interp.level, levelName:interp.name,
      scores, weak:weak.map(w=>w.name), recos
    });
    document.getElementById('savedNote')?.classList.add('show');
  },
  calculateSingle(){
    // FBA: hər sual bir funksiya kateqoriyasına səs verir
    const tally={};
    this.domains[0].options.forEach(o=>tally[o]=0);
    Object.values(this.answers).forEach(v=>{
      const opt=this.domains[0].options[v]; tally[opt]=(tally[opt]||0)+1;
    });
    const interp=this.interpret(tally);
    this.renderResultsSingle(interp, tally);
    ABA.saveResult(this.toolId,{tool:this.toolName, ...interp});
    document.getElementById('savedNote')?.classList.add('show');
  },
  renderResults(r){
    const circ=2*Math.PI*54, off=circ*(1-r.overall/100);
    const bars=r.scores.map(s=>{
      const col=s.pct>=75?'var(--teal)':s.pct>=45?'var(--gold)':'var(--low)';
      return `<div class="bar"><div class="bl"><span>${s.name}</span><span>${s.pct}%</span></div>
        <div class="track"><div class="fill" style="background:${col}" data-w="${s.pct}"></div></div></div>`;
    }).join('');
    document.getElementById('results').innerHTML=`
      <div class="res-top">
        <div class="ring"><svg width="130" height="130">
          <circle cx="65" cy="65" r="54" fill="none" stroke="var(--cream)" stroke-width="11"/>
          <circle cx="65" cy="65" r="54" fill="none" stroke="${r.interp.color}" stroke-width="11"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" id="ringFill"/>
        </svg><div class="rt"><b>${r.overall}%</b><span>ÜMUMİ</span></div></div>
        <div><span class="level-badge"><span class="lv" style="color:${r.interp.color}">${r.interp.level}</span>${r.interp.name}</span>
          <p class="muted" style="margin-top:10px;max-width:380px">${r.interp.desc}</p></div>
      </div>
      <h4 style="margin:6px 0 8px;color:var(--bordo)">Domenlər üzrə profil</h4>${bars}
      <div class="reco"><h4>${svgIcon('target')} Tövsiyə olunan iş istiqaməti</h4>
        <ul>${r.recos.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="res-actions">
        <button class="btn btn-gold" onclick="downloadReport()">${svgIcon('download')} HTML hesabatı yüklə</button>
        <a class="btn btn-teal" href="../proqram.html">${svgIcon('clipboard')} Fərdi proqrama keç</a>
      </div>
      <div class="saved-note show" id="savedNote">${svgIcon('check')} Nəticə yadda saxlanıldı — fərdi proqramda istifadə olunacaq.</div>`;
    const box=document.getElementById('results'); box.classList.add('show');
    setTimeout(()=>{
      document.getElementById('ringFill').style.transition='stroke-dashoffset 1.1s var(--ease)';
      document.getElementById('ringFill').style.strokeDashoffset=off;
      box.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%');
    },80);
    box.scrollIntoView({behavior:'smooth',block:'start'});
  },
  renderResultsSingle(interp, tally){
    const max=Math.max(...Object.values(tally));
    const bars=Object.entries(tally).map(([k,v])=>{
      const pct=max?Math.round(v/Object.values(tally).reduce((a,b)=>a+b,0)*100):0;
      const col=k===interp.func?'var(--bordo)':'var(--gold)';
      return `<div class="bar"><div class="bl"><span>${k}</span><span>${v} işarə · ${pct}%</span></div>
        <div class="track"><div class="fill" style="background:${col}" data-w="${pct}"></div></div></div>`;
    }).join('');
    document.getElementById('results').innerHTML=`
      <span class="level-badge"><span class="lv">⚑</span>Ehtimal olunan funksiya: ${interp.func}</span>
      <p class="muted" style="margin:12px 0">${interp.desc}</p>
      <h4 style="margin:14px 0 8px;color:var(--bordo)">Funksiya profili</h4>${bars}
      <div class="reco"><h4>${svgIcon('target')} Davranış müdaxilə tövsiyələri</h4>
        <ul>${interp.recos.map(x=>'<li>'+x+'</li>').join('')}</ul></div>
      <div class="res-actions">
        <button class="btn btn-gold" onclick="downloadReport()">${svgIcon('download')} HTML hesabatı yüklə</button>
        <a class="btn btn-teal" href="../proqram.html">${svgIcon('clipboard')} Fərdi proqrama keç</a>
      </div>
      <div class="saved-note show" id="savedNote">${svgIcon('check')} Nəticə yadda saxlanıldı.</div>`;
    const box=document.getElementById('results'); box.classList.add('show');
    setTimeout(()=>box.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%'),80);
    box.scrollIntoView({behavior:'smooth',block:'start'});
  },
  reset(){
    this.answers={};
    document.querySelectorAll('.opts button').forEach(b=>b.classList.remove('sel'));
    document.getElementById('results').classList.remove('show');
    this.updateMeter();
    window.scrollTo({top:0,behavior:'smooth'});
  }
};

/* ===================== HTML HESABAT YÜKLƏMƏ ===================== */
function downloadReport(){
  const p=ABA.getProfile();
  const r=ABA.getResults()[ASSESS.toolId];
  if(!r){ alert('Əvvəlcə nəticəni hesablayın.'); return; }
  const date=new Date().toLocaleDateString('az-AZ');
  let body='';
  if(r.scores){
    body = `<table><tr><th>Domen</th><th>Bal</th></tr>`+
      r.scores.map(s=>`<tr><td>${s.name}</td><td><div class="b"><div class="f" style="width:${s.pct}%"></div></div>${s.pct}%</td></tr>`).join('')+
      `</table><p class="lv">Səviyyə ${r.level} — ${r.levelName} · Ümumi ${r.overall}%</p>`;
  } else if(r.func){
    body = `<p class="lv">Ehtimal olunan funksiya: ${r.func}</p><p>${r.desc}</p>`;
  }
  const recos=(r.recos||[]).map(x=>`<li>${x}</li>`).join('');
  const html=`<!DOCTYPE html><html lang="az"><head><meta charset="UTF-8">
<title>${r.tool} — Hesabat</title><style>
body{font-family:'Segoe UI',Arial,sans-serif;max-width:740px;margin:30px auto;padding:0 22px;color:#2a1c1c;line-height:1.6}
.hd{background:linear-gradient(135deg,#4a0000,#6A0000);color:#fff;padding:26px;border-radius:14px}
.hd h1{margin:0;color:#D2A55D;font-size:1.5rem}.hd p{margin:4px 0 0;color:#e7d6c2}
.meta{background:#F3ECE0;border-radius:12px;padding:16px;margin:18px 0;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:.92rem}
.meta b{color:#6A0000}
table{width:100%;border-collapse:collapse;margin:16px 0}th,td{text-align:left;padding:9px;border-bottom:1px solid #e3d8c8;font-size:.92rem}
th{color:#6A0000}.b{height:10px;background:#F3ECE0;border-radius:6px;overflow:hidden;margin-bottom:4px}
.f{height:100%;background:#2A9D8F}.lv{font-weight:700;color:#6A0000;font-size:1.05rem;margin-top:14px}
.reco{background:#F3ECE0;border-left:4px solid #D2A55D;padding:14px 18px;border-radius:10px;margin-top:14px}
.reco h3{color:#6A0000;margin:0 0 8px}.reco li{margin:5px 0;font-size:.92rem}
.ft{margin-top:26px;padding-top:16px;border-top:1px solid #e3d8c8;font-size:.82rem;color:#8a7a72;text-align:center}
.ft a{color:#b9863a;font-weight:700;text-decoration:none}
</style></head><body>
<div class="hd"><h1>${r.tool}</h1><p>AN Psixoloji Dəstək və Reabilitasiya Mərkəzi · ABA Qiymətləndirmə Hesabatı</p></div>
<div class="meta"><span><b>Uşaq:</b> ${p.name||'—'}</span><span><b>Yaş:</b> ${p.age||'—'}</span>
<span><b>Mütəxəssis:</b> ${p.spec||'—'}</span><span><b>Tarix:</b> ${date}</span></div>
${body}
<div class="reco"><h3>Tövsiyələr</h3><ul>${recos}</ul></div>
<div class="ft">Hazırladı: <b>By s_akhundoff</b> · <a href="https://instagram.com/s_akhundoff">@s_akhundoff</a><br>
Qeyd: Bu hesabat skrininq məqsədlidir; rəsmi diaqnoz sertifikatlı mütəxəssis tərəfindən verilir.</div>
</body></html>`;
  const blob=new Blob([html],{type:'text/html'});
  const a=document.createElement('a');
  const safe=(p.name||'usaq').replace(/\s+/g,'_');
  a.href=URL.createObjectURL(blob);
  a.download=`${r.tool.replace(/\s+/g,'_')}_${safe}.html`;
  a.click(); URL.revokeObjectURL(a.href);
}

/* ===================== SVG İKONLAR ===================== */
function svgIcon(name){
  const i={
    target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v3h16v-3"/></svg>',
    clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h6"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="16" height="16"><path d="M5 12l4 4L19 6"/></svg>'
  };
  return i[name]||'';
}
