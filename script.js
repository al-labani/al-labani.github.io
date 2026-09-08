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

    // Simple bilingual layer: one page, instant DE/EN switching, persisted locally.
    const translations = {
        "Skip to content": "Zum Inhalt springen",
        "Main Navigation": "Hauptnavigation",
        "Experience": "Erfahrung",
        "Projects": "Projekte",
        "Research": "Forschung",
        "Toggle dark/light theme": "Dunkel-/Hellmodus umschalten",
        "Based in Nürnberg, Germany": "Standort: Nürnberg, Deutschland",
        "AI & Robotics Student": "Student für KI & Robotik",
        "ML and Generative AI": "Maschinelles Lernen & generative KI",
        "Research and development": "Forschung & Entwicklung",
        "Master Student @": "Masterstudent @",
        "01 / Experience": "01 / Erfahrung",
        "Education and professional experience in AI, robotics, and applied machine learning.": "Ausbildung und Berufserfahrung in KI, Robotik und angewandtem maschinellem Lernen.",
        "M.Sc. AI & Robotics": "M.Sc. KI & Robotik",
        "Machine Learning Specialization": "Spezialisierung Machine Learning",
        "View Certificate": "Zertifikat ansehen",
        "Business Development (AI)": "Business Development (KI)",
        "Built and presented working AI prototypes to potential B2B clients across multiple industries.": "Entwicklung und Präsentation funktionierender KI-Prototypen für potenzielle B2B-Kunden aus verschiedenen Branchen.",
        "Applied Skills:": "Angewandte Skills:",
        "AI prototyping, workflow mapping, stakeholder communication": "KI-Prototyping, Workflow-Mapping, Stakeholder-Kommunikation",
        "Python for Everybody Specialization": "Python for Everybody – Spezialisierung",
        "B.Sc. Electrical Engineering": "B.Sc. Elektrotechnik",
        "01 / Portfolio": "02 / Portfolio",
        "Selected Projects": "Ausgewählte Projekte",
        "A curated list of applications, datasets, pipelines, and frameworks built end-to-end.": "Eine kuratierte Auswahl vollständig entwickelter Anwendungen, Datensätze, Pipelines und Frameworks.",
        "AI-Powered Document Assistant": "KI-gestützter Dokumentassistent",
        "A browser-based workspace with an agentic AI planner for interacting with documents directly in-browser, without server-side uploads.": "Eine browserbasierte Arbeitsumgebung mit einem agentischen KI-Planer zur direkten Interaktion mit Dokumenten im Browser – ohne serverseitige Uploads.",
        "Visit Project": "Projekt ansehen",
        "Large-scale semantic-filter datasets built by applying LLM-generated predicates to Amazon products and reviews, producing structured Boolean labels for filtering and evaluation.": "Groß angelegte Datensätze für semantische Filter, erzeugt durch LLM-generierte Prädikate auf Amazon-Produkten und -Rezensionen mit strukturierten Booleschen Labels für Filterung und Evaluation.",
        "View Products dataset on Hugging Face": "Produkt-Datensatz auf Hugging Face ansehen",
        "View Reviews dataset on Hugging Face": "Rezensions-Datensatz auf Hugging Face ansehen",
        "View on GitHub": "Auf GitHub ansehen",
        "A lightweight markdown-based context-carrying standard for preserving context across AI coding tool sessions.": "Ein leichtgewichtiger, Markdown-basierter Standard zur Weitergabe von Kontext über Sitzungen mit KI-Coding-Tools hinweg.",
        "AI-Assisted Workflow Convention": "KI-gestützte Workflow-Konvention",
        "02 / Research": "03 / Forschung",
        "Research Projects": "Forschungsprojekte",
        "Research in model training, distillation, retrieval, authorship verification, and evaluation.": "Forschung zu Modelltraining, Distillation, Retrieval, Autorschaftsverifikation und Evaluation.",
        "Master's Thesis: Online Model Distillation for Semantic Operations": "Masterarbeit: Online Model Distillation für semantische Operationen",
        "Compared full SFT, PEFT, soft- and hard-label distillation, and embedding-based logistic regression for training a small student model online from teacher outputs during query execution.": "Vergleich von Full-SFT, PEFT, Soft- und Hard-Label-Distillation sowie embedding-basierter logistischer Regression zum Online-Training eines kleinen Student-Modells aus Teacher-Ausgaben während der Query-Ausführung.",
        "Full Fine-tuning": "Full Fine-tuning",
        "Efficient Fine-tuning": "Effizientes Fine-tuning",
        "Ongoing": "Laufend",
        " — findings intended for research publication.": " — Ergebnisse sind für eine wissenschaftliche Veröffentlichung vorgesehen.",
        "UTN Student Support Chatbot": "UTN-Chatbot für Studierenden-Support",
        "Retrieval-augmented chatbot combining semantic search, keyword retrieval, and a fine-tuned model to help students navigate university documentation.": "Retrieval-augmented Chatbot, der semantische Suche, Keyword-Retrieval und ein feinabgestimmtes Modell kombiniert, um Studierenden die Navigation durch Hochschuldokumentation zu erleichtern.",
        "Architecture": "Architektur",
        "Fine-tuned": "Feinabgestimmt",
        "View on Hugging Face": "Auf Hugging Face ansehen",
        "PlotCraft: Scientific Figure Generation from Text": "PlotCraft: Wissenschaftliche Abbildungen aus Text generieren",
        "Built three PyTorch training pipelines and implemented GRPO post-training with visual similarity rewards to align plot rendering outputs.": "Entwicklung von drei PyTorch-Trainingspipelines und Implementierung von GRPO-Post-Training mit Belohnungen für visuelle Ähnlichkeit zur Verbesserung der Plot-Ausgaben.",
        "Code Execution Rate": "Code-Ausführungsrate",
        "Sample Dataset": "Beispieldatensatz",
        "LLM Authorship Verification on German Texts": "LLM-Autorschaftsverifikation für deutsche Texte",
        "Evaluated six frontier language models' stylistic profiles on German text pairs to test consistency of stylistic traits across subject matters.": "Evaluation der Stilprofile von sechs modernen Sprachmodellen anhand deutscher Textpaare, um die Konsistenz stilistischer Merkmale über verschiedene Themen hinweg zu untersuchen.",
        "Text Pairs Analyzed": "Analysierte Textpaare",
        "GPT-4.1-mini F1": "GPT-4.1-mini F1",
        "Contact": "Kontakt",
        "Nürnberg, Germany": "Nürnberg, Deutschland",
        "Let's connect": "Vernetzen wir uns"
    };

    const englishToGerman = new Map(Object.entries(translations));
    const germanToEnglish = new Map(Array.from(englishToGerman, ([en, de]) => [de, en]));

    const languageToggle = document.createElement("div");
    languageToggle.className = "language-toggle";
    languageToggle.setAttribute("role", "group");
    languageToggle.setAttribute("aria-label", "Language");
    languageToggle.innerHTML = '<button type="button" data-lang="de" lang="de">DE</button><span aria-hidden="true">|</span><button type="button" data-lang="en" lang="en">EN</button>';
    document.querySelector(".nav-links")?.prepend(languageToggle);

    const replaceTextNodes = (dictionary) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
            const text = node.nodeValue;
            const trimmed = text.trim();
            if (!trimmed || !dictionary.has(trimmed)) return;
            const replacement = dictionary.get(trimmed);
            node.nodeValue = text.replace(trimmed, replacement);
        });
    };

    const updateLanguage = (lang, persist = true) => {
        const currentLang = document.documentElement.lang || "en";
        if (lang === currentLang) return;
        replaceTextNodes(lang === "de" ? englishToGerman : germanToEnglish);
        document.documentElement.lang = lang;
        document.title = lang === "de"
            ? "Abdullah Al-Labani — Portfolio"
            : "Abdullah Al-Labani — Selected Projects & Portfolio";
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.content = lang === "de"
                ? "Portfolio von Abdullah Al-Labani, KI- und Robotikstudent mit Schwerpunkt auf ML Engineering, generativer KI und angewandter Forschung."
                : "Portfolio of Abdullah Al-Labani, AI & Robotics Student specializing in ML Engineering, Generative AI, and applied research.";
        }
        languageToggle.querySelectorAll("button").forEach(button => {
            const active = button.dataset.lang === lang;
            button.classList.toggle("active", active);
            button.setAttribute("aria-current", active ? "true" : "false");
        });
        if (persist) localStorage.setItem("portfolio-language", lang);
    };

    const style = document.createElement("style");
    style.textContent = `
        .language-toggle { display:flex; align-items:center; gap:.35rem; margin-left:.25rem; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:.78rem; letter-spacing:.04em; }
        .language-toggle button { border:0; background:none; padding:.3rem .15rem; color:var(--muted-text-color, #66717C); font:inherit; cursor:pointer; transition:color .2s ease; }
        .language-toggle button:hover, .language-toggle button:focus-visible { color:var(--accent-color, #2E4A3E); outline:none; }
        .language-toggle button.active { color:var(--text-color, #161616); font-weight:700; }
        .language-toggle span { color:var(--border-color, #C9C8C2); }
        @media (max-width: 760px) { .language-toggle { order:3; margin-left:0; } }
    `;
    document.head.appendChild(style);

    languageToggle.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => updateLanguage(button.dataset.lang));
    });
    updateLanguage(localStorage.getItem("portfolio-language") || "en", false);

    // The current portfolio uses direct project links rather than case-study dialogs.
    // Keep this guard so the older modal logic can be restored later without breaking the page.
    const modal = document.getElementById("project-modal");
    if (!modal) return;
});
