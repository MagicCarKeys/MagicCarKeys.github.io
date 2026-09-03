const menuButton=document.querySelector('.menu');const nav=document.querySelector('.nav');if(menuButton){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open?'true':'false')});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}document.getElementById('year').textContent=new Date().getFullYear();


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
