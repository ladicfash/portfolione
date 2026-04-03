// assets/app.js
// Portfolio app script: carousel, keyboard nav, modal, previews, deep dives

(() => {
  'use strict';

  /* ---------- Helpers ---------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const encode = (s) => encodeURI(s);

  function trapFocus(container) {
    const focusable = container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function handle(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    container.addEventListener('keydown', handle);
    return () => container.removeEventListener('keydown', handle);
  }

  /* ---------- Modal ---------- */

  const modal = $('#modal');
  const modalBody = $('#modal-body');
  const modalClose = modal && modal.querySelector('.modal-close');

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus management
    setTimeout(() => {
      const h2 = modal.querySelector('h2');
      if (h2) {
        h2.setAttribute('tabindex', '-1');
        h2.focus();
      }
    }, 50);
    // trap focus
    modal._untrap = trapFocus(modal);
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal._untrap) modal._untrap();
    // return focus to last focused card if available
    if (modal._lastTrigger) {
      try { modal._lastTrigger.focus(); } catch (e) {}
      modal._lastTrigger = null;
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------- Deep dive content generator ---------- */

  // Root-level filenames (exact names in repo). Use encode() when building hrefs.
  const FILES = {
    CURO: 'CURO symposium:SPIA Colloquim presentation .pdf',
    ELOS_PPTX: 'ELOS Big4 v4.pptx',
    ELOS_PDF: 'ELOS_Big4_v4.pdf',
    SQL_PDF: 'sqladvancedcheatsheet_ladi.pdf',
    SERVICENOW_PDF: 'document_pdfservicenow.pdf',
    EX1_PDF: 'ex1_main.pdf'
  };

  function deepDiveHtml(id) {
    // returns HTML string for modal body for given id
    switch (id) {
      case 'ds267':
        return `
          <h2 id="modal-title">Brazil–U.S. Cotton Dispute (DS267)</h2>
          <p><strong>Synopsis</strong>: The Brazil‑U.S. Cotton Dispute (DS267) began in 2002 when Brazil challenged U.S. cotton subsidies; the WTO ruled in Brazil's favor in 2004 and again in 2009. In 2014 the U.S. and Brazil reached a settlement where the U.S. paid $300 million to the Brazil Cotton Institute.</p>
          <blockquote>“Retaliation as leverage works.”</blockquote>
          <h3>Why it matters</h3>
          <p>This case demonstrates how an emerging economy can use multilateral dispute mechanisms to correct market distortions and gain diplomatic leverage. Brazil's sustained litigation effort strengthened domestic institutions (CAMEX) and elevated its role in global trade governance.</p>
          <h3>Key takeaways</h3>
          <ul>
            <li>Strategic litigation can shift bargaining power in trade negotiations.</li>
            <li>Legal victories translate into domestic political capital and leadership roles.</li>
            <li>Long timelines require coordinated domestic policy and diplomatic follow‑through.</li>
          </ul>
          <p class="doc-note">Source: CURO symposium presentation by Oladipupo Fashogbon.</p>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.CURO)}" download>Download CURO PDF</a>
          </div>
        `;
      case 'ds266':
        return `
          <h2 id="modal-title">Brazil Sugar Dispute (DS266)</h2>
          <p><strong>Synopsis</strong>: DS266 focused on EU sugar subsidies and their impact on Brazilian producers. Brazil's coordinated agro‑industry response and WTO engagement pressured reforms and highlighted the role of sectoral policy coordination.</p>
          <h3>Why it matters</h3>
          <p>The dispute shows how sectoral coalitions and litigation capacity can produce policy change beyond bilateral relations, influencing third‑party reforms (e.g., EU subsidy adjustments).</p>
          <h3>Key takeaways</h3>
          <ul>
            <li>Building domestic coalitions is essential for sustained trade litigation.</li>
            <li>Disputes can catalyze broader policy reforms in other jurisdictions.</li>
          </ul>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.CURO)}" download>Download CURO PDF</a>
          </div>
        `;
      case 'ds70':
        return `
          <h2 id="modal-title">DS70 — Embraer</h2>
          <p><strong>Synopsis</strong>: DS70 involved trade measures affecting Embraer and Brazil's aerospace sector. The case reinforced industrial policy priorities and the need to align domestic support with international obligations.</p>
          <h3>Why it matters</h3>
          <p>Protecting strategic industries while complying with trade rules requires careful policy design; DS70 illustrates the balance between economic sovereignty and multilateral commitments.</p>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.CURO)}" download>Download CURO PDF</a>
          </div>
        `;
      case 'elos':
        return `
          <h2 id="modal-title">ELOS Emotional Labor OS</h2>
          <p><strong>Concept</strong>: ELOS detects rising tension before a conversation happens and gives managers a heads‑up in advance. It focuses on behavioral patterns — response delays, shorter messages, skipped meetings — rather than message content, preserving privacy.</p>
          <h3>Product summary</h3>
          <p>ELOS combines lightweight sensing layers with manager‑facing tools: near real‑time alerts, contextual coaching prompts, and organizational learning dashboards. The product is designed to integrate with existing collaboration tools while minimizing privacy risk.</p>
          <h3>Business case</h3>
          <p>By identifying issues early, ELOS aims to reduce turnover and lost productivity associated with burnout. Hypothetical pricing tiers (Starter $12/user/month; Growth $18/user/month) reflect the value of prevention versus reactive survey tools.</p>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.ELOS_PDF)}" download>Download Deck (PDF)</a>
            <a class="btn" href="${encode(FILES.ELOS_PPTX)}" download>Download Deck (PPTX)</a>
          </div>
        `;
      case 'elos-cost':
        return `
          <h2 id="modal-title">ELOS Pricing & Positioning</h2>
          <p><strong>Overview</strong>: Pricing is hypothetical and positioned above basic survey tools to reflect real‑time detection and manager tooling. Starter and Growth tiers target mid‑market customers; Enterprise includes dedicated support and integrations.</p>
          <h3>Positioning</h3>
          <ul>
            <li>Value: prevention of burnout and reduced turnover.</li>
            <li>Differentiator: behavior‑pattern sensing without reading message text.</li>
          </ul>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.ELOS_PDF)}" download>Download Deck (PDF)</a>
          </div>
        `;
      case 'sql':
        return `
          <h2 id="modal-title">SQL Cheat Sheet</h2>
          <p><strong>Quick Tip</strong>: <code>INNER JOIN</code> returns only matched rows. Use LEFT JOIN to preserve left‑side rows when relationships are optional.</p>
          <h3>Highlights</h3>
          <ul>
            <li>Window functions: ROW_NUMBER, RANK, LAG, LEAD for analytical queries.</li>
            <li>Indexes: apply to WHERE, JOIN, and ORDER BY columns to improve performance.</li>
            <li>CTEs: use WITH for readable, stepwise data pipelines.</li>
          </ul>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.SQL_PDF)}" download>Download SQL Cheat Sheet</a>
          </div>
        `;
      case 'stored-proc':
        return `
          <h2 id="modal-title">Stored Procedures & Views</h2>
          <p><strong>Overview</strong>: Use views for clean, reusable SELECTs and stored procedures for parameterized, multi‑step operations. Procedures are ideal when you need input parameters or transactional logic.</p>
          <h3>Best practices</h3>
          <ul>
            <li>Keep procedures focused and idempotent where possible.</li>
            <li>Use views to encapsulate complex joins and expose a stable interface.</li>
          </ul>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.SQL_PDF)}" download>Download SQL Cheat Sheet</a>
          </div>
        `;
      case 'servicenow':
        return `
          <h2 id="modal-title">ServiceNow IT Leadership Certificate</h2>
          <p><strong>Completion</strong>: ServiceNow IT Leadership Professional Certificate — Completed Dec 06, 2024 • 6 hours 2 minutes.</p>
          <p>Top skills covered: IT Project & Program Management, IT architectures, IT Strategic Planning.</p>
          <div class="modal-actions">
            <a class="btn" href="${encode(FILES.SERVICENOW_PDF)}" download>Download Certificate</a>
          </div>
        `;
      case 'admissions':
        return `
          <h2 id="modal-title">Admissions Workflow</h2>
          <p><strong>Overview</strong>: Process flow for applicant screening, document checks, and final decision automation. The diagram captures decision points, timeouts, and escalation paths.</p>
          <h3>Why it matters</h3>
          <p>Automating routine decisions reduces processing time and ensures consistent applicant treatment. The flow is designed to surface missing documents, route to the correct officer, and enforce SLAs.</p>
          <img src="assets/admissions-flow.jpg" alt="Admissions flow diagram" style="width:100%;border-radius:8px;margin-top:12px" />
          <div class="modal-actions" style="margin-top:12px">
            <a class="btn" href="${encode(FILES.EX1_PDF)}" download>Download Diagram PDF</a>
          </div>
        `;
      default:
        return `<h2 id="modal-title">${id}</h2><p>Details coming soon.</p>`;
    }
  }

  /* ---------- Card interactions & keyboard nav ---------- */

  const cards = $$('.card');

  function openCardModal(card) {
    const id = card.dataset.id;
    if (!id) return;
    // remember trigger for focus return
    modal._lastTrigger = card;
    modalBody.innerHTML = deepDiveHtml(id);
    openModal();
  }

  cards.forEach(card => {
    // make card focusable if not already
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => openCardModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(card);
      }
    });
  });

  // global keyboard nav for cards (left/right)
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (active && active.classList && active.classList.contains('card')) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = active.nextElementSibling || active.parentElement.querySelector('.card');
        next && next.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = active.previousElementSibling || active.parentElement.querySelector('.card:last-child');
        prev && prev.focus();
      }
    }
  });

  /* ---------- Hover preview injection (auto) ---------- */

  // Create a small preview element for each card (uses card image + title + short excerpt)
  cards.forEach(card => {
    const media = card.querySelector('img');
    const title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
    const excerpt = card.querySelector('p') ? card.querySelector('p').textContent.trim() : '';
    // build preview element
    const preview = document.createElement('div');
    preview.className = 'preview';
    preview.setAttribute('aria-hidden', 'true');
    preview.innerHTML = `
      <div style="display:flex;gap:12px;align-items:flex-start">
        <img src="${media ? media.src : 'assets/hero-collage.jpg'}" alt="" style="width:96px;height:64px;object-fit:cover;border-radius:6px" />
        <div style="max-width:220px">
          <strong style="display:block;margin-bottom:6px">${title}</strong>
          <p style="margin:0;color:#bfc7cc;font-size:13px;line-height:1.2">${excerpt}</p>
        </div>
      </div>
    `;
    // position container for absolute preview
    card.style.position = 'relative';
    card.appendChild(preview);
    // preview positioning handled in mouseenter below
  });

  // preview positioning so it doesn't overflow viewport
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const preview = card.querySelector('.preview');
      if (!preview) return;
      const rect = card.getBoundingClientRect();
      const previewWidth = Math.min(360, Math.max(220, rect.width * 1.6));
      preview.style.width = previewWidth + 'px';
      // default left align; if near right edge, align right
      const rightSpace = window.innerWidth - rect.right;
      if (rightSpace < previewWidth + 24) {
        preview.style.right = '0';
        preview.style.left = 'auto';
      } else {
        preview.style.left = '0';
        preview.style.right = 'auto';
      }
      preview.style.display = 'block';
    });
    card.addEventListener('mouseleave', () => {
      const preview = card.querySelector('.preview');
      if (preview) preview.style.display = 'none';
    });
  });

  /* ---------- Image fallback ---------- */

  window.addEventListener('error', function (e) {
    const el = e.target;
    if (el && el.tagName === 'IMG' && el.src && el.src.includes('assets/')) {
      el.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><rect width="100%" height="100%" fill="#121212"/><text x="50%" y="50%" fill="#9aa0a6" font-size="18" text-anchor="middle" dominant-baseline="middle">Image missing</text></svg>`
      );
    }
  }, true);

  /* ---------- Small UX helpers ---------- */

  // Smoothly scroll a carousel when focusing a card (improves keyboard nav)
  $$('.carousel').forEach(carousel => {
    carousel.addEventListener('focusin', (e) => {
      const card = e.target.closest('.card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const cRect = carousel.getBoundingClientRect();
        if (rect.left < cRect.left || rect.right > cRect.right) {
          carousel.scrollBy({ left: rect.left - cRect.left - 12, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Init: ensure modal exists and wire close on Escape inside modal ---------- */

  // close modal when clicking any element with data-close attribute (optional)
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches && t.matches('[data-close]')) closeModal();
  });

  // expose for debugging (optional)
  window.__portfolio = {
    openCardModal,
    closeModal,
    deepDiveHtml
  };

})();
