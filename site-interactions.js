/**
 * H&H Interactive Product Portfolio, Spec Matrix, Certificate Lightbox & Partner Inquiry
 */
(function () {
  "use strict";

  const SPEC_CSV_ROWS = [
    ["Category", "Series / Tier", "Model", "Application", "Thickness", "Tensile / VLT", "Elongation / IRR", "Gloss / UVR", "Peel / TSER", "Roll Size", "Warranty", "Key Highlights"],
    ["Clear & Matte PPF", "Entry", "HH Classic 190", "Clear Gloss PPF", "7.5±0.3 mil", "26 MPa / VLT 91.4%", "360% (3.6x)", "140 GU (Class A)", "20min:14N/25mm, 24h:17N/25mm", "1.52m x 15m", "5 Years", "High initial tack, easy installation, lotus hydrophobic effect, fast self-healing, crack-free coating"],
    ["Clear & Matte PPF", "Mid-Range", "HH Plus 190", "Clear Gloss PPF", "7.5±0.3 mil", "28 MPa / VLT 91.4%", "375% (3.75x)", "142 GU (Class A)", "20min:17N/25mm, 24h:20N/25mm", "1.52m x 15m", "5 Years", "High tensile strength, enhanced stain resistance, crack-free coating, strong lotus effect"],
    ["Clear & Matte PPF", "Upper-Mid", "HH Pro 210", "Clear Gloss PPF", "8.5±0.3 mil", "28 MPa / VLT 92.7%", "428% (4.28x)", "141 GU (Class A)", "20min:18N/25mm, 24h:21N/25mm", "1.52m x 15m", "12 Years", "Polycarbonate hydrophobic coating, no dulling after stretch, anti-yellowing & anti-hydrolysis"],
    ["Clear & Matte PPF", "High-End Global Debut", "HH APEX 190", "Dual-PC Clear PPF", "7.5±0.3 mil", "28 MPa / VLT 93.1%", "430% (4.3x)", "143 GU (Class A)", "20min:21N/25mm, 24h:25N/25mm", "1.52m x 15m", "15 Years", "World-first Dual-Polycarbonate PPF, extreme anti-aging & corrosion defense, zero fracture under limit stretch"],
    ["Clear & Matte PPF", "Flagship", "HH Ultra 240", "Heavy-Duty Clear PPF", "9.5±0.3 mil", "31 MPa / VLT 91.1%", "430% (4.3x)", "144 GU (Class A)", "20min:19N/25mm, 24h:22N/25mm", "1.52m x 15m", "10 Years", "Lubrizol TPU resin, 9.5 mil armor, ultra-high 144 GU gloss, superior anti-stain & hydrophobic performance"],
    ["Clear & Matte PPF", "Satin Matte", "HH Matte", "Matte Finish PPF", "7.5±0.3 mil", "35 MPa", "477% (4.77x)", "8.8 GU", "20min:16N/25mm, 24h:19N/25mm", "1.52m x 15m", "5 Years", "Silky soft-touch satin surface, ultra-high strength & toughness, easy complex-curve wrapping"],
    ["Window Film", "Dual Silver Safety", "HH DS70", "Front Windshield", "3 mil", "VLT 70% (Haze 1.27%)", "IRR 95%", "UVR 99% (Refl. 8%)", "TSER 58%", "1.52m x 30m", "10 Years", "11-layer magnetron sputtering dual-silver reflective heat insulation, anti-aging durability"],
    ["Window Film", "Dual Silver Safety", "HH DS20", "Side / Rear Windows", "3 mil", "VLT 25% (Haze 1.28%)", "IRR 95%", "UVR 99% (Refl. 8%)", "TSER 65%", "1.52m x 30m", "10 Years", "11-layer dual-silver sputtering, high privacy & 65% total solar energy rejection"],
    ["Window Film", "UV400 Skin-Care Ceramic", "HH UV70", "Front Windshield", "2 mil", "VLT 70% (Haze 0.74%)", "IRR 95%", "UVR 100% (UV400)", "TSER 48%", "1.52m x 30m", "10 Years", "Full-band UV400 (200-400nm) 100% UV block skin-care thermal window film"],
    ["Window Film", "UV400 Skin-Care Ceramic", "HH UV15", "Side / Rear Windows", "2 mil", "VLT 18% (Haze 1.38%)", "IRR 95%", "UVR 100% (UV400)", "TSER 66%", "1.52m x 30m", "10 Years", "Full-band UV400 100% UV block with 66% TSER cabin cooling"],
    ["Window Film", "5G Nano-Ceramic High-IR", "HH CIR70", "Front Windshield", "2 mil", "VLT 75% (Haze 0.50%)", "IRR 92%", "UVR >=99% (Refl. 8%)", "TSER 46%", "1.52m x 30m", "10 Years", "5G/GPS signal-friendly nano-ceramic high clarity windshield film"],
    ["Window Film", "5G Nano-Ceramic High-IR", "HH CIR15", "Side / Rear Windows", "2 mil", "VLT 20% (Haze 1.00%)", "IRR 94%", "UVR >=99% (Refl. 6%)", "TSER 63%", "1.52m x 30m", "10 Years", "5G signal-friendly nano-ceramic high heat rejection side/rear tint"],
    ["Window Film", "Multi-Layer Chameleon", "HH Blush Gold", "Specialty Windshield/Tint", "2 mil", "VLT 70% (Haze 0.75%)", "IRR 94%", "UVR 99% (Refl. 9%)", "TSER 47%", "1.52m x 30m", "8 Years", "Nano-ceramic rose-gold chameleon aesthetic solar control film"],
    ["Window Film", "Multi-Layer Chameleon", "HH Sky Cyan", "Specialty Optical Film", "3 mil", "VLT 75% (Haze 2.27%)", "IRR 92%", "UVR 99% (Refl. 9%)", "TSER 49%", "1.52m x 30m", "8 Years", "Multi-layer optical micro-structure film, zero signal interference, high VLT & low reflectance"],
    ["TPU Color PPF", "Entry (Crystal Gloss)", "TPU Color PPF Crystal Series", "Full Car Color + PPF", "7.5±0.5 mil TPU", "24 MPa", "Break: 65 kN/m", "High Liquid Gloss", "Peel: 7-8.5 N/cm", "1.52m x 18m", "5 Years", "AIOC all-in-one chemical cross-linked liquid TPU color layer, self-healing & deep color saturation"],
    ["TPU Color PPF", "Mid-Range (Pearl/Metallic)", "TPU Color PPF Metallic Series", "Full Car Color + PPF", "7.5±0.5 mil TPU", "24 MPa", "Break: 65 kN/m", "Metallic Lustre", "Peel: 7-8.5 N/cm", "1.52m x 18m", "5 Years", "AIOC cross-linked metallic & pearl TPU wrap with PPF-grade impact & corrosion protection"],
    ["TPU Color PPF", "High-End (Velvet Satin)", "TPU Color PPF Satin Series", "Full Car Color + PPF", "7.5±0.5 mil TPU", "24 MPa", "Break: 65 kN/m", "Velvet Satin", "Peel: 7-8.5 N/cm", "1.52m x 18m", "5 Years", "AIOC cross-linked satin matte TPU film with scratch recovery & refined luxury texture"],
    ["TPU Color PPF", "Flagship (Aurora Shift)", "TPU Color PPF Color Shift Series", "Full Car Color + PPF", "7.5±0.5 mil TPU", "24 MPa", "Break: 65 kN/m", "Chameleon Shift", "Peel: 7-8.5 N/cm", "1.52m x 18m", "5 Years", "AIOC dynamic multi-tone color-shift TPU protection film"],
    ["Sunroof & Space", "Panoramic Sunroof", "HH Skylight Armor", "Exterior Sunroof TPU", "6.5 mil TPU", "High Clarity", "High IR Block", "UVR >=99%", "Impact & Cooling", "1.52m x 15m", "3 Years", "Panoramic sunroof exterior TPU ice-shield against stone impact and cabin heat"],
    ["Sunroof & Space", "Architectural & Home", "HH Architectural Film", "Commercial & Residential Glass", "Optical PET", "Multiple VLTs", "High Heat Rejection", "UVR 99%", "Energy Saving", "1.52m x 30m", "10 Years", "Building energy efficiency, glare control, privacy & UV protection"]
  ];

  function initMobileNav() {
    const header = document.querySelector(".site-header");
    const btn = document.querySelector(".mobile-menu-btn");
    const nav = header && header.querySelector("nav");
    if (!header || !btn || !nav) return;

    btn.addEventListener("click", () => {
      const open = header.classList.toggle("is-menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("is-menu-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function activateSpecTab(tabKey, scrollToHub) {
    const tabBtns = document.querySelectorAll(".spec-tab-btn");
    const panels = document.querySelectorAll(".spec-panel");
    const hub = document.getElementById("product-specs");
    if (!tabBtns.length || !panels.length) return;

    const targetKey = tabKey === "all" ? "ppf" : tabKey;
    tabBtns.forEach((b) => {
      const active = b.dataset.specTab === targetKey;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((p) => {
      p.classList.toggle("is-active", p.dataset.specPanel === targetKey);
    });

    if (scrollToHub && hub) {
      hub.scrollIntoView({ behavior: "smooth", block: "start" });
      hub.classList.add("is-highlighted");
      setTimeout(() => hub.classList.remove("is-highlighted"), 1400);
    }
  }

  function initProductPortfolio() {
    const filterBtns = document.querySelectorAll(".product-filter-btn");
    const grid = document.querySelector(".product-grid");
    const cards = document.querySelectorAll(".product-card[data-category]");
    const specTabBtns = document.querySelectorAll(".spec-tab-btn");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.filter || "all";
        filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        if (grid) {
          grid.classList.toggle("is-filtered", cat !== "all");
        }
        cards.forEach((card) => {
          const match = cat === "all" || card.dataset.category === cat;
          card.classList.toggle("is-filtered-out", !match);
        });
        if (cat !== "all") {
          activateSpecTab(cat, false);
        }
      });
    });

    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        const cat = card.dataset.category || "ppf";
        activateSpecTab(cat, true);
      });
      card.addEventListener("keydown", (e) => {
        if (e.target !== card) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activateSpecTab(card.dataset.category || "ppf", true);
        }
      });
    });

    specTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        activateSpecTab(btn.dataset.specTab || "ppf", false);
      });
    });

    // Download Technical Datasheet CSV
    document.querySelectorAll("[data-download-specs]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const csv = "\uFEFF" + SPEC_CSV_ROWS.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ).join("\r\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "HH-Automotive-Films-Technical-Specifications-2026.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });

    // Pre-fill Partner Inquiry Form when clicking "Inquire" on a specific model/series
    document.querySelectorAll("[data-inquire-product]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const product = btn.getAttribute("data-inquire-product") || "";
        const partnerSection = document.getElementById("partner");
        const interestInput = document.querySelector('#partner-inquiry-form [name="interest"]');
        const messageInput = document.querySelector('#partner-inquiry-form [name="message"]');
        if (interestInput && product) {
          Array.from(interestInput.options).forEach((opt) => {
            if (product.toLowerCase().includes(opt.value.toLowerCase())) {
              interestInput.value = opt.value;
            }
          });
        }
        if (messageInput && product && !messageInput.value.includes(product)) {
          const lang = document.documentElement.lang || "en";
          const prefix =
            lang.startsWith("zh")
              ? `意向咨询型号/系列：${product}\n`
              : lang.startsWith("ru")
                ? `Интересующая серия/модель: ${product}\n`
                : `Interested Model / Series: ${product}\n`;
          messageInput.value = prefix + messageInput.value;
        }
        if (partnerSection) {
          partnerSection.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            const firstInput = document.querySelector('#partner-inquiry-form [name="name"]');
            if (firstInput) firstInput.focus({ preventScroll: true });
          }, 550);
        }
      });
    });
  }

  function initCertLightbox() {
    const lightbox = document.getElementById("cert-lightbox");
    if (!lightbox) return;
    const imgEl = lightbox.querySelector("img");
    const titleEl = lightbox.querySelector("h3");
    const descEl = lightbox.querySelector("p");
    const closeBtn = lightbox.querySelector(".cert-lightbox-close");

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll(".cert-card").forEach((card) => {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      const openCard = () => {
        const cardImg = card.querySelector("img");
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        if (!cardImg || !imgEl) return;
        imgEl.src = cardImg.getAttribute("src");
        imgEl.alt = cardImg.getAttribute("alt") || "";
        if (titleEl && h3) titleEl.textContent = h3.textContent;
        if (descEl && p) descEl.textContent = p.textContent;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
      };
      card.addEventListener("click", openCard);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCard();
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  function initPartnerForm() {
    const form = document.getElementById("partner-inquiry-form");
    const feedback = document.getElementById("inquiry-feedback");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) submitBtn.disabled = true;

      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        company: String(fd.get("company") || "").trim(),
        country: String(fd.get("country") || "").trim(),
        businessType: String(fd.get("businessType") || "").trim(),
        interest: String(fd.get("interest") || "").trim(),
        contact: String(fd.get("contact") || "").trim(),
        message: String(fd.get("message") || "").trim(),
        lang: document.documentElement.lang || "en",
      };

      let savedViaApi = false;
      try {
        const res = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          savedViaApi = !!(data && data.ok);
        }
      } catch (_) {
        savedViaApi = false;
      }

      const lang = (document.documentElement.lang || "en").slice(0, 2);
      const subject = `[H&H Partner Inquiry] ${payload.company || payload.name} - ${payload.country}`;
      const bodyLines = [
        `Name: ${payload.name}`,
        `Company: ${payload.company}`,
        `Country / Region: ${payload.country}`,
        `Business Type: ${payload.businessType}`,
        `Interested Lineup: ${payload.interest}`,
        `Email / WhatsApp / Telegram: ${payload.contact}`,
        `Notes: ${payload.message || "-"}`,
      ].join("\n");

      if (feedback) {
        if (savedViaApi) {
          feedback.textContent =
            lang === "zh"
              ? "感谢您的提交！我们已收到您的合作/样品申请，H&H 海外业务团队将在 24 小时内与您联系。"
              : lang === "ru"
                ? "Спасибо! Ваша заявка успешно отправлена. Команда H&H свяжется с вами в течение 24 часов."
                : "Thank you! Your inquiry has been recorded. Our H&H Global Partnership team will reach out within 24 hours.";
        } else {
          feedback.textContent =
            lang === "zh"
              ? "已为您生成结构化合作邮件并唤起邮件客户端（目标邮箱：anhui@heheppf.com），发送后团队将在 24 小时内响应。"
              : lang === "ru"
                ? "Заявка сформирована для отправки на anhui@heheppf.com — подтвердите отправку в почтовом клиенте."
                : "Your structured inquiry is ready for anhui@heheppf.com — please confirm send in your mail client, or email us directly.";
          window.location.href = `mailto:anhui@heheppf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
        }
        feedback.classList.add("is-visible");
      }

      if (savedViaApi) form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  function initFloatingCtaVisibility() {
    const floating = document.querySelector(".floating-cta");
    const partner = document.getElementById("partner");
    const footer = document.querySelector(".site-footer");
    if (!floating || (!partner && !footer)) return;

    const visibleSet = new Set();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSet.add(entry.target);
          else visibleSet.delete(entry.target);
        });
        floating.classList.toggle("is-hidden", visibleSet.size > 0);
      },
      { threshold: 0.08 },
    );
    if (partner) obs.observe(partner);
    if (footer) obs.observe(footer);
  }

  function boot() {
    initMobileNav();
    initProductPortfolio();
    initCertLightbox();
    initPartnerForm();
    initFloatingCtaVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
