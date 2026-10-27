/**
 * Stark Softech - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page opens at the top hero section on load/refresh when no anchor is in the URL
  if (!window.location.hash) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

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
  initPageAnimations();
});

/* ==========================================================
   1. STATS COUNTER ANIMATION (5+, 100+, 3+)
   ========================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-target-val]');
  if (!statElements.length) return;

  function runCounter(stat) {
    if (stat.getAttribute('data-counted') === 'true') return;
    stat.setAttribute('data-counted', 'true');
    const target = parseInt(stat.getAttribute('data-target-val'), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1800;
    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
  }

  if (typeof ScrollTrigger !== 'undefined') {
    statElements.forEach(stat => {
      ScrollTrigger.create({
        trigger: stat,
        start: "top 88%",
        onEnter: () => runCounter(stat),
        once: true
      });
    });
  } else {
    statElements.forEach(stat => runCounter(stat));
  }
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

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navPill && navPill.classList.contains('mobile-open')) {
      if (!navPill.contains(e.target) && hamburgerBtn && !hamburgerBtn.contains(e.target)) {
        navPill.classList.remove('mobile-open');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      }
    }
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
  let isTransitioning = false;
  let transitionTimeout = null;

  const mediaCol = document.querySelector('.panel-media-col');
  const cards = mediaCol ? Array.from(mediaCol.querySelectorAll('.media-card-item')) : [];

  // Interactive 3D mousemove depth effect on the media collage
  if (mediaCol && typeof gsap !== 'undefined') {
    mediaCol.addEventListener('mousemove', (e) => {
      if (isTransitioning) return;
      const rect = mediaCol.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) - 0.5;
      const normY = ((e.clientY - rect.top) / rect.height) - 0.5;
      gsap.to(mediaCol, {
        rotationY: normX * 10,
        rotationX: -normY * 10,
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 1200
      });
    });

    mediaCol.addEventListener('mouseleave', () => {
      if (isTransitioning) return;
      gsap.to(mediaCol, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  function switchTab(index, isUserAction = false) {
    if (index < 0) index = tabList.length - 1;
    if (index >= tabList.length) index = 0;

    let dir = index >= currentIndex ? 1 : -1;
    if (currentIndex === tabList.length - 1 && index === 0) dir = 1;
    if (currentIndex === 0 && index === tabList.length - 1) dir = -1;

    currentIndex = index;

    const activeTabKey = tabList[currentIndex].getAttribute('data-tab-id');
    const data = servicesData[activeTabKey];

    tabList.forEach((btn, i) => {
      const isActive = i === currentIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      if (isActive) {
        btn.style.setProperty('--active-tab-color', data ? data.tabColor : '#16a34a');
        if (isUserAction && tabsList) {
          // Scroll tab within tabsList horizontally only, without moving the window/page
          const offset = btn.offsetLeft - (tabsList.clientWidth / 2) + (btn.clientWidth / 2);
          tabsList.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
        }
      }
    });

    if (!data) return;

    // Direct render on initial page setup
    if (!isUserAction || typeof gsap === 'undefined') {
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      if (panelEl) panelEl.className = 'what-we-do-panel ' + data.themeClass;
      if (mediaCol) mediaCol.className = 'panel-media-col ' + data.layoutClass;
      clientsEl.innerHTML = data.clients.map(c =>
        `<li class="panel-client-item"><span class="chevron-double">&raquo;&raquo;</span> ${c}</li>`
      ).join('');
      if (img1) img1.src = data.images.img1;
      if (img2) img2.src = data.images.img2;
      if (img3) img3.src = data.images.img3;
      return;
    }

    // Dynamic 3D Rotating Transition into Second / Alternating Alignment
    isTransitioning = true;
    if (transitionTimeout) clearTimeout(transitionTimeout);

    // Stop ongoing animations safely
    gsap.killTweensOf([mediaCol, ...cards, titleEl, descEl, clientsEl]);

    // Phase 1: 3D Rotate Out with depth perspective
    if (mediaCol) {
      gsap.to(mediaCol, {
        duration: 0.28,
        rotationY: dir * 18,
        scale: 0.92,
        ease: 'power2.in'
      });
    }

    if (cards.length) {
      gsap.to(cards, {
        duration: 0.28,
        rotationY: dir * 90,
        rotationZ: (i) => (i === 1 ? -dir * 8 : dir * 8),
        scale: 0.78,
        opacity: 0,
        stagger: 0.035,
        ease: 'power2.in'
      });
    }

    gsap.to([titleEl, descEl, clientsEl], {
      duration: 0.22,
      opacity: 0,
      y: -10,
      ease: 'power2.in'
    });

    // Phase 2: Midway switch layout and update content at 90 deg rotation
    transitionTimeout = setTimeout(() => {
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      clientsEl.innerHTML = data.clients.map(c =>
        `<li class="panel-client-item"><span class="chevron-double">&raquo;&raquo;</span> ${c}</li>`
      ).join('');

      // Switch Theme & Layout Class (1st vs 2nd Alignment!)
      if (panelEl) {
        panelEl.className = 'what-we-do-panel ' + data.themeClass;
      }
      if (mediaCol) {
        mediaCol.className = 'panel-media-col ' + data.layoutClass;
      }

      if (img1) img1.src = data.images.img1;
      if (img2) img2.src = data.images.img2;
      if (img3) img3.src = data.images.img3;

      // Phase 3: 3D Rotate In from opposite angle into the new alignment
      if (mediaCol) {
        gsap.fromTo(mediaCol,
          { rotationY: -dir * 18, scale: 0.92 },
          {
            rotationY: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(mediaCol, { clearProps: 'transform' });
            }
          }
        );
      }

      if (cards.length) {
        gsap.fromTo(cards,
          {
            rotationY: -dir * 90,
            rotationZ: (i) => (i === 1 ? dir * 8 : -dir * 8),
            scale: 0.78,
            opacity: 0
          },
          {
            duration: 0.52,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            ease: 'back.out(1.25)',
            onComplete: () => {
              gsap.set(cards, { clearProps: 'transform' });
              isTransitioning = false;
            }
          }
        );
      } else {
        isTransitioning = false;
      }

      gsap.fromTo([titleEl, descEl, clientsEl],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    }, 280);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => switchTab(index, true));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => switchTab(currentIndex - 1, true));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => switchTab(currentIndex + 1, true));
  }

  // Set initial active state and colors without scrolling the page
  switchTab(0, false);
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

    // Trigger GSAP Mask Reveal & Stagger on Active Slide
    const newActiveSlide = slideItems[currentIndex];
    if (newActiveSlide && typeof gsap !== 'undefined') {
      const headline = newActiveSlide.querySelector('.headline-text');
      const subdesc = newActiveSlide.querySelector('.subdescription-text');
      const ctaBtns = newActiveSlide.querySelectorAll('.cta-button-row a');

      if (headline) {
        gsap.fromTo(headline,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40, opacity: 0 },
          { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 0.95, ease: "power4.out" }
        );
      }

      if (subdesc || (ctaBtns && ctaBtns.length)) {
        gsap.fromTo([subdesc, ...ctaBtns],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
      }
    }

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
      titleLeft: "Stark Jobs",
      descLeft: "Empower your workforce with automated attendance, payroll, leave management, and employee portals.",
      subtagRight: "WORKFORCE PLATFORM",
      titleRight: 'Stark <span class="crm-highlight">Jobs</span>',
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
  const bannerCard = document.querySelector('.crm-banner-card');
  const leftCol = document.querySelector('.crm-left-col');
  const rightHeader = document.querySelector('.crm-card-header');

  if (!subtagLeftEl || !prevBtn || !nextBtn) return;

  let isAnimating = false;

  function updateSlide(targetIndex, direction = 1) {
    if (isAnimating) return;
    if (targetIndex === activeIndex) return;

    if (targetIndex < 0) targetIndex = slidesData.length - 1;
    if (targetIndex >= slidesData.length) targetIndex = 0;

    isAnimating = true;
    const currentDirection = direction !== 0 ? direction : (targetIndex > activeIndex ? 1 : -1);

    // 1. Exit current slide with directional glide
    const exitClass = currentDirection > 0 ? 'crm-slide-exit-left' : 'crm-slide-exit-right';
    const laptopExitClass = currentDirection > 0 ? 'exit-left' : 'exit-right';

    if (leftCol) leftCol.classList.add(exitClass);
    if (rightHeader) rightHeader.classList.add(exitClass);
    if (laptopImg) laptopImg.classList.add(laptopExitClass);
    if (counterEl) counterEl.style.opacity = '0.3';

    setTimeout(() => {
      // 2. Update content at midpoint
      activeIndex = targetIndex;
      const data = slidesData[activeIndex];

      if (subtagLeftEl) subtagLeftEl.textContent = data.subtagLeft;
      if (titleLeftEl) titleLeftEl.textContent = data.titleLeft;
      if (descLeftEl) descLeftEl.textContent = data.descLeft;
      if (subtagRightEl) subtagRightEl.textContent = data.subtagRight;
      if (titleRightEl) titleRightEl.innerHTML = data.titleRight;
      if (descRightEl) descRightEl.textContent = data.descRight;
      if (counterEl) {
        counterEl.innerHTML = data.counter;
        counterEl.style.opacity = '1';
      }

      // Update dots indicator
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });

      // 3. Move elements to opposite incoming side instantly (without transition)
      const enterClass = currentDirection > 0 ? 'crm-slide-enter-right' : 'crm-slide-enter-left';
      const laptopEnterClass = currentDirection > 0 ? 'enter-right' : 'enter-left';

      if (leftCol) {
        leftCol.classList.remove(exitClass);
        leftCol.classList.add(enterClass);
        void leftCol.offsetWidth; // force browser layout recalculation
        leftCol.classList.remove(enterClass);
      }
      if (rightHeader) {
        rightHeader.classList.remove(exitClass);
        rightHeader.classList.add(enterClass);
        void rightHeader.offsetWidth; // force browser layout recalculation
        rightHeader.classList.remove(enterClass);
      }
      if (laptopImg) {
        laptopImg.classList.remove(laptopExitClass);
        laptopImg.classList.add(laptopEnterClass);
        void laptopImg.offsetWidth; // force browser layout recalculation
        laptopImg.classList.remove(laptopEnterClass);
      }

      setTimeout(() => {
        isAnimating = false;
      }, 350);
    }, 220);
  }

  // Next / Prev button triggers
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateSlide(activeIndex - 1, -1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateSlide(activeIndex + 1, 1);
  });

  // Dots trigger
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i !== activeIndex) {
        updateSlide(i, i > activeIndex ? 1 : -1);
      }
    });
  });

  // Touch & Pointer Swipe Gestures
  if (bannerCard) {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    bannerCard.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isSwiping = true;
    }, { passive: true });

    bannerCard.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const touch = e.changedTouches[0];
      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      // Ensure horizontal swipe is dominant and exceeds 35px threshold
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
        if (diffX < 0) {
          updateSlide(activeIndex + 1, 1); // Swipe left -> Next product
        } else {
          updateSlide(activeIndex - 1, -1); // Swipe right -> Previous product
        }
      }
    }, { passive: true });

    // Pointer / mouse drag swipe for desktop
    let isMouseDown = false;
    let mouseStartX = 0;

    bannerCard.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
          updateSlide(activeIndex + 1, 1);
        } else {
          updateSlide(activeIndex - 1, -1);
        }
      }
    });
  }
}

/* ==========================================================
   MASTER GSAP SCROLL & SECTION ANIMATIONS
   ========================================================== */
function initPageAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Headline Mask Reveal & Subtitle + Buttons Stagger (Initial Load)
  const activeSlide = document.querySelector('.hero-slide-item.active');
  if (activeSlide) {
    const headline = activeSlide.querySelector('.headline-text');
    const subdesc = activeSlide.querySelector('.subdescription-text');
    const ctaBtns = activeSlide.querySelectorAll('.cta-button-row a');

    if (headline) {
      gsap.fromTo(headline,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 45, opacity: 0 },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.15 }
      );
    }

    if (subdesc || (ctaBtns && ctaBtns.length)) {
      gsap.fromTo([subdesc, ...ctaBtns],
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", delay: 0.4 }
      );
    }
  }

  // Floating badges intro pop
  const heroBadges = document.querySelectorAll('.hero-floating-card-ideas, .hero-annotation-top-right');
  if (heroBadges.length) {
    gsap.fromTo(heroBadges,
      { scale: 0.8, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "back.out(1.5)", delay: 0.6 }
    );
  }

  // Responsive ScrollTrigger animations using gsap.matchMedia
  const mm = gsap.matchMedia();

  // Desktop only (>= 769px) - Parallax and heavy scrubbing (keeps mobile scrolling natural)
  mm.add("(min-width: 769px)", () => {
    // 2. Hero Background Image & Wave Scroll Parallax
    const heroDeskImg = document.querySelector('.desk-image-container');
    const heroWave = document.querySelector('.hero-corner-wave-wrap');
    const heroSection = document.querySelector('.hero-main-area');

    if (heroSection) {
      if (heroDeskImg) {
        gsap.to(heroDeskImg, {
          y: 75,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.2
          }
        });
      }

      if (heroWave) {
        gsap.to(heroWave, {
          y: 45,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }
    }

    // 3. Product Showcase (CRM Green Card) - Scale-In & Laptop Parallax
    const crmSection = document.querySelector('.crm-showcase-section');
    const crmCard = document.querySelector('.crm-banner-card');
    const crmLaptop = document.querySelector('.crm-laptop-img');

    if (crmSection && crmCard) {
      gsap.fromTo(crmCard,
        { scale: 0.92, y: 45, opacity: 0.88 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: crmSection,
            start: "top 80%"
          }
        }
      );

      if (crmLaptop) {
        gsap.to(crmLaptop, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: crmSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }
    }
  });

  // All screen sizes (Desktop + Mobile) - Natural fade-ups and staggers
  mm.add("all", () => {
    // 4. About Us Section - Fade Up + Clip Reveal
    const aboutSection = document.querySelector('.about-section');
    const aboutVisual = document.querySelector('.about-visual-wrap');
    const aboutContent = document.querySelectorAll('.about-content-col > *');

    if (aboutSection) {
      if (aboutVisual) {
        gsap.fromTo(aboutVisual,
          { clipPath: "inset(12% 0% 0% 0%)", opacity: 0, y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutSection,
              start: "top 78%"
            }
          }
        );
      }

      if (aboutContent.length) {
        gsap.fromTo(aboutContent,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutSection,
              start: "top 76%"
            }
          }
        );
      }
    }

    // 5. Product Cards - Stagger Reveal
    const productsSection = document.querySelector('.products-section');
    const productHeader = document.querySelectorAll('.products-header-col > *');
    const productCards = document.querySelectorAll('.product-card-item');

    if (productsSection) {
      if (productHeader.length) {
        gsap.fromTo(productHeader,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productsSection,
              start: "top 80%"
            }
          }
        );
      }

      if (productCards.length) {
        gsap.fromTo(productCards,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productsSection,
              start: "top 72%"
            }
          }
        );
      }
    }

    // 6. Services (What We Do) - Fade Up + Stagger
    const whatWeDoSection = document.querySelector('.what-we-do-section');
    const whatWeDoHeader = document.querySelector('.what-we-do-header');
    const whatWeDoCard = document.querySelector('.what-we-do-card');

    if (whatWeDoSection) {
      if (whatWeDoHeader) {
        gsap.fromTo(whatWeDoHeader,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whatWeDoSection,
              start: "top 82%"
            }
          }
        );
      }

      if (whatWeDoCard) {
        gsap.fromTo(whatWeDoCard,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whatWeDoCard,
              start: "top 80%"
            }
          }
        );
      }
    }

    // 7. Client Logos - Stagger Reveal
    const clientsSection = document.querySelector('.clients-section');
    const clientsTitle = document.querySelector('.clients-title');
    const clientLogos = document.querySelectorAll('.client-logo-card');

    if (clientsSection) {
      if (clientsTitle) {
        gsap.fromTo(clientsTitle,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: clientsSection,
              start: "top 82%"
            }
          }
        );
      }

      if (clientLogos.length) {
        gsap.fromTo(clientLogos,
          { y: 25, opacity: 0, scale: 0.88 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.035,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: '.clients-pyramid-grid',
              start: "top 84%"
            }
          }
        );
      }
    }

    // 8. FAQ Section - Fade In
    const faqSection = document.querySelector('.faq-section');
    const faqVisual = document.querySelector('.faq-visual-wrap');
    const faqContent = document.querySelector('.faq-content-col');

    if (faqSection) {
      if (faqVisual) {
        gsap.fromTo(faqVisual,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqSection,
              start: "top 78%"
            }
          }
        );
      }

      if (faqContent) {
        gsap.fromTo(faqContent,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqSection,
              start: "top 78%"
            }
          }
        );
      }
    }



    // 10. Contact Section - Fade Up
    const contactSection = document.querySelector('.contact-projects-section');
    const contactLeft = document.querySelectorAll('.contact-left-col > *');
    const contactRight = document.querySelector('.contact-card-container');

    if (contactSection) {
      if (contactLeft.length) {
        gsap.fromTo(contactLeft,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactSection,
              start: "top 78%"
            }
          }
        );
      }

      if (contactRight) {
        gsap.fromTo(contactRight,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactSection,
              start: "top 76%"
            }
          }
        );
      }
    }
  });
}
