document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // THEME MANAGEMENT (DARK / LIGHT)
    // ==========================================================================
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;

    // Retrieve saved theme or check system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("light-theme")) {
            body.classList.replace("light-theme", "dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.replace("dark-theme", "light-theme");
            localStorage.setItem("theme", "light");
        }
    });

    // ==========================================================================
    // SCROLL PROGRESS BAR & HEADER BLUR
    // ==========================================================================
    const progressBar = document.getElementById("scroll-progress-bar");
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;

        // Add class to header if page is scrolled past hero
        if (scrollTop > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }, { passive: true });

    // ==========================================================================
    // SUBTLE SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px" // triggers slightly before entering viewport fully
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // PORTFOLIO DIALOG / MODAL MANAGER (CASE STUDIES)
    // ==========================================================================
    const modal = document.getElementById("project-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    const openBtns = document.querySelectorAll(".open-modal-btn");
    
    // Parse Project Details from JSON
    let projectData = {};
    try {
        const dataScript = document.getElementById("project-data");
        projectData = JSON.parse(dataScript.textContent);
    } catch (e) {
        console.error("Failed to parse project data JSON:", e);
    }

    // Modal elements
    const modalNum = document.getElementById("modal-project-num");
    const modalTech = document.getElementById("modal-project-tech");
    const modalTitle = document.getElementById("modal-project-title");
    const modalLinkWrapper = document.getElementById("modal-project-link-wrapper");
    const modalLink = document.getElementById("modal-project-link");
    const modalProblem = document.getElementById("modal-problem");
    const modalSolution = document.getElementById("modal-solution");
    const modalContribution = document.getElementById("modal-contribution");
    const modalHighlights = document.getElementById("modal-highlights");
    const modalContributionSection = document.getElementById("modal-contribution-section");

    // Open Modal Function
    const openProjectModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        // Populate details
        modalNum.textContent = data.num;
        modalTech.textContent = data.tech;
        modalTitle.textContent = data.title;
        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;

        // Build contributions list
        modalContribution.innerHTML = "";
        if (data.contribution && data.contribution.length > 0) {
            modalContributionSection.style.display = "block";
            data.contribution.forEach(text => {
                const li = document.createElement("li");
                li.textContent = text;
                modalContribution.appendChild(li);
            });
        } else {
            // Hide contribution if empty (e.g. forward.md)
            modalContributionSection.style.display = "none";
        }

        // Build highlights list
        modalHighlights.innerHTML = "";
        data.highlights.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            modalHighlights.appendChild(li);
        });

        // Setup link
        if (data.link) {
            modalLinkWrapper.style.display = "block";
            modalLink.href = data.link;
            modalLink.setAttribute("aria-label", `Visit ${data.title} website`);
            // Dynamic text based on link type
            if (data.link.includes("huggingface.co")) {
                modalLink.innerHTML = 'Visit Hugging Face Space <i class="fa-solid fa-arrow-up-right-from-square"></i>';
            } else if (data.link.includes("firebaseapp.com")) {
                modalLink.innerHTML = 'Visit Web App Demo <i class="fa-solid fa-arrow-up-right-from-square"></i>';
            } else {
                modalLink.innerHTML = 'Visit Live Website <i class="fa-solid fa-arrow-up-right-from-square"></i>';
            }
        } else {
            modalLinkWrapper.style.display = "none";
        }

        // Open Dialog
        document.body.classList.add("dialog-open");
        modal.showModal();
    };

    // Close Modal Function with Animation
    const closeProjectModal = () => {
        modal.classList.add("closing");
        
        // Wait for the slide-out animation (600ms matching CSS transition)
        const onTransitionEnd = (e) => {
            if (e.propertyName === "transform") {
                modal.classList.remove("closing");
                modal.close();
                document.body.classList.remove("dialog-open");
                modal.removeEventListener("transitionend", onTransitionEnd);
            }
        };
        modal.addEventListener("transitionend", onTransitionEnd);
    };

    // Event listeners for opening
    openBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const container = e.target.closest("[data-project]");
            if (container) {
                const projectId = container.getAttribute("data-project");
                openProjectModal(projectId);
            }
        });
    });

    // Close on button click
    closeBtn.addEventListener("click", closeProjectModal);

    // Close on clicking the backdrop outside modal content
    modal.addEventListener("click", (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );
        if (!isInDialog) {
            closeProjectModal();
        }
    });

    // Handle Escape key naturally
    modal.addEventListener("cancel", (e) => {
        e.preventDefault(); // prevent default instant close
        closeProjectModal();
    });
});
