const menuButton=document.querySelector('.menu');const nav=document.querySelector('.nav');if(menuButton){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open?'true':'false')});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}const yearEl=document.getElementById('year');if(yearEl){yearEl.textContent=new Date().getFullYear();}


// Web3Forms contact form
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const status = document.getElementById('formStatus');
  const submitButton = document.getElementById('quoteSubmit');

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const accessKey = quoteForm.querySelector('input[name="access_key"]').value.trim();
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      status.textContent = 'Contact form setup is not complete yet. Please call 289 800 5101.';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    status.textContent = 'Sending your request...';

    try {
      const formData = new FormData(quoteForm);
      const object = Object.fromEntries(formData);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(object)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        quoteForm.reset();
        status.textContent = 'Thank you! Your quote request was sent successfully.';
        setTimeout(() => {
          window.location.href = 'thanks.html';
        }, 800);
      } else {
        status.textContent = result.message || 'We could not send your request. Please call 289 800 5101.';
      }
    } catch (error) {
      status.textContent = 'We could not send your request. Please call 289 800 5101.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Quote Request';
    }
  });
}


// === QUICK HELP WHATSAPP DRAWER ===
(() => {
  if (window.location.pathname.includes('thanks.html') || document.getElementById('quickHelpLauncher')) return;

  const serviceByPath = {
    '/all-keys-lost/': 'All Keys Lost',
    '/car-key-replacement/': 'Replacement / Spare Key',
    '/key-programming/': 'Key Programming',
    '/german-car-keys/': 'German Car Key',
    '/remote-starters/': 'Remote Starter',
    '/module-programming/': 'Module Programming / Coding'
  };

  const widget = document.createElement('div');
  widget.className = 'quick-help-widget';
  widget.innerHTML = `
    <button class="quick-help-launcher" id="quickHelpLauncher" type="button" aria-haspopup="dialog" aria-controls="quickHelpPanel" aria-expanded="false">
      <span class="quick-help-icon" aria-hidden="true">🚗</span>
      <span>How can we help?</span>
    </button>

    <div class="quick-help-backdrop" id="quickHelpBackdrop" hidden></div>

    <section class="quick-help-panel" id="quickHelpPanel" role="dialog" aria-modal="true" aria-labelledby="quickHelpTitle" hidden>
      <div class="quick-help-head">
        <div>
          <small>MAGIC CAR KEYS</small>
          <h2 id="quickHelpTitle">How can we help?</h2>
          <p>Send your vehicle details directly to us on WhatsApp.</p>
        </div>
        <button class="quick-help-close" id="quickHelpClose" type="button" aria-label="Close quick help form">×</button>
      </div>

      <form class="quick-help-form" id="quickHelpForm">
        <div class="quick-help-two">
          <label>
            <span>Year</span>
            <input id="quickYear" name="year" type="number" inputmode="numeric" min="1900" required placeholder="2021" autocomplete="off">
          </label>
          <label>
            <span>Make</span>
            <input name="make" required placeholder="BMW" autocomplete="organization-title">
          </label>
        </div>

        <label>
          <span>Model</span>
          <input name="model" required placeholder="X5" autocomplete="off">
        </label>

        <label>
          <span>Postal Code</span>
          <input id="quickPostal" name="postal" required inputmode="text" maxlength="7" placeholder="L5B 2C9"
                 pattern="[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]" autocomplete="postal-code">
          <small class="quick-field-note">Used only to understand your mobile-service location.</small>
        </label>

        <label>
          <span>Service Needed</span>
          <select id="quickService" name="service" required>
            <option value="">Select a service</option>
            <option>All Keys Lost</option>
            <option>Replacement / Spare Key</option>
            <option>Key Fob / Smart Key</option>
            <option>Key Programming</option>
            <option>German Car Key</option>
            <option>Remote Starter</option>
            <option>Module Programming / Coding</option>
            <option>Diagnostics / Other</option>
          </select>
        </label>

        <button class="quick-help-submit" type="submit">
          <span aria-hidden="true">💬</span>
          Send on WhatsApp
        </button>

        <p class="quick-help-privacy">No full street address is required here.</p>
      </form>
    </section>
  `;
  document.body.appendChild(widget);

  const launcher = document.getElementById('quickHelpLauncher');
  const panel = document.getElementById('quickHelpPanel');
  const backdrop = document.getElementById('quickHelpBackdrop');
  const close = document.getElementById('quickHelpClose');
  const form = document.getElementById('quickHelpForm');
  const postal = document.getElementById('quickPostal');
  const year = document.getElementById('quickYear');
  const service = document.getElementById('quickService');

  year.max = String(new Date().getFullYear() + 1);

  const currentPath = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
  if (serviceByPath[currentPath]) service.value = serviceByPath[currentPath];

  const openPanel = () => {
    panel.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(() => {
      panel.classList.add('open');
      backdrop.classList.add('open');
    });
    launcher.setAttribute('aria-expanded', 'true');
    document.body.classList.add('quick-help-open');
    setTimeout(() => year.focus(), 80);
  };

  const closePanel = () => {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('quick-help-open');
    setTimeout(() => {
      panel.hidden = true;
      backdrop.hidden = true;
      launcher.focus();
    }, 220);
  };

  launcher.addEventListener('click', openPanel);
  close.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  postal.addEventListener('input', () => {
    let value = postal.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    if (value.length > 3) value = value.slice(0, 3) + ' ' + value.slice(3);
    postal.value = value;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      'Hi Magic Car Keys, I need help with my vehicle.',
      '',
      'Year: ' + data.get('year'),
      'Make: ' + data.get('make'),
      'Model: ' + data.get('model'),
      'Postal Code: ' + data.get('postal'),
      'Service: ' + data.get('service')
    ].join('\n');

    const whatsappUrl = 'https://wa.me/12898005101?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
