/**
 * Stark Softech - About Us Page Interactive Animations (GSAP + ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAboutAnimations();
  initJourneyAccordion();
  initAboutMobileNav();
});

/* ==========================================================
   1. MOBILE NAVBAR CONTROLS
   ========================================================== */
function initAboutMobileNav() {
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
   2. JOURNEY TIMELINE ACCORDION INTERACTION
   ========================================================== */
function initJourneyAccordion() {
  const cards = document.querySelectorAll('.journey-card[data-journey-card]');
  if (!cards.length) return;

  cards.forEach(card => {
    const header = card.querySelector('.journey-card-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');

      // Close other cards
      cards.forEach(c => {
        c.classList.remove('active');
        const iconPolyline = c.querySelector('.journey-toggle-icon polyline');
        if (iconPolyline) {
          iconPolyline.setAttribute('points', '6 9 12 15 18 9');
        }
      });

      if (!isAlreadyActive) {
        card.classList.add('active');
        const iconPolyline = card.querySelector('.journey-toggle-icon polyline');
        if (iconPolyline) {
          iconPolyline.setAttribute('points', '18 15 12 9 6 15');
        }
      }
    });
  });
}

/* ==========================================================
   3. MASTER GSAP & SCROLLTRIGGER ANIMATIONS FOR ABOUT PAGE
   ========================================================== */
function initAboutAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // A. HERO SECTION ENTRANCE & IMAGE ANIMATIONS
  // ----------------------------------------------------------
  const heroAboutTitle = document.querySelector('.main-title-about');
  const heroUsTitle = document.querySelector('.main-title-us');
  const heroLeftItems = document.querySelectorAll('.left-col-content > *:not(.main-title-us)');
  const centerCard = document.querySelector('.center-card-frame');
  const rightTopImgFrame = document.querySelector('.right-top-image-frame');
  const philosophyBlock = document.querySelector('.philosophy-block');

  // 1. "ABOUT" Big Headline Masked Drop Reveal
  if (heroAboutTitle) {
    gsap.fromTo(heroAboutTitle,
      { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", y: -50, opacity: 0 },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 1.15, ease: "power4.out", delay: 0.1 }
    );
  }

  // 2. "US" & Left Column Content Stagger
  if (heroUsTitle) {
    gsap.fromTo(heroUsTitle,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.95, ease: "power3.out", delay: 0.25 }
    );
  }

  if (heroLeftItems.length) {
    gsap.fromTo(heroLeftItems,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", delay: 0.35 }
    );
  }

  // 3. Center Tall Image Clip Reveal & Scale-In
  if (centerCard) {
    gsap.fromTo(centerCard,
      { clipPath: "inset(14% 0% 0% 0% round 24px)", scale: 0.92, opacity: 0 },
      { clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }

  // 4. Right Column Image Frame & Philosophy Block Stagger
  if (rightTopImgFrame) {
    gsap.fromTo(rightTopImgFrame,
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.45 }
    );
  }

  if (philosophyBlock) {
    gsap.fromTo(philosophyBlock,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.55 }
    );
  }

  // ----------------------------------------------------------
  // B. RESPONSIVE MATCH MEDIA (PARALLAX ON DESKTOP ONLY)
  // ----------------------------------------------------------
  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // Parallax on hero images as user scrolls
    const heroSection = document.querySelector('.about-hero-section');
    const centerImg = document.querySelector('.center-card-img');
    const rightImg = document.querySelector('.right-top-img');

    if (heroSection) {
      if (centerImg) {
        gsap.to(centerImg, {
          y: 40,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.2
          }
        });
      }

      if (rightImg) {
        gsap.to(rightImg, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }
    }

    // Story Section Parallax & Watermark SVG Drift
    const storySection = document.querySelector('.our-story-section');
    const storyWatermark = document.querySelector('.story-watermark-svg');
    const storyMainImg = document.querySelector('.story-main-img');

    if (storySection) {
      if (storyWatermark) {
        gsap.to(storyWatermark, {
          y: 80,
          rotation: 8,
          ease: "none",
          scrollTrigger: {
            trigger: storySection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8
          }
        });
      }

      if (storyMainImg) {
        gsap.to(storyMainImg, {
          y: 35,
          ease: "none",
          scrollTrigger: {
            trigger: storySection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      }
    }

    // Journey Section Parallax on right showcase image
    const journeySection = document.querySelector('.our-journey-section');
    const journeyImg = document.querySelector('.journey-img-showcase');

    if (journeySection && journeyImg) {
      gsap.to(journeyImg, {
        y: 35,
        ease: "none",
        scrollTrigger: {
          trigger: journeySection,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }
  });

  // ----------------------------------------------------------
  // C. SCROLL-TRIGGERED SECTION & IMAGE ANIMATIONS (ALL SCREENS)
  // ----------------------------------------------------------
  mm.add("all", () => {
    // 1. Our Story Section Animations
    const storySection = document.querySelector('.our-story-section');
    const storyMainImgWrap = document.querySelector('.story-main-img-wrap');
    const storySubImgWraps = document.querySelectorAll('.story-sub-img-wrap');
    const storyGreenCard = document.querySelector('.story-green-card');
    const storyRightItems = document.querySelectorAll('.story-right-content > *');
    const wallOverlays = document.querySelectorAll('.wall-stark-brand, .wall-glass-words, .glass-ideas-impact-tag');

    if (storySection) {
      // Main office photo clip reveal
      if (storyMainImgWrap) {
        gsap.fromTo(storyMainImgWrap,
          { clipPath: "inset(14% 0% 0% 0% round 28px)", opacity: 0, scale: 0.94 },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyMainImgWrap,
              start: "top 82%"
            }
          }
        );
      }

      // Overlays on images pop in
      if (wallOverlays.length) {
        gsap.fromTo(wallOverlays,
          { scale: 0.85, opacity: 0, y: 15 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: storyMainImgWrap,
              start: "top 78%"
            }
          }
        );
      }

      // Bottom sub-photos stagger
      if (storySubImgWraps.length) {
        gsap.fromTo(storySubImgWraps,
          { y: 40, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.story-bottom-collage-row',
              start: "top 84%"
            }
          }
        );
      }

      // Green Metrics Badge pop in
      if (storyGreenCard) {
        gsap.fromTo(storyGreenCard,
          { scale: 0.8, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: storyGreenCard,
              start: "top 86%"
            }
          }
        );
      }

      // Right column text and pillars stagger
      if (storyRightItems.length) {
        gsap.fromTo(storyRightItems,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.story-right-content',
              start: "top 80%"
            }
          }
        );
      }
    }

    // 2. Core Values Section Animations
    const valuesSection = document.querySelector('.core-values-section');
    const valuesHeader = document.querySelector('.values-header-wrap');
    const valuesLeftRows = document.querySelectorAll('.value-row-item-left');
    const valuesRightRows = document.querySelectorAll('.value-row-item-right');
    const valuesCenterChar = document.querySelector('.values-center-character-img');

    if (valuesSection) {
      if (valuesHeader) {
        gsap.fromTo(valuesHeader,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesSection,
              start: "top 82%"
            }
          }
        );
      }

      // Left column values slide in from left
      if (valuesLeftRows.length) {
        gsap.fromTo(valuesLeftRows,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.core-values-grid',
              start: "top 78%"
            }
          }
        );
      }

      // Right column values slide in from right
      if (valuesRightRows.length) {
        gsap.fromTo(valuesRightRows,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.core-values-grid',
              start: "top 78%"
            }
          }
        );
      }

      // Center 3D Character image scale-in + continuous floating bob
      if (valuesCenterChar) {
        gsap.fromTo(valuesCenterChar,
          { scale: 0.75, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: '.core-values-grid',
              start: "top 80%"
            },
            onComplete: () => {
              // Continuous smooth floating animation
              gsap.to(valuesCenterChar, {
                y: -14,
                duration: 3.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        );
      }
    }

    // 3. Our Journey Timeline Section Animations
    const journeySection = document.querySelector('.our-journey-section');
    const journeyHeader = document.querySelector('.journey-header-wrap');
    const journeyCards = document.querySelectorAll('.journey-card');
    const journeyImgFrame = document.querySelector('.journey-img-frame');
    const journeyBadge = document.querySelector('.journey-floating-badge');

    if (journeySection) {
      if (journeyHeader) {
        gsap.fromTo(journeyHeader,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: journeySection,
              start: "top 82%"
            }
          }
        );
      }

      if (journeyCards.length) {
        gsap.fromTo(journeyCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.journey-timeline-list',
              start: "top 80%"
            }
          }
        );
      }

      // Right showcase image clip reveal
      if (journeyImgFrame) {
        gsap.fromTo(journeyImgFrame,
          { clipPath: "inset(14% 0% 0% 0% round 32px)", opacity: 0, scale: 0.94 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: journeyImgFrame,
              start: "top 80%"
            }
          }
        );
      }

      // Floating green badge card pop in + ongoing bob
      if (journeyBadge) {
        gsap.fromTo(journeyBadge,
          { scale: 0.75, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: journeyBadge,
              start: "top 86%"
            },
            onComplete: () => {
              gsap.to(journeyBadge, {
                y: -10,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        );
      }
    }
  });
}

