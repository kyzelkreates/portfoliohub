// 4P3X Verse™ — Portfolio Hub App
// Powered by 4P3X Intelligent AI™ Created by Kyzel Kreates™
// Reads from FOURP3X_PRODUCTS (config/products.js) — single source of truth

document.addEventListener('DOMContentLoaded', () => {

  // ── PRODUCT GRID ──────────────────────────────────────────
  const grid   = document.getElementById('productGrid');
  const search = document.getElementById('productSearch');

  function buildCard(p) {
    const screenshotHTML = `
      <div class="product-card-thumb">
        <img
          src="${p.screenshot}"
          alt="Screenshot of ${p.name} homepage"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div style=\'display:flex;align-items:center;justify-content:center;height:100%;color:#6a7282;font-size:.78rem;padding:1rem;text-align:center;\'>Screenshot pending — live product available via the button below</div>'"
        />
        <span class="live-badge" aria-label="Live deployed product">● Live</span>
      </div>`;

    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.search = [p.name, p.sector, p.shortDescription, ...(p.tags || [])].join(' ').toLowerCase();

    card.innerHTML = `
      ${screenshotHTML}
      <div class="product-card-body">
        <p class="sector-tag">${p.sector}</p>
        <h3>${p.name}</h3>
        <p>${p.shortDescription}</p>
        <div class="card-actions">
          <a class="button ghost"   href="products/${p.slug}.html">View Case Study</a>
          <a class="button live"    href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.name} live product in new tab">Open Live ↗</a>
        </div>
      </div>`;
    return card;
  }

  function renderGrid(query) {
    if (!grid) return;
    grid.innerHTML = '';
    const q = (query || '').toLowerCase().trim();
    const products = window.FOURP3X_PRODUCTS || [];
    let visible = 0;
    products.forEach(p => {
      if (!q || p.dataset?.search.includes(q) || [p.name, p.sector, p.shortDescription, ...(p.tags||[])].join(' ').toLowerCase().includes(q)) {
        grid.appendChild(buildCard(p));
        visible++;
      }
    });
    if (visible === 0) {
      grid.innerHTML = '<p style="color:var(--muted);font-size:.9rem;">No products match your search. Try a different term.</p>';
    }
  }

  if (grid) {
    renderGrid('');
    if (search) {
      let debounce;
      search.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => renderGrid(search.value), 180);
      });
    }
  }

  // ── AI EXPLAINER ──────────────────────────────────────────
  const agentOutput  = document.getElementById('agentOutput');
  const agentButtons = document.querySelectorAll('.agent-buttons button');

  const ANSWERS = {
    what: `The 4P3X Verse™ is a first-of-its-kind modular AI-assisted product ecosystem — one reusable software base, refactored and adapted into many sector-specific working products. It is not a collection of random apps. Every product in the portfolio — from TherapyLink™ to Fleet OS to Quantum Compliance OS™ — shares the same underlying architecture, transformed through controlled refactoring into different sectors. Powered by 4P3X Intelligent AI™. Created by Kyzel Kreates™.`,

    demo: `Demo Mode shows the product. Live Mode runs the product. This is a core principle of the 4P3X engineering approach. In Demo Mode, every product runs with sample data locally — no backend, no account, no friction. In Live Mode, the same product connects to real authentication, persistent storage, real users, and real-time sync — activating Supabase, Firebase, REST, or another backend provider. The same codebase. The same UX. Real data instead of sample data.`,

    skills: `The 4P3X Verse™ proves: systems architecture thinking, modular software design, reusable base engineering, AI guidance layer integration, multi-sector product development, safety-aware design in regulated markets, dashboard/PWA workflow architecture, demo-to-live deployment planning, frontend engineering (HTML/CSS/JS), product thinking, user experience design, and the ability to deliver 11 working deployed products from one foundation. For any employer or investor — that's a remarkably broad, practical, and provable skill set.`,

    investors: `The 4P3X Verse™ is investor-relevant for three reasons. First, it demonstrates a repeatable product creation model — one base, many sector products, faster time-to-market than custom builds. Second, it shows 11 active product demos across healthcare, logistics, education, compliance, wellbeing, and more — multiple commercial sectors proven with the same underlying architecture. Third, it shows demo-to-live deployment pathways — each product has a clear route from working demo to real product with real users. One codebase. Many directions. Ready to scale.`,

    architecture: `The 4P3X architecture operates on three layers. Layer One is the reusable base: shared dashboard/PWA shell, modular config system, data model patterns, demo/live switching, AI guidance zones, and backend-ready structure. Layer Two is sector products: the base is refactored with sector identity, user-specific flows, compliance-aware logic, and demo data — creating a working product demo for a specific sector. Layer Three is live variants: demo mode off, backend connected, real users, real data, real sync — the same product running for real organisations. One base. Three layers. Unlimited product directions.`,

    ai: `4P3X Intelligent AI™ is the AI guidance architecture embedded throughout the 4P3X Verse™ ecosystem. It provides structured AI assistance within each product — flagging risks, supporting decisions, guiding users, and adding intelligent oversight to human-driven workflows. It is not a generic chatbot layer. Each product's AI guidance is configured for its specific sector, user type, and workflow — fleet safety awareness in the Fleet OS, recovery guidance in Recharge Burnout Recovery™, compliance advisory in Quantum Compliance OS™. Intelligence that fits the product, not a one-size-fits-all solution.`
  };

  if (agentButtons.length && agentOutput) {
    agentButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.question;
        agentOutput.textContent = '';
        agentOutput.style.color = 'var(--silver)';
        const text = ANSWERS[key] || 'Response not found.';
        // Typewriter effect
        let i = 0;
        const interval = setInterval(() => {
          agentOutput.textContent += text[i];
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 14);
      });
    });
  }

  // ── ACTIVE NAV ────────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.site-header nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(currentPath) && currentPath !== '') {
      a.style.color = 'var(--gold)';
    }
  });

});
