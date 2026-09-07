document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }

    themeToggleBtn?.addEventListener("click", () => {
        if (body.classList.contains("light-theme")) {
            body.classList.replace("light-theme", "dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.replace("dark-theme", "light-theme");
            localStorage.setItem("theme", "light");
        }
    });

    const progressBar = document.getElementById("scroll-progress-bar");
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = `${scrollPercent}%`;
        if (header) header.classList.toggle("header-scrolled", scrollTop > 50);
    }, { passive: true });

    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // The current portfolio uses direct project links rather than case-study dialogs.
    // Keep this guard so the older modal logic can be restored later without breaking the page.
    const modal = document.getElementById("project-modal");
    if (!modal) return;
});
