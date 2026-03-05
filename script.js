// ============================================
//   eFootball Nepal — Script.js
//   Created by Puspa Raj CHyz
// ============================================

// ---- WhatsApp Community Link ----
// 👇 Yo link change gara — aafno actual WhatsApp community invite link rakhna
const WA_LINK = "https://chat.whatsapp.com/JLUjkVec5KS3N7IaTzOMGe";

// ============================================
//   WHATSAPP JOIN FUNCTION
// ============================================
function joinWhatsApp(e) {
    if (e) e.preventDefault();
    showToast("🟢 WhatsApp Community ma redirect gardichhau...");
    setTimeout(() => {
        window.open(WA_LINK, "_blank");
    }, 900);
}

// ============================================
//   NAVBAR — Hamburger Menu Toggle
// ============================================
function toggleMenu() {
    const links = document.getElementById("navLinks");
    const burger = document.getElementById("hamburger");
    links.classList.toggle("open");

    // Animate hamburger icon
    const spans = burger.querySelectorAll("span");
    if (links.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
    } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
    }
}

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        document.getElementById("navLinks").classList.remove("open");
        const spans = document.getElementById("hamburger").querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
    });
});

// ============================================
//   NAVBAR — Add shadow on scroll
// ============================================
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Scroll-to-top button visibility
    const scrollBtn = document.getElementById("scrollTop");
    if (window.scrollY > 450) {
        scrollBtn.classList.add("visible");
    } else {
        scrollBtn.classList.remove("visible");
    }
});

// ============================================
//   SCROLL REVEAL — Intersection Observer
// ============================================
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function(el) {
    revealObserver.observe(el);
});

// ============================================
//   HERO COUNTER ANIMATION
// ============================================
function animateCounter(el, target) {
    var current = 0;
    var duration = 1800; // ms
    var steps = 60;
    var increment = target / steps;
    var interval = duration / steps;

    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, interval);
}

// Trigger counter when hero comes into view
var heroSection = document.getElementById("hero");
var countersStarted = false;

var heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            document.querySelectorAll(".stat-num").forEach(function(el) {
                var target = parseInt(el.getAttribute("data-target"));
                animateCounter(el, target);
            });
        }
    });
}, { threshold: 0.4 });

if (heroSection) {
    heroObserver.observe(heroSection);
}

// ============================================
//   SMOOTH SCROLL for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener("click", function(e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            var offset = 80; // navbar height offset
            var top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
    });
});

// ============================================
//   TOAST NOTIFICATION
// ============================================
var toastTimeout = null;

function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function() {
        toast.classList.remove("show");
    }, 3200);
}

// ============================================
//   FEATURE CARDS — Staggered entrance
// ============================================
var featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach(function(card, index) {
    card.style.transitionDelay = (index * 0.1) + "s";
});

// ============================================
//   STEPS HOVER — subtle glow effect
// ============================================
document.querySelectorAll(".step").forEach(function(step) {
    step.addEventListener("mouseenter", function() {
        this.style.background = "white";
    });
    step.addEventListener("mouseleave", function() {
        this.style.background = "";
    });
});

// ============================================
//   ACTIVE NAV LINK — highlight on scroll
// ============================================
var sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(section) {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            document.querySelectorAll(".nav-links a").forEach(function(link) {
                link.style.color = "";
            });
            var activeLink = document.querySelector('.nav-links a[href="#' + section.id + '"]');
            if (activeLink && !activeLink.classList.contains("nav-btn")) {
                activeLink.style.color = "#7B2FBE";
            }
        }
    });
});

// ============================================
//   INTRO LOADER — Animated Loading Screen
// ============================================
(function() {
    document.body.classList.add("loading");

    var canvas   = document.getElementById("particles-canvas");
    var ctx      = canvas.getContext("2d");
    var particles = [];
    var animId;

    // Resize canvas
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    function Particle() {
        this.reset();
    }
    Particle.prototype.reset = function() {
        this.x    = Math.random() * canvas.width;
        this.y    = Math.random() * canvas.height;
        this.r    = Math.random() * 2.2 + 0.4;
        this.vx   = (Math.random() - 0.5) * 0.6;
        this.vy   = (Math.random() - 0.5) * 0.6;
        this.life = Math.random();
        this.maxLife = Math.random() * 0.02 + 0.004;
        this.growing = true;
        var colors = ["#c77dff","#9d4edd","#7B2FBE","#ffffff","#e0aaff"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    };
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.growing) {
            this.life += this.maxLife;
            if (this.life >= 1) { this.life = 1; this.growing = false; }
        } else {
            this.life -= this.maxLife;
            if (this.life <= 0) this.reset();
        }
    };
    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
    };

    // Create particles
    for (var i = 0; i < 110; i++) {
        particles.push(new Particle());
    }

    // Draw loop
    function drawLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Subtle radial glow centre
        var grad = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width * 0.55
        );
        grad.addColorStop(0,   "rgba(123,47,190,0.18)");
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function(p) { p.update(); p.draw(); });
        animId = requestAnimationFrame(drawLoop);
    }
    drawLoop();

    // Progress bar animation
    var bar     = document.getElementById("loaderBar");
    var percent = document.getElementById("loaderPercent");
    var progress = 0;
    var TOTAL_MS = 2600; // total loader time
    var startTime = null;

    function updateProgress(ts) {
        if (!startTime) startTime = ts;
        var elapsed = ts - startTime;
        progress = Math.min(elapsed / TOTAL_MS, 1);

        // Ease-out curve for natural feel
        var eased = 1 - Math.pow(1 - progress, 2.5);
        var pct = Math.floor(eased * 100);

        if (bar)     bar.style.width = pct + "%";
        if (percent) percent.textContent = pct + "%";

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            // Loader done — exit animation
            setTimeout(function() {
                var loader = document.getElementById("loader");
                loader.classList.add("exit");
                document.body.classList.remove("loading");

                loader.addEventListener("animationend", function() {
                    loader.style.display = "none";
                    cancelAnimationFrame(animId);
                    document.body.classList.add("loaded");
                }, { once: true });
            }, 260);
        }
    }

    // Start progress after a tiny delay (let CSS animations kick in first)
    setTimeout(function() {
        requestAnimationFrame(updateProgress);
    }, 950);

})();

// ============================================
//   CONSOLE CREDIT
// ============================================
console.log("%c⚡ eFootball Nepal Community", "color:#7B2FBE; font-size:18px; font-weight:900;");
console.log("%cCreated by Puspa Raj CHyz 🎮", "color:#9d4edd; font-size:13px; font-weight:600;");