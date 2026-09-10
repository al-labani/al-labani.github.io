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
                <p class="research-text">Designed a CNN-Transformer architecture with a slot-query decoder that classifies each character independently, eliminating the need for bounding-box detection.</p>
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
            heroTag: "Based in Nürnberg, Germany",
            heroSubtitle: "AI & Robotics Student • ML and Generative AI • Research and development",
            heroIntro: "Master Student @ University of Technology Nuremberg",
            experience: {
                tag: "01 / Experience", title: "Experience",
                description: "Education and professional experience in AI, robotics, and applied machine learning.",
                items: [
                    ["M.Sc. AI & Robotics", "University of Technology Nuremberg (UTN)", "Grade 1.7"],
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Germany", "Built an agentic pipeline using LangChain that automatically validates and ingests 13 inconsistent industrial data sources into a unified database for natural-language querying.", "Agentic AI, RAG, LangChain, automated data ingestion and data preprocessing"],
                    ["Intensive German Language Training", "Goethe-Institut Göttingen, Göttingen, Germany", "Completed intensive German language training covering CEFR levels A1 to B1.", "German language development, A1–B1, intensive in-person study"],
                    ["Business Development (AI)", "Sekuen, Dubai, UAE", "Built and presented working AI prototypes to potential B2B clients across multiple industries.", "AI prototyping, workflow mapping, stakeholder communication"],
                    ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", ["Supervised Machine Learning: Regression and Classification", "Advanced Learning Algorithms", "Unsupervised Learning, Recommenders, and Reinforcement Learning"], "View Certificate"],
                    ["Python for Everybody Specialization", "University of Michigan · Coursera", ["Programming for Everybody (Getting Started with Python)", "Python Data Structures", "Using Python to Access Web Data", "Using Databases with Python", "Capstone: Retrieving, Processing, and Visualizing Data with Python"], "View Certificate"],
                    ["B.Sc. Electrical Engineering", "University of Technology Malaysia (UTM)", "Grade 3.68/4.0", "First Class Honours"]
                ]
            },
            projects: {
                tag: "02 / Portfolio", title: "Selected Projects",
                description: "A curated list of applications, datasets, pipelines, and frameworks built end-to-end.",
                tellpdf: ["TellPDF — AI-Powered Document Assistant", "A browser-based workspace with an agentic AI planner for interacting with documents directly in-browser, without server-side uploads.", "Visit Project"],
                datasets: ["Semantic Operator Datasets — Products & Reviews", "Large-scale semantic-filter datasets built by applying LLM-generated predicates to Amazon products and reviews, producing structured Boolean labels for filtering and evaluation.", "View Products dataset on Hugging Face", "View Reviews dataset on Hugging Face", "View on GitHub"],
                forward: ["forward.md — AI-Assisted Workflow Convention", "A lightweight markdown-based context-carrying standard for preserving context across AI coding tool sessions.", "View on GitHub"]
            },
            research: {
                tag: "03 / Research", title: "Research Projects",
                description: "Research in model training, distillation, retrieval, authorship verification, and evaluation.",
                items: [
                    ["Master's Thesis: Online Model Distillation for Semantic Operations", "Compared full SFT, PEFT, soft- and hard-label distillation, and embedding-based logistic regression for training a small student model online from teacher outputs during query execution.", ["SFT", "Full Fine-tuning"], ["PEFT", "Efficient Fine-tuning"], "Ongoing", "findings intended for research publication."],
                    ["UTN Student Support Chatbot", "Retrieval-augmented chatbot combining semantic search, keyword retrieval, and a fine-tuned model to help students navigate university documentation.", ["RAG", "Architecture"], ["PEFT", "Fine-tuned"], "View on Hugging Face"],
                    ["PlotCraft: Scientific Figure Generation from Text", "Built three PyTorch training pipelines and implemented GRPO post-training with visual similarity rewards to align plot rendering outputs.", ["97%", "Code Execution Rate"], ["53K", "Sample Dataset"], "View on GitHub"],
                    ["LLM Authorship Verification on German Texts", "Evaluated six frontier language models' stylistic profiles on German text pairs to test consistency of stylistic traits across subject matters.", ["40K+", "Text Pairs Analyzed"], ["0.68", "GPT-4.1-mini F1"], "View on GitHub"],
                    ["CNN-Transformer CAPTCHA Solver", "Designed a CNN-Transformer architecture with a slot-query decoder that classifies each character independently, eliminating the need for bounding-box detection.", ["81.95%", "Sequence Accuracy"], ["94.6%", "Character-Level Accuracy"], ["5.43%", "LER"]]
                ]
            },
            contact: { title: "Contact" }
        },
        de: {
            title: "Abdullah Al-Labani — Ausgewählte Projekte & Portfolio",
            description: "Portfolio von Abdullah Al-Labani, KI- und Robotik-Student mit Schwerpunkt auf ML Engineering, Generativer KI und angewandter Forschung.",
            nav: ["Erfahrung", "Projekte", "Forschung"],
            heroTag: "In Nürnberg, Deutschland",
            heroSubtitle: "KI- & Robotik-Student • ML und Generative KI • Forschung und Entwicklung",
            heroIntro: "Masterstudent @ Technische Universität Nürnberg",
            experience: {
                tag: "01 / Erfahrung", title: "Erfahrung",
                description: "Studium und Berufserfahrung in KI, Robotik und angewandtem maschinellem Lernen.",
                items: [
                    ["M.Sc. KI & Robotik", "Technische Universität Nürnberg (UTN)", "Note 1,7"],
                    ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Deutschland", "Entwicklung einer agentischen Pipeline mit LangChain, die 13 inkonsistente industrielle Datenquellen automatisch validiert und in eine einheitliche Datenbank für natürlichsprachliche Abfragen überführt.", "Agentic AI, RAG, LangChain, automatisierte Datenaufnahme und Datenvorverarbeitung"],
                    ["Intensives Deutschsprachtraining", "Goethe-Institut Göttingen, Göttingen, Deutschland", "Intensives Deutschsprachtraining über die GER-Niveaus A1 bis B1.", "Deutschsprachentwicklung, A1–B1, intensiver Präsenzunterricht"],
                    ["Business Development (KI)", "Sekuen, Dubai, VAE", "Entwicklung und Präsentation funktionierender KI-Prototypen für potenzielle B2B-Kunden aus verschiedenen Branchen.", "KI-Prototyping, Workflow-Mapping, Stakeholder-Kommunikation"],
                    ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", ["Überwachtes maschinelles Lernen: Regression und Klassifikation", "Fortgeschrittene Lernalgorithmen", "Unüberwachtes Lernen, Empfehlungssysteme und Reinforcement Learning"], "Zertifikat ansehen"],
                    ["Python for Everybody Specialization", "University of Michigan · Coursera", ["Programmieren mit Python", "Python-Datenstrukturen", "Webdaten mit Python abrufen", "Arbeiten mit Datenbanken in Python", "Capstone: Abrufen, Verarbeiten und Visualisieren von Daten mit Python"], "Zertifikat ansehen"],
                    ["B.Sc. Elektrotechnik", "Universiti Teknologi Malaysia (UTM)", "Note 3,68/4,0", "First Class Honours"]
                ]
            },
            projects: {
                tag: "02 / Portfolio", title: "Ausgewählte Projekte",
                description: "Eine kuratierte Auswahl an Anwendungen, Datensätzen, Pipelines und Frameworks, die von Grund auf entwickelt wurden.",
                tellpdf: ["TellPDF — KI-gestützter Dokumentassistent", "Eine browserbasierte Arbeitsumgebung mit einem agentischen KI-Planer zur direkten Interaktion mit Dokumenten im Browser, ohne serverseitige Uploads.", "Projekt besuchen"],
                datasets: ["Semantic Operator Datasets — Produkte & Rezensionen", "Groß angelegte Datensätze für semantische Filter, erzeugt durch die Anwendung von LLM-generierten Prädikaten auf Amazon-Produkte und Rezensionen mit strukturierten booleschen Labels für Filterung und Evaluation.", "Produkt-Datensatz auf Hugging Face", "Rezensions-Datensatz auf Hugging Face", "Auf GitHub ansehen"],
                forward: ["forward.md — KI-gestützter Workflow-Standard", "Ein leichtgewichtiger Markdown-basierter Standard zur Weitergabe von Kontext zwischen Sitzungen mit KI-Coding-Tools.", "Auf GitHub ansehen"]
            },
            research: {
                tag: "03 / Forschung", title: "Forschungsprojekte",
                description: "Forschung zu Modelltraining, Distillation, Retrieval, Autorschaftsverifikation und Evaluation.",
                items: [
                    ["Masterarbeit: Online Model Distillation für semantische Operationen", "Vergleich von vollständigem SFT, PEFT, Soft- und Hard-Label-Distillation sowie embedding-basierter logistischer Regression zum Online-Training eines kleinen Student-Modells aus Teacher-Ausgaben während der Query-Ausführung.", ["SFT", "Vollständiges Fine-Tuning"], ["PEFT", "Effizientes Fine-Tuning"], "Laufend", "Ergebnisse sind für eine wissenschaftliche Veröffentlichung vorgesehen."],
                    ["UTN Student Support Chatbot", "Retrieval-augmentierter Chatbot, der semantische Suche, Keyword-Retrieval und ein feinabgestimmtes Modell kombiniert, um Studierenden die Navigation durch Hochschuldokumentation zu erleichtern.", ["RAG", "Architektur"], ["PEFT", "Feinabgestimmt"], "Auf Hugging Face ansehen"],
                    ["PlotCraft: Wissenschaftliche Abbildungen aus Text generieren", "Drei PyTorch-Trainingspipelines entwickelt und GRPO-Post-Training mit visuellen Ähnlichkeits-Rewards implementiert, um die gerenderten Plots besser an die Vorgaben auszurichten.", ["97%", "Code-Ausführungsrate"], ["53K", "Beispieldatensatz"], "Auf GitHub ansehen"],
                    ["LLM-Autorschaftsverifikation für deutsche Texte", "Sechs moderne Sprachmodelle anhand stilistischer Profile deutscher Textpaare evaluiert, um die Konsistenz stilistischer Merkmale über verschiedene Themenbereiche hinweg zu untersuchen.", ["40K+", "Analysierte Textpaare"], ["0,68", "GPT-4.1-mini F1"], "Auf GitHub ansehen"],
                    ["CNN-Transformer CAPTCHA-Solver", "Entwicklung einer CNN-Transformer-Architektur mit einem Slot-Query-Decoder, der jedes Zeichen unabhängig klassifiziert und dadurch eine Bounding-Box-Erkennung überflüssig macht.", ["81,95 %", "Sequenzgenauigkeit"], ["94,6 %", "Zeichenebengenauigkeit"], ["5,43 %", "LER"]]
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
            const text = item.querySelector(".research-text");
            if (text) text.textContent = data[1];

            const statsContainer = item.querySelector(".research-stats");
            if (!statsContainer) return;
            const metricData = data.slice(2).filter(Array.isArray);
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
            if (status && index === 0) status.innerHTML = `<strong>${data[4]}</strong> — ${data[5]}`;
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

        setText(".hero-tag", t.heroTag);
        setHtml(".hero-subtitle", t.heroSubtitle.replaceAll(" • ", ' <span class="bullet">•</span> '));
        const university = lang === "de" ? "Technische Universität Nürnberg" : "University of Technology Nuremberg";
        setHtml(".hero-intro p", `${t.heroIntro.split(" @ ")[0]} @ <a href="https://www.utn.de/en/" target="_blank" rel="noopener noreferrer">${university}</a>`);

        const expHeader = document.querySelector("#experience .section-header");
        if (expHeader) {
            expHeader.querySelector(".section-tag").textContent = t.experience.tag;
            expHeader.querySelector(".section-title").textContent = t.experience.title;
            expHeader.querySelector(".section-description").textContent = t.experience.description;
        }
        document.querySelectorAll(".timeline-item").forEach((item, index) => {
            const data = t.experience.items[index];
            if (!data) return;
            item.querySelector(".timeline-title").textContent = data[0];
            item.querySelector(".timeline-org").textContent = data[1];
            const description = item.querySelector(".timeline-description");
            const skills = item.querySelector(".timeline-skills");
            const courses = item.querySelector(".timeline-courses");
            const certificate = item.querySelector(".timeline-certificate");
            if (Array.isArray(data[2])) {
                if (courses) courses.innerHTML = data[2].map(course => `<li>${course}</li>`).join("");
                if (description) description.textContent = "";
            } else if (description) {
                description.innerHTML = data[2] || "";
                if (data[3] === "First Class Honours") description.innerHTML = `${data[2]} <strong>(First Class Honours)</strong>`;
            }
            if (skills) {
                if (data[3] && typeof data[3] === "string" && data[3] !== "First Class Honours" && !data[3].startsWith("View") && !data[3].startsWith("Zertifikat")) {
                    skills.innerHTML = `<strong>${lang === "de" ? "Schwerpunkte" : "Applied Skills"}:</strong> ${data[3]}`;
                } else {
                    skills.textContent = "";
                }
            }
            if (certificate && (data[3] || "").startsWith("View") || certificate && (data[3] || "").startsWith("Zertifikat")) {
                certificate.innerHTML = `${data[3]} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            }
        });

        const projHeader = document.querySelector("#projects .section-header");
        if (projHeader) {
            projHeader.querySelector(".section-tag").textContent = t.projects.tag;
            projHeader.querySelector(".section-title").textContent = t.projects.title;
            projHeader.querySelector(".section-description").textContent = t.projects.description;
        }
        const projectCards = document.querySelectorAll(".project-card");
        if (projectCards[0]) {
            projectCards[0].querySelector(".project-title").textContent = t.projects.tellpdf[0];
            projectCards[0].querySelector(".project-excerpt").textContent = t.projects.tellpdf[1];
            projectCards[0].querySelector(".project-link").innerHTML = `${t.projects.tellpdf[2]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        if (projectCards[1]) {
            projectCards[1].querySelector(".project-title").textContent = t.projects.datasets[0];
            projectCards[1].querySelector(".project-excerpt").textContent = t.projects.datasets[1];
            const links = projectCards[1].querySelectorAll(".dataset-links a");
            if (links[0]) links[0].textContent = t.projects.datasets[2];
            if (links[1]) links[1].textContent = t.projects.datasets[3];
            projectCards[1].querySelector(".project-link").innerHTML = `${t.projects.datasets[4]} <i class="fa-solid fa-arrow-right"></i>`;
        }
        if (projectCards[2]) {
            projectCards[2].querySelector(".project-title").textContent = t.projects.forward[0];
            projectCards[2].querySelector(".project-excerpt").textContent = t.projects.forward[1];
            projectCards[2].querySelector(".project-link").innerHTML = `${t.projects.forward[2]} <i class="fa-solid fa-arrow-right"></i>`;
        }

        const researchHeader = document.querySelector("#research .section-header");
        if (researchHeader) {
            researchHeader.querySelector(".section-tag").textContent = t.research.tag;
            researchHeader.querySelector(".section-title").textContent = t.research.title;
            researchHeader.querySelector(".section-description").textContent = t.research.description;
        }
        updateResearch(t.research.items);

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
