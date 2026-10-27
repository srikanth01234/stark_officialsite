/**
 * Stark Softech - Contact Page Interactive Animations (GSAP + ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactMobileNav();
  initContactFormSubmission();
  initContactAnimations();
});

/* ==========================================================
   1. MOBILE NAVBAR CONTROLS
   ========================================================== */
function initContactMobileNav() {
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
   2. FORM SUBMISSION VIA EMAIL (FORMSUBMIT AJAX)
   ========================================================== */
function initContactFormSubmission() {
  const form = document.querySelector('.contact-form-element');
  const btn = document.querySelector('.btn-send-message');
  let statusDiv = document.querySelector('.form-status-alert');

  if (!form || !btn) return;

  if (!statusDiv) {
    statusDiv = document.createElement('div');
    statusDiv.className = 'form-status-alert';
    statusDiv.style.display = 'none';
    form.appendChild(statusDiv);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalBtnHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Sending Message...</span>
    `;

    // Reset status alert
    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status-alert';
    statusDiv.innerHTML = '';

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || 'Not specified',
      country: formData.get('country') || 'Not specified',
      service: formData.get('service') || 'General Inquiry',
      message: formData.get('message') || '',
      _subject: `New Inquiry from ${formData.get('name') || 'Website Client'} - Stark Softech`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@starksoftech.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success === "true" || result.success === true) {
        statusDiv.className = 'form-status-alert success';
        statusDiv.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong>Thank You!</strong> Your message has been sent successfully to Stark Softech. Our team will review your inquiry and get in touch with you shortly.
          </div>
        `;
        statusDiv.style.display = 'flex';
        form.reset();

        btn.innerHTML = `
          <span>Message Sent!</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        btn.style.backgroundColor = '#16a34a';

        setTimeout(() => {
          btn.innerHTML = originalBtnHtml;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 4500);
      } else {
        throw new Error(result.message || 'Submission error');
      }
    } catch (err) {
      statusDiv.className = 'form-status-alert error';
      statusDiv.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div>
          <strong>Unable to send message directly.</strong> Please email us directly at <a href="mailto:info@starksoftech.com">info@starksoftech.com</a> or call +91 96003 52018.
        </div>
      `;
      statusDiv.style.display = 'flex';

      btn.innerHTML = originalBtnHtml;
      btn.disabled = false;
    }
  });
}

/* ==========================================================
   3. MASTER GSAP & SCROLLTRIGGER ANIMATIONS FOR CONTACT PAGE
   ========================================================== */
function initContactAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // A. HERO BANNER SECTION ENTRANCE
  // ----------------------------------------------------------
  const heroTitle = document.querySelector('.contact-hero-title');
  const heroBreadcrumb = document.querySelector('.contact-hero-breadcrumb');

  if (heroTitle) {
    gsap.fromTo(heroTitle,
      { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", y: -35, opacity: 0 },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1, duration: 1.05, ease: "power4.out", delay: 0.1 }
    );
  }

  if (heroBreadcrumb) {
    gsap.fromTo(heroBreadcrumb,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.25 }
    );
  }

  // ----------------------------------------------------------
  // B. DESKTOP-ONLY PARALLAX (GSAP MATCH MEDIA)
  // ----------------------------------------------------------
  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    const mainSection = document.querySelector('.contact-main-grid-section');
    const glowLeft = document.querySelector('.contact-bg-glow-left');
    const glowRight = document.querySelector('.contact-bg-glow-right');
    const capImg = document.querySelector('.info-cap-img');
    const mapPinCard = document.querySelector('.map-floating-pin-card');

    if (mainSection) {
      if (glowLeft) {
        gsap.to(glowLeft, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: mainSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      if (glowRight) {
        gsap.to(glowRight, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: mainSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }

      if (capImg) {
        gsap.to(capImg, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: mainSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      }

      if (mapPinCard) {
        gsap.to(mapPinCard, {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: mainSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3
          }
        });
      }
    }
  });

  // ----------------------------------------------------------
  // C. CONTACT CARDS & FORM ANIMATIONS (ALL SCREENS)
  // ----------------------------------------------------------
  mm.add("all", () => {
    const mainSection = document.querySelector('.contact-main-grid-section');
    const leftCard = document.querySelector('.contact-info-card');
    const rightCard = document.querySelector('.contact-form-map-card');

    if (mainSection) {
      // 1. LEFT CARD: Slide in from Left
      if (leftCard) {
        gsap.fromTo(leftCard,
          { x: -50, opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftCard,
              start: "top 85%"
            }
          }
        );

        // Contact info rows stagger
        const infoRows = leftCard.querySelectorAll('.info-item-row');
        if (infoRows.length) {
          gsap.fromTo(infoRows,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: leftCard,
                start: "top 80%"
              }
            }
          );
        }

        // Info icon badges pop in
        const iconBadges = leftCard.querySelectorAll('.info-icon-badge');
        if (iconBadges.length) {
          gsap.fromTo(iconBadges,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.75,
              stagger: 0.14,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: leftCard,
                start: "top 80%"
              }
            }
          );
        }

        // Branded Cap Image Reveal + Continuous Floating Bob
        const capWrap = leftCard.querySelector('.info-cap-wrap');
        const capImg = leftCard.querySelector('.info-cap-img');
        if (capWrap) {
          gsap.fromTo(capWrap,
            { scale: 0.85, opacity: 0, y: 20 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: capWrap,
                start: "top 88%"
              },
              onComplete: () => {
                if (capImg) {
                  gsap.to(capImg, {
                    y: -8,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                  });
                }
              }
            }
          );
        }

        // Handwritten note reveal
        const handwrittenNote = leftCard.querySelector('.info-handwritten-note');
        if (handwrittenNote) {
          gsap.fromTo(handwrittenNote,
            { opacity: 0, scale: 0.8, rotation: -6 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.9,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: handwrittenNote,
                start: "top 88%"
              }
            }
          );
        }
      }

      // 2. RIGHT CARD: Slide in from Right
      if (rightCard) {
        gsap.fromTo(rightCard,
          { x: 50, opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightCard,
              start: "top 85%"
            }
          }
        );

        // Form Input Fields Stagger
        const inputFields = rightCard.querySelectorAll('.input-field-group');
        if (inputFields.length) {
          gsap.fromTo(inputFields,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: '.contact-form-element',
                start: "top 82%"
              }
            }
          );
        }

        // Submit Button Pop In
        const submitBtn = rightCard.querySelector('.btn-send-message');
        if (submitBtn) {
          gsap.fromTo(submitBtn,
            { scale: 0.9, opacity: 0, y: 15 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: submitBtn,
                start: "top 88%"
              }
            }
          );
        }

        // Map Frame Reveal & Floating Pin Card
        const mapFrame = rightCard.querySelector('.contact-map-frame-wrap');
        const mapPinCard = rightCard.querySelector('.map-floating-pin-card');

        if (mapFrame) {
          gsap.fromTo(mapFrame,
            { clipPath: "inset(12% 0% 0% 0% round 20px)", opacity: 0 },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: mapFrame,
                start: "top 85%"
              }
            }
          );
        }

        if (mapPinCard) {
          gsap.fromTo(mapPinCard,
            { scale: 0.8, opacity: 0, y: 25 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: mapFrame,
                start: "top 80%"
              },
              onComplete: () => {
                gsap.to(mapPinCard, {
                  y: -6,
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
    }
  });
}

