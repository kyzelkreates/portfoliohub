// 4P3X Verse™ — Portfolio Hub App
// Powered by 4P3X Intelligent AI™ Created by Kyzel Kreates™
// v2 — Polish pass: hamburger nav, typewriter cursor, keyboard nav, faster typewriter
// SSOT: config/products.js — do not duplicate product data here

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // HAMBURGER MOBILE NAV
  // ─────────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // ─────────────────────────────────────────────
  // PRODUCT GRID — rendered from SSOT products.js
  // ─────────────────────────────────────────────
  const grid   = document.getElementById('productGrid');
  const search = document.getElementById('productSearch');

  function makeThumb(p) {
    // Returns HTML string for card thumbnail
    return `
      <div class="product-card-thumb" aria-hidden="true">
        <img
          src="${p.screenshot}"
          alt="Screenshot of ${p.name} homepage"
          loading="lazy"
          width="320" height="180"
        />
        <span class="live-badge" aria-label="Live deployed product">● Live</span>
      </div>`;
  }

  function buildCard(p) {
    const searchTerms = [p.name, p.sector, p.shortDescription, ...(p.tags || [])].join(' ').toLowerCase();
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.search = searchTerms;
    card.innerHTML = `
      ${makeThumb(p)}
      <div class="product-card-body">
        <p class="sector-tag" aria-label="Sector">${p.sector}</p>
        <h3>${p.name}</h3>
        <p>${p.shortDescription}</p>
        <div class="card-actions">
          <a class="button ghost"
             href="products/${p.slug}.html"
             aria-label="View case study for ${p.name}">View Case Study</a>
          <a class="button live"
             href="${p.url}"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Open ${p.name} live deployed product in new tab">Open Live ↗</a>
        </div>
      </div>`;
    return card;
  }

  function renderGrid(query) {
    if (!grid) return;
    const products = window.FOURP3X_PRODUCTS || [];
    const q = (query || '').toLowerCase().trim();
    grid.innerHTML = '';
    let visible = 0;

    products.forEach(p => {
      const terms = [p.name, p.sector, p.shortDescription, ...(p.tags || [])].join(' ').toLowerCase();
      if (!q || terms.includes(q)) {
        grid.appendChild(buildCard(p));
        visible++;
      }
    });

    if (visible === 0) {
      const msg = document.createElement('p');
      msg.style.cssText = 'color:var(--muted);font-size:.9rem;padding:1rem 0;';
      msg.textContent = `No products match "${query}". Try a different term or clear the search.`;
      grid.appendChild(msg);
    }
  }

  if (grid) {
    renderGrid('');
    if (search) {
      let debounce;
      search.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => renderGrid(search.value), 200);
      });
      // Clear on Escape
      search.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          search.value = '';
          renderGrid('');
        }
      });
    }
  }

  // ─────────────────────────────────────────────
  // AI PORTFOLIO EXPLAINER — typewriter with cursor
  // ─────────────────────────────────────────────
  const agentOutput  = document.getElementById('agentOutput');
  const agentButtons = document.querySelectorAll('.agent-buttons button');

  const ANSWERS = {
    what: `The 4P3X Verse™ is a first-of-its-kind modular AI-assisted product ecosystem — one reusable software base, refactored and adapted into many sector-specific working products.

It is not a collection of random apps. Every product in the portfolio — from TherapyLink™ to Fleet OS to Quantum Compliance OS™ — shares the same underlying architecture, transformed through controlled refactoring into different sectors.

Powered by 4P3X Intelligent AI™. Created by Kyzel Kreates™.`,

    demo: `Demo Mode shows the product. Live Mode runs the product.

This is a core principle of the 4P3X engineering approach. In Demo Mode, every product runs with sample data locally — no backend, no account, no friction.

In Live Mode, the same product connects to real authentication, persistent storage, real users, and real-time sync — activating Supabase, Firebase, REST, or another backend provider.

Same codebase. Same UX. Real data instead of sample data.`,

    skills: `The 4P3X Verse™ proves:

▸ Systems architecture thinking and modular software design
▸ Reusable base engineering and controlled refactoring
▸ AI guidance layer integration across multiple products
▸ Multi-sector product development from one foundation
▸ Safety-aware design in regulated and sensitive markets
▸ Dashboard and PWA workflow architecture
▸ Frontend engineering across HTML, CSS, and JavaScript
▸ Product thinking, user experience design, and sector research
▸ Delivering 11 working deployed products from one architecture

For any employer or investor — that is a remarkably broad, practical, and provable skill set.`,

    investors: `The 4P3X Verse™ is investor-relevant for three reasons.

First: it demonstrates a repeatable product creation model — one base, many sector products, faster time-to-market than custom builds.

Second: it shows 11 active product demos across healthcare, logistics, education, compliance, wellbeing, and more — multiple commercial sectors proven with the same underlying architecture.

Third: it shows clear demo-to-live deployment pathways — each product has a structured route from working demo to real product with real users, real data, and real backend integration.

One codebase. Many directions. Ready to scale.`,

    architecture: `The 4P3X architecture operates on three layers.

Layer One — Base: shared dashboard/PWA shell, modular config system, data model patterns, demo/live switching, AI guidance zones, and backend-ready structure. Built once, used everywhere.

Layer Two — Products: the base is refactored with sector identity, user-specific flows, compliance-aware logic, and demo data — creating a working product demo for a specific sector and user group.

Layer Three — Live variants: demo mode off, backend connected, real users, real data, real sync — the same product running for real organisations with real workflows.

One base. Three layers. Unlimited product directions.`,

    ai: `4P3X Intelligent AI™ is the AI guidance architecture embedded throughout the 4P3X Verse™ ecosystem.

It provides structured AI assistance within each product — flagging risks, supporting decisions, guiding users, and adding intelligent oversight to human-driven workflows.

It is not a generic chatbot layer. Each product's AI guidance is configured for its specific sector, user type, and workflow context.

Fleet safety awareness in the Fleet OS. Recovery guidance in Burnout Recovery OS™. Compliance advisory in Quantum Compliance OS™. Career navigation in CareerLink OS™.

Intelligence that fits the product — not a one-size-fits-all solution.`
  };

  let typewriterTimer = null;

  function typewrite(text) {
    if (!agentOutput) return;

    // Clear previous
    clearInterval(typewriterTimer);
    agentOutput.innerHTML = '';

    // Create text node + cursor
    const textSpan   = document.createElement('span');
    const cursor     = document.createElement('span');
    cursor.className = 'agent-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    agentOutput.appendChild(textSpan);
    agentOutput.appendChild(cursor);

    let i = 0;
    const SPEED = 9; // ms per char — fast but readable
    typewriterTimer = setInterval(() => {
      textSpan.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typewriterTimer);
        cursor.style.display = 'none'; // hide cursor when done
      }
      // Auto-scroll agent panel
      agentOutput.scrollTop = agentOutput.scrollHeight;
    }, SPEED);
  }

  if (agentButtons.length && agentOutput) {
    agentButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.question;
        // Highlight active button
        agentButtons.forEach(b => b.classList.remove('active-q'));
        btn.classList.add('active-q');
        const text = ANSWERS[key] || 'Response not found.';
        typewrite(text);
      });
    });
  }

  // ─────────────────────────────────────────────
  // ACTIVE NAV LINK HIGHLIGHT
  // ─────────────────────────────────────────────
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    // Highlight home when on index
    if (currentFile === 'index.html' || currentFile === '') {
      if (href === 'index.html' || href === '#top') {
        a.style.color = 'var(--gold)';
      }
    }
  });

  // ─────────────────────────────────────────────
  // SMOOTH SCROLL for anchor links that include #
  // (enhances default scroll-behavior: smooth)
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
