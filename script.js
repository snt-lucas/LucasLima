/**
 * ==========================================================================
 * PORTFÓLIO PROFISSIONAL — LUCAS DOS SANTOS LIMA (LUCAS LIMA)
 * Neo-Minimalismo, Bento Box, Acessibilidade (WCAG 2.1) & DevTools Hygiene
 * Integração GitHub API:
 * - Catálogo de projetos resiliente com ordenação por pushed_at
 * - Espelho Exato do README.md em tempo real (Accept: application/vnd.github.v3.html)
 * - Cache em sessionStorage & Prevenção Estrita contra XSS
 * ==========================================================================
 */

(() => {
  "use strict";

  // Sanitização do console para evitar inspeções e vazamentos em ambiente de produção
  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:";
    if (!isLocal) {
      const noop = () => {};
      window.console.log = noop;
      window.console.debug = noop;
      window.console.info = noop;
    }
  }

  // Constantes Globais Imutáveis
  const CONFIG = Object.freeze({
    GITHUB_USER: "snt-lucas",
    REPOS_API_ENDPOINT:
      "https://api.github.com/users/snt-lucas/repos?sort=pushed&direction=desc",
    SESSION_STORAGE_REPOS_KEY: "lucas_portfolio_repos_session",
    EMAIL: "works.lucassl@gmail.com",
    WHATSAPP_NUMBER: "5531996166591",
    CV_PATH: "./curriculo.pdf",
    CV_DOWNLOAD_NAME: "LucasLima_Resume_PT.pdf",
  });

  // Ícones SVG Estáticos Seguros (Constantes imutáveis sem interpolação)
  const SVG_ICONS = Object.freeze({
    star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    github:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>',
    external:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    calendar:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    clock:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    alert:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
  });

  // Utilitário de Sanitização Estrita de URL (Zero XSS)
  function sanitizeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") return "#";
    try {
      const parsed = new URL(rawUrl, window.location.origin);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
    } catch (_) {
      return "#";
    }
    return "#";
  }

  // Utilitário Seguro de Criação de Elementos DOM
  function createSafeElement(tag, className = "", textContent = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (
      textContent !== undefined &&
      textContent !== null &&
      textContent !== ""
    ) {
      el.textContent = textContent;
    }
    return el;
  }

  // Formatador de Datas em Português Brasileiro (pt-BR)
  function formatIsoDateOnly(isoString) {
    if (!isoString) return "Data recente";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (_) {
      return isoString;
    }
  }

  function formatIsoDateTime(isoString) {
    if (!isoString) return "Data não disponível";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (_) {
      return isoString;
    }
  }

  /* --------------------------------------------------------------------------
     1. GERENCIADOR DE CACHE EM SESSIONSTORAGE (CONFORME ESPECIFICAÇÃO)
     -------------------------------------------------------------------------- */
  class SessionStorageManager {
    static get(key) {
      try {
        const itemStr = sessionStorage.getItem(key);
        if (!itemStr) return null;
        return JSON.parse(itemStr);
      } catch (_) {
        return null;
      }
    }

    static set(key, data) {
      try {
        sessionStorage.setItem(key, JSON.stringify(data));
      } catch (_) {
        // Fallback silencioso caso sessionStorage esteja desabilitado
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. GERENCIADOR DE TEMA (DARK / LIGHT MODE NATIVO)
     -------------------------------------------------------------------------- */
  class ThemeManager {
    constructor() {
      this.html = document.documentElement;
      this.themeToggleBtn = document.getElementById("theme-toggle");
      this.profileImg = document.getElementById("profile-img");
      this.storageKey = "lucas_portfolio_theme";

      this.init();
    }

    init() {
      let initialTheme = "dark";
      try {
        const savedTheme = localStorage.getItem(this.storageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
          initialTheme = savedTheme;
        } else if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
          initialTheme = "light";
        }
      } catch (_) {
        initialTheme = "dark";
      }

      this.applyTheme(initialTheme);

      if (this.themeToggleBtn) {
        this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
      }

      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            try {
              if (!localStorage.getItem(this.storageKey)) {
                this.applyTheme(e.matches ? "dark" : "light");
              }
            } catch (_) {}
          });
      }
    }

    toggleTheme() {
      const currentTheme = this.html.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.applyTheme(newTheme);
    }

    applyTheme(theme) {
      this.html.setAttribute("data-theme", theme);
      try {
        localStorage.setItem(this.storageKey, theme);
      } catch (_) {}

      if (this.profileImg) {
        if (theme === "light") {
          this.profileImg.src = "./assets/avatar-light.png";
          this.profileImg.alt =
            "Lucas Lima sorrindo ao ar livre com óculos escuros";
        } else {
          this.profileImg.src = "./assets/avatar.png";
          this.profileImg.alt = "Foto de Lucas Lima sorrindo com óculos";
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. GERENCIADOR DO MODAL DE ESPELHO DO README (GITHUB LIVE MIRROR)
     -------------------------------------------------------------------------- */
  class ReadmeModalManager {
    constructor() {
      this.modal = document.getElementById("readme-modal");
      this.modalTitle = document.getElementById("readme-modal-title");
      this.modalSubtitle = document.getElementById("readme-modal-subtitle");
      this.modalGhLink = document.getElementById("readme-modal-gh-link");
      this.closeBtn = document.getElementById("readme-modal-close");
      this.modalBody = document.getElementById("readme-modal-body");
      this.previousActiveElement = null;

      this.init();
    }

    init() {
      if (!this.modal || !this.closeBtn) return;

      // 1. Fechar no botão X
      this.closeBtn.addEventListener("click", () => this.close());

      // 2. Fechar ao clicar fora (backdrop)
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });

      // 3. Fechar com a tecla 'Esc'
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen()) {
          this.close();
        }
      });
    }

    isOpen() {
      return this.modal && this.modal.classList.contains("open");
    }

    async open(repoName, repoUrl) {
      if (!this.modal || !this.modalBody) return;

      this.previousActiveElement = document.activeElement;
      document.body.style.overflow = "hidden";

      // Atualiza cabeçalho do modal
      if (this.modalTitle)
        this.modalTitle.textContent = `${CONFIG.GITHUB_USER} / ${repoName}`;
      if (this.modalSubtitle)
        this.modalSubtitle.textContent = "README.md • GitHub Live Mirror";
      if (this.modalGhLink) {
        this.modalGhLink.href = sanitizeUrl(
          repoUrl || `https://github.com/${CONFIG.GITHUB_USER}/${repoName}`,
        );
      }

      // Exibe modal com transição suave
      this.modal.classList.add("open");
      this.modal.setAttribute("aria-hidden", "false");

      // Estado de Carregamento (Spinner + Feedback visual)
      this.renderLoading(repoName);

      if (this.closeBtn) {
        this.closeBtn.focus();
      }

      const sessionKey = `lucas_readme_${repoName}`;

      // 1. Verifica cache no sessionStorage (evita rate limit e garante resposta instantânea)
      const cachedHtml = SessionStorageManager.get(sessionKey);
      if (cachedHtml && typeof cachedHtml === "string" && cachedHtml.trim()) {
        this.renderReadmeContent(cachedHtml, repoName);
        return;
      }

      // 2. Requisição à API do GitHub com cabeçalho de renderização HTML nativa
      try {
        const endpoint = `https://api.github.com/repos/${CONFIG.GITHUB_USER}/${encodeURIComponent(repoName)}/readme`;
        const response = await fetch(endpoint, {
          headers: {
            Accept: "application/vnd.github.v3.html",
          },
        });

        if (response.status === 404) {
          this.renderNotFound(repoName);
          return;
        }

        if (response.status === 403) {
          this.renderRateLimit(repoName);
          return;
        }

        if (!response.ok) {
          this.renderNotFound(repoName);
          return;
        }

        const readmeHtml = await response.text();

        // Checa se o README foi retornado pela API e se possui conteúdo válido
        if (!readmeHtml || !readmeHtml.trim()) {
          this.renderNotFound(repoName);
          return;
        }

        // Armazena no sessionStorage
        SessionStorageManager.set(sessionKey, readmeHtml);

        // Renderiza conteúdo
        this.renderReadmeContent(readmeHtml, repoName);
      } catch (err) {
        this.renderNotFound(repoName);
      }
    }

    renderLoading(repoName) {
      this.modalBody.innerHTML = "";

      const box = createSafeElement("div", "readme-loading-box");
      const spinner = createSafeElement("div", "readme-spinner");
      const title = createSafeElement(
        "div",
        "readme-loading-title",
        "Carregando documentação oficial...",
      );
      const subtitle = createSafeElement(
        "div",
        "readme-loading-subtitle",
        `Buscando README.md de ${CONFIG.GITHUB_USER}/${repoName} diretamente do GitHub`,
      );

      box.appendChild(spinner);
      box.appendChild(title);
      box.appendChild(subtitle);

      this.modalBody.appendChild(box);
    }

    renderReadmeContent(htmlString, repoName) {
      this.modalBody.innerHTML = "";

      const container = createSafeElement("div", "markdown-body");
      container.innerHTML = htmlString;

      // Garante segurança em todos os links externos do Markdown
      const links = container.querySelectorAll("a");
      links.forEach((link) => {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

      this.modalBody.appendChild(container);
    }

    renderNotFound(repoName) {
      this.modalBody.innerHTML = "";

      const box = createSafeElement("div", "readme-not-found-box");

      const img = document.createElement("img");
      img.src = "./assets/erro-404.png";
      img.alt = "Ícone de erro 404 - README não encontrado";
      img.className = "readme-not-found-img";
      img.width = 140;
      img.height = 140;

      const title = createSafeElement(
        "h3",
        "readme-not-found-title",
        "README.md não encontrado",
      );

      const desc = createSafeElement("p", "readme-not-found-desc");
      desc.textContent = `Ops! O repositório "${CONFIG.GITHUB_USER}/${repoName}" ainda não possui um arquivo README.md público.`;

      const attribution = createSafeElement(
        "p",
        "readme-not-found-attribution",
      );
      attribution.innerHTML =
        '<a href="https://www.flaticon.com/br/icones-gratis/erro-404" title="erro 404 ícone" target="_blank" rel="noopener noreferrer">Erro 404 ícone criado por alfanz - Flaticon</a>';

      box.appendChild(img);
      box.appendChild(title);
      box.appendChild(desc);
      box.appendChild(attribution);

      this.modalBody.appendChild(box);
    }

    renderRateLimit(repoName) {
      this.modalBody.innerHTML = "";

      const alertBox = createSafeElement("div", "inspector-alert warning");
      alertBox.style.margin = "20px 0";

      const title = createSafeElement("div", "alert-title");
      title.innerHTML = SVG_ICONS.alert;
      const titleText = createSafeElement(
        "span",
        "",
        "Limite da API do GitHub Atingido",
      );
      title.appendChild(titleText);

      const desc = createSafeElement("p", "alert-desc");
      desc.textContent =
        "O limite temporário de requisições da API pública do GitHub foi alcançado (60 req/h para consultas sem token). Por favor, tente novamente em alguns instantes.";

      alertBox.appendChild(title);
      alertBox.appendChild(desc);

      this.modalBody.appendChild(alertBox);
    }

    renderError(repoName) {
      this.modalBody.innerHTML = "";

      const alertBox = createSafeElement("div", "inspector-alert");
      alertBox.style.margin = "20px 0";

      const title = createSafeElement("div", "alert-title");
      title.innerHTML = SVG_ICONS.alert;
      const titleText = createSafeElement(
        "span",
        "",
        "Erro ao carregar documentação",
      );
      title.appendChild(titleText);

      const desc = createSafeElement("p", "alert-desc");
      desc.textContent = `Houve uma falha ao tentar se conectar com a API do GitHub para obter o README de "${repoName}". Verifique sua conexão e tente novamente.`;

      alertBox.appendChild(title);
      alertBox.appendChild(desc);

      this.modalBody.appendChild(alertBox);
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.remove("open");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (
        this.previousActiveElement &&
        typeof this.previousActiveElement.focus === "function"
      ) {
        this.previousActiveElement.focus();
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. REPOSITÓRIOS & INTEGRAÇÃO COM A API DO GITHUB (SORT PUSHED & CACHE)
     -------------------------------------------------------------------------- */
  class GitHubProjectsManager {
    constructor(readmeModalManager) {
      this.container = document.getElementById("projects-container");
      this.statusBadge = document.getElementById("github-sync-badge");
      this.statusText = document.getElementById("github-status-text");
      this.readmeModalManager = readmeModalManager;

      // Repositórios de Destaque com curadoria técnica personalizada (Fallback com datas válidas)
      this.featuredProjects = [
        {
          name: "Phishio",
          description:
            "Sistema de detecção de phishing e motor de busca para HTML (TF-IDF, Similaridade de Cosseno e Índice Invertido). Arquitetura multi-worker (30 nodes) que processou 450 mil URLs e 297 mil páginas em 8 dias, com extensão colaborativa em FastAPI, persistência em Firebase e cache local SQLite com LRU.",
          language: "Python (FastAPI) / ML",
          topics: [
            "fastapi",
            "information-retrieval",
            "tf-idf",
            "cybersecurity",
            "firebase",
            "sqlite-lru",
            "multithreading",
          ],
          html_url: "https://github.com/snt-lucas",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2026-07-20T14:30:00Z",
          isCustomFeatured: true,
          type: "TCC • Recuperação de Informação",
        },
        {
          name: "FoodFlow-ERP",
          description:
            "Sistema de gestão integrada (ERP) desenvolvido em TypeScript, focado na otimização de fluxos operacionais, controle de demandas e automação de processos.",
          language: "TypeScript",
          topics: ["erp", "typescript", "management", "business-flow"],
          html_url: "https://github.com/snt-lucas/FoodFlow-ERP",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2025-12-02T22:02:06Z",
          isCustomFeatured: true,
          type: "Sistema ERP",
        },
        {
          name: "RIWRS_Colector",
          description:
            "Coletor de dados e automação de rotinas em Python, projetado para extração confiável, manipulação de fluxos e integração com serviços analíticos.",
          language: "Python",
          topics: ["python", "collector", "automation", "data-pipeline"],
          html_url: "https://github.com/snt-lucas/RIWRS_Colector",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2026-03-03T00:15:07Z",
          isCustomFeatured: true,
          type: "Automação & Dados",
        },
      ];

      this.init();
    }

    async init() {
      // 1. Verifica cache no sessionStorage (evita chamadas repetitivas na sessão)
      const cachedRepos = SessionStorageManager.get(
        CONFIG.SESSION_STORAGE_REPOS_KEY,
      );
      if (Array.isArray(cachedRepos) && cachedRepos.length > 0) {
        this.renderProjects(cachedRepos);
        this.updateStatus("GitHub API (Cache de Sessão)", "synced");
        return;
      }

      // 2. Requisição assíncrona ao endpoint oficial com sort=pushed
      try {
        this.updateStatus("Carregando projetos...", "syncing");

        const response = await fetch(CONFIG.REPOS_API_ENDPOINT, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });

        if (response.status === 403) {
          throw new Error("RATE_LIMIT");
        }

        if (!response.ok) {
          throw new Error(`HTTP_${response.status}`);
        }

        const repositorios = await response.json();

        if (Array.isArray(repositorios)) {
          // Ordena rigorosamente do mais recentemente atualizado para o mais antigo utilizando pushed_at
          repositorios.sort(
            (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
          );

          // Armazena no sessionStorage
          SessionStorageManager.set(
            CONFIG.SESSION_STORAGE_REPOS_KEY,
            repositorios,
          );

          this.renderProjects(repositorios);
          this.updateStatus("GitHub API Sincronizada", "synced");
        } else {
          throw new Error("INVALID_FORMAT");
        }
      } catch (err) {
        this.renderErrorState(err.message === "RATE_LIMIT");
        this.renderProjects([]);
        this.updateStatus("Modo Destaques Ativo (Offline)", "offline");
      }
    }

    renderErrorState(isRateLimit = false) {
      if (!this.container) return;
      const alert = createSafeElement("div", "inspector-alert warning");
      alert.style.marginBottom = "20px";

      const title = createSafeElement("div", "alert-title");
      title.innerHTML = SVG_ICONS.alert;
      const titleSpan = createSafeElement(
        "span",
        "",
        isRateLimit
          ? "Limite de Requisições Atingido"
          : "Conexão Offline com GitHub API",
      );
      title.appendChild(titleSpan);

      const msg = isRateLimit
        ? "O limite temporário de requisições por hora da API pública do GitHub foi alcançado (60 req/h). Exibindo catálogo de projetos em destaque com dados salvos."
        : "Não foi possível sincronizar os repositórios em tempo real com a API do GitHub. Exibindo catálogo curado de projetos de destaque.";
      const desc = createSafeElement("p", "alert-desc", msg);

      alert.appendChild(title);
      alert.appendChild(desc);

      this.container.prepend(alert);
    }

    updateStatus(text, state) {
      if (this.statusText) this.statusText.textContent = text;
      if (this.statusBadge) {
        const dot = this.statusBadge.querySelector(".sync-dot");
        if (dot) {
          dot.className = "sync-dot";
          if (state === "synced") dot.classList.add("synced");
          if (state === "offline") dot.classList.add("offline");
        }
      }
    }

    // Renderização Segura com Zero Risco de XSS (textContent e nós DOM)
    renderProjects(apiRepos) {
      if (!this.container) return;

      const existingAlert = this.container.querySelector(".inspector-alert");
      this.container.innerHTML = "";
      if (existingAlert) {
        this.container.appendChild(existingAlert);
      }

      const finalProjects = [...this.featuredProjects];

      if (Array.isArray(apiRepos) && apiRepos.length > 0) {
        apiRepos.forEach((repo) => {
          if (!repo || typeof repo !== "object") return;
          const repoName = String(repo.name || "");
          const existingIdx = finalProjects.findIndex(
            (p) => p.name.toLowerCase() === repoName.toLowerCase(),
          );

          if (existingIdx !== -1) {
            // Sincroniza métricas dinâmicas em tempo real da API com o projeto curado
            const target = finalProjects[existingIdx];
            target.stargazers_count =
              typeof repo.stargazers_count === "number"
                ? repo.stargazers_count
                : 0;
            if (repo.pushed_at) target.pushed_at = repo.pushed_at;
            if (repo.html_url) target.html_url = sanitizeUrl(repo.html_url);
            if (repo.homepage) target.homepage = sanitizeUrl(repo.homepage);
            if (Array.isArray(repo.topics) && repo.topics.length > 0) {
              target.topics = repo.topics.map(String);
            }
          } else if (!repo.fork) {
            finalProjects.push({
              name: repoName,
              description: repo.description
                ? String(repo.description)
                : "Repositório focado no desenvolvimento de software e boas práticas.",
              language: repo.language ? String(repo.language) : "Software",
              topics:
                Array.isArray(repo.topics) && repo.topics.length
                  ? repo.topics.map(String)
                  : ["desenvolvimento", "algoritmos"],
              html_url: sanitizeUrl(repo.html_url),
              homepage: repo.homepage ? sanitizeUrl(repo.homepage) : null,
              stargazers_count:
                typeof repo.stargazers_count === "number"
                  ? repo.stargazers_count
                  : 0,
              pushed_at: repo.pushed_at || null,
              isCustomFeatured: false,
              type: "Repositório Público",
            });
          }
        });
      }

      // Ordena a lista final completa por data de atualização (pushed_at)
      finalProjects.sort(
        (a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0),
      );

      finalProjects.forEach((proj) => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.setAttribute("data-repo-name", proj.name);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-haspopup", "dialog");
        card.setAttribute(
          "aria-label",
          `Abrir documentação README do projeto ${proj.name}`,
        );

        // Abertura do Modal de README ao clicar no card
        card.addEventListener("click", (e) => {
          if (e.target.closest("a") || e.target.closest("button")) return;
          if (this.readmeModalManager) {
            this.readmeModalManager.open(proj.name, proj.html_url);
          }
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (e.target.closest("a") || e.target.closest("button")) return;
            e.preventDefault();
            if (this.readmeModalManager) {
              this.readmeModalManager.open(proj.name, proj.html_url);
            }
          }
        });

        // Bloco Superior (Cabeçalho do Card, Título e Descrição)
        const topBlock = document.createElement("div");

        const headerDiv = createSafeElement("div", "project-header");
        const typeTag = createSafeElement(
          "span",
          "project-type-tag",
          proj.type || "Projeto",
        );
        headerDiv.appendChild(typeTag);

        const starsDiv = createSafeElement("div", "project-stars");
        const starCount =
          typeof proj.stargazers_count === "number" ? proj.stargazers_count : 0;
        starsDiv.title = `${starCount} estrelas no GitHub`;
        starsDiv.innerHTML = SVG_ICONS.star;
        const starCountSpan = createSafeElement("span", "", String(starCount));
        starsDiv.appendChild(starCountSpan);
        headerDiv.appendChild(starsDiv);

        topBlock.appendChild(headerDiv);

        const title = createSafeElement("h3", "project-title", proj.name);
        const desc = createSafeElement("p", "project-desc", proj.description);
        topBlock.appendChild(title);
        topBlock.appendChild(desc);

        // Data Semântica (<time>) do Projeto
        if (proj.pushed_at) {
          const dateWrapper = createSafeElement(
            "div",
            "project-updated-wrapper",
          );
          dateWrapper.innerHTML = SVG_ICONS.calendar;

          const datePrefix = createSafeElement("span", "", "Atualizado em: ");
          dateWrapper.appendChild(datePrefix);

          const timeEl = document.createElement("time");
          timeEl.className = "project-date";
          timeEl.setAttribute("datetime", proj.pushed_at);
          timeEl.textContent = formatIsoDateOnly(proj.pushed_at);
          dateWrapper.appendChild(timeEl);

          topBlock.appendChild(dateWrapper);
        }

        card.appendChild(topBlock);

        // Bloco Inferior (Linguagens/Chips e Links de Ação)
        const footer = createSafeElement("div", "project-footer");

        const langContainer = createSafeElement("div", "project-languages");
        const primaryLang = createSafeElement(
          "span",
          "lang-chip",
          proj.language || "Software",
        );
        primaryLang.style.color = "var(--accent-primary)";
        primaryLang.style.fontWeight = "600";
        langContainer.appendChild(primaryLang);

        if (Array.isArray(proj.topics)) {
          proj.topics.slice(0, 3).forEach((topic) => {
            const chip = createSafeElement("span", "lang-chip", `#${topic}`);
            langContainer.appendChild(chip);
          });
        }
        footer.appendChild(langContainer);

        const linksContainer = createSafeElement("div", "project-links");

        // Botão para abrir o README em Modal
        const readmeBtn = createSafeElement("button", "project-link-btn");
        readmeBtn.type = "button";
        readmeBtn.innerHTML = SVG_ICONS.book;
        const readmeBtnText = createSafeElement("span", "", "Ver README");
        readmeBtn.appendChild(readmeBtnText);
        readmeBtn.setAttribute(
          "aria-label",
          `Abrir documentação README do projeto ${proj.name}`,
        );
        readmeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (this.readmeModalManager) {
            this.readmeModalManager.open(proj.name, proj.html_url);
          }
        });
        linksContainer.appendChild(readmeBtn);

        // Link seguro para o repositório no GitHub
        const ghLink = createSafeElement("a", "project-link-btn");
        ghLink.href = sanitizeUrl(proj.html_url);
        ghLink.target = "_blank";
        ghLink.rel = "noopener noreferrer";
        ghLink.title = "Ver repositório no GitHub";
        ghLink.setAttribute(
          "aria-label",
          `Ver código fonte do projeto ${proj.name} no GitHub (abre em nova aba)`,
        );
        ghLink.innerHTML = SVG_ICONS.github;
        const ghSpan = createSafeElement("span", "", "GitHub");
        ghLink.appendChild(ghSpan);
        linksContainer.appendChild(ghLink);

        // Link seguro opcional de demonstração
        if (proj.homepage && sanitizeUrl(proj.homepage) !== "#") {
          const liveLink = createSafeElement("a", "project-link-btn");
          liveLink.href = sanitizeUrl(proj.homepage);
          liveLink.target = "_blank";
          liveLink.rel = "noopener noreferrer";
          liveLink.title = "Visualizar projeto online";
          liveLink.setAttribute(
            "aria-label",
            `Acessar demonstração online de ${proj.name} (abre em nova aba)`,
          );
          liveLink.innerHTML = SVG_ICONS.external;
          const liveSpan = createSafeElement("span", "", "Live Demo");
          liveLink.appendChild(liveSpan);
          linksContainer.appendChild(liveLink);
        }

        footer.appendChild(linksContainer);
        card.appendChild(footer);

        this.container.appendChild(card);
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. FILTRAGEM DINÂMICA DA TIMELINE DE EXPERIÊNCIAS
     -------------------------------------------------------------------------- */
  class TimelineFilterManager {
    constructor() {
      this.filterButtons = document.querySelectorAll(
        ".timeline-filters .filter-chip",
      );
      this.timelineCards = document.querySelectorAll(".timeline-card");

      this.init();
    }

    init() {
      this.filterButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const filter = e.currentTarget.getAttribute("data-filter");
          this.applyFilter(filter, e.currentTarget);
        });
      });
    }

    applyFilter(filter, activeBtn) {
      this.filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-selected", "true");

      this.timelineCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.classList.add("hidden");
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. SISTEMA DE TOAST & AÇÕES DE CONTATO
     -------------------------------------------------------------------------- */
  function showToast(message, duration = 3500) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }

  async function copyEmailToClipboard() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONFIG.EMAIL);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = CONFIG.EMAIL;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      const copyTextSpan = document.getElementById("copy-email-text");
      if (copyTextSpan) {
        const originalText = copyTextSpan.textContent;
        copyTextSpan.textContent = "Copiado!";
        setTimeout(() => {
          copyTextSpan.textContent = originalText;
        }, 2000);
      }

      showToast(`E-mail (${CONFIG.EMAIL}) copiado com sucesso!`);
    } catch (_) {
      showToast("E-mail: " + CONFIG.EMAIL);
    }
  }

  function downloadCV() {
    const link = document.createElement("a");
    link.href = CONFIG.CV_PATH;
    link.download = CONFIG.CV_DOWNLOAD_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Download do currículo iniciado em PDF.");
  }

  /* --------------------------------------------------------------------------
     7. MENU MOBILE & NAVEGAÇÃO INTERATIVA
     -------------------------------------------------------------------------- */
  function setupNavigation() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-link");

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      links.forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    const sections = document.querySelectorAll("section[id]");
    window.addEventListener(
      "scroll",
      () => {
        let current = "";
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 150;
          const sectionId = section.getAttribute("id");

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
          }
        });

        links.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      },
      { passive: true },
    );
  }

  /* --------------------------------------------------------------------------
     8. VINCULAÇÃO DE EVENTOS & INICIALIZAÇÃO GERAL
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Instancia os gerenciadores encapsulados
    const readmeModalManager = new ReadmeModalManager();
    new ThemeManager();
    new GitHubProjectsManager(readmeModalManager);
    new TimelineFilterManager();

    // Vincula eventos unobtrusive para botões de ação
    const btnHeroCv = document.getElementById("btn-hero-cv");
    if (btnHeroCv) {
      btnHeroCv.addEventListener("click", downloadCV);
    }

    const btnFooterCv = document.getElementById("btn-footer-cv");
    if (btnFooterCv) {
      btnFooterCv.addEventListener("click", downloadCV);
    }

    const btnCopyEmail = document.getElementById("btn-copy-email");
    if (btnCopyEmail) {
      btnCopyEmail.addEventListener("click", copyEmailToClipboard);
    }

    // Configura navegação e menu mobile
    setupNavigation();
  });
})();
