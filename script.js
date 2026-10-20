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

    const translations = {
        en: {
            title: "Abdullah Al-Labani — Selected Projects & Portfolio",
            description: "Portfolio of Abdullah Al-Labani, AI & Robotics Student specializing in ML Engineering, Generative AI, and applied research.",
            nav: ["Experience", "Projects", "Education"],
            heroGreeting: "Hi, my name is Abdullah Al-Labani, based in Nürnberg, Germany",
            experience: {
                tag: "01 / Experience", title: "Experience",
                items: [
                    ["Master’s Thesis Researcher (Masterarbeit)", "UTN Data Systems | Nuremberg, DE"],
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG | Herzogenaurach, Germany"],
                    ["Business Development (AI)", "Sekuen | Dubai, UAE"]
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
                skinCancer: ["Skin Cancer Classification", "View on GitHub"],
                utnChatbot: ["UTN Student Support Chatbot", "View on Hugging Face"],
                plotcraft: ["PlotCraft: Scientific Figure Generation from Text", "View on GitHub", "Test on Hugging Face"],
                authorship: ["LLM Authorship Verification on German Texts", "View on GitHub"],
                distillation: ["Online Model Distillation for Semantic Operations", ["SFT", "Full Fine-tuning"], ["PEFT", "Efficient Fine-tuning"], "Ongoing"],
                captcha: ["CNN-Transformer CAPTCHA Solver", ["81.95%", "Sequence Accuracy"], ["94.6%", "Character-Level Accuracy"], ["5.43%", "LER"]]
            },
            contact: { title: "Contact" }
        },
        de: {
            title: "Abdullah Al-Labani — Ausgewählte Projekte & Portfolio",
            description: "Portfolio von Abdullah Al-Labani, KI- und Robotik-Student mit Schwerpunkt auf ML Engineering, Generativer KI und angewandter Forschung.",
            nav: ["Erfahrung", "Projekte", "Ausbildung"],
            heroGreeting: "Hallo, ich heiße Abdullah Al-Labani und lebe in Nürnberg, Deutschland",
            experience: {
                tag: "01 / Erfahrung", title: "Erfahrung",
                items: [
                    ["Master’s Thesis Researcher (Masterarbeit)", "UTN Data Systems | Nürnberg, Deutschland"],
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG | Herzogenaurach, Deutschland"],
                    ["Business Development (KI)", "Sekuen | Dubai, VAE"]
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
                skinCancer: ["Skin Cancer Classification", "Auf GitHub ansehen"],
                utnChatbot: ["UTN Student Support Chatbot", "Auf Hugging Face ansehen"],
                plotcraft: ["PlotCraft: Wissenschaftliche Abbildungen aus Text generieren", "Auf GitHub ansehen", "Auf Hugging Face testen"],
                authorship: ["LLM-Autorschaftsverifikation für deutsche Texte", "Auf GitHub ansehen"],
                distillation: ["Online Model Distillation für semantische Operationen", ["SFT", "Vollständiges Fine-Tuning"], ["PEFT", "Effizientes Fine-Tuning"], "Laufend"],
                captcha: ["CNN-Transformer CAPTCHA-Solver", ["81,95 %", "Sequenzgenauigkeit"], ["94,6 %", "Zeichenebengenauigkeit"], ["5,43 %", "LER"]]
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
        const utnCard = document.querySelector('[data-project="utn-chatbot"]');
        if (utnCard) {
            utnCard.querySelector(".project-title").textContent = t.projects.utnChatbot[0];
            utnCard.querySelector(".project-link").innerHTML = `${t.projects.utnChatbot[1]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        const plotcraftCard = document.querySelector('[data-project="plotcraft"]');
        if (plotcraftCard) {
            plotcraftCard.querySelector(".project-title").textContent = t.projects.plotcraft[0];
            const links = plotcraftCard.querySelectorAll(".project-actions .project-link");
            if (links[0]) links[0].innerHTML = `${t.projects.plotcraft[1]} <i class="fa-solid fa-arrow-right"></i>`;
            if (links[1]) links[1].innerHTML = `${t.projects.plotcraft[2]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        const authorshipCard = document.querySelector('[data-project="authorship"]');
        if (authorshipCard) {
            authorshipCard.querySelector(".project-title").textContent = t.projects.authorship[0];
            authorshipCard.querySelector(".project-link").innerHTML = `${t.projects.authorship[1]} <i class="fa-solid fa-arrow-right"></i>`;
        }

        const updateMetricProject = (selector, data) => {
            const card = document.querySelector(selector);
            if (!card) return;
            const title = card.querySelector(".research-title");
            if (title) title.textContent = data[0];
            const metrics = data.slice(1).filter(Array.isArray);
            card.querySelectorAll(".stat-box").forEach((box, index) => {
                const metric = metrics[index];
                if (!metric) return;
                const number = box.querySelector(".stat-number");
                const label = box.querySelector(".stat-label");
                if (number) number.textContent = metric[0];
                if (label) label.textContent = metric[1];
            });
            const statusText = data.slice(1).find(value => typeof value === "string");
            const status = card.querySelector(".research-status strong");
            if (status && statusText) status.textContent = statusText;
        };
        updateMetricProject('[data-project="distillation"]', t.projects.distillation);
        updateMetricProject('[data-project="captcha"]', t.projects.captcha);

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
