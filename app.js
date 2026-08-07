document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Effect on Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Navbar Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger animation style
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // 3. Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const imagesData = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src') || item.querySelector('img').src,
        title: item.querySelector('.gallery-title') ? item.querySelector('.gallery-title').textContent : 'Image',
        subtitle: item.querySelector('.gallery-subtitle') ? item.querySelector('.gallery-subtitle').textContent : ''
    }));

    function showImage(index) {
        if (index < 0) index = imagesData.length - 1;
        if (index >= imagesData.length) index = 0;
        currentIndex = index;
        if (lightboxImg) lightboxImg.src = imagesData[currentIndex].src;
        if (lightboxCaption) lightboxCaption.textContent = `${imagesData[currentIndex].title} — ${imagesData[currentIndex].subtitle}`;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (lightbox) {
                lightbox.classList.add('active');
                showImage(index);
                document.body.style.overflow = 'hidden'; // Stop page scroll
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        }
    });

    // 4. Testimonial Review Slider
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.slider-dots');
    let activeSlideIndex = 0;
    let slideInterval;

    // Generate Dots
    if (dotContainer && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');
    const sliderTrack = document.querySelector('.slider-track');

    function goToSlide(index) {
        activeSlideIndex = index;
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        }
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
        resetSlideTimer();
    }

    function nextSlide() {
        let nextIndex = activeSlideIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        goToSlide(nextIndex);
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }

    if (slides.length > 0) {
        resetSlideTimer();
    }

    // 5. Booking Price Estimation & Form Submission
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');
    const pricingPreview = document.getElementById('pricing-preview');
    
    const nightQtyEl = document.getElementById('night-qty');
    const nightRateEl = document.getElementById('night-rate');
    const subtotalEl = document.getElementById('subtotal-val');
    const cleaningEl = document.getElementById('cleaning-val');
    const serviceEl = document.getElementById('service-val');
    const totalEl = document.getElementById('total-val');

    const BASE_NIGHTLY_RATE = 50; // USD 50 per night
    const CLEANING_FEE = 30; // USD 30

    // Set initial static labels
    if (nightRateEl) nightRateEl.textContent = BASE_NIGHTLY_RATE;
    if (cleaningEl) cleaningEl.textContent = `$${CLEANING_FEE}`;

    // Widget Dates Sync
    const widgetCheckin = document.getElementById('widget-checkin');
    const widgetCheckout = document.getElementById('widget-checkout');
    const widgetBtn = document.getElementById('widget-btn');

    if (widgetBtn) {
        widgetBtn.addEventListener('click', () => {
            if (widgetCheckin && widgetCheckin.value && checkinInput) checkinInput.value = widgetCheckin.value;
            if (widgetCheckout && widgetCheckout.value && checkoutInput) checkoutInput.value = widgetCheckout.value;
            
            // Scroll down to the booking form
            const bookingSection = document.getElementById('book');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            calculatePrice();
        });
    }

    function calculatePrice() {
        if (!checkinInput || !checkoutInput) return;
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);

        if (!isNaN(checkinDate.getTime()) && !isNaN(checkoutDate.getTime())) {
            const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (nights > 0) {
                // Calculation
                const nightlyTotal = nights * BASE_NIGHTLY_RATE;
                const finalTotal = nightlyTotal + CLEANING_FEE;

                // UI Update
                if (nightQtyEl) nightQtyEl.textContent = nights;
                if (subtotalEl) subtotalEl.textContent = `$${nightlyTotal}`;
                if (cleaningEl) cleaningEl.textContent = `$${CLEANING_FEE}`;
                if (totalEl) totalEl.textContent = `$${finalTotal}`;

                if (pricingPreview) pricingPreview.style.display = 'block';
                return;
            }
        }
        if (pricingPreview) pricingPreview.style.display = 'none';
    }

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            // Set min check-out date to be check-in date + 1 day
            if (checkinInput.value) {
                const checkinVal = new Date(checkinInput.value);
                const minCheckout = new Date(checkinVal);
                minCheckout.setDate(minCheckout.getDate() + 1);
                checkoutInput.min = minCheckout.toISOString().split('T')[0];
            }
            calculatePrice();
        });

        checkoutInput.addEventListener('change', calculatePrice);
    }

    // Set minimal date values to today
    const todayStr = new Date().toISOString().split('T')[0];
    if (checkinInput) checkinInput.min = todayStr;
    if (widgetCheckin) widgetCheckin.min = todayStr;

    // Contact Form Inquiry Submission
    const bookingForm = document.getElementById('booking-inquiry-form');
    const formStatus = document.getElementById('form-status');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const checkin = checkinInput ? checkinInput.value : '';
            const checkout = checkoutInput ? checkoutInput.value : '';

            if (!name || !email || !checkin || !checkout) {
                if (formStatus) {
                    formStatus.style.color = 'var(--error)';
                    formStatus.textContent = 'Please fill out all required fields.';
                    formStatus.style.display = 'block';
                }
                return;
            }

            // Simulate form submission
            const submitBtn = bookingForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Inquiry...';

            setTimeout(() => {
                bookingForm.reset();
                if (pricingPreview) pricingPreview.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                if (formStatus) {
                    formStatus.style.color = 'var(--success)';
                    formStatus.innerHTML = '<strong>Inquiry Sent Successfully!</strong><br>We will review your dates and email you within 24 hours.';
                    formStatus.style.display = 'block';
                }
            }, 1500);
        });
    }
});
