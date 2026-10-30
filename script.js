// Configuração rápida do perfil do Instagram e WhatsApp
const INSTAGRAM_URL = "https://www.instagram.com/fabiosunigadesign/";
const WHATSAPP_NUMBER = "5511953273656";

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza os links do Instagram
  const instaTopBtn = document.getElementById("instaProfileTopBtn");
  if (instaTopBtn) {
    instaTopBtn.href = INSTAGRAM_URL;
  }

  // 1. Menu Mobile
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileNav.hasAttribute("hidden");
      if (isHidden) {
        mobileNav.removeAttribute("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
      } else {
        mobileNav.setAttribute("hidden", "");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Simulador Interativo da Vitrine de Landing Pages
  const showcaseTabs = document.querySelectorAll(".showcase-tab");
  const previewSlides = document.querySelectorAll(".preview-slide");
  const mockupUrl = document.getElementById("mockupUrl");

  const urlMap = {
    petcare: "https://petcareclinica.com.br (Demonstração Fictícia)",
    imobiliaria: "https://primeimoveis.com.br (Demonstração Fictícia)",
    hamburgueria: "https://betterbeefburger.com.br (Demonstração Fictícia)",
  };

  showcaseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-preview");

      showcaseTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      previewSlides.forEach((slide) => {
        if (slide.getAttribute("data-slide") === target) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      if (mockupUrl && urlMap[target]) {
        mockupUrl.textContent = urlMap[target];
      }
    });
  });

  // 3. Lightbox para os slides do Carrossel do Instagram
  const lightboxDialog = document.getElementById("lightboxDialog");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const instaCards = document.querySelectorAll(".insta-post-card");

  instaCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-lightbox");
      if (lightboxDialog && lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxDialog.showModal();
      }
    });
  });

  if (lightboxClose && lightboxDialog) {
    lightboxClose.addEventListener("click", () => lightboxDialog.close());
    lightboxDialog.addEventListener("click", (e) => {
      if (e.target === lightboxDialog) {
        lightboxDialog.close();
      }
    });
  }

  // 4. Configurador de Orçamento Rápido + Link de WhatsApp
  const serviceChips = document.querySelectorAll(".selector-chip");
  const clientNameInput = document.getElementById("clientName");
  const generatedMessageEl = document.getElementById("generatedMessage");
  const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");
  const whatsappFloat = document.getElementById("whatsappFloat");

  let selectedService = "Landing Page Exclusiva";

  function updateMessage() {
    const nameVal = clientNameInput ? clientNameInput.value.trim() : "";
    const intro = nameVal
      ? `Olá Fábio! Aqui é ${nameVal}.`
      : `Olá Fábio! Tudo bem?`;
    const msg = `${intro} Vi sua Landing Page e gostaria de conversar sobre um orçamento para: ${selectedService}.`;
    if (generatedMessageEl) {
      generatedMessageEl.textContent = msg;
    }
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    if (sendWhatsappBtn) {
      sendWhatsappBtn.href = waUrl;
    }
    if (whatsappFloat) {
      whatsappFloat.href = waUrl;
    }
    return msg;
  }

  updateMessage();

  // 5. Mostrar botão flutuante do WhatsApp ao rolar a página
  function handleScrollWhatsapp() {
    if (!whatsappFloat) return;
    if (window.scrollY > 260) {
      whatsappFloat.classList.add("visible");
    } else {
      whatsappFloat.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleScrollWhatsapp, { passive: true });
  handleScrollWhatsapp();

  serviceChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      serviceChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedService = chip.getAttribute("data-service") || selectedService;
      updateMessage();
    });
  });

  if (clientNameInput) {
    clientNameInput.addEventListener("input", updateMessage);
  }
});

