// Configuração rápida do perfil do Instagram e WhatsApp
const INSTAGRAM_URL = "https://www.instagram.com/fabiosunigadesign/";
const WHATSAPP_NUMBER = "5511953273656";

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza os links do Instagram
  const instaTopBtn = document.getElementById("instaProfileTopBtn");
  if (instaTopBtn) {
    instaTopBtn.href = INSTAGRAM_URL;
  }

  // Navegação suave sem sujar a URL com #topicos e corrigindo clique no Logo para voltar ao topo
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId) return;

      e.preventDefault();

      if (targetId === "#topo" || targetId === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    });
  });

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

  // 2. Simulador Interativo da Vitrine de Landing Pages (Carrossel com Setas)
  const previewSlides = document.querySelectorAll(".preview-slide");
  const mockupUrl = document.getElementById("mockupUrl");
  const currentTitleEl = document.getElementById("showcaseCurrentTitle");
  const currentDotEl = document.getElementById("showcaseCurrentDot");
  const dotBtns = document.querySelectorAll(".showcase-dot-btn");
  const prevBtns = [
    document.getElementById("showcasePrev"),
    document.getElementById("showcaseSidePrev"),
  ];
  const nextBtns = [
    document.getElementById("showcaseNext"),
    document.getElementById("showcaseSideNext"),
  ];

  const showcaseItems = [
    {
      id: "petcare",
      title: "Pet Care (Branco, Rosa & Verde)",
      dotClass: "dot-pet",
      url: "https://petcareclinica.com.br (Demonstração Fictícia)",
    },
    {
      id: "imobiliaria",
      title: "Imobiliária (Azul Marinho & Dourado)",
      dotClass: "dot-imob",
      url: "https://primeimoveis.com.br (Demonstração Fictícia)",
    },
    {
      id: "hamburgueria",
      title: "Hamburgueria (Vermelho & Amarelo)",
      dotClass: "dot-burger",
      url: "https://betterbeefburger.com.br (Demonstração Fictícia)",
    },
  ];

  let currentSlideIndex = 0;

  function goToShowcaseSlide(newIndex, direction = "next") {
    currentSlideIndex =
      (newIndex + showcaseItems.length) % showcaseItems.length;
    const item = showcaseItems[currentSlideIndex];

    previewSlides.forEach((slide) => {
      slide.classList.remove("active", "slide-next", "slide-prev");
      if (slide.getAttribute("data-slide") === item.id) {
        slide.classList.add(
          "active",
          direction === "prev" ? "slide-prev" : "slide-next"
        );
      }
    });

    if (currentTitleEl) {
      currentTitleEl.textContent = item.title;
    }

    if (currentDotEl) {
      currentDotEl.className = `tab-dot ${item.dotClass}`;
    }

    if (mockupUrl) {
      mockupUrl.textContent = item.url;
    }

    dotBtns.forEach((btn, idx) => {
      const isActive = idx === currentSlideIndex;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  prevBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        goToShowcaseSlide(currentSlideIndex - 1, "prev");
      });
    }
  });

  nextBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        goToShowcaseSlide(currentSlideIndex + 1, "next");
      });
    }
  });

  dotBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetIndex = Number(btn.getAttribute("data-index"));
      if (!Number.isNaN(targetIndex) && targetIndex !== currentSlideIndex) {
        const dir = targetIndex > currentSlideIndex ? "next" : "prev";
        goToShowcaseSlide(targetIndex, dir);
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

  // 6. Stagger para elementos irmãos
  if (!CSS.supports("animation-delay: calc(sibling-index() * 0.1s)")) {
    document
      .querySelectorAll(
        ".hero-grid, .pillars-grid, .service-cards-stack, .insta-carousel-grid"
      )
      .forEach((group) => {
        [...group.children].forEach((el, index) => {
          el.style.setProperty("--sibling-index", index);
        });
      });
  }

  // 7. Scroll Reveal ao descer a página
  const revealTargets = document.querySelectorAll(
    [
      ".section-header",
      ".pillar-card",
      ".showcase-carousel-header",
      ".showcase-stage",
      ".showcase-dots",
      ".design-grafico-poster",
      ".services-menu > .section-kicker",
      ".services-menu > .section-title",
      ".services-menu > .section-desc",
      ".service-row",
      ".insta-header-flex",
      ".insta-post-card",
      ".contact-box",
    ].join(", ")
  );

  revealTargets.forEach((el) => el.classList.add("scroll-reveal-item"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
});

