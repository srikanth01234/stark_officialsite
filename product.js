/**
 * Stark Softech - Product Page Interactive Animations (GSAP + ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductMobileNav();
  initProductCarousel();
  initProductAnimations();
});

/* ==========================================================
   1. MOBILE NAVBAR CONTROLS
   ========================================================== */
function initProductMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navPill = document.querySelector('.center-nav-pill');

  if (toggleBtn && navPill) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('active');
      navPill.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (navPill.classList.contains('mobile-open')) {
        if (!navPill.contains(e.target) && !toggleBtn.contains(e.target)) {
          navPill.classList.remove('mobile-open');
          toggleBtn.classList.remove('active');
        }
      }
    });

    const links = navPill.querySelectorAll('.site-nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navPill.classList.remove('mobile-open');
        toggleBtn.classList.remove('active');
      });
    });
  }
}

/* ==========================================================
   2. PRODUCT CAROUSEL INTERACTION (MOBILE & TABLET)
   ========================================================== */
function initProductCarousel() {
  const grid = document.querySelector('.products-card-grid');
  const prevBtn = document.getElementById('products-prev-btn');
  const nextBtn = document.getElementById('products-next-btn');
  const dots = document.querySelectorAll('.products-dot');

  if (grid && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: 300, behavior: 'smooth' });
    });

    if (dots.length > 0) {
      grid.addEventListener('scroll', () => {
        const cardWidth = grid.querySelector('.product-showcase-card')?.offsetWidth || 300;
        const activeIdx = Math.min(dots.length - 1, Math.max(0, Math.round(grid.scrollLeft / cardWidth)));
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIdx);
        });
      });
    }
  }
}

/* ==========================================================
   3. MASTER GSAP & SCROLLTRIGGER ANIMATIONS FOR PRODUCT PAGE
   ========================================================== */
function initProductAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // A. HERO SECTION ENTRANCE & IMAGE ANIMATIONS
  // ----------------------------------------------------------
  const heroSection = document.querySelector('.product-hero-section');
  const breadcrumb = document.querySelector('.product-breadcrumb');
  const headline = document.querySelector('.product-hero-headline');
  const ctaRow = document.querySelector('.product-hero-cta-row');
  const indicatorPills = document.querySelectorAll('.product-hero-pills .pill-item');
  const heroImgWrap = document.querySelector('.product-hero-img-wrap');
  const heroImg = document.querySelector('.product-hero-img');
  const handwrittenWords = document.querySelectorAll('.product-handwritten-note span');
  const heroGlow = document.querySelector('.product-hero-bg-glow');

  if (heroSection) {
    // 1. Background Glow subtle fade-in
    if (heroGlow) {
      gsap.fromTo(heroGlow,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      );
    }

    // 2. Breadcrumb
    if (breadcrumb) {
      gsap.fromTo(breadcrumb,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }

    // 3. Headline Mask Reveal
    if (headline) {
      gsap.fromTo(headline,
        { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", y: -40, opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.2 }
      );
    }

    // 4. CTA Row & Pills
    if (ctaRow) {
      gsap.fromTo(ctaRow,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.45 }
      );
    }

    if (indicatorPills.length) {
      gsap.fromTo(indicatorPills,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)", delay: 0.6 }
      );
    }

    // 5. Hero Product Showcase Mockup Image Reveal
    if (heroImgWrap) {
      gsap.fromTo(heroImgWrap,
        { scale: 0.9, opacity: 0, y: 35 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.35,
          onComplete: () => {
            // Subtle continuous floating bob for hero mockup image
            if (heroImg) {
              gsap.to(heroImg, {
                y: -10,
                duration: 3.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        }
      );
    }

    // 6. Handwritten Note Staggered Reveal ("Manage", "Grow", "Succeed")
    if (handwrittenWords.length) {
      gsap.fromTo(handwrittenWords,
        { scale: 0.6, opacity: 0, rotation: -8 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.75,
          stagger: 0.16,
          ease: "back.out(1.8)",
          delay: 0.8
        }
      );
    }
  }

  // ----------------------------------------------------------
  // B. DESKTOP-ONLY PARALLAX (GSAP MATCH MEDIA)
  // ----------------------------------------------------------
  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // Hero image scroll parallax
    if (heroSection && heroImgWrap) {
      gsap.to(heroImgWrap, {
        y: 45,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }

    // Showcase Section Watermark & Motto Parallax
    const showcaseSection = document.querySelector('.our-products-section');
    const watermark = document.querySelector('.vertical-keywords-watermark');
    const motto = document.querySelector('.right-handwritten-motto');

    if (showcaseSection) {
      if (watermark) {
        gsap.to(watermark, {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: showcaseSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      if (motto) {
        gsap.to(motto, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: showcaseSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3
          }
        });
      }
    }
  });

  // ----------------------------------------------------------
  // C. OUR PRODUCTS SHOWCASE SECTION ANIMATIONS (ALL SCREENS)
  // ----------------------------------------------------------
  mm.add("all", () => {
    const showcaseSection = document.querySelector('.our-products-section');
    const headerWrapper = document.querySelector('.products-header-wrapper');
    const productCards = document.querySelectorAll('.product-showcase-card');
    const iconBadges = document.querySelectorAll('.floating-icon-badge');

    if (showcaseSection) {
      // 1. Header fade up
      if (headerWrapper) {
        gsap.fromTo(headerWrapper,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerWrapper,
              start: "top 84%"
            }
          }
        );
      }

      // 2. Product Showcase Cards Staggered Pop-In
      if (productCards.length) {
        gsap.fromTo(productCards,
          { y: 55, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.products-card-grid',
              start: "top 82%"
            }
          }
        );

        // Device Mockup Images clip reveal & zoom settle
        const deviceImgs = document.querySelectorAll('.card-device-img');
        if (deviceImgs.length) {
          gsap.fromTo(deviceImgs,
            { scale: 1.12, opacity: 0.85 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: '.products-card-grid',
                start: "top 82%"
              }
            }
          );
        }

        // Floating Icon Badges Elastic Pop-in + Continuous Bob
        if (iconBadges.length) {
          gsap.fromTo(iconBadges,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.14,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: '.products-card-grid',
                start: "top 80%"
              },
              onComplete: () => {
                iconBadges.forEach((badge, i) => {
                  gsap.to(badge, {
                    y: (i % 2 === 0 ? -6 : 6),
                    duration: 2.8 + (i * 0.4),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                  });
                });
              }
            }
          );
        }
      }
    }

    // ----------------------------------------------------------
    // D. INSIGHTS & UPDATES BENTO GRID ANIMATIONS
    // ----------------------------------------------------------
    const insightsSection = document.querySelector('.insights-updates-section');
    const insightsHeader = document.querySelector('.insights-header-wrapper');
    const bentoRows = document.querySelectorAll('.bento-row');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (insightsSection) {
      // 1. Header fade up
      if (insightsHeader) {
        gsap.fromTo(insightsHeader,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: insightsHeader,
              start: "top 84%"
            }
          }
        );
      }

      // 2. Bento Grid Rows Stagger
      if (bentoRows.length) {
        bentoRows.forEach((row) => {
          const cardsInRow = row.querySelectorAll('.bento-card');
          gsap.fromTo(cardsInRow,
            { y: 40, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%"
              }
            }
          );
        });
      }

      // 3. Bento Card Images Clip Reveal & Overlays
      const bentoImgs = document.querySelectorAll('.bento-card-img, .bento-bg-img, .compact-thumb-img, .feature-screen-img');
      if (bentoImgs.length) {
        bentoImgs.forEach((img) => {
          gsap.fromTo(img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%"
              }
            }
          );
        });
      }

      // Bento Text Overlays Pop In
      const bentoOverlays = document.querySelectorAll('.bento-overlay-content, .building-brand-overlay, .ideas-impact-overlay, .build-grow-succeed-wall');
      if (bentoOverlays.length) {
        gsap.fromTo(bentoOverlays,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.bento-grid-wrapper',
              start: "top 80%"
            }
          }
        );
      }
    }
  });
}

