// ===== تأثيرات الحركة عند التمرير (Scroll Animations) =====
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات الحركة للعناصر عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // مراقبة جميع بطاقات الأسعار والميزات والمدونة
    document.querySelectorAll('.pricing-card, .feature-card, .form-group, .post-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== التكوين العام للنماذج (Forms Config) =====
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const contactFormStatus = document.getElementById('contactFormStatus');
const newsletterStatus = document.getElementById('newsletterStatus');

const FORM_ENDPOINTS = {
    contact: 'https://formspree.io/f/mqkrvgrj',
    newsletter: 'https://formspree.io/f/mbjnkban'
};

async function submitJSONForm(url, payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('تعذر إرسال البيانات إلى الخادم');
    }

    return response.json().catch(() => ({}));
}

function setFormStatus(element, message, state = 'info') {
    if (!element) return;
    element.textContent = message;
    element.dataset.state = state;
}

// ===== تأثير التمرير الناعم (Smooth Scroll) =====
document.querySelectorAll('a[href^="#"], a[href$=".html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== تأثير تغيير لون الرأس عند التمرير (Header Shadow on Scroll) =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ===== تأثير العداد (Counter Animation) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== تأثير الهوفر على بطاقات الأسعار (Pricing Card Hover) =====
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== تأثير الهوفر على بطاقات الميزات (Feature Card Hover) =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ===== إضافة تأثيرات الانتقال للأيقونات =====
document.querySelectorAll('.feature-icon').forEach(icon => {
    icon.style.transition = 'all 0.3s ease';
});

// ===== تأثير الهوفر على أزرار الاتصال (CTA Button Hover) =====
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== تأثير التركيز على حقول الإدخال (Input Focus Effect) =====
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#4A90E2';
        this.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '#E0E0E0';
        this.style.boxShadow = 'none';
    });
});

// ===== تحميل الصفحة بسلاسة (Page Load Animation) =====
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // إخفاء شاشة التحميل بعد اكتمال تحميل الصفحة
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // 500ms هي مدة الانتقال (transition) في CSS
    }
});

// ===== إضافة تأثيرات إضافية للأزرار =====
document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // تأثير الموجة (Ripple Effect)
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== إضافة أسلوب الموجة في CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);

// ===== وظيفة تأثير تمرير العناصر (Scroll Reveal Animation) =====
const scrollRevealElements = document.querySelectorAll('.section-title, .section-subtitle, .pricing-card, .feature-card, .faq-item, .contact-wrapper');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.1 // يبدأ التأثير عندما يكون 10% من العنصر مرئياً
});

scrollRevealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ===== تأثير الحركة عند تحميل الصفحة (تم استبداله بـ Scroll Reveal) =====
// تم إزالة الكود القديم لصالح Scroll Reveal

// ===== تحسين الأداء: Lazy Loading للصور =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== تسجيل عامل الخدمة (Service Worker Registration) لـ PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered: ', registration);
            })
            .catch(registrationError => {
                console.log('Service Worker registration failed: ', registrationError);
            });
    });
}

// ===== وظيفة قسم الأسئلة الشائعة (FAQ Accordion) =====
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            
            // إغلاق جميع الأسئلة الأخرى
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('open');
                }
            });

            // فتح أو إغلاق السؤال الحالي
            question.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });
});

// ===== وظيفة الرسائل المنبثقة (Toast Notifications) =====
// إضافة حاوية الرسائل المنبثقة إلى الجسم
const toastContainer = document.createElement('div');
toastContainer.id = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // إظهار الرسالة
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // إخفاء الرسالة بعد 4 ثوانٍ
    setTimeout(() => {
        toast.classList.remove('show');
        // إزالة الرسالة من DOM بعد اختفائها
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ===== معالجة نموذج التواصل =====
if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setFormStatus(contactFormStatus, 'جاري إرسال طلبك...', 'loading');

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        payload.form = 'contact';

        try {
            await submitJSONForm(FORM_ENDPOINTS.contact, payload);
            showToast('تم استلام طلبك بنجاح، سنتواصل معك قريباً.', 'success');
            setFormStatus(contactFormStatus, 'وصلنا طلبك، تفقد بريدك خلال ساعات.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error(error);
            showToast('حدث خطأ أثناء الإرسال، حاول مرة أخرى.', 'error');
            setFormStatus(contactFormStatus, 'حدث خطأ في الاتصال، يرجى المحاولة مجدداً.', 'error');
        }
    });
}

// ===== معالجة نموذج النشرة البريدية =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setFormStatus(newsletterStatus, 'يتم حفظ بريدك...', 'loading');

        const formData = new FormData(newsletterForm);
        const payload = Object.fromEntries(formData.entries());
        payload.form = 'newsletter';

        try {
            await submitJSONForm(FORM_ENDPOINTS.newsletter, payload);
            showToast('مرحباً بك! ستصلك رسالة التأكيد خلال دقائق.', 'success');
            setFormStatus(newsletterStatus, 'تم الاشتراك بنجاح ✅', 'success');
            newsletterForm.reset();
        } catch (error) {
            console.error(error);
            showToast('تعذر الاشتراك حالياً، حاول لاحقاً.', 'error');
            setFormStatus(newsletterStatus, 'لم نتمكن من حفظ بريدك، حاول مرة أخرى.', 'error');
        }
    });
}


// ===== وظيفة شاشة التحميل (Preloader) =====
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // تأخير بسيط لضمان ظهور شاشة التحميل حتى لو كان التحميل سريعاً جداً
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    }
    // إعادة تعيين شفافية الجسم بعد التحميل
    document.body.style.opacity = '1';
});

// ===== وظيفة الوضع الداكن (Dark Mode Toggle) =====
const darkModeToggle = document.getElementById('darkModeToggle');

function updateDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // رمز الوضع الفاتح
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙'; // رمز الوضع الداكن
        localStorage.setItem('theme', 'light');
    }
}

// التحقق من التفضيل المحفوظ أو تفضيل النظام عند التحميل
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
    updateDarkMode(true);
} else {
    updateDarkMode(false);
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    updateDarkMode(!isDark);
});

console.log('✓ جميع التأثيرات الحركية والتفاعلية تم تحميلها بنجاح!');
// ===== تأثير الكتابة (Typed.js) =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                "التميز الرقمي",
                "تصميم المواقع",
                "الاحترافية والجودة",
                "التحول الرقمي"
            ],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }
});

// ===== تفعيل عداد الإحصائيات المتحرك (Stats Counter Activation) =====
const statsSection = document.getElementById('stats');
const statNumbers = document.querySelectorAll('.stat-number');

if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-target'));
                    animateCounter(number, target);
                });
                // إيقاف المراقبة بعد تفعيل العداد لمرة واحدة
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 // تفعيل عندما يكون نصف القسم مرئياً
    });

    statsObserver.observe(statsSection);
}

// ===== تأثير التمرير المنظر (Parallax Effect) =====
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        // تحريك الخلفية ببطء
        heroBackground.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    });
}

