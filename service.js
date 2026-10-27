/**
 * Stark Softech - Services Page Interactive Animations (GSAP + ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceMobileNav();
  initServiceAnimations();
});

/* ==========================================================
   1. MOBILE NAVBAR CONTROLS
   ========================================================== */
function initServiceMobileNav() {
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
   2. MASTER GSAP & SCROLLTRIGGER ANIMATIONS FOR SERVICE PAGE
   ========================================================== */
function initServiceAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // A. HERO / SERVICE BANNER SECTION ENTRANCE
  // ----------------------------------------------------------
  const bannerSection = document.querySelector('.service-banner-section');
  const breadcrumb = document.querySelector('.service-breadcrumb');
  const tagline = document.querySelector('.service-tagline-wrap');
  const heading = document.querySelector('.service-banner-heading');
  const description = document.querySelector('.service-banner-description');
  const actions = document.querySelectorAll('.service-banner-actions .btn-banner-primary, .service-banner-actions .btn-banner-secondary');
  const hexBg = document.querySelector('.service-banner-hex-bg');
  const hexPolygons = document.querySelectorAll('.service-banner-hex-bg polygon');

  if (bannerSection) {
    // 1. Honeycomb Scattered Hexagons Ambient Float
    if (hexPolygons.length) {
      gsap.fromTo(hexPolygons,
        { opacity: 0, scale: 0.7, transformOrigin: "center center" },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "back.out(1.6)",
          delay: 0.1
        }
      );

      // Continuous subtle ambient float for hexagons
      hexPolygons.forEach((poly, index) => {
        gsap.to(poly, {
          y: (index % 2 === 0 ? 8 : -8),
          duration: 3 + (index * 0.4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }

    // 2. Breadcrumb
    if (breadcrumb) {
      gsap.fromTo(breadcrumb,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
      );
    }

    // 3. Tagline Badge
    if (tagline) {
      gsap.fromTo(tagline,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)", delay: 0.2 }
      );
    }

    // 4. Hero Heading Masked Slide Down Reveal
    if (heading) {
      gsap.fromTo(heading,
        { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", y: -40, opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.25 }
      );
    }

    // 5. Description
    if (description) {
      gsap.fromTo(description,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.45 }
      );
    }

    // 6. Action CTA Buttons Stagger
    if (actions.length) {
      gsap.fromTo(actions,
        { y: 25, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.14, ease: "power3.out", delay: 0.55 }
      );
    }
  }

  // ----------------------------------------------------------
  // B. DESKTOP-ONLY PARALLAX (REACTIVE MATCH MEDIA)
  // ----------------------------------------------------------
  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // Honeycomb BG subtle parallax drift
    if (hexBg && bannerSection) {
      gsap.to(hexBg, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: bannerSection,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }

    // Dot patterns parallax in Process Section
    const processSection = document.querySelector('.our-process-section');
    const dotsLeft = document.querySelector('.process-bg-dots-left');
    const dotsRight = document.querySelector('.process-bg-dots-right');

    if (processSection) {
      if (dotsLeft) {
        gsap.to(dotsLeft, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: processSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }

      if (dotsRight) {
        gsap.to(dotsRight, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: processSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }
    }
  });

  // ----------------------------------------------------------
  // C. EXPLORE SERVICES SECTION ANIMATIONS (ALL SCREENS)
  // ----------------------------------------------------------
  mm.add("all", () => {
    const exploreSection = document.querySelector('.explore-services-section');
    const exploreHeader = document.querySelector('.explore-services-header');
    const serviceCards = document.querySelectorAll('.service-explore-card');

    if (exploreSection) {
      // 1. Header fade up
      if (exploreHeader) {
        gsap.fromTo(exploreHeader,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: exploreHeader,
              start: "top 85%"
            }
          }
        );
      }

      // 2. Service Cards Staggered Entrance + Image Clip-Reveal
      if (serviceCards.length) {
        serviceCards.forEach((card, index) => {
          const imgWrap = card.querySelector('.explore-card-img-wrap');
          const img = card.querySelector('.explore-card-img');
          const labelBox = card.querySelector('.explore-card-label-box');

          // Card slide up & scale-in
          gsap.fromTo(card,
            { y: 50, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%"
              }
            }
          );

          // Image clip reveal
          if (imgWrap) {
            gsap.fromTo(imgWrap,
              { clipPath: "inset(12% 0% 0% 0% round 16px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%"
                }
              }
            );
          }

          // Image slight zoom out into resting frame
          if (img) {
            gsap.fromTo(img,
              { scale: 1.14 },
              {
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%"
                }
              }
            );
          }

          // Label box slide in
          if (labelBox) {
            gsap.fromTo(labelBox,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%"
                }
              }
            );
          }
        });
      }
    }

    // ----------------------------------------------------------
    // D. CONNECTED ECOSYSTEM SECTION ANIMATIONS
    // ----------------------------------------------------------
    const ecosystemSection = document.querySelector('.ecosystem-section');
    const ecosystemSvg = document.querySelector('.ecosystem-svg-diagram');
    const ecosystemNodes = document.querySelectorAll('.svg-ecosystem-node');

    if (ecosystemSection && ecosystemNodes.length) {
      // Staggered node entrance with spring scale
      gsap.fromTo(ecosystemNodes,
        { scale: 0.65, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ecosystemSection,
            start: "top 78%"
          },
          onComplete: () => {
            // Subtle breathing glow animation on the center "Craft Solutions" node
            const centerNode = ecosystemNodes[4] || document.querySelector('.svg-ecosystem-node[data-label="Managed Services"]');
            if (centerNode) {
              gsap.to(centerNode, {
                scale: 1.03,
                transformOrigin: "center center",
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        }
      );
    }

    // ----------------------------------------------------------
    // E. OUR PROCESS SECTION ANIMATIONS
    // ----------------------------------------------------------
    const processSection = document.querySelector('.our-process-section');
    const processTagline = document.querySelector('.process-tagline-wrap');
    const processTitle = document.querySelector('.process-section-title');
    const processSubtitle = document.querySelector('.process-section-subtitle');
    const timelineLine = document.querySelector('.process-timeline-line');
    const stepCards = document.querySelectorAll('.process-step-card');
    const statCards = document.querySelectorAll('.process-stat-card');

    if (processSection) {
      // 1. Process Header Fade Up
      const headerElements = [processTagline, processTitle, processSubtitle].filter(Boolean);
      if (headerElements.length) {
        gsap.fromTo(headerElements,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: processSection,
              start: "top 82%"
            }
          }
        );
      }

      // 2. Timeline Connector Line progressive draw
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: '.process-steps-grid',
              start: "top 82%"
            }
          }
        );
      }

      // 3. 4 Step Cards Staggered Pop-In
      if (stepCards.length) {
        gsap.fromTo(stepCards,
          { y: 40, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: '.process-steps-grid',
              start: "top 80%"
            }
          }
        );

        // Step number badges pop with spring
        const badges = document.querySelectorAll('.process-number-badge');
        if (badges.length) {
          gsap.fromTo(badges,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              stagger: 0.14,
              ease: "back.out(2)",
              delay: 0.2,
              scrollTrigger: {
                trigger: '.process-steps-grid',
                start: "top 80%"
              }
            }
          );
        }
      }

      // 4. Metric Stats Cards Stagger + Numerical Count-Up Animation
      if (statCards.length) {
        gsap.fromTo(statCards,
          { y: 30, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.process-stats-grid',
              start: "top 86%"
            },
            onComplete: () => {
              // Trigger numerical counter animations once
              initProcessCounters();
            }
          }
        );
      }
    }
  });
}

/* ==========================================================
   3. STATS COUNT-UP ANIMATION
   ========================================================== */
let countersStarted = false;
function initProcessCounters() {
  if (countersStarted) return;
  countersStarted = true;

  const statValues = document.querySelectorAll('.stat-number-val');
  if (!statValues.length) return;

  // The 4 target values: "2wk", "99.9%", "24h", "100%"
  const targets = [
    { target: 2, suffix: 'wk', decimals: 0 },
    { target: 99.9, suffix: '%', decimals: 1 },
    { target: 24, suffix: 'h', decimals: 0 },
    { target: 100, suffix: '%', decimals: 0 }
  ];

  statValues.forEach((el, idx) => {
    if (!targets[idx]) return;
    const config = targets[idx];
    const obj = { val: 0 };

    gsap.to(obj, {
      val: config.target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (config.decimals > 0) {
          el.textContent = obj.val.toFixed(config.decimals) + config.suffix;
        } else {
          el.textContent = Math.round(obj.val) + config.suffix;
        }
      }
    });
  });
}

