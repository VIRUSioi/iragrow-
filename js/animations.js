/* ==========================================================================
   IRA GROW - INTERACTIVE AGRICULTURAL SYSTEM
   Category Filtering, Product Specification Modals, Certificate Lightbox & GSAP
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. GSAP SCROLL ANIMATIONS
     -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.stagger-grid').forEach((grid) => {
      gsap.from(grid.children, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out'
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. PRODUCT CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.category-tab-btn');
  const productCards = document.querySelectorAll('.product-grid-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          } else {
            card.style.opacity = '1';
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     3. INTERACTIVE PRODUCT SPECIFICATION MODAL
     -------------------------------------------------------------------------- */
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-product-title');
  const modalBadge = document.getElementById('modal-product-badge');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalSpecs = document.getElementById('modal-product-specs');
  const modalImg = document.getElementById('modal-product-img');
  const modalQuoteBtn = document.getElementById('modal-quote-btn');

  const PRODUCT_DETAILS = {
    turmeric: {
      title: "Turmeric Fingers and Powder",
      badge: "High Curcumin (3–5%)",
      img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=80",
      desc: "Our premium turmeric features a natural curcumin content of 3–5%, known for its rich golden color, strong aroma, and consistent export grade. We offer both IPM and Conventional variants to meet international regulatory standards. Available in polished and unpolished whole fingers, split fingers, and finely milled powder.",
      specs: [
        { label: "Curcumin Content", value: "3.0% – 5.0% Guaranteed" },
        { label: "Color Profile", value: "Deep Vibrant Golden Yellow" },
        { label: "Moisture Content", value: "Max 10% – 11%" },
        { label: "Forms Available", value: "Whole Fingers, Split, Ground Powder" },
        { label: "Cultivation Standard", value: "IPM & Conventional Variants" },
        { label: "Packaging Options", value: "25 kg / 50 kg PP Bags or Custom Bulk" }
      ]
    },
    cumin: {
      title: "Cumin Seeds and Other Spices & Herbs",
      badge: "Singapore & European Quality",
      img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80",
      desc: "Appreciated across global markets for their strong volatile aroma, rich flavor, and high essential oil content. Sourced and processed with strict multi-stage quality checks. Also providing coriander, fenugreek, black pepper, chilli, and cardamom.",
      specs: [
        { label: "Singapore Quality Cumin", value: "Uniform, size approx 3–4 mm, mild & balanced aroma" },
        { label: "European Quality Cumin", value: "Bold grains, size approx 4–5 mm, rich essential oil" },
        { label: "Spice Portfolio", value: "Coriander, Fenugreek, Black Pepper, Chilli, Cardamom" },
        { label: "Processing Options", value: "Whole, Ground, Machine Cleaned & Sortex Graded" },
        { label: "Purity Standard", value: "99% to 99.5% Machine Cleaned" },
        { label: "Packaging", value: "25 kg / 50 kg PP Bags" }
      ]
    },
    air_dried: {
      title: "Air-Dried Dehydrated Vegetables",
      badge: "Pure Dehydrated Goodness",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
      desc: "Grown in Indian farms and dehydrated under controlled, hygienic conditions to preserve natural color, intense aroma, and pungent culinary traits without preservatives.",
      specs: [
        { label: "Core Products", value: "Beetroot Powder, Garlic Granules, Onion Powder, Onion Flakes" },
        { label: "Additional Items", value: "Dehydrated Ginger, Green Chilli Flakes, Minced Garlic" },
        { label: "Moisture Level", value: "Controlled below 5% – 6%" },
        { label: "Quality Standard", value: "100% Free from Artificial Additives & Preservatives" },
        { label: "Applications", value: "Seasoning blends, instant food mixes, industrial food service" },
        { label: "Packaging", value: "10 kg / 20 kg / 25 kg Poly-lined export cartons" }
      ]
    },
    agri_commodities: {
      title: "Agri Commodities & Yellow Maize",
      badge: "30+ Years Lineage",
      img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80",
      desc: "Our high-quality maize is sourced from reliable farms and processed to meet international quality standards. Available in both IPM and Conventional grades. Features uniform kernels, low moisture content, and high test weight. Also supplying agricultural grains, pulses, and oilseeds.",
      specs: [
        { label: "Type", value: "Export Grade Yellow Maize (Corn)" },
        { label: "Moisture Content", value: "Max 13.0% – 14.0%" },
        { label: "Foreign Matter", value: "Max 1.0% – 2.0%" },
        { label: "Broken Kernels", value: "Max 2.0% – 3.0%" },
        { label: "Other Agri Lines", value: "Grains, Pulses, Oilseeds" },
        { label: "Packaging", value: "25 kg / 50 kg PP Bags or Bulk Vessel / Container" }
      ]
    },
    freeze_dried: {
      title: "Freeze-Dried Fruits",
      badge: "100% Natural • Zero Additives",
      img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1000&q=80",
      desc: "State-of-the-art freeze-drying (lyophilization) process removes moisture at sub-zero temperatures, retaining 98%+ of the fruit's authentic cellular structure, vitamins, vibrant color, and fresh natural taste.",
      specs: [
        { label: "Fruit Varieties", value: "Strawberry Slices, Banana Dice, Mango Chunks, Mixed Berries" },
        { label: "Nutritional Integrity", value: "Retains original flavour, color, enzymes & vitamins" },
        { label: "Shelf Life", value: "Long shelf life (up to 24 months sealed)" },
        { label: "Moisture Level", value: "Ultra low (< 3% – 4%)" },
        { label: "Suitability", value: "Cereals, snacks, confectionery, nutraceutical & beverage blends" },
        { label: "Packaging", value: "Nitrogen-flushed multi-wall moisture-barrier cartons" }
      ]
    }
  };

  document.querySelectorAll('.open-product-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodKey = btn.getAttribute('data-product');
      const data = PRODUCT_DETAILS[prodKey];
      if (!data || !productModal) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalDesc.textContent = data.desc;
      modalImg.src = data.img;

      modalSpecs.innerHTML = '';
      data.specs.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'flex justify-between py-2 border-b border-gray-100 text-xs sm:text-sm';
        row.innerHTML = `<span class="text-gray-500 font-medium">${item.label}:</span> <span class="text-gray-900 font-semibold text-right">${item.value}</span>`;
        modalSpecs.appendChild(row);
      });

      if (modalQuoteBtn) {
        modalQuoteBtn.href = '#calculator-section';
        modalQuoteBtn.onclick = () => {
          productModal.classList.remove('active');
          const calcSelect = document.getElementById('calc-product');
          if (calcSelect) {
            calcSelect.value = prodKey;
            calcSelect.dispatchEvent(new Event('change'));
          }
        };
      }

      productModal.classList.add('active');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      productModal.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     4. CERTIFICATE LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const certModal = document.getElementById('cert-modal');
  const certCloseBtn = document.getElementById('cert-close-btn');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalDesc = document.getElementById('cert-modal-desc');

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      const imgPath = card.getAttribute('data-cert-img');
      const title = card.getAttribute('data-cert-title');
      const desc = card.getAttribute('data-cert-desc');

      if (certModalImg) certModalImg.src = imgPath;
      if (certModalTitle) certModalTitle.textContent = title;
      if (certModalDesc) certModalDesc.textContent = desc;

      certModal.classList.add('active');
    });
  });

  if (certCloseBtn) {
    certCloseBtn.addEventListener('click', () => {
      certModal.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     5. OFFICIAL BROCHURE VIEWER MODAL
     -------------------------------------------------------------------------- */
  const brochureModal = document.getElementById('brochure-modal');
  const brochureOpenBtns = document.querySelectorAll('.open-brochure-modal');
  const brochureCloseBtn = document.getElementById('brochure-close-btn');

  brochureOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (brochureModal) brochureModal.classList.add('active');
    });
  });

  if (brochureCloseBtn) {
    brochureCloseBtn.addEventListener('click', () => {
      brochureModal.classList.remove('active');
    });
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === productModal) productModal.classList.remove('active');
    if (e.target === certModal) certModal.classList.remove('active');
    if (e.target === brochureModal) brochureModal.classList.remove('active');
  });

  /* --------------------------------------------------------------------------
     6. MOBILE MENU
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
      });
    }

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
      });
    });
  }
});
