/* ============================================================
   VILA TECH HUB — app.js
   Lógica principal da agenda
   ============================================================ */

(function () {

  // ── Estado ──────────────────────────────────────────────────
  let filtroAtivo = 'todos';

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    renderTudo();
    atualizarStats();
    atualizarFooterData();
    animarLoadingBar();
  });

  // ── Loading bar ─────────────────────────────────────────────
  function animarLoadingBar() {
    const bar = document.getElementById('loading-bar');
    if (!bar) return;
    bar.style.width = '70%';
    setTimeout(function () {
      bar.style.width = '100%';
      setTimeout(function () { bar.style.display = 'none'; }, 400);
    }, 300);
  }

  // ── Stats ────────────────────────────────────────────────────
  function atualizarStats() {
    const total     = EVENTOS.length;
    const palestras = EVENTOS.filter(function(e){ return e.tipo === 'Palestra'; }).length;
    const cursos    = EVENTOS.filter(function(e){ return e.tipo === 'Curso'; }).length;
    const eventos   = EVENTOS.filter(function(e){ return e.tipo === 'Evento'; }).length;

    animarNumero('stat-total',     0, total);
    animarNumero('stat-palestras', 0, palestras);
    animarNumero('stat-cursos',    0, cursos);
    animarNumero('stat-eventos',   0, eventos);
  }

  function animarNumero(id, de, ate) {
    var el = document.getElementById(id);
    if (!el) return;
    var duracao = 800;
    var inicio  = performance.now();
    function tick(agora) {
      var t = Math.min(1, (agora - inicio) / duracao);
      el.textContent = Math.round(de + (ate - de) * easeOut(t));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  // ── Footer data ──────────────────────────────────────────────
  function atualizarFooterData() {
    var el = document.getElementById('footer-update');
    if (!el) return;
    var d  = new Date();
    var opts = { day:'2-digit', month:'long', year:'numeric', timeZone:'America/Sao_Paulo' };
    el.textContent = 'Atualizado em ' + d.toLocaleDateString('pt-BR', opts);
  }

  // ── Render tudo ──────────────────────────────────────────────
  function renderTudo() {
    var container = document.getElementById('months-container');
    if (!container) return;

    // Agrupa por mês
    var porMes = {};
    EVENTOS.forEach(function(ev) {
      if (!porMes[ev.mes]) porMes[ev.mes] = [];
      porMes[ev.mes].push(ev);
    });

    // Ordena os meses
    var mesesPresentes = Object.keys(porMes).sort(function(a, b) {
      return MESES_ORDEM.indexOf(a) - MESES_ORDEM.indexOf(b);
    });

    container.innerHTML = '';

    mesesPresentes.forEach(function(mes) {
      var evsMes = porMes[mes].sort(function(a,b){ return a.dia - b.dia; });
      var secEl  = criarSecaoMes(mes, evsMes);
      container.appendChild(secEl);
    });
  }

  // ── Criar seção de mês ───────────────────────────────────────
  function criarSecaoMes(mes, eventos) {
    var sec  = document.createElement('div');
    sec.className = 'month-section';
    sec.id = 'sec-' + mes;

    var header = document.createElement('div');
    header.className = 'month-header';
    header.innerHTML =
      '<div class="month-name">' + (MESES_LABEL[mes] || mes) + '</div>' +
      '<div class="month-year">2026</div>' +
      '<div class="month-count" id="count-' + mes + '">' + eventos.length + ' atividade' + (eventos.length !== 1 ? 's' : '') + '</div>';

    var grid = document.createElement('div');
    grid.className = 'events-grid';
    grid.id = 'grid-' + mes;

    eventos.forEach(function(ev, i) {
      var card = criarCard(ev);
      card.style.animationDelay = (i * 0.06) + 's';
      grid.appendChild(card);
    });

    sec.appendChild(header);
    sec.appendChild(grid);
    return sec;
  }

  // ── Criar card ───────────────────────────────────────────────
  function criarCard(ev) {
    var tc   = tipoClass(ev.tipo);
    var card = document.createElement('article');
    card.className = 'card ' + tc;
    card.dataset.tipo = ev.tipo;
    card.dataset.mes  = ev.mes;

    var speakers = '';
    if (ev.speakers && ev.speakers.length > 0) {
      speakers = '<div class="card-speakers">' +
        ev.speakers.map(function(s){ return '<span class="speaker-pill">' + escHtml(s) + '</span>'; }).join('') +
        '</div>';
    }

    var cta = ev.linkInscricao
      ? '<a class="card-cta" href="' + escHtml(ev.linkInscricao) + '" target="_blank" rel="noopener">Inscrever-se →</a>'
      : '<a class="card-cta" href="https://vilatechub.com.br" target="_blank" rel="noopener">Saiba mais →</a>';

    card.innerHTML =
      '<span class="card-type ' + tc + '">' + escHtml(ev.tipo) + '</span>' +
      '<div class="card-date">' +
        '<div class="date-day">' + String(ev.dia).padStart(2, '0') + '</div>' +
        '<div class="date-info">' +
          '<div class="date-weekday">' + escHtml(ev.semana) + ' · ' + escHtml(MESES_LABEL[ev.mes] || ev.mes) + '</div>' +
          '<div class="date-time">' + escHtml(ev.inicio) + ' – ' + escHtml(ev.fim) + '</div>' +
        '</div>' +
      '</div>' +
      '<h3 class="card-title">' + escHtml(ev.titulo) + '</h3>' +
      '<p class="card-subtitle">' + escHtml(ev.sub || '') + '</p>' +
      speakers +
      '<div class="card-footer">' +
        '<div class="card-local"><div class="card-local-dot"></div><div class="card-local-text">' + escHtml(ev.local || 'Vila Tech Hub') + '</div></div>' +
        cta +
      '</div>';

    return card;
  }

  // ── Filtrar ──────────────────────────────────────────────────
  window.filtrar = function(tipo, btn) {
    filtroAtivo = tipo;

    // Atualiza botões
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('active', 't-palestra', 't-curso', 't-evento');
    });
    btn.classList.add('active');
    if (tipo === 'Palestra') btn.classList.add('t-palestra');
    if (tipo === 'Curso')    btn.classList.add('t-curso');
    if (tipo === 'Evento')   btn.classList.add('t-evento');

    var algumVisivel = false;

    document.querySelectorAll('.month-section').forEach(function(sec) {
      var mesSec  = sec.id.replace('sec-', '');
      var filtroMes = (tipo === 'junho' || tipo === 'julho' || tipo === 'agosto' ||
                       MESES_ORDEM.includes(tipo));
      var mesVisivel = !filtroMes || tipo === mesSec;

      if (!mesVisivel) {
        sec.style.display = 'none';
        return;
      }
      sec.style.display = '';

      var cards   = sec.querySelectorAll('.card');
      var visCount = 0;

      cards.forEach(function(card) {
        var showTipo = tipo === 'todos' || tipo === mesSec || card.dataset.tipo === tipo;
        var showMes  = !filtroMes || card.dataset.mes === tipo;
        var show     = showTipo && showMes;

        if (filtroMes) show = card.dataset.mes === tipo;
        else           show = tipo === 'todos' || card.dataset.tipo === tipo;

        card.style.display = show ? '' : 'none';
        if (show) { visCount++; algumVisivel = true; }
      });

      var count = document.getElementById('count-' + mesSec);
      if (count) count.textContent = visCount + ' atividade' + (visCount !== 1 ? 's' : '');
    });

    var emptyGlobal = document.getElementById('empty-global');
    if (emptyGlobal) {
      if (!algumVisivel) emptyGlobal.classList.remove('hidden');
      else               emptyGlobal.classList.add('hidden');
    }
  };

  // ── Helpers ──────────────────────────────────────────────────
  function tipoClass(tipo) {
    if (tipo === 'Palestra') return 'palestra';
    if (tipo === 'Curso')    return 'curso';
    return 'evento';
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

})();
