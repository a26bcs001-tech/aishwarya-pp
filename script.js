
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

// Close menu after clicking a link
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });
});

// DARK AND LIGHT MODE
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeToggle.textContent = "☾";
    } else {
        themeToggle.textContent = "☀";
    }
});

// TYPING ANIMATION
const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "College Student",
    "Python Programmer",
    "AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typingAnimation() {

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typingAnimation, 1200);
            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(
        typingAnimation,
        deleting ? 50 : 100
    );
}

if (reducedMotion) {
    typingElement.textContent = roles[0];
} else {
    typingAnimation();
}

// SCROLL FADE-IN ANIMATION
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(
    ".section, .project-card, .skill, .education-card, .cert-card"
).forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(element);
});

// Add visible styling
const style = document.createElement("style");

style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);

// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("form-message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {

        formMessage.textContent =
            "Please enter a valid name.";

        formMessage.style.color = "red";

    } else if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color = "red";

    } else if (message.length < 10) {

        formMessage.textContent =
            "Message must contain at least 10 characters.";

        formMessage.style.color = "red";

    } else {

        formMessage.textContent =
            "Your details are valid! This is a demo form; no email was sent.";

        formMessage.style.color = "#00e5ff";

        contactForm.reset();
    }
});

// FOOTER COPYRIGHT YEAR
const footer = document.querySelector("footer p");

footer.textContent =
    "© " + new Date().getFullYear() +
    " Aishwarya | All Rights Reserved";
