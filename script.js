// Configuração rápida do perfil do Instagram e WhatsApp
const INSTAGRAM_URL = "https://www.instagram.com/fabiosunigadesign/";
const WHATSAPP_NUMBER = "5511953273656";

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza os links do Instagram
  const instaTopBtn = document.getElementById("instaProfileTopBtn");
  if (instaTopBtn) {
    instaTopBtn.href = INSTAGRAM_URL;
  }

  // Loop suave com Fade In / Fade Out nos vídeos de fundo (Topo e Rodapé)
  document.querySelectorAll(".hero-video").forEach((video) => {
    const FADE_DURATION = 1.0; // segundos antes do fim para iniciar o fade out

    const showVideo = () => video.classList.add("is-playing");
    if (video.readyState >= 2) {
      showVideo();
    } else {
      video.addEventListener("canplay", showVideo, { once: true });
    }

    video.addEventListener("timeupdate", () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft <= FADE_DURATION) {
        video.classList.remove("is-playing");
      } else if (video.currentTime >= 0.15 && !video.classList.contains("is-playing")) {
        video.classList.add("is-playing");
      }
    });

    video.addEventListener("seeked", () => {
      video.classList.add("is-playing");
    });
  });

  // Navegação suave sem sujar a URL com #topicos e voltando ao topo no logo
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

  // 2. Configurador de Orçamento Rápido + Link de WhatsApp
  const serviceChips = document.querySelectorAll(".selector-chip");
  const clientNameInput = document.getElementById("clientName");
  const generatedMessageEl = document.getElementById("generatedMessage");
  const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");
  const whatsappFloat = document.getElementById("whatsappFloat");

  let selectedService = "Site Profissional para Minha Empresa";

  function updateMessage() {
    const nameVal = clientNameInput ? clientNameInput.value.trim() : "";
    const intro = nameVal
      ? `Olá Fábio! Aqui é ${nameVal}.`
      : `Olá Fábio! Tudo bem?`;
    const msg = `${intro} Vi o seu site e gostaria de solicitar um orçamento para: ${selectedService}.`;
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

  // 3. Mostrar botão flutuante do WhatsApp, transformar Header em Pill e destacar Seção Ativa
  const siteHeader = document.getElementById("topo");
  const navLinks = document.querySelectorAll(".main-nav .nav-link, .mobile-nav .mobile-nav-link");
  const trackedSections = ["diferenciais", "vitrine", "processo", "duvidas", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateHeaderAndActiveSection() {
    const scrollY = window.scrollY;

    // Botão flutuante do WhatsApp
    if (whatsappFloat) {
      if (scrollY > 260) {
        whatsappFloat.classList.add("visible");
      } else {
        whatsappFloat.classList.remove("visible");
      }
    }

    // Transforma o Header em Pill flutuante ao sair do topo
    if (siteHeader) {
      if (scrollY > 70) {
        siteHeader.classList.add("is-pill");
      } else {
        siteHeader.classList.remove("is-pill");
      }
    }

    // Marca no menu qual seção o usuário está visualizando
    const triggerLine = scrollY + window.innerHeight * 0.32;
    let activeId = "";

    for (const section of trackedSections) {
      if (section.offsetTop <= triggerLine) {
        activeId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isMatch = activeId && href === `#${activeId}`;
      link.classList.toggle("active", Boolean(isMatch));
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateHeaderAndActiveSection, { passive: true });
  updateHeaderAndActiveSection();

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

  // 5. Stagger para elementos irmãos
  if (!CSS.supports("animation-delay: calc(sibling-index() * 0.1s)")) {
    document
      .querySelectorAll(
        ".hero-grid, .pillars-grid, .process-grid, .service-cards-stack, .faq-accordion"
      )
      .forEach((group) => {
        [...group.children].forEach((el, index) => {
          el.style.setProperty("--sibling-index", index);
        });
      });
  }

  // 5. Scroll Reveal ao descer a página
  const revealTargets = document.querySelectorAll(
    [
      ".section-header",
      ".pillar-card",
      ".showcase-stage",
      ".case-testimonial-card",
      ".process-step",
      ".faq-item",
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

  // 7. Rastreamento de Eventos de Conversão no Google Analytics (GA4)
  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  }

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      trackEvent("click_whatsapp_orcamento", {
        service_selected: selectedService,
      });
    });
  }

  if (whatsappFloat) {
    whatsappFloat.addEventListener("click", () => {
      trackEvent("click_whatsapp_flutuante", {
        service_selected: selectedService,
      });
    });
  }

  if (instaTopBtn) {
    instaTopBtn.addEventListener("click", () => {
      trackEvent("click_instagram");
    });
  }

  const linkedinBtn = document.querySelector(".footer-linkedin");
  if (linkedinBtn) {
    linkedinBtn.addEventListener("click", () => {
      trackEvent("click_linkedin");
    });
  }
});
