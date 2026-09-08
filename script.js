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

    const navLinks = document.querySelector(".nav-links");
    const navThemeToggle = document.getElementById("theme-toggle-btn");

    if (navLinks && navThemeToggle) {
        const utilities = document.createElement("div");
        utilities.className = "nav-utilities";

        const languageNav = document.createElement("nav");
        languageNav.className = "language-switcher";
        languageNav.setAttribute("aria-label", "Language");

        const englishButton = document.createElement("button");
        englishButton.type = "button";
        englishButton.className = "language-option";
        englishButton.dataset.language = "en";
        englishButton.lang = "en";
        englishButton.textContent = "English";
        englishButton.setAttribute("aria-label", "English");

        const germanButton = document.createElement("button");
        germanButton.type = "button";
        germanButton.className = "language-option";
        germanButton.dataset.language = "de";
        germanButton.lang = "de";
        germanButton.textContent = "Deutsch";
        germanButton.setAttribute("aria-label", "Deutsch");

        languageNav.append(englishButton, germanButton);
        utilities.append(languageNav, navThemeToggle);
        navLinks.appendChild(utilities);

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
                        ["B.Sc. Electrical Engineering", "University of Technology Malaysia (UTM)", "Grade 3.68/4.0", "First Class Honours"],
                        ["Python for Everybody Specialization", "University of Michigan · Coursera", ["Programming for Everybody (Getting Started with Python)", "Python Data Structures", "Using Python to Access Web Data", "Using Databases with Python", "Capstone: Retrieving, Processing, and Visualizing Data with Python"], "View Certificate"],
                        ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", ["Supervised Machine Learning: Regression and Classification", "Advanced Learning Algorithms", "Unsupervised Learning, Recommenders, and Reinforcement Learning"], "View Certificate"],
                        ["Business Development (AI)", "Sekuen, Dubai, UAE", "Built and presented working AI prototypes to potential B2B clients across multiple industries.", "AI prototyping, workflow mapping, stakeholder communication"],
                        ["Intensive German Language Training", "Goethe-Institut Göttingen, Göttingen, Germany", "Completed intensive German language training covering CEFR levels A1 to B1.", "German language development, A1–B1, intensive in-person study", ["Focus:", "Schwerpunkte:"]],
                        ["M.Sc. AI & Robotics", "University of Technology Nuremberg (UTN)", "Grade 1.7"],
                        ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Germany", "Built an agentic pipeline using LangChain that automatically validates and ingests 13 inconsistent industrial data sources into a unified database for natural-language querying.", "Agentic AI, RAG, LangChain, automated data ingestion and data preprocessing"]
                    ]
                },
                projects: {
                    tag: "02 / Portfolio", title: "Selected Projects",
                    description: "A curated list of applications, datasets, pipelines, and frameworks built end-to-end.",
                    tellpdf: { title: "TellPDF — AI-Powered Document Assistant", excerpt: "A browser-based workspace with an agentic AI planner for interacting with documents directly in-browser, without server-side uploads.", link: "Visit Project" },
                    datasets: { title: "Semantic Operator Datasets — Products & Reviews", excerpt: "Large-scale semantic-filter datasets built by applying LLM-generated predicates to Amazon products and reviews, producing structured Boolean labels for filtering and evaluation.", products: "View Products dataset on Hugging Face", reviews: "View Reviews dataset on Hugging Face", github: "View on GitHub" },
                    forward: { title: "forward.md — AI-Assisted Workflow Convention", excerpt: "A lightweight markdown-based context-carrying standard for preserving context across AI coding tool sessions.", link: "View on GitHub" }
                },
                research: {
                    tag: "03 / Research", title: "Research Projects", description: "Research in model training, distillation, retrieval, authorship verification, and evaluation.",
                    items: [
                        ["Master's Thesis: Online Model Distillation for Semantic Operations", "Compared full SFT, PEFT, soft- and hard-label distillation, and embedding-based logistic regression for training a small student model online from teacher outputs during query execution.", ["SFT", "Full Fine-tuning"], ["PEFT", "Efficient Fine-tuning"], "Ongoing", "findings intended for research publication."],
                        ["UTN Student Support Chatbot", "Retrieval-augmented chatbot combining semantic search, keyword retrieval, and a fine-tuned model to help students navigate university documentation.", ["RAG", "Architecture"], ["PEFT", "Fine-tuned"], "View on Hugging Face"],
                        ["PlotCraft: Scientific Figure Generation from Text", "Built three PyTorch training pipelines and implemented GRPO post-training with visual similarity rewards to align plot rendering outputs.", ["97%", "Code Execution Rate"], ["53K", "Sample Dataset"], "View on GitHub"],
                        ["LLM Authorship Verification on German Texts", "Evaluated six frontier language models' stylistic profiles on German text pairs to test consistency of stylistic traits across subject matters.", ["40K+", "Text Pairs Analyzed"], ["0.68", "GPT-4.1-mini F1"], "View on GitHub"]
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
                    tag: "01 / Erfahrung", title: "Erfahrung", description: "Studium und Berufserfahrung in KI, Robotik und angewandtem maschinellem Lernen.",
                    items: [
                        ["B.Sc. Elektrotechnik", "Universiti Teknologi Malaysia (UTM)", "Note 3,68/4,0", "First Class Honours"],
                        ["Python for Everybody Specialization", "University of Michigan · Coursera", ["Programmieren mit Python", "Python-Datenstrukturen", "Webdaten mit Python abrufen", "Arbeiten mit Datenbanken in Python", "Capstone: Abrufen, Verarbeiten und Visualisieren von Daten mit Python"], "Zertifikat ansehen"],
                        ["Machine Learning Specialization", "Stanford Online & DeepLearning.AI · Coursera", ["Überwachtes maschinelles Lernen: Regression und Klassifikation", "Fortgeschrittene Lernalgorithmen", "Unüberwachtes Lernen, Empfehlungssysteme und Reinforcement Learning"], "Zertifikat ansehen"],
                        ["Business Development (KI)", "Sekuen, Dubai, VAE", "Entwicklung und Präsentation funktionierender KI-Prototypen für potenzielle B2B-Kunden aus verschiedenen Branchen.", "KI-Prototyping, Workflow-Mapping, Stakeholder-Kommunikation"],
                        ["Intensives Deutschsprachtraining", "Goethe-Institut Göttingen, Göttingen, Deutschland", "Intensives Deutschsprachtraining über die GER-Niveaus A1 bis B1.", "Deutschsprachentwicklung, A1–B1, intensiver Präsenzunterricht", ["Schwerpunkte:", "Focus:"]],
                        ["M.Sc. KI & Robotik", "Technische Universität Nürnberg (UTN)", "Note 1,7"],
                        ["Praktikant (Pflichtpraktikum)", "Schaeffler AG, Herzogenaurach, Deutschland", "Entwicklung einer agentischen Pipeline mit LangChain, die 13 inkonsistente industrielle Datenquellen automatisch validiert und in eine einheitliche Datenbank für natürlichsprachige Abfragen überführt.", "Agentic AI, RAG, LangChain, automatisierte Datenaufnahme und Datenvorverarbeitung"]
                    ]
                },
                projects: {
                    tag: "02 / Portfolio", title: "Ausgewählte Projekte", description: "Eine kuratierte Auswahl an Anwendungen, Datensätzen, Pipelines und Frameworks, die von Grund auf entwickelt wurden.",
                    tellpdf: { title: "TellPDF — KI-gestützter Dokumentassistent", excerpt: "Eine browserbasierte Arbeitsumgebung mit einem agentischen KI-Planer zur direkten Interaktion mit Dokumenten im Browser, ohne serverseitige Uploads.", link: "Projekt besuchen" },
                    datasets: { title: "Semantic Operator Datasets — Produkte & Rezensionen", excerpt: "Groß angelegte Datensätze für semantische Filter, erzeugt durch die Anwendung von LLM-generierten Prädikaten auf Amazon-Produkte und Rezensionen mit strukturierten booleschen Labels für Filterung und Evaluation.", products: "Produkt-Datensatz auf Hugging Face", reviews: "Rezensions-Datensatz auf Hugging Face", github: "Auf GitHub ansehen" },
                    forward: { title: "forward.md — KI-gestützter Workflow-Standard", excerpt: "Ein leichtgewichtiger Markdown-basierter Standard zur Weitergabe von Kontext zwischen Sitzungen mit KI-Coding-Tools.", link: "Auf GitHub ansehen" }
                },
                research: {
                    tag: "03 / Forschung", title: "Forschungsprojekte", description: "Forschung zu Modelltraining, Distillation, Retrieval, Autorschaftsverifikation und Evaluation.",
                    items: [
                        ["Masterarbeit: Online Model Distillation für semantische Operationen", "Vergleich von vollständigem SFT, PEFT, Soft- und Hard-Label-Distillation sowie embedding-basierter logistischer Regression zum Online-Training eines kleinen Student-Modells aus Teacher-Ausgaben während der Query-Ausführung.", ["SFT", "Vollständiges Fine-Tuning"], ["PEFT", "Effizientes Fine-Tuning"], "Laufend", "Ergebnisse sind für eine wissenschaftliche Veröffentlichung vorgesehen."],
                        ["UTN Student Support Chatbot", "Retrieval-augmentierter Chatbot, der semantische Suche, Keyword-Retrieval und ein feinabgestimmtes Modell kombiniert, um Studierenden die Navigation durch Hochschuldokumentation zu erleichtern.", ["RAG", "Architektur"], ["PEFT", "Feinabgestimmt"], "Auf Hugging Face ansehen"],
                        ["PlotCraft: Wissenschaftliche Abbildungen aus Text generieren", "Drei PyTorch-Trainingspipelines entwickelt und GRPO-Post-Training mit visuellen Ähnlichkeits-Rewards implementiert, um die gerenderten Plots besser an die Vorgaben auszurichten.", ["97%", "Code-Ausführungsrate"], ["53K", "Beispieldatensatz"], "Auf GitHub ansehen"],
                        ["LLM-Autorschaftsverifikation für deutsche Texte", "Sechs moderne Sprachmodelle anhand stilistischer Profile deutscher Textpaare evaluiert, um die Konsistenz stilistischer Merkmale über verschiedene Themenbereiche hinweg zu untersuchen.", ["40K+", "Analysierte Textpaare"], ["0,68", "GPT-4.1-mini F1"], "Auf GitHub ansehen"]
                    ]
                },
                contact: { title: "Kontakt" }
            }
        };

        function setText(selector, value) {
            const element = document.querySelector(selector);
            if (element) element.textContent = value;
        }

        function setHtml(selector, value) {
            const element = document.querySelector(selector);
            if (element) element.innerHTML = value;
        }

        function setLanguages(lang) {
            const t = translations[lang];
            if (!t) return;
            document.documentElement.lang = lang;
            document.title = t.title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.content = t.description;

            document.querySelectorAll(".nav-item").forEach((item, index) => {
                if (t.nav[index]) item.textContent = t.nav[index];
            });

            setText(".hero-tag", t.heroTag);
            setHtml(".hero-subtitle", t.heroSubtitle.replaceAll(" • ", ' <span class="bullet">•</span> '));
            const universityName = lang === "de" ? "Technische Universität Nürnberg" : "University of Technology Nuremberg";
            setHtml(".hero-intro p", `${t.heroIntro.split(" @ ")[0]} @ <a href="https://www.utn.de/en/" target="_blank" rel="noopener noreferrer">${universityName}</a>`);

            const experienceHeader = document.querySelector("#experience .section-header");
            if (experienceHeader) {
                experienceHeader.querySelector(".section-tag").textContent = t.experience.tag;
                experienceHeader.querySelector(".section-title").textContent = t.experience.title;
                experienceHeader.querySelector(".section-description").textContent = t.experience.description;
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
                    if (certificate) certificate.innerHTML = `${data[3]} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
                } else {
                    if (description) description.innerHTML = data[2] === "Grade 3.68/4.0" || data[2] === "Note 3,68/4,0" ? `${data[2]} <strong>(${data[3]})</strong>` : data[2];
                    if (skills) {
                        const label = Array.isArray(data[4]) ? data[4][lang === "de" ? 0 : 1] : (lang === "de" ? "Angewandte Kompetenzen:" : "Applied Skills:");
                        skills.innerHTML = data[3] ? `<strong>${label}</strong> ${data[3]}` : "";
                    }
                }
            });

            const projectHeader = document.querySelector("#projects .section-header");
            if (projectHeader) {
                projectHeader.querySelector(".section-tag").textContent = t.projects.tag;
                projectHeader.querySelector(".section-title").textContent = t.projects.title;
                projectHeader.querySelector(".section-description").textContent = t.projects.description;
            }
            const projectCards = document.querySelectorAll("#projects .project-card");
            if (projectCards[0]) {
                projectCards[0].querySelector(".project-title").textContent = t.projects.tellpdf.title;
                projectCards[0].querySelector(".project-excerpt").textContent = t.projects.tellpdf.excerpt;
                projectCards[0].querySelector(".project-link").innerHTML = `${t.projects.tellpdf.link} <i class="fa-solid fa-arrow-right"></i>`;
            }
            if (projectCards[1]) {
                projectCards[1].querySelector(".project-title").textContent = t.projects.datasets.title;
                projectCards[1].querySelector(".project-excerpt").textContent = t.projects.datasets.excerpt;
                const datasetLinks = projectCards[1].querySelectorAll(".dataset-links a");
                if (datasetLinks[0]) datasetLinks[0].textContent = t.projects.datasets.products;
                if (datasetLinks[1]) datasetLinks[1].textContent = t.projects.datasets.reviews;
                projectCards[1].querySelector(".project-link").innerHTML = `${t.projects.datasets.github} <i class="fa-solid fa-arrow-right"></i>`;
            }
            if (projectCards[2]) {
                projectCards[2].querySelector(".project-title").textContent = t.projects.forward.title;
                projectCards[2].querySelector(".project-excerpt").textContent = t.projects.forward.excerpt;
                projectCards[2].querySelector(".project-link").innerHTML = `${t.projects.forward.link} <i class="fa-solid fa-arrow-right"></i>`;
            }

            const researchHeader = document.querySelector("#research .section-header");
            if (researchHeader) {
                researchHeader.querySelector(".section-tag").textContent = t.research.tag;
                researchHeader.querySelector(".section-title").textContent = t.research.title;
                researchHeader.querySelector(".section-description").textContent = t.research.description;
            }
            document.querySelectorAll(".research-item").forEach((item, index) => {
                const data = t.research.items[index];
                if (!data) return;
                const title = item.querySelector(".research-title");
                const titleLink = item.querySelector(".research-title-link");
                if (titleLink) titleLink.textContent = data[0];
                else if (title) title.textContent = data[0];
                item.querySelector(".research-text").textContent = data[1];
                const stats = item.querySelectorAll(".stat-box");
                if (stats[0]) { stats[0].querySelector(".stat-number").textContent = data[2][0]; stats[0].querySelector(".stat-label").textContent = data[2][1]; }
                if (stats[1]) { stats[1].querySelector(".stat-number").textContent = data[3][0]; stats[1].querySelector(".stat-label").textContent = data[3][1]; }
                const status = item.querySelector(".research-status");
                if (status && index === 0) status.innerHTML = `<strong>${data[4]}</strong> — ${data[5]}`;
                const link = item.querySelector(".research-link");
                if (link) link.innerHTML = `${data[4]} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            });

            setText(".contact-title", t.contact.title);
            document.querySelectorAll(".language-option").forEach(button => {
                const active = button.dataset.language === lang;
                button.classList.toggle("is-active", active);
                button.setAttribute("aria-pressed", String(active));
            });
            localStorage.setItem("language", lang);
        }

        const style = document.createElement("style");
        style.textContent = `
            .nav-utilities{display:flex;align-items:center;gap:1.35rem;margin-left:.25rem}
            .language-switcher{display:flex;align-items:center;gap:.15rem;border:1px solid var(--border-color);padding:.18rem;border-radius:999px;background:var(--bg-color)}
            .language-option{border:0;background:transparent;color:var(--text-muted);font:500 .72rem/1 var(--font-sans);letter-spacing:.02em;padding:.48rem .58rem;border-radius:999px;cursor:pointer;transition:var(--transition-fast)}
            .language-option:hover{color:var(--text-color)}
            .language-option:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}
            .language-option.is-active{background:var(--text-color);color:var(--bg-color)}
            @media(max-width:768px){.nav-utilities{gap:.55rem}.language-option{font-size:.68rem;padding:.44rem .5rem}.theme-toggle{order:1}}
        `;
        document.head.appendChild(style);

        englishButton.addEventListener("click", () => setLanguages("en"));
        germanButton.addEventListener("click", () => setLanguages("de"));
        setLanguages(localStorage.getItem("language") === "de" ? "de" : "en");
    }

    const modal = document.getElementById("project-modal");
    if (!modal) return;
});
