// small site behaviors: modal for poems, year fill, nav active state
document.addEventListener('DOMContentLoaded', () => {
  // fill years
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;
  document.getElementById('year3')?.textContent = y;

  // modal logic on poems page
  const poemCards = Array.from(document.querySelectorAll('.poem-card'));
  const modal = document.getElementById('poemModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalClose = document.getElementById('modalClose');
  const waOrder = document.getElementById('waOrder');
  const orderSimilar = document.getElementById('orderSimilar');

  poemCards.forEach(card => {
    const btn = card.querySelector('.open-btn');
    btn?.addEventListener('click', () => {
      const title = card.dataset.title || 'Letter';
      const text = card.dataset.text || '';
      modalTitle.textContent = title;
      modalText.textContent = text;
      modal.setAttribute('aria-hidden', 'false');

      // pre-fill order link to include title as reference
      orderSimilar.href = `order.html?ref=${encodeURIComponent(title)}`;

      // WhatsApp link (user must add PHONE_NUMBER in order.html script)
      // We build a simple message for the user:
      const message = encodeURIComponent(`Hi Sulien, I want to order a letter similar to: ${title}`);
      waOrder.href = `https://wa.me/PHONE_NUMBER_HERE?text=${message}`;
    });
  });

  // close modal
  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }

  // if order.html loaded with ?ref=..., prefill recipientName notes
  if (window.location.pathname.endsWith('order.html')) {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      const recipientField = document.querySelector('input[name="recipientName"]');
      const notesField = document.querySelector('textarea[name="notes"]');
      if (recipientField) recipientField.value = ref;
      if (notesField) notesField.value = `I'd like something similar to: ${ref}`;
    }
  }
});
