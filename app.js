// 4P3X Verse™ Portfolio Hub — app.js
// Powered by 4P3X Intelligent AI™ Created by Kyzel Kreates™
// SSOT: config/products.js — do not duplicate product data here.

(function () {
  'use strict';

  const products = window.FOURP3X_PRODUCTS || [];
  const grid = document.querySelector('#productGrid');
  const searchInput = document.querySelector('#productSearch');
  const agentOutput = document.querySelector('#agentOutput');

  // ── Product card markup ──────────────────────────────────────────────────
  function productMarkup(product) {
    const tags = product.tags
      .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('');

    return `
      <article class="product-card">
        <header>
          <h3>${escapeHtml(product.name)}</h3>
          <span class="badge">${escapeHtml(product.badge)}</span>
        </header>
        <p>${escapeHtml(product.summary)}</p>
        <dl>
          <div>
            <dt>Sector</dt>
            <dd>${escapeHtml(product.sector)}</dd>
          </div>
          <div>
            <dt>Who needs it</dt>
            <dd>${escapeHtml(product.users)}</dd>
          </div>
          <div>
            <dt>Architecture proof</dt>
            <dd>${escapeHtml(product.proof)}</dd>
          </div>
          <div>
            <dt>Demo-to-live pathway</dt>
            <dd>${escapeHtml(product.liveReady)}</dd>
          </div>
        </dl>
        <div class="tag-list" aria-label="Product tags">${tags}</div>
        <a
          class="button secondary card-link"
          href="${escapeAttr(product.url)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open deployed demo for ${escapeAttr(product.name)}"
        >Open deployed demo ↗</a>
      </article>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── Render products ──────────────────────────────────────────────────────
  function renderProducts(filter) {
    if (!grid) return;
    const query = (filter || '').trim().toLowerCase();
    const filtered = query
      ? products.filter(p => JSON.stringify(p).toLowerCase().includes(query))
      : products;

    if (filtered.length) {
      grid.innerHTML = filtered.map(productMarkup).join('');
    } else {
      grid.innerHTML = `
        <div class="empty-state">
          <h3 style="margin-bottom:0.6rem;">No matches found</h3>
          <p>Try searching for: dashboard, PWA, compliance, training, welfare, routing, care, career, wellbeing, or reputation.</p>
        </div>
      `;
    }
  }

  // ── AI Explainer answers ─────────────────────────────────────────────────
  const answers = {
    what: "The 4P3X Verse™ is a connected modular AI-assisted product ecosystem. Instead of treating each app as a separate one-off build, it shows how one reusable architecture can be refactored into many sector-ready products — each with its own identity, user flows, data model, and demo-to-live pathway. The same base runs therapy coordination, fleet routing, career support, employee training, community response, wellbeing, LMS course delivery, crypto compliance, and reputation monitoring. One structure. Many transformations.",

    demo: "Demo Mode shows the product using safe demonstration data and locally configured flows — no real users, no live backend, no persistent records. Everything visible is exactly how the live product would behave, just running on simulated data. Live Mode runs the product by turning demo off, connecting a real backend such as Supabase, Firebase, or a REST API, then enabling real authentication, persistent records, organisation-specific configuration, real-time sync, and production reporting. The pathway from Demo to Live is an engineering decision, not a design one.",

    skills: "This portfolio proves: systems thinking and modular architecture planning, AI-assisted development and structured prompting, dashboard and PWA product design, rapid learning across sectors and technology stacks, safety-aware product thinking (compliance, welfare, legal routing), demo/live mode separation and deployment awareness, refactoring discipline without full rebuilds, data model design and backend-ready planning, and the ability to turn ideas into working product demos across healthcare, logistics, finance, education, wellbeing, and more.",

    investors: "Investors, employers, funders, and partners should care because this ecosystem demonstrates repeatable product creation — not a single isolated app. The same base can be adapted into multiple markets, branded for different organisations, connected to real backends, and developed into fundable or deployable products with focused finishing work. It shows a creator who can think at system level, execute at product level, and explain it clearly to any audience. One architecture. Hundreds of possible product directions. Proven across ten deployed demos.",

    architecture: "The 4P3X Verse™ is built on three layers. Layer One is the reusable base: a shared dashboard and PWA shell, modular configuration, data model patterns, demo/live mode switching, AI guidance zones, and backend-ready planning. Layer Two is working products: the base refactored with sector-specific identity, user flows, compliance logic, and demo data. Layer Three is future sector variants: the same products connected to real backends, real users, real authentication, and real-time sync. Each refactoring run is controlled and safe — no full rebuilds, no starting from zero.",

    ai: "4P3X Intelligent AI™ is the AI-assisted guidance and product thinking layer that powers the 4P3X Verse™ ecosystem. It provides structured prompting, decision support, architecture planning, product refinement, and portfolio explanation across all 4P3X products. In this portfolio hub, it powers the explainer panel. In a full Base44 deployment, it can be upgraded to a live agent that answers questions about architecture, generates investor summaries, exports portfolio PDFs, and provides real-time product guidance."
  };

  // ── Event listeners ──────────────────────────────────────────────────────
  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-question]');
    if (!button || !agentOutput) return;

    const key = button.dataset.question;
    const response = answers[key] || answers.what;

    agentOutput.style.opacity = '0';
    setTimeout(function () {
      agentOutput.textContent = response;
      agentOutput.style.opacity = '1';
    }, 120);
  });

  if (searchInput) {
    searchInput.addEventListener('input', function (event) {
      renderProducts(event.target.value);
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  renderProducts();

})();
