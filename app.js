// app.js - minimal carousel + modal + keyboard navigation
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.modal-close');

const cards = Array.from(document.querySelectorAll('.card'));
cards.forEach(card=>{
  card.addEventListener('click', ()=> openCard(card.dataset.id));
  card.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.key === ' ') openCard(card.dataset.id);
  });
});

// Keyboard navigation for carousels: left/right arrows move focus between cards
document.addEventListener('keydown', (e)=>{
  const active = document.activeElement;
  if(active && active.classList && active.classList.contains('card')){
    if(e.key === 'ArrowRight'){
      e.preventDefault();
      const next = active.nextElementSibling || active.parentElement.querySelector('.card');
      next && next.focus();
    } else if(e.key === 'ArrowLeft'){
      e.preventDefault();
      const prev = active.previousElementSibling || active.parentElement.querySelector('.card:last-child');
      prev && prev.focus();
    } else if(e.key === 'Escape'){
      closeModal();
    }
  } else {
    if(e.key === 'k' && (e.ctrlKey || e.metaKey)){
      // quick focus first card
      cards[0] && cards[0].focus();
    }
  }
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e=> { if(e.target === modal) closeModal(); });

function openCard(id){
  // Populate modal content for known ids
  if(id === 'ds267'){
    modalBody.innerHTML = `
      <h2 id="modal-title">Brazil–U.S. Cotton Dispute (DS267)</h2>
      <p><strong>Synopsis</strong>: The Brazil‑U.S. Cotton Dispute (DS267) began in 2002 when Brazil challenged U.S. cotton subsidies; the WTO ruled in Brazil's favor in 2004 and again in 2009.</p>
      <blockquote>“Retaliation as leverage works.”</blockquote>
      <h3>Key Outcomes</h3>
      <ul>
        <li>WTO rulings in favor of Brazil (2004, 2009)</li>
        <li>Authorized retaliatory tariffs; settlement in 2014</li>
        <li>Domestic policy coordination and global leadership effects</li>
      </ul>
      <p class="doc-note">Source: CURO symposium presentation by Oladipupo Fashogbon.</p>
      <div class="modal-actions">
        <a class="btn" href="assets/CURO_symposium_SPIA_Colloquim_presentation.pdf" download>Download PDF</a>
      </div>
    `;
  } else if(id === 'elos'){
    modalBody.innerHTML = `
      <h2 id="modal-title">ELOS Emotional Labor OS</h2>
      <p><strong>Concept</strong>: ELOS detects rising tension before a conversation happens and gives managers a heads‑up in advance.</p>
      <blockquote>“ELOS reads patterns — response delays, shorter messages, skipped meetings — not message content.”</blockquote>
      <h3>Capabilities</h3>
      <ul>
        <li>Near real‑time behavioral pattern detection</li>
        <li>Privacy by design — no message text analysis</li>
        <li>Manager tools for in‑the‑moment coaching</li>
      </ul>
      <h3>Pricing (Hypothetical)</h3>
      <p>Starter $12/user/month • Growth $18/user/month • Enterprise custom</p>
      <p class="doc-note">Source: ELOS Big4 v4 product deck (N2N Services).</p>
      <div class="modal-actions">
        <a class="btn" href="assets/ELOS_Big4_v4.pdf" download>Download Deck</a>
      </div>
    `;
  } else if(id === 'sql'){
    modalBody.innerHTML = `
      <h2 id="modal-title">SQL Cheat Sheet</h2>
      <p><strong>Quick Tip</strong>: <code>INNER JOIN</code> returns only matched rows.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Window functions: ROW_NUMBER, RANK, LAG, LEAD</li>
        <li>Indexes: use on WHERE, JOIN, ORDER BY columns</li>
        <li>CTEs for readable pipelines</li>
      </ul>
      <div class="modal-actions">
        <a class="btn" href="assets/sqladvancedcheatsheet_ladi.pdf" download>Download Cheat Sheet</a>
      </div>
    `;
  } else if(id === 'servicenow'){
    modalBody.innerHTML = `
      <h2 id="modal-title">ServiceNow IT Leadership Certificate</h2>
      <p><strong>Completion</strong>: ServiceNow IT Leadership Professional Certificate — Completed Dec 06, 2024 • 6 hours 2 minutes.</p>
      <p>Top skills: IT Project & Program Management, IT architectures, IT Strategic Planning.</p>
      <div class="modal-actions">
        <a class="btn" href="assets/servicenow_certificate.pdf" download>Download Certificate</a>
      </div>
    `;
  } else if(id === 'admissions'){
    modalBody.innerHTML = `
      <h2 id="modal-title">Admissions Workflow</h2>
      <p><strong>Overview</strong>: Process flow for applicant screening, document checks, and final decision automation.</p>
      <img src="assets/admissions-flow.jpg" alt="Admissions flow diagram" style="width:100%;border-radius:8px;margin-top:12px" />
      <div class="modal-actions" style="margin-top:12px">
        <a class="btn" href="assets/ex1_main.pdf" download>Download Diagram PDF</a>
      </div>
    `;
  } else {
    modalBody.innerHTML = `<h2 id="modal-title">${id}</h2><p>Details coming soon.</p>`;
  }

  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  // focus management
  const firstHeading = modal.querySelector('h2');
  firstHeading && firstHeading.focus && firstHeading.setAttribute('tabindex','-1') && firstHeading.focus();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

// Basic lazy image fallback: replace broken images with placeholder
document.addEventListener('error', function(e){
  const el = e.target;
  if(el.tagName === 'IMG' && el.src && el.src.includes('assets/')){
    el.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23121212"/><text x="50%" y="50%" fill="%23aaa" font-size="20" text-anchor="middle" dominant-baseline="middle">Image Placeholder</text></svg>';
  }
}, true);
