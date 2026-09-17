/* ==========================================================================
   IRA GROW - INTERACTIVE AGRICULTURAL EXPORT ESTIMATOR
   Calculates container capacities and dispatches inquiries for all 5 product lines
   ========================================================================== */

(function () {
  const PRODUCTS = {
    turmeric: {
      name: "Turmeric Fingers and Powder",
      category: "Spices & Herbs",
      curcumin: "3.0% – 5.0% Natural Curcumin",
      options: ["Salem Polished Fingers", "Unpolished Whole Fingers", "Split Fingers", "Pure Turmeric Powder"],
      defaultPack: 50,
      fclTons: 18,
      moisture: "Max 10% – 11%"
    },
    cumin: {
      name: "Cumin Seeds and Other Spices",
      category: "Spices & Herbs",
      curcumin: "High Essential Oil Aroma",
      options: ["Singapore Quality Cumin (3–4 mm)", "European Bold Cumin (4–5 mm)", "Whole Coriander Seeds", "Fenugreek Seeds", "Black Pepper & Chilli"],
      defaultPack: 50,
      fclTons: 14,
      moisture: "Max 8% – 9%"
    },
    air_dried: {
      name: "Air-Dried Dehydrated Vegetables",
      category: "Dehydrated Products",
      curcumin: "100% Natural Dehydration",
      options: ["Beetroot Powder", "Garlic Granules", "Onion Powder", "Onion Flakes", "Minced Garlic"],
      defaultPack: 25,
      fclTons: 12,
      moisture: "Max 5% – 6%"
    },
    agri_commodities: {
      name: "Agri Commodities & Yellow Maize",
      category: "Agri Commodities",
      curcumin: "Cleaned & Graded Non-GMO",
      options: ["Export Yellow Maize (Corn)", "Agricultural Grains", "Selected Pulses", "Oilseeds"],
      defaultPack: 50,
      fclTons: 24,
      moisture: "Max 13% – 14%"
    },
    freeze_dried: {
      name: "Freeze-Dried Fruits",
      category: "Healthy Foods",
      curcumin: "Nutrient & Flavour Intact",
      options: ["Freeze-Dried Strawberry Slices", "Freeze-Dried Banana Dice", "Freeze-Dried Mango Chunks", "Mixed Berries"],
      defaultPack: 10,
      fclTons: 8,
      moisture: "Max 3% – 4%"
    }
  };

  let currentKey = 'turmeric';
  let currentVariety = 'Salem Polished Fingers';
  let currentPackaging = 50; // kg
  let currentVolumeMT = 25; // Metric Tons
  let currentGrade = 'ipm'; // ipm or conventional
  let currentPort = 'Jebel Ali, UAE';

  // Elements
  const productSelect = document.getElementById('calc-product');
  const varietySelect = document.getElementById('calc-variety');
  const volumeSlider = document.getElementById('calc-volume');
  const volumeDisplay = document.getElementById('calc-volume-display');
  const portInput = document.getElementById('calc-port');
  
  const gradeButtons = document.querySelectorAll('.calc-grade-btn');
  const packButtons = document.querySelectorAll('.calc-pack-btn');

  // Outputs
  const outProductTitle = document.getElementById('calc-out-title');
  const outContainers = document.getElementById('calc-out-containers');
  const outBags = document.getElementById('calc-out-bags');
  const outMoisture = document.getElementById('calc-out-moisture');
  const outSummary = document.getElementById('calc-out-summary');

  // Actions
  const btnWhatsApp = document.getElementById('calc-btn-whatsapp');
  const btnEmail = document.getElementById('calc-btn-email');
  const btnCopy = document.getElementById('calc-btn-copy');

  function updateVarieties() {
    if (!varietySelect) return;
    const prod = PRODUCTS[currentKey];
    varietySelect.innerHTML = '';
    prod.options.forEach((optName, index) => {
      const opt = document.createElement('option');
      opt.value = optName;
      opt.textContent = optName;
      if (index === 0) opt.selected = true;
      varietySelect.appendChild(opt);
    });
    currentVariety = prod.options[0];
  }

  function calculate() {
    const prod = PRODUCTS[currentKey];
    
    // Container calculations
    const fclCount = (currentVolumeMT / prod.fclTons).toFixed(1);
    const containerText = `~${fclCount} × 20' FCL (${Math.ceil(fclCount / 2)} × 40' FCL eq.)`;

    // Bags calculation
    const totalKg = currentVolumeMT * 1000;
    const totalBags = Math.round(totalKg / currentPackaging);
    const bagText = `${totalBags.toLocaleString()} × ${currentPackaging} kg Bags`;

    // UI Updates
    if (volumeDisplay) volumeDisplay.textContent = `${currentVolumeMT} Metric Tons`;
    if (outProductTitle) outProductTitle.textContent = `${prod.name} (${currentGrade.toUpperCase()})`;
    if (outContainers) outContainers.textContent = containerText;
    if (outBags) outBags.textContent = bagText;
    if (outMoisture) outMoisture.textContent = prod.moisture;

    const summary = `Export Requisition: ${currentVolumeMT} MT of ${prod.name} [${currentVariety}] - ${currentGrade.toUpperCase()} grade in ${currentPackaging}kg export packaging destined for ${currentPort || 'Global Port'}.`;
    if (outSummary) outSummary.textContent = summary;

    // Contact Dispatches
    const waMsg = encodeURIComponent(
      `Namaste Ira Grow Team,\n\n` +
      `We would like to request an export quote for:\n` +
      `• Product: ${prod.name}\n` +
      `• Option: ${currentVariety}\n` +
      `• Grade: ${currentGrade.toUpperCase()} (Food Safety Compliant)\n` +
      `• Quantity: ${currentVolumeMT} Metric Tons (${containerText})\n` +
      `• Packing: ${bagText}\n` +
      `• Destination Port: ${currentPort || 'Please advise'}\n\n` +
      `Please provide FOB/CIF terms and standard quality test report.\nThank you.`
    );
    if (btnWhatsApp) {
      btnWhatsApp.href = `https://wa.me/917888189622?text=${waMsg}`;
    }

    const emailSubj = encodeURIComponent(`Export Inquiry: ${currentVolumeMT} MT ${prod.name}`);
    const emailBody = encodeURIComponent(
      `Dear Ira Grow Commercial Division,\n\n` +
      `We are requesting pricing and export specification sheets for:\n\n` +
      `Product: ${prod.name}\n` +
      `Variety: ${currentVariety}\n` +
      `Grade: ${currentGrade.toUpperCase()}\n` +
      `Quantity: ${currentVolumeMT} MT (~${containerText})\n` +
      `Packaging: ${bagText}\n` +
      `Destination Port: ${currentPort || 'Global Port'}\n\n` +
      `Company Name:\n` +
      `Contact Person:\n` +
      `Country:\n\n` +
      `Best regards,`
    );
    if (btnEmail) {
      btnEmail.href = `mailto:exports@iragrow.com?subject=${emailSubj}&body=${emailBody}`;
    }
  }

  // Event Listeners
  if (productSelect) {
    productSelect.addEventListener('change', (e) => {
      currentKey = e.target.value;
      updateVarieties();
      calculate();
    });
  }

  if (varietySelect) {
    varietySelect.addEventListener('change', (e) => {
      currentVariety = e.target.value;
      calculate();
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      currentVolumeMT = parseInt(e.target.value, 10);
      calculate();
    });
  }

  if (portInput) {
    portInput.addEventListener('input', (e) => {
      currentPort = e.target.value;
      calculate();
    });
  }

  gradeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      gradeButtons.forEach(b => {
        b.classList.remove('bg-[#1b4d33]', 'text-white', 'border-[#1b4d33]');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
      });
      btn.classList.add('bg-[#1b4d33]', 'text-white', 'border-[#1b4d33]');
      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
      currentGrade = btn.getAttribute('data-grade');
      calculate();
    });
  });

  packButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      packButtons.forEach(b => {
        b.classList.remove('bg-[#1b4d33]', 'text-white', 'border-[#1b4d33]');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
      });
      btn.classList.add('bg-[#1b4d33]', 'text-white', 'border-[#1b4d33]');
      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
      currentPackaging = parseInt(btn.getAttribute('data-pack'), 10);
      calculate();
    });
  });

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const summaryText = outSummary ? outSummary.textContent : '';
      navigator.clipboard.writeText(summaryText).then(() => {
        const original = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Copied to Clipboard!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btnCopy.innerHTML = original;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    });
  }

  updateVarieties();
  calculate();
})();
