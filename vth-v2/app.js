/* Vila Tech Hub — app.js v2.0 */
(function () {

  document.addEventListener('DOMContentLoaded', function () {
    renderTudo();
    atualizarStats();
    atualizarFooter();
    animarBarra();
  });

  function animarBarra() {
    var b = document.getElementById('loading-bar');
    if (!b) return;
    b.style.width = '70%';
    setTimeout(function(){ b.style.width='100%'; setTimeout(function(){ b.style.display='none'; },400); },300);
  }

  function atualizarStats() {
    var t = EVENTOS.length;
    var p = EVENTOS.filter(function(e){ return e.tipo==='Palestra'; }).length;
    var c = EVENTOS.filter(function(e){ return e.tipo==='Curso'; }).length;
    var ev= EVENTOS.filter(function(e){ return e.tipo==='Evento'; }).length;
    anim('stat-total',t); anim('stat-palestras',p); anim('stat-cursos',c); anim('stat-eventos',ev);
  }

  function anim(id, ate) {
    var el = document.getElementById(id); if (!el) return;
    var dur=800, t0=performance.now();
    function tick(now){ var t=Math.min(1,(now-t0)/dur); el.textContent=Math.round(ate*ease(t)); if(t<1)requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  function ease(t){ return 1-Math.pow(1-t,3); }

  function atualizarFooter() {
    var el = document.getElementById('footer-update'); if (!el) return;
    el.textContent = 'Atualizado em ' + new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric',timeZone:'America/Sao_Paulo'});
  }

  function renderTudo() {
    var container = document.getElementById('months-container'); if (!container) return;
    var porMes = {};
    EVENTOS.forEach(function(ev){ if(!porMes[ev.mes]) porMes[ev.mes]=[]; porMes[ev.mes].push(ev); });
    var meses = Object.keys(porMes).sort(function(a,b){ return MESES_ORDEM.indexOf(a)-MESES_ORDEM.indexOf(b); });
    container.innerHTML = '';
    meses.forEach(function(mes){ container.appendChild(criarSecao(mes, porMes[mes])); });
  }

  function criarSecao(mes, eventos) {
    var sec = document.createElement('div');
    sec.className='month-section'; sec.id='sec-'+mes;
    var evs = eventos.slice().sort(function(a,b){ return a.dia-b.dia; });
    sec.innerHTML =
      '<div class="month-header">' +
        '<h2 class="month-name">'+(MESES_LABEL[mes]||mes)+'</h2>' +
        '<div class="month-year">2026</div>' +
        '<div class="month-count" id="count-'+mes+'">'+evs.length+' atividade'+(evs.length!==1?'s':'')+'</div>' +
      '</div>' +
      '<div class="events-grid" id="grid-'+mes+'"></div>';
    var grid = sec.querySelector('.events-grid');
    evs.forEach(function(ev,i){ var c=criarCard(ev); c.style.animationDelay=(i*.07)+'s'; grid.appendChild(c); });
    return sec;
  }

  function criarCard(ev) {
    var tc = ev.tipo==='Palestra'?'palestra':ev.tipo==='Curso'?'curso':'evento';
    var card = document.createElement('article');
    card.className='card '+tc; card.dataset.tipo=ev.tipo; card.dataset.mes=ev.mes;
    var sp = ev.speakers && ev.speakers.length
      ? '<div class="card-speakers">'+ev.speakers.map(function(s){ return '<span class="speaker-pill">'+h(s)+'</span>'; }).join('')+'</div>' : '';
    var cta = ev.linkInscricao
      ? '<a class="card-cta" href="'+h(ev.linkInscricao)+'" target="_blank" rel="noopener">Inscrever-se →</a>'
      : '<a class="card-cta" href="https://vilatechub.com.br" target="_blank" rel="noopener">Conhecer o Vila Tech Hub →</a>';
    card.innerHTML =
      '<span class="card-type '+tc+'">'+h(ev.tipo)+'</span>'+
      '<div class="card-date">'+
        '<div class="date-day">'+String(ev.dia).padStart(2,'0')+'</div>'+
        '<div class="date-info">'+
          '<div class="date-weekday">'+h(ev.semana)+' · '+(MESES_LABEL[ev.mes]||ev.mes)+'</div>'+
          '<div class="date-time">'+h(ev.inicio)+' – '+h(ev.fim)+'</div>'+
        '</div>'+
      '</div>'+
      '<h3 class="card-title">'+h(ev.titulo)+'</h3>'+
      '<p class="card-subtitle">'+h(ev.sub||'')+'</p>'+
      sp+
      '<div class="card-footer">'+
        '<div class="card-local"><div class="card-local-dot"></div><div class="card-local-text">'+h(ev.local||'Vila Tech Hub')+'</div></div>'+
        cta+
      '</div>';
    return card;
  }

  window.filtrar = function(tipo, btn) {
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active','t-p','t-c','t-e'); });
    btn.classList.add('active');
    if(tipo==='Palestra') btn.classList.add('t-p');
    if(tipo==='Curso')    btn.classList.add('t-c');
    if(tipo==='Evento')   btn.classList.add('t-e');

    var algum = false;
    document.querySelectorAll('.month-section').forEach(function(sec){
      var m = sec.id.replace('sec-','');
      var isMesFiltro = MESES_ORDEM.includes(tipo);
      if(isMesFiltro && tipo!==m){ sec.style.display='none'; return; }
      sec.style.display='';
      var cards=sec.querySelectorAll('.card'), vis=0;
      cards.forEach(function(c){
        var show = tipo==='todos' || (isMesFiltro ? c.dataset.mes===tipo : c.dataset.tipo===tipo);
        c.style.display=show?'':'none';
        if(show){vis++;algum=true;}
      });
      var cnt=document.getElementById('count-'+m);
      if(cnt) cnt.textContent=vis+' atividade'+(vis!==1?'s':'');
    });
    var eg=document.getElementById('empty-global');
    if(eg){ if(!algum) eg.classList.remove('hidden'); else eg.classList.add('hidden'); }
  };

  function h(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

})();
