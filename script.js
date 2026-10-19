document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle-btn");

    const applyTheme = (theme) => {
        body.classList.toggle("light-theme", theme !== "dark");
        body.classList.toggle("dark-theme", theme === "dark");
    };
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    themeToggle?.addEventListener("click", () => {
        const next = body.classList.contains("dark-theme") ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("theme", next);
    });

    const progressBar = document.getElementById("scroll-progress-bar");
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        header?.classList.toggle("header-scrolled", window.scrollY > 50);
    }, { passive: true });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));

    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const utilities = document.createElement("div");
    utilities.className = "nav-utilities";
    const languageNav = document.createElement("nav");
    languageNav.className = "language-switcher";
    languageNav.setAttribute("aria-label", "Language");

    const makeLanguageButton = (lang, label) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "language-option";
        button.dataset.language = lang;
        button.lang = lang;
        button.textContent = label;
        button.setAttribute("aria-label", label);
        return button;
    };
    const englishButton = makeLanguageButton("en", "English");
    const germanButton = makeLanguageButton("de", "Deutsch");
    languageNav.append(englishButton, germanButton);

    if (themeToggle) {
        utilities.append(languageNav, themeToggle);
    } else {
        utilities.append(languageNav);
    }
    navLinks.appendChild(utilities);

    const researchGrid = document.querySelector(".research-grid");
    if (researchGrid && !researchGrid.querySelector("[data-captcha-research]")) {
        const card = document.createElement("article");
        card.className = "research-item scroll-reveal";
        card.dataset.captchaResearch = "true";
        card.innerHTML = `
            <div class="research-info">
                <h3 class="research-title">CNN-Transformer CAPTCHA Solver</h3>
                <div class="research-stats">
                    <div class="stat-box"><span class="stat-number">81.95%</span><span class="stat-label">Sequence Accuracy</span></div>
                    <div class="stat-box"><span class="stat-number">94.6%</span><span class="stat-label">Character-Level Accuracy</span></div>
                </div>
            </div>`;
        researchGrid.appendChild(card);
        const resizeStats = () => {
            const stats = card.querySelector(".research-stats");
            if (stats) stats.style.gridTemplateColumns = window.innerWidth < 700 ? "1fr" : "repeat(3, minmax(0, 1fr))";
        };
        resizeStats();
        window.addEventListener("resize", resizeStats, { passive: true });
        observer.observe(card);
    }

    const translations = {
        en: {
            title: "Abdullah Al-Labani — Selected Projects & Portfolio",
            description: "Portfolio of Abdullah Al-Labani, AI & Robotics Student specializing in ML Engineering, Generative AI, and applied research.",
            nav: ["Experience", "Projects", "Research"],
            heroGreeting: "Hi, my name is Abdullah Al-Labani, based in Nürnberg, Germany",
            experience: {
                tag: "01 / Experience", title: "Experience",
                items: [
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Germany"],
                    ["Business Development (AI)", "Sekuen, Dubai, UAE"]
                ]
            },
            education: {
                tag: "02 / Education & Certifications", title: "Education & Certifications",
                items: [
                    ["M.Sc. AI & Robotics", "University of Technology Nuremberg (UTN)", "Grade 1.7"],
                    ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", "", "View Certificate"],
                    ["Python for Everybody Specialization", "University of Michigan · Coursera", "", "View Certificate"],
                    ["B.Sc. Electrical Engineering", "University of Technology Malaysia (UTM)", "Grade 1.0", "First Class Honours"]
                ]
            },
            projects: {
                tag: "03 / Portfolio", title: "Selected Projects",
                tellpdf: ["TellPDF — AI-Powered Document Assistant", "Open App"],
                datasets: ["Semantic Operator Datasets — Products & Reviews", "View Products dataset on Hugging Face", "View Reviews dataset on Hugging Face", "View on GitHub"],
                forward: ["forward.md — AI-Assisted Workflow Convention", "View on GitHub"],
                skinCancer: ["Skin Cancer Classification", "View on GitHub"]
            },
            research: {
                tag: "04 / Research", title: "Research Projects",
                items: [
                    ["Online Model Distillation for Semantic Operations", ["SFT", "Full Fine-tuning"], ["PEFT", "Efficient Fine-tuning"], "Ongoing"],
                    ["UTN Student Support Chatbot", ["RAG", "Architecture"], ["PEFT", "Fine-tuned"]],
                    ["PlotCraft: Scientific Figure Generation from Text", ["97%", "Code Execution Rate"], ["53K", "Sample Dataset"]],
                    ["LLM Authorship Verification on German Texts", ["40K+", "Text Pairs Analyzed"], ["0.68", "GPT-4.1-mini F1"]],
                    ["CNN-Transformer CAPTCHA Solver", ["81.95%", "Sequence Accuracy"], ["94.6%", "Character-Level Accuracy"], ["5.43%", "LER"]]
                ]
            },
            contact: { title: "Contact" }
        },
        de: {
            title: "Abdullah Al-Labani — Ausgewählte Projekte & Portfolio",
            description: "Portfolio von Abdullah Al-Labani, KI- und Robotik-Student mit Schwerpunkt auf ML Engineering, Generativer KI und angewandter Forschung.",
            nav: ["Erfahrung", "Projekte", "Forschung"],
            heroGreeting: "Hallo, ich heiße Abdullah Al-Labani und lebe in Nürnberg, Deutschland",
            experience: {
                tag: "01 / Erfahrung", title: "Erfahrung",
                items: [
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Deutschland"],
                    ["Business Development (KI)", "Sekuen, Dubai, VAE"]
                ]
            },
            education: {
                tag: "02 / Ausbildung & Zertifikate", title: "Ausbildung & Zertifikate",
                items: [
                    ["M.Sc. KI & Robotik", "Technische Universität Nürnberg (UTN)", "Note 1,7"],
                    ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", "", "Zertifikat ansehen"],
                    ["Python for Everybody Specialization", "University of Michigan · Coursera", "", "Zertifikat ansehen"],
                    ["B.Sc. Elektrotechnik", "Universiti Teknologi Malaysia (UTM)", "Note 1,0", "First Class Honours"]
                ]
            },
            projects: {
                tag: "03 / Portfolio", title: "Ausgewählte Projekte",
                tellpdf: ["TellPDF — KI-gestützter Dokumentassistent", "App öffnen"],
                datasets: ["Semantic Operator Datasets — Produkte & Rezensionen", "Produkt-Datensatz auf Hugging Face", "Rezensions-Datensatz auf Hugging Face", "Auf GitHub ansehen"],
                forward: ["forward.md — KI-gestützter Workflow-Standard", "Auf GitHub ansehen"],
                skinCancer: ["Skin Cancer Classification", "Auf GitHub ansehen"]
            },
            research: {
                tag: "04 / Forschung", title: "Forschungsprojekte",
                items: [
                    ["Online Model Distillation für semantische Operationen", ["SFT", "Vollständiges Fine-Tuning"], ["PEFT", "Effizientes Fine-Tuning"], "Laufend"],
                    ["UTN Student Support Chatbot", ["RAG", "Architektur"], ["PEFT", "Feinabgestimmt"]],
                    ["PlotCraft: Wissenschaftliche Abbildungen aus Text generieren", ["97%", "Code-Ausführungsrate"], ["53K", "Beispieldatensatz"]],
                    ["LLM-Autorschaftsverifikation für deutsche Texte", ["40K+", "Analysierte Textpaare"], ["0,68", "GPT-4.1-mini F1"]],
                    ["CNN-Transformer CAPTCHA-Solver", ["81,95 %", "Sequenzgenauigkeit"], ["94,6 %", "Zeichenebengenauigkeit"], ["5,43 %", "LER"]]
                ]
            },
            contact: { title: "Kontakt" }
        }
    };

    const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    };
    const setHtml = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = value;
    };

    const updateResearch = (items) => {
        document.querySelectorAll(".research-item").forEach((item, index) => {
            const data = items[index];
            if (!data) return;

            const title = item.querySelector(".research-title");
            const titleLink = item.querySelector(".research-title-link");
            if (titleLink) titleLink.textContent = data[0];
            else if (title) title.textContent = data[0];

            const statsContainer = item.querySelector(".research-stats");
            if (!statsContainer) return;
            const metricData = data.slice(1).filter(Array.isArray);
            metricData.forEach((stat, statIndex) => {
                let box = statsContainer.querySelectorAll(".stat-box")[statIndex];
                if (!box) {
                    box = document.createElement("div");
                    box.className = "stat-box";
                    box.innerHTML = '<span class="stat-number"></span><span class="stat-label"></span>';
                    statsContainer.appendChild(box);
                }
                box.querySelector(".stat-number").textContent = stat[0];
                box.querySelector(".stat-label").textContent = stat[1];
            });

            const status = item.querySelector(".research-status");
            if (status && index === 0 && typeof data[3] === "string") {
                status.innerHTML = `<strong>${data[3]}</strong>`;
            }
        });
    };

    const setLanguages = (lang) => {
        const t = translations[lang];
        if (!t) return;
        document.documentElement.lang = lang;
        document.title = t.title;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = t.description;

        document.querySelectorAll(".nav-item").forEach((item, index) => {
            if (t.nav[index]) item.textContent = t.nav[index];
        });

        setText(".hero-intro p", t.heroGreeting);

        const expHeader = document.querySelector("#experience .section-header");
        if (expHeader) {
            expHeader.querySelector(".section-tag").textContent = t.experience.tag;
            expHeader.querySelector(".section-title").textContent = t.experience.title;
        }
        const updateTimeline = (selector, items) => {
            document.querySelectorAll(`${selector} .timeline-item`).forEach((item, index) => {
                const data = items[index];
                if (!data) return;
                const title = item.querySelector(".timeline-title");
                const org = item.querySelector(".timeline-org");
                const description = item.querySelector(".timeline-description");
                const skills = item.querySelector(".timeline-skills");
                const courses = item.querySelector(".timeline-courses");
                const certificate = item.querySelector(".timeline-certificate");

                if (title) title.textContent = data[0];
                if (org) org.textContent = data[1];

                if (description) {
                    if (Array.isArray(data[2])) {
                        description.textContent = "";
                    } else {
                        description.innerHTML = data[2] || "";
                        if (data[3] === "First Class Honours") {
                            description.innerHTML = `${data[2]} <strong>(First Class Honours)</strong>`;
                        }
                    }
                }
                if (courses) {
                    courses.innerHTML = Array.isArray(data[2]) ? data[2].map(course => `<li>${course}</li>`).join("") : "";
                }
                if (skills) {
                    if (data[3] && typeof data[3] === "string" && data[3] !== "First Class Honours" && !data[3].startsWith("View") && !data[3].startsWith("Zertifikat")) {
                        skills.innerHTML = `<strong>${lang === "de" ? "Schwerpunkte" : "Applied Skills"}:</strong> ${data[3]}`;
                    } else {
                        skills.textContent = "";
                    }
                }
                if (certificate) {
                    certificate.innerHTML = ((data[3] || "").startsWith("View") || (data[3] || "").startsWith("Zertifikat"))
                        ? `${data[3]} <i class="fa-solid fa-arrow-up-right-from-square"></i>`
                        : "";
                }
            });
        };

        updateTimeline("#experience", t.experience.items);
        updateTimeline("#education", t.education.items);

        const eduHeader = document.querySelector("#education .section-header");
        if (eduHeader) {
            eduHeader.querySelector(".section-tag").textContent = t.education.tag;
            eduHeader.querySelector(".section-title").textContent = t.education.title;
        }

        const projHeader = document.querySelector("#projects .section-header");
        if (projHeader) {
            projHeader.querySelector(".section-tag").textContent = t.projects.tag;
            projHeader.querySelector(".section-title").textContent = t.projects.title;
        }
        const projectCards = document.querySelectorAll(".project-card");
        if (projectCards[0]) {
            projectCards[0].querySelector(".project-title").textContent = t.projects.tellpdf[0];
            projectCards[0].querySelector(".project-link").innerHTML = `${t.projects.tellpdf[1]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        if (projectCards[1]) {
            projectCards[1].querySelector(".project-title").textContent = t.projects.datasets[0];
            const links = projectCards[1].querySelectorAll(".dataset-links a");
            if (links[0]) links[0].textContent = t.projects.datasets[1];
            if (links[1]) links[1].textContent = t.projects.datasets[2];
            projectCards[1].querySelector(".project-link").innerHTML = `${t.projects.datasets[3]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        if (projectCards[2]) {
            projectCards[2].querySelector(".project-title").textContent = t.projects.forward[0];
            projectCards[2].querySelector(".project-link").innerHTML = `${t.projects.forward[1]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        if (projectCards[3]) {
            projectCards[3].querySelector(".project-title").textContent = t.projects.skinCancer[0];
            projectCards[3].querySelector(".project-link").innerHTML = `${t.projects.skinCancer[1]} <i class="fa-solid fa-arrow-right"></i>`;
        }

        const researchHeader = document.querySelector("#research .section-header");
        if (researchHeader) {
            researchHeader.querySelector(".section-tag").textContent = t.research.tag;
            researchHeader.querySelector(".section-title").textContent = t.research.title;
        }
        updateResearch(t.research.items);

        const plotcraftCard = document.querySelectorAll(".research-item")[2];
        const plotcraftLinks = plotcraftCard ? plotcraftCard.querySelectorAll(".research-link") : [];
        if (plotcraftLinks.length > 0) {
            plotcraftLinks[0].innerHTML = `${lang === "de" ? "Auf GitHub ansehen" : "View on GitHub"} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
        }
        if (plotcraftLinks.length > 1) {
            plotcraftLinks[1].innerHTML = `${lang === "de" ? "Auf Hugging Face testen" : "Test on Hugging Face"} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
        }

        document.querySelectorAll(".language-option").forEach(button => {
            const active = button.dataset.language === lang;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        localStorage.setItem("language", lang);
    };

    const savedLanguage = localStorage.getItem("language") || "en";
    englishButton.addEventListener("click", () => setLanguages("en"));
    germanButton.addEventListener("click", () => setLanguages("de"));
    setLanguages(savedLanguage === "de" ? "de" : "en");
});
