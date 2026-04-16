const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", function () {
    siteNav.classList.toggle("active");
  });
}

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    siteNav.classList.remove("active");
  });
});

const resumeButton = document.getElementById("resumeButton");
const resumeLink = document.getElementById("resumeLink");

if (resumeButton && resumeLink) {
  resumeButton.addEventListener("click", function () {
    const confirmed = window.confirm("Do you want to download the resume?");
    if (confirmed) {
      resumeLink.click();
    }
  });
}

const modal = document.getElementById("previewModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const previewTriggers = document.querySelectorAll(".preview-trigger");

function openModal(title, image, description) {
  modalTitle.textContent = title;
  modalImage.src = image;
  modalImage.alt = title;
  modalDescription.textContent = description;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  document.body.style.overflow = "";
}

previewTriggers.forEach(function (item) {
  item.addEventListener("click", function () {
    const title = item.dataset.title || "";
    const image = item.dataset.image || "";
    const description = item.dataset.description || "";
    openModal(title, image, description);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeModal);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

const carouselTrack = document.getElementById("carouselTrack");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

if (carouselTrack && carouselPrev && carouselNext) {
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function updateCarousel() {
    const cards = carouselTrack.querySelectorAll(".carousel-card");
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const firstCard = cards[0];
    if (!firstCard) return;

    const gap = parseFloat(window.getComputedStyle(carouselTrack).gap) || 0;
    const cardWidth = firstCard.offsetWidth;
    const moveAmount = (cardWidth + gap) * currentIndex;

    carouselTrack.style.transform = `translateX(-${moveAmount}px)`;
  }

  carouselNext.addEventListener("click", function () {
    const cards = carouselTrack.querySelectorAll(".carousel-card");
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  carouselPrev.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}