/* ============================================
   メインスクリプト — カード生成 / モーダル / タブ /
   ヒント開閉 / 進捗管理 / テーマ切替 / フィルタ
   ============================================ */

(() => {
  "use strict";

  const STORAGE_DONE = "mech2023.done";
  const STORAGE_THEME = "mech2023.theme";

  /* ---------- 状態 ---------- */
  let doneSet = new Set(JSON.parse(localStorage.getItem(STORAGE_DONE) || "[]"));
  let currentFilter = "all";
  let currentIndex = -1;
  let currentAnim = null;

  /* ---------- KaTeX レンダリング ---------- */
  function renderMath(el) {
    if (typeof renderMathInElement === "function") {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  /* ---------- テーマ ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }
  const savedTheme = localStorage.getItem(STORAGE_THEME)
    || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_THEME, next);
  });

  /* ---------- 進捗 ---------- */
  function updateProgress() {
    const total = PROBLEMS.length;
    const done = doneSet.size;
    document.getElementById("stat-done").textContent = done;
    document.getElementById("progress-fill").style.width = `${(done / total) * 100}%`;
    document.getElementById("progress-text").textContent =
      done === total ? `🎉 全問クリア！おつかれさま！` : `${done} / ${total} 問クリア`;
  }

  function saveDone() {
    localStorage.setItem(STORAGE_DONE, JSON.stringify([...doneSet]));
    updateProgress();
  }

  /* ---------- 難易度表示 ---------- */
  function diffStars(d) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star${i <= d ? "" : " off"}">★</span>`;
    }
    return `<span class="card-diff" title="難易度 ${d}/5">${html}</span>`;
  }

  /* ---------- フィルタチップ生成（年度別） ---------- */
  const chipWrap = document.getElementById("filter-chips");
  const years = [...new Set(PROBLEMS.map(p => p.year))];
  years.forEach(y => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.filter = y;
    btn.textContent = `${y}年度`;
    chipWrap.appendChild(btn);
  });
  chipWrap.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    chipWrap.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === btn));
    renderCards();
  });

  /* ---------- カード描画 ---------- */
  const container = document.getElementById("problems-container");

  function renderCards() {
    container.innerHTML = "";
    PROBLEMS.forEach((p, i) => {
      if (currentFilter !== "all" && p.year !== currentFilter) return;
      const card = document.createElement("article");
      card.className = "problem-card" + (doneSet.has(p.id) ? " done" : "");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${p.year}年度 ${p.chapter} ${p.number} ${p.title} を開く`);
      card.innerHTML = `
        <div class="card-top">
          <span class="card-badge">${p.year} ${p.chapter} ${p.number}</span>
          <span class="card-check">${doneSet.has(p.id) ? "✅" : ""}</span>
        </div>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-formula">${p.formula}</div>
        <div class="card-tags">
          ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join("")}
        </div>
        ${diffStars(p.difficulty)}
      `;
      card.addEventListener("click", () => openModal(i));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(i); }
      });
      container.appendChild(card);
    });
    renderMath(container);
  }

  /* ---------- モーダル ---------- */
  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");

  function openModal(index) {
    if (currentAnim) { currentAnim.stop(); currentAnim = null; }
    currentIndex = index;
    const p = PROBLEMS[index];
    const isDone = doneSet.has(p.id);
    const animType = (typeof ANIM_BY_ID !== "undefined") ? ANIM_BY_ID[p.id] : null;
    const hasAnim = animType && typeof ANIMATIONS !== "undefined" && ANIMATIONS[animType];

    modalContent.innerHTML = `
      <header class="modal-header">
        <div class="modal-badge-row">
          <span class="card-badge">${p.year} ${p.chapter} ${p.number}</span>
          ${diffStars(p.difficulty)}
        </div>
        <h2 class="modal-title">${p.title}</h2>
      </header>

      <div class="tabs" role="tablist">
        <button class="tab-btn active" data-tab="statement" role="tab">📄 問題文</button>
        <button class="tab-btn" data-tab="meaning" role="tab">🤔 問題の意味</button>
        ${hasAnim ? '<button class="tab-btn" data-tab="anim" role="tab">🎬 図で見る</button>' : ""}
        <button class="tab-btn" data-tab="hints" role="tab">💡 ヒント</button>
        <button class="tab-btn" data-tab="solution" role="tab">✅ 解説</button>
      </div>

      <section class="tab-panel active" data-panel="statement">
        <div class="panel-box statement-box">
          <h4>📄 問題文</h4>
          ${p.statement}
        </div>
        <p style="color: var(--text-sub); font-size: 0.88rem;">まずは自力で考えてみよう。分からない言葉があったら「問題の意味」タブへ。${hasAnim ? "動きのイメージは「🎬 図で見る」タブでどうぞ。" : ""}</p>
      </section>

      <section class="tab-panel" data-panel="meaning">
        <div class="panel-box meaning-box">
          <h4>🤔 この問題は何を聞いているのか</h4>
          ${p.meaning}
        </div>
      </section>

      ${hasAnim ? `
      <section class="tab-panel" data-panel="anim">
        <div class="anim-wrap">
          <canvas class="anim-canvas" id="anim-canvas"></canvas>
          <p class="anim-hint">▶ 図をクリック / タップで動かせます（もう一度で一時停止）</p>
          <p class="anim-cap">${(typeof ANIM_CAPTION !== "undefined" && ANIM_CAPTION[animType]) || ""}</p>
        </div>
      </section>` : ""}

      <section class="tab-panel" data-panel="hints">
        ${p.hints.map((h, i) => `
          <div class="hint-item">
            <button class="hint-toggle" aria-expanded="false">
              <span class="hint-num">${i + 1}</span>
              ヒント ${i + 1} を開く
              <span class="hint-arrow">▼</span>
            </button>
            <div class="hint-body"><p>${h}</p></div>
          </div>
        `).join("")}
        <p style="color: var(--text-sub); font-size: 0.88rem; margin-top: 1rem;">💡 ヒントは上から順に少しずつ核心に近づきます。1つ開いたら一度自分で手を動かしてみるのがおすすめ。</p>
      </section>

      <section class="tab-panel" data-panel="solution">
        <div class="panel-box">
          ${p.solution}
          <div class="answer-box">
            <h4>🎯 最終解答</h4>
            <p>${p.answer}</p>
          </div>
        </div>
        <button class="done-btn ${isDone ? "is-done" : ""}" id="done-btn">
          ${isDone ? "✅ クリア済み（タップで取り消し）" : "この問題を理解した！（クリアにする）"}
        </button>
      </section>

      <div class="modal-nav">
        <button id="nav-prev" ${index === 0 ? "disabled" : ""}>← 前の問題</button>
        <button id="nav-next" ${index === PROBLEMS.length - 1 ? "disabled" : ""}>次の問題 →</button>
      </div>
    `;

    /* タブ切替 */
    const tabs = modalContent.querySelectorAll(".tab-btn");
    const panels = modalContent.querySelectorAll(".tab-panel");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.toggle("active", t === tab));
        panels.forEach(pn => pn.classList.toggle("active", pn.dataset.panel === tab.dataset.tab));
        // アニメーションタブを初めて開いたら起動（canvasにサイズがついてから）
        if (tab.dataset.tab === "anim" && hasAnim && !currentAnim) {
          const cv = modalContent.querySelector("#anim-canvas");
          if (cv) currentAnim = ANIMATIONS[animType](cv);
        }
      });
    });

    /* ヒント開閉 */
    modalContent.querySelectorAll(".hint-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".hint-item");
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
    });

    /* クリアボタン */
    modalContent.querySelector("#done-btn").addEventListener("click", () => {
      if (doneSet.has(p.id)) doneSet.delete(p.id);
      else doneSet.add(p.id);
      saveDone();
      renderCards();
      openModal(index); // 表示更新
      // 解説タブを開いた状態を維持
      modalContent.querySelector('[data-tab="solution"]').click();
    });

    /* 前後ナビ */
    modalContent.querySelector("#nav-prev").addEventListener("click", () => {
      if (currentIndex > 0) openModal(currentIndex - 1);
    });
    modalContent.querySelector("#nav-next").addEventListener("click", () => {
      if (currentIndex < PROBLEMS.length - 1) openModal(currentIndex + 1);
    });

    renderMath(modalContent);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    overlay.querySelector(".modal").scrollTop = 0;
  }

  function closeModal() {
    if (currentAnim) { currentAnim.stop(); currentAnim = null; }
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => {
    if (overlay.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft" && currentIndex > 0) openModal(currentIndex - 1);
    if (e.key === "ArrowRight" && currentIndex < PROBLEMS.length - 1) openModal(currentIndex + 1);
  });

  /* ---------- 用語辞典 ---------- */
  const glossaryGrid = document.getElementById("glossary-grid");
  GLOSSARY.forEach(g => {
    const card = document.createElement("div");
    card.className = "glossary-card";
    card.innerHTML = `<h3>${g.term}</h3><p>${g.desc}</p>`;
    glossaryGrid.appendChild(card);
  });

  /* ---------- 初期化 ---------- */
  function init() {
    renderCards();
    renderMath(glossaryGrid);
    updateProgress();
  }

  // KaTeX auto-render の読み込みを待ってから描画
  if (typeof renderMathInElement === "function") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
