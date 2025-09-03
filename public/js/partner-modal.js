let partnersData = [];

function initializePartnerModal(partners) {
  partnersData = partners;
  setupEventListeners();
}

function setupEventListeners() {
  const modal = document.getElementById('partnerModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closePartnerModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePartnerModal();
    }
  });
}

function openPartnerModal(index) {
  const partner = partnersData[index];
  if (!partner) {
    console.error('Partner not found at index:', index);
    return;
  }

  const modal = document.getElementById('partnerModal');
  const modalImage = document.getElementById('modalPartnerImage');
  const modalName = document.getElementById('modalPartnerName');
  const modalDescription = document.getElementById('modalPartnerDescription');
  const modalLink = document.getElementById('modalPartnerLink');

  if (!modal || !modalImage || !modalName || !modalDescription || !modalLink) {
    console.error('Modal elements not found');
    return;
  }

  modalImage.src = partner.image;
  modalImage.alt = `${partner.name} logo`;
  modalName.textContent = partner.name;
  modalDescription.textContent = partner.description;
  modalLink.href = partner.url;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closePartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

window.openPartnerModal = openPartnerModal;
window.closePartnerModal = closePartnerModal;
window.initializePartnerModal = initializePartnerModal;
