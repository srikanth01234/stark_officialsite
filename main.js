/**
 * Stark Softech - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStatsCounter();
  initHamburgerMenu();
  initBackToTop();
  initScrollExplore();
  initWhatWeDoTabs();
  initFaqAccordion();
  initContactForm();
  initCtaScrollAnimation();
  initCrmShowcaseSlider();
});

/* ==========================================================
   1. STATS COUNTER ANIMATION (5+, 100+, 3+)
   ========================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-target-val]');
  if (!statElements.length) return;

  statElements.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target-val'), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      current = Math.floor(ease * target);
      stat.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        stat.textContent = target + '+';
      }
    };

    requestAnimationFrame(animateCount);
  });
}

/* ==========================================================
   2. FLOATING GLASS NAVBAR & SEARCH & MENU INTERACTION
   ========================================================== */
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('btn-header-hamburger');
  const navPill = document.querySelector('.center-nav-pill');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      if (navPill) {
        navPill.classList.toggle('mobile-open');
      }
    });
  }

  // Active Link Dot Indicator Switching
  const navLinks = document.querySelectorAll('.site-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (navPill && navPill.classList.contains('mobile-open')) {
        navPill.classList.remove('mobile-open');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      }
    });
  });

  // Search Button & Glass Overlay Modal Controls
  const searchBtn = document.getElementById('btn-header-search');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('site-search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      searchOverlay.setAttribute('aria-hidden', 'false');
      if (searchInput) searchInput.focus();
    });

    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      searchOverlay.setAttribute('aria-hidden', 'true');
    };

    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
      }
    });
  }
}

/* ==========================================================
   3. FLOATING BACK TO TOP BUTTON
   ========================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('btn-back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      topBtn.classList.add('is-visible');
    } else {
      topBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================
   4. SCROLL TO EXPLORE ACTION
   ========================================================== */
function initScrollExplore() {
  const exploreBtn = document.getElementById('hero-scroll-explore') ||
    document.querySelector('.hero-scroll-widget') ||
    document.querySelector('.bottom-scroll-beacon-wrap');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = document.getElementById('about') || document.getElementById('products');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================
   5. WHAT WE DO TABS INTERACTION
   ========================================================== */
function initWhatWeDoTabs() {
  const tabs = document.querySelectorAll('.tab-nav-btn');
  const tabsList = document.querySelector('.tabs-nav-list');
  const prevBtn = document.getElementById('btn-tab-prev');
  const nextBtn = document.getElementById('btn-tab-next');
  const titleEl = document.getElementById('service-title');
  const descEl = document.getElementById('service-desc');
  const clientsEl = document.getElementById('service-clients');
  const panelEl = document.getElementById('service-panel-content');
  const img1 = document.getElementById('img-media-1');
  const img2 = document.getElementById('img-media-2');
  const img3 = document.getElementById('img-media-3');

  if (!tabs.length || !titleEl) return;

  const servicesData = {
    'web-dev': {
      title: 'Website Development Company in kochi',
      desc: 'Saihasoftware Technologies Pvt. Ltd. is one of the pioneers in offering various Web Development Solutions in Kochi, we take pride in providing our clients with a pocket-friendly responsive website that is search engine friendly, and that\'s why our clients stick to us for their after-sales requirements.',
      clients: ['Porsche Kochi', 'Skoda Kochi', 'Linx', 'Nissan Kochi', 'Volkswagen Kochi'],
      themeClass: 'web-dev-theme',
      layoutClass: 'layout-web-dev',
      tabColor: '#16a34a',
      images: {
        img1: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
      }
    },
    'mobile-app': {
      title: 'Mobile Apps Development Company in kochi, Kerala',
      desc: 'Saihasoftware Technologies Pvt. Ltd. is one of the best mobile app development companies in kochi, offering mobile application development services for iPad, iPhone, Android, and Windows.',
      clients: ['CLIKPAY Mobile Wallet', 'EVM Wheels', 'Upstaged Music', 'Paired', 'Gospel Tribes'],
      themeClass: 'mobile-app-theme',
      layoutClass: 'layout-mobile-app',
      tabColor: '#15803d',
      images: {
        img1: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=600&q=80'
      }
    },
    'logo': {
      title: 'Logo Design',
      desc: 'Saihasoftware Technologies Pvt. Ltd. as a Leading Logo Design Company understands that a logo is a cornerstone of all your branding and will be used across your website and marketing materials.',
      clients: ['GNI', 'STA Transport & Logistics', 'Seerah', 'WorldstageX'],
      themeClass: 'web-dev-theme',
      layoutClass: 'layout-web-dev',
      tabColor: '#16a34a',
      images: {
        img1: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
      }
    },
    'branding': {
      title: 'Branding Companies',
      desc: 'We\'re a creative bunch of brand marketers, graphic designers & tech junkies passionate about creating new brands, changing mindsets and innovating new brand methodologies to create the right brand mix',
      clients: ['WorldstageX', 'STA Transport & Logistics', 'CLIKPAY'],
      themeClass: 'mobile-app-theme',
      layoutClass: 'layout-mobile-app',
      tabColor: '#15803d',
      images: {
        img1: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
      }
    },
    'enterprise': {
      title: 'Enterprise Cloud Solutions',
      desc: 'Empowering enterprise growth with high-availability microservices architecture, automated deployment pipelines, and scalable cloud engineering designed for 99.99% uptime.',
      clients: ['Enterprise Cloud ERP', 'Distributed Microservices', 'Real-Time Telemetry', 'Multi-Tenant Security', 'High-Throughput Analytics'],
      themeClass: 'web-dev-theme',
      layoutClass: 'layout-web-dev',
      tabColor: '#16a34a',
      images: {
        img1: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
      }
    },
    'smo': {
      title: 'Social Media Optimization',
      desc: 'we believe that digital marketing through optimizations is essential for widening the customer base of your business by enormous proportions. We can optimize your business on the following sites:',
      clients: ['Plantoworld', 'Sellzilla', 'Mamajoz Pizza', 'Big Bostons', 'EVM Wheels'],
      themeClass: 'mobile-app-theme',
      layoutClass: 'layout-mobile-app',
      tabColor: '#15803d',
      images: {
        img1: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      }
    },
    'seo': {
      title: 'Search Engine Optimization (SEO)',
      desc: 'Dominate search results and capture high-intent organic market share. We combine comprehensive technical audits, algorithmic intent modeling, and authority backlink architecture.',
      clients: ['Google Search Indexing', 'High-Intent Organic Rank', 'Core Web Vitals Speed', 'Technical Audit Leader', 'Performance Tracking'],
      themeClass: 'web-dev-theme',
      layoutClass: 'layout-web-dev',
      tabColor: '#16a34a',
      images: {
        img1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        img2: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=600&q=80',
        img3: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
      }
    }
  };

  const tabList = Array.from(tabs);
  let currentIndex = 0;

  function switchTab(index) {
    if (index < 0) index = tabList.length - 1;
    if (index >= tabList.length) index = 0;
    currentIndex = index;

    const activeTabKey = tabList[currentIndex].getAttribute('data-tab-id');
    const data = servicesData[activeTabKey];

    tabList.forEach((btn, i) => {
      const isActive = i === currentIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      if (isActive) {
        btn.style.setProperty('--active-tab-color', data ? data.tabColor : '#3b52ff');
        if (tabsList) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });

    if (!data) return;

    // Fade out elements smoothly
    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';
    clientsEl.style.opacity = '0';
    if (img1) img1.style.opacity = '0';
    if (img2) img2.style.opacity = '0';
    if (img3) img3.style.opacity = '0';

    setTimeout(() => {
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;

      // Update Card Theme & Media Layout
      if (panelEl) {
        panelEl.className = 'what-we-do-panel ' + data.themeClass;
      }
      const mediaCol = document.querySelector('.panel-media-col');
      if (mediaCol) {
        mediaCol.className = 'panel-media-col ' + data.layoutClass;
      }

      clientsEl.innerHTML = data.clients.map(c =>
        `<li class="panel-client-item"><span class="chevron-double">&raquo;&raquo;</span> ${c}</li>`
      ).join('');

      if (img1) img1.src = data.images.img1;
      if (img2) img2.src = data.images.img2;
      if (img3) img3.src = data.images.img3;

      // Fade in smoothly
      titleEl.style.opacity = '1';
      descEl.style.opacity = '1';
      clientsEl.style.opacity = '1';
      if (img1) img1.style.opacity = '1';
      if (img2) img2.style.opacity = '1';
      if (img3) img3.style.opacity = '1';
    }, 170);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => switchTab(index));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => switchTab(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => switchTab(currentIndex + 1));
  }

  // Set initial active state and colors
  switchTab(0);
}

/* ==========================================================
   6. FAQ ACCORDION INTERACTION
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all other accordion items for clean accordion UX
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherHeader = otherItem.querySelector('.faq-accordion-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // If it wasn't active, open it
      if (!isAlreadyActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================
   7. NEW PROJECTS CONTACT FORM INTERACTION
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('new-projects-form');
  const toast = document.getElementById('contact-success-toast');
  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.classList.add('is-visible');
    form.reset();
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 6000);
  });
}

/* ==========================================================
   8. CONTINUOUS SCROLL + CURSOR INTERACTIVE CTA IMAGE EXPANSION
   ========================================================== */
function initCtaScrollAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const ctaSection = document.querySelector('.cta-scroll-section');
  const ctaCard = document.querySelector('.cta-black-card');
  const ctaImage = document.querySelector('.cta-expanding-img');
  const ctaContent = document.querySelector('.cta-content-left');

  if (!ctaSection || !ctaImage || !ctaCard) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // 1. Direct ScrollTrigger Scrub animation for scale (Zoom in on scroll down, Zoom out on scroll up)
    gsap.fromTo(ctaImage,
      { scale: 0.82 },
      {
        scale: 1.22,
        ease: "none",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 88%",
          end: "bottom 12%",
          scrub: 1,
          invalidateOnRefresh: true
        }
      }
    );

    // 2. Left content subtle lift on scroll
    if (ctaContent) {
      gsap.fromTo(ctaContent,
        { opacity: 0.85, y: 15 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 85%",
            end: "bottom 25%",
            scrub: 1,
            invalidateOnRefresh: true
          }
        }
      );
    }

    // 3. Cursor tilt micro-interaction on hover over the card
    function handleMouseMove(e) {
      const rect = ctaCard.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
      const normY = ((e.clientY - rect.top) / rect.height) - 0.5;

      gsap.to(ctaImage, {
        x: normX * -20,
        y: normY * -12,
        duration: 0.35,
        ease: "power2.out"
      });
    }

    function handleMouseLeave() {
      gsap.to(ctaImage, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    }

    ctaCard.addEventListener('mousemove', handleMouseMove);
    ctaCard.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctaCard.removeEventListener('mousemove', handleMouseMove);
      ctaCard.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set([ctaImage, ctaContent], { clearProps: "all" });
    };
  });
}

/* ==========================================================
   9. SCROLL-BASED "STARK SOFTECH" TEXT COLOR REVEAL ANIMATION
   ========================================================== */
function initTextColorRevealAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const greenText = document.querySelector('.text-layer-green');
  const revealSection = document.querySelector('.text-reveal-scroll-section');

  if (!greenText || !revealSection) return;

  // Set explicit initial state (hidden green text)
  gsap.set(greenText, {
    clipPath: "inset(0% 100% 0% 0%)",
    webkitClipPath: "inset(0% 100% 0% 0%)"
  });

  // Scrub clip-path from left to right as section enters and passes viewport
  gsap.to(greenText, {
    clipPath: "inset(0% 0% 0% 0%)",
    webkitClipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    scrollTrigger: {
      trigger: revealSection,
      start: "top 85%",
      end: "bottom 25%",
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

/* ==========================================================
   HERO SECTION SLIDESHOW / CAROUSEL
   ========================================================== */
function initHeroSlider() {
  const slideItems = document.querySelectorAll('.hero-slide-item');
  const slideImgs = document.querySelectorAll('.hero-slide-img');
  const dotBtns = document.querySelectorAll('.hero-dot-btn');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');

  if (!slideItems.length || !slideImgs.length) return;

  let currentIndex = 0;
  const slideDuration = 5000; // Auto-scrolls every 5 seconds (5000ms)
  let startTime = null;
  let animFrameId = null;

  function goToSlide(index) {
    if (index < 0) index = slideItems.length - 1;
    if (index >= slideItems.length) index = 0;
    currentIndex = index;

    // Update slide text items
    slideItems.forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });

    // Update slide images
    slideImgs.forEach((img, i) => {
      img.classList.toggle('active', i === currentIndex);
    });

    // Update dot buttons
    dotBtns.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function updateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);

    const activeDot = dotBtns[currentIndex];
    if (activeDot) {
      const fillEl = activeDot.querySelector('.dot-fill');
      if (fillEl) fillEl.style.width = progressPercent + '%';
    }

    if (elapsed >= slideDuration) {
      nextSlide();
      return;
    }
    animFrameId = requestAnimationFrame(updateProgress);
  }

  function resetTimer() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    dotBtns.forEach(dot => {
      const fillEl = dot.querySelector('.dot-fill');
      if (fillEl) fillEl.style.width = '0%';
    });
    startTime = null;
    animFrameId = requestAnimationFrame(updateProgress);
  }

  // Dot button click handlers
  dotBtns.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Arrow button click handlers
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Initial call
  resetTimer();
}

/* ==========================================================
   PRODUCT SHOWCASE CAROUSEL (FORWARD & BACKWARD NAV)
   ========================================================== */
function initCrmShowcaseSlider() {
  const slidesData = [
    {
      subtagLeft: "— SMART BUSINESS SOLUTIONS",
      titleLeft: "Stark CRM",
      descLeft: "Manage your leads, customers, and sales pipeline with a smarter, simpler CRM solution.",
      subtagRight: "ALL-IN-ONE SOLUTION",
      titleRight: 'Stark <span class="crm-highlight">CRM</span>',
      descRight: "Build stronger customer relationships with intelligent tools, real-time insights, and seamless collaboration.",
      counter: "01 <span>/ 04</span>"
    },
    {
      subtagLeft: "— ENTERPRISE ERP SUITE",
      titleLeft: "Stark ERP",
      descLeft: "Streamline core business operations, inventory control, and financial accounting effortlessly.",
      subtagRight: "NEXT-GEN AUTOMATION",
      titleRight: 'Stark <span class="crm-highlight">ERP</span>',
      descRight: "Automate end-to-end workflows with unified real-time analytics and enterprise supply chain visibility.",
      counter: "02 <span>/ 04</span>"
    },
    {
      subtagLeft: "— RETAIL & BILLING POS",
      titleLeft: "Stark POS",
      descLeft: "Fast, intuitive point-of-sale software for retail stores, restaurants, and multi-branch chains.",
      subtagRight: "INSTANT CHECKOUT",
      titleRight: 'Stark <span class="crm-highlight">POS</span>',
      descRight: "Speed up transactions with real-time barcode scanning, inventory sync, and digital invoicing.",
      counter: "03 <span>/ 04</span>"
    },
    {
      subtagLeft: "— HUMAN CAPITAL MANAGEMENT",
      titleLeft: "Stark HRMS",
      descLeft: "Empower your workforce with automated attendance, payroll, leave management, and employee portals.",
      subtagRight: "WORKFORCE PLATFORM",
      titleRight: 'Stark <span class="crm-highlight">HRMS</span>',
      descRight: "Simplify HR administration, performance evaluations, and employee self-service in one portal.",
      counter: "04 <span>/ 04</span>"
    }
  ];

  let activeIndex = 0;

  const subtagLeftEl = document.getElementById('crm-subtag-left');
  const titleLeftEl = document.getElementById('crm-title-left');
  const descLeftEl = document.getElementById('crm-desc-left');
  const subtagRightEl = document.getElementById('crm-subtag-right');
  const titleRightEl = document.getElementById('crm-title-right');
  const descRightEl = document.getElementById('crm-desc-right');
  const counterEl = document.getElementById('crm-slide-counter');
  const dots = document.querySelectorAll('.crm-dot');
  const prevBtn = document.getElementById('btn-crm-prev');
  const nextBtn = document.getElementById('btn-crm-next');
  const laptopImg = document.getElementById('crm-laptop-img');

  if (!subtagLeftEl || !prevBtn || !nextBtn) return;

  function updateSlide(index) {
    if (index < 0) index = slidesData.length - 1;
    if (index >= slidesData.length) index = 0;
    activeIndex = index;

    const data = slidesData[activeIndex];

    // Smooth transition fade out
    const animEls = [subtagLeftEl, titleLeftEl, descLeftEl, subtagRightEl, titleRightEl, descRightEl, counterEl, laptopImg];
    animEls.forEach(el => { if (el) el.style.opacity = '0.3'; });

    setTimeout(() => {
      if (subtagLeftEl) subtagLeftEl.textContent = data.subtagLeft;
      if (titleLeftEl) titleLeftEl.textContent = data.titleLeft;
      if (descLeftEl) descLeftEl.textContent = data.descLeft;
      if (subtagRightEl) subtagRightEl.textContent = data.subtagRight;
      if (titleRightEl) titleRightEl.innerHTML = data.titleRight;
      if (descRightEl) descRightEl.textContent = data.descRight;
      if (counterEl) counterEl.innerHTML = data.counter;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });

      animEls.forEach(el => { if (el) el.style.opacity = '1'; });
    }, 150);
  }

  prevBtn.addEventListener('click', () => updateSlide(activeIndex - 1));
  nextBtn.addEventListener('click', () => updateSlide(activeIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlide(i));
  });
}
