/* Lucas Lima - Portfolio | Script Anonimizado */
(() => {
  "use strict";
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
  function formatIsoDateOnly(isoString, lang = "pt-BR") {
    if (!isoString) return lang === "en-US" ? "Recent date" : "Data recente";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString(lang, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (_) {
      return isoString;
    }
  }
  function formatIsoDateTime(isoString, lang = "pt-BR") {
    if (!isoString)
      return lang === "en-US" ? "Date unavailable" : "Data não disponível";
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString(lang, {
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
      } catch (_) {}
    }
  }
  const TRANSLATIONS = Object.freeze({
    "pt-BR": {
      meta: {
        title:
          "Lucas Lima | Desenvolvedor de Software Back-end • Python & Java",
        description:
          "Portfólio profissional de Lucas dos Santos Lima (Lucas Lima) — Desenvolvedor de Software Back-end (Python, FastAPI, Java, Kotlin), ex-estagiário no Google e Bacharel em Sistemas de Informação pela PUC Minas. Foco em APIs RESTful, TDD, Cloud e engenharia AI-First.",
      },
      skip: {
        content: "Pular para o conteúdo principal",
      },
      nav: {
        brandAria: "Página inicial de Lucas Lima",
        about: "Sobre",
        experience: "Experiência",
        skills: "Habilidades",
        projects: "Projetos",
        contact: "Contato",
        statusTitle: "Disponível para novos desafios e colaborações",
        statusText: "Disponível",
        langAria: "Alternar idioma para Inglês (en-US)",
        langTitle: "Mudar para Inglês (en-US)",
        themeAria: "Alternar entre tema claro e escuro",
        themeTitle: "Alternar tema",
        mobileAria: "Abrir ou fechar menu de navegação",
      },
      hero: {
        academicPill:
          "Bacharel em Sistemas de Informação • PUC Minas • Concluído",
        name: "Lucas dos Santos Lima",
        tagline:
          "Desenvolvedor de Software Back-end | Python & Java | APIs REST | Cloud & Automações com IA",
        bio: "Bacharel em Sistemas de Informação pela <strong>PUC Minas</strong> e ex-estagiário de Engenharia de Software no <strong>Google</strong>. Atuo no desenvolvimento de sistemas Back-end, APIs RESTful e automações, com domínio em <strong>Python (FastAPI)</strong>, <strong>Java</strong> e <strong>Kotlin</strong>, aplicando boas práticas de arquitetura, testes automatizados (TDD/JUnit/Mockito) e análise de sistemas. Adoto cultura de engenharia <em>AI-First</em> para acelerar entregas, com sólida bagagem em infraestrutura corporativa, Linux e bancos de dados (SQL/NoSQL) para diagnosticar gargalos e investigar causa raiz com maior precisão.",
        btnContactAria: "Ir para a seção de contato",
        btnContact: "Vamos Conversar",
        btnCvAria: "Baixar currículo de Lucas Lima em formato PDF",
        btnCv: "Baixar Currículo (PDF)",
        btnProjectsAria: "Navegar até a seção de projetos em destaque",
        btnProjects: "Ver Projetos",
      },
      statPUC: {
        kicker: "Formação Acadêmica",
        title: "Bacharel em Sistemas de Informação",
        subtitle:
          "Pontifícia Universidade Católica de Minas Gerais (PUC Minas)",
        date: '<time datetime="2021-08">Ago 2021</time> — <time datetime="2026-07">Jul 2026</time> • Concluído',
        desc: "Formação no desenvolvimento de sistemas estruturados, arquitetura de software, bancos de dados relacionais e modelos de recuperação de informação.",
      },
      statGoogle: {
        kicker: "Engenharia de Software",
        subtitle: "Estagiário em Engenharia de Software • Belo Horizonte",
        desc: "Atuação no ecossistema Android atuando com Java e Kotlin no ambiente Family Link, aplicando realizando refatorações, implementações e realizando testes para garantir a qualidade do código. Code Reviews bidirecionais. Otimização das informações do relatório de bugs nativo do android com foco em agilizar a triagem de bugs.",
      },
      metrics: {
        backendTitle: "Back-end",
        backendSubtitle: "Python, Java & Kotlin",
        googleSubtitle: "Ex-Estagiário em Engenharia de Software",
        aiSubtitle: "Engenharia Assistida por IA",
      },
      experience: {
        kicker: "Trajetória Profissional",
        title: "Experiência & Atuação Técnica",
        subtitle:
          "Evolução constante unindo vivência em produtos SaaS em larga escala, engenharia de software e infraestrutura.",
        filterAll: "Todas as Atuações",
        filterEng: "Engenharia de Software",
        filterSaas: "Suporte SaaS & Dados",
        filterInfra: "Infraestrutura & Cloud",
      },
      expGoogle: {
        role: "Estagiário em Engenharia de Software",
        location: "Belo Horizonte, MG",
        date: '<time datetime="2024-09">Set 2024</time> — <time datetime="2026-03">Mar 2026</time>',
        desc: "Atuação no ecossistema Android utilizando Java e Kotlin atuando na implementação e manutenção de funcionalidades no ambinete Android com times do Family Link, criação e adaptação de testes mockados, parametrizados, stub tests e participação em Code Reviews bidirecionais com outros times de engenharia:",
        ach1: "<strong>Qualidade &amp; TDD:</strong> Garantia da qualidade das entregas aplicando Test-Driven Development (TDD) com testes unitários e parametrizados utilizando Mockito.",
        ach2: "<strong>Backend &amp; Desacoplamento:</strong> Participação em melhorias que centralizaram o cálculo de <em>device capabilities</em> no backend, reduzindo acoplamento e redundância lógica entre servidores e dispositivos móveis.",
        ach3: "<strong>Triagem de Anomalias &amp; Logs:</strong> Implementação de melhorias no BugReport nativo de dispositivos Android, convertendo flags brutas de sensores em logs legíveis e priorizando a triagem de anomalias com agilidade.",
      },
      expSolides: {
        role: "Estagiário / Analista de Suporte Técnico Jr",
        location: "Belo Horizonte, MG",
        date: '<time datetime="2023-04">Abr 2023</time> — <time datetime="2024-09">Set 2024</time>',
        desc: "Atuação no suporte técnico N1 na plataforma SaaS da empresa, prestando atendimento a demandas técnicas de clientes corporativos e atuando na ponte entre Engenharia de Software e Banco de Dados:",
        ach1: "<strong>Diagnóstico &amp; Mitigação:</strong> Diagnóstico e mitigação de falhas funcionais de baixa e média complexidade, controle de permissões de acesso e análise de divergências contratuais no sistema.",
        ach2: "<strong>Validação de Correções (QA):</strong> Reprodução de anomalias sistêmicas, documentação de inconsistências de dados e validação e testes de correções de bugs após correção pelos desenvolvedores.",
        ach3: "<strong>Capacitação &amp; Documentação:</strong> Elaboração de documentações técnicas internas, guias de resolução de incidentes, manuais do usuário e apoio na capacitação técnica de analistas N1 recém-admitidos.",
      },
      expNetscanner: {
        role: "Estagiário de Suporte Técnico",
        location: "Belo Horizonte, MG",
        date: '<time datetime="2022-11">Nov 2022</time> — <time datetime="2023-03">Mar 2023</time>',
        desc: "Suporte de N1 à infraestrutura corporativa (Windows Server/Active Directory) e atendimento remoto, elaborando tutoriais de onboarding para facilitar migrações ao Microsoft 365:",
        ach1: "<strong>Windows Server &amp; AD:</strong> Configuração de impressoras em rede, contas e permissões no AD/Windows Server, mapeamento de rede e e-mails corporativos (SMTP, IMAP, POP, Zimbra e Thunderbird).",
        ach2: "<strong>Microsoft 365 Cloud:</strong> Gestão de licenças, suporte ao e-mail Exchange e treinamentos no Microsoft 365 (Excel, PowerPoint, Word, OneDrive, SharePoint, Teams e To Do).",
        ach3: "<strong>Operações &amp; Suporte Remoto:</strong> Manutenção básica de computadores, inventário de hardware via OCS, suporte remoto via LogMeIn e preparação de dispositivos para colaboradores.",
        ach4: "<strong>Documentação &amp; Tutoriais:</strong> Criação de tutoriais de onboarding para novos usuários, padronizando processos e facilitando a migração para o Microsoft 365.",
      },
      expLogOne: {
        role: "Estagiário de Suporte de Infraestrutura",
        location: "Remoto",
        date: '<time datetime="2021-10">Out 2021</time> — <time datetime="2022-07">Jul 2022</time>',
        desc: "Suporte corporativo remoto, rotinas de manutenção em nuvem AWS e gerenciamento de bancos de dados relacionais:",
        ach1: "<strong>Serviços de E-mail &amp; Nuvem AWS:</strong> Suporte corporativo e configuração de serviços de e-mail sob protocolos SMTP, POP e IMAP, monitoramento de disponibilidade e execução de rotinas de backup e manutenção de instâncias em nuvem (AWS).",
        ach2: "<strong>Servidores Linux:</strong> Atualização de pacotes e softwares em servidores virtualizados Linux, mantendo documentações operacionais atualizadas.",
        ach3: "<strong>Oracle &amp; SQL Server:</strong> Execução de scripts para atualização, importação e exportação de dados em bancos Oracle e SQL Server.",
      },
      skills: {
        kicker: "Capacidades & Conhecimento",
        title: "Habilidades Técnicas & Metodológicas",
        subtitle:
          "Combinação de competências práticas em engenharia de software, manipulação de dados, infraestrutura e oratória.",
      },
      skillGroup1: {
        title: "Linguagens & Frameworks",
        desc: "Construção de APIs resilientes e código estruturado",
      },
      skillGroup2: {
        title: "Bancos de Dados & Nuvem",
        desc: "Modelagem relacional, persistência e computação em nuvem",
      },
      skillGroup3: {
        title: "Engenharia, Testes & Qualidade",
        desc: "Arquitetura de software e garantia de estabilidade",
        codeReview: "Code Review Bidirecional",
        restArch: "Arquitetura de APIs RESTful",
        ir: "Recuperação de Informação (TF-IDF & Busca Vetorial)",
      },
      skillGroup4: {
        title: "DevOps, Infra & Confiabilidade",
        desc: "Observabilidade, servidores e diagnóstico de produção",
        linux: "Linux (Servidores / Virtualização)",
        logs: "Leitura e Enriquecimento de Logs",
        rca: "Análise de Causa Raiz (RCA)",
        troubleshooting: "Troubleshooting Sistêmico",
      },
      skillGroup5: {
        title: "Produtividade com IA, Comunicação & Idiomas",
        desc: "Engenharia AI-First, automação e articulação técnica interdisciplinar",
        aiDev: "Desenvolvimento Assistido por IA",
        testGen: "Geração de Suítes de Teste & Refatoração",
        workflow: "Automação de Workflows",
        english:
          'Inglês Intermediário (<a href="https://certs.duolingo.com/3p4306smp786ay4v" target="_blank" rel="noopener noreferrer">B1</a>)',
        spanish: "Espanhol (Básico)",
        comm: "Comunicação Assertiva",
        biz: "Visão Sistêmica de Negócios",
      },
      projects: {
        kicker: "Portfólio de Código",
        title: "Projetos Pessoais",
        subtitle:
          'Projetos autorais integrados via API do GitHub (<a href="https://github.com/snt-lucas" target="_blank" rel="noopener noreferrer" class="link-subtle" aria-label="Perfil de snt-lucas no GitHub (abre em nova aba)">@snt-lucas</a>).',
        loadingReposAria: "Carregando repositórios do GitHub...",
        loadMoreAria: "Carregar mais repositórios do GitHub",
        loadMore: "Ver Mais",
        endMessage: "Por enquanto é isso 😊",
        exploreGithubAria:
          "Explorar todos os repositórios públicos de Lucas Lima no GitHub (abre em nova aba)",
        exploreGithub: "Explorar Todos os Repositórios no GitHub",
        syncing: "Carregando projetos...",
        synced: "GitHub API Sincronizada",
        cacheSynced: "GitHub API (Cache de Sessão)",
        offline: "Modo Destaques Ativo (Offline)",
        rateLimitAlertTitle: "Limite de Requisições Atingido",
        rateLimitAlertDesc:
          "O limite temporário de requisições por hora da API pública do GitHub foi alcançado (60 req/h). Exibindo catálogo de projetos com dados salvos.",
        offlineAlertTitle: "Conexão Offline com GitHub API",
        offlineAlertDesc:
          "Não foi possível sincronizar os repositórios em tempo real com a API do GitHub. Exibindo catálogo curado de projetos.",
        updatedPrefix: "Atualizado em: ",
        viewReadme: "Ver README",
        starsTitle: "{count} estrelas no GitHub",
        openReadmeAria: "Abrir documentação README do projeto {name}",
        viewGhAria:
          "Ver código fonte do projeto {name} no GitHub (abre em nova aba)",
        liveDemoAria:
          "Acessar demonstração online de {name} (abre em nova aba)",
        defaultDesc:
          "Repositório focado no desenvolvimento de software e boas práticas.",
        publicRepoType: "Repositório Público",
      },
      contact: {
        badge: "Vamos Construir Algo Incrível",
        title: "Gostou do que viu? Entre em contato!",
        desc: "Seja para discutir oportunidades em <strong>Desenvolvimento de Software</strong>, colaboração em projetos ou desafios de engenharia, meu canal direto está aberto.",
        btnWhatsappAria:
          "Iniciar conversa no WhatsApp com Lucas Lima (abre em nova aba)",
        btnWhatsapp: "Chamar no WhatsApp",
        btnLinkedinAria:
          "Acessar perfil de Lucas Lima no LinkedIn (abre em nova aba)",
        btnLinkedin: "Conectar no LinkedIn",
        btnEmailAria: "Copiar endereço de e-mail para a área de transferência",
        btnEmail: "Copiar E-mail",
        emailCopied: "Copiado!",
        locationLabel: "Localização",
        locationValue: "Belo Horizonte, MG • Brasil",
      },
      footer: {
        brandAria: "Ir para o início da página",
        copyright:
          '&copy; <time id="current-year" datetime="2026">2026</time> <strong>Lucas dos Santos Lima</strong>. Todos os direitos reservados.',
        credit:
          'Criado com o auxílio do <span class="footer-highlight">Google Antigravity</span> utilizando <span class="footer-tech-tag">HTML5 Semântico</span>, <span class="footer-tech-tag">CSS3 Moderno (Bento Box)</span>, <span class="footer-tech-tag">JavaScript Vanilla (ES6+)</span> e <span class="footer-tech-tag">GitHub REST API</span>.',
        fabAria: "Abrir conversa no WhatsApp com Lucas Lima (abre em nova aba)",
        fabTooltip: "Fale comigo no WhatsApp",
      },
      modal: {
        subtitle: "GitHub Live Mirror • snt-lucas",
        ghAria: "Abrir repositório no GitHub (abre em nova aba)",
        viewGithub: "Ver no GitHub",
        closeAria: "Fechar janela do README (pressione Esc)",
        closeTitle: "Fechar (Esc)",
        loadingTitle: "Carregando documentação oficial...",
        loadingSubtitle:
          "Buscando README.md de {user}/{repo} diretamente do GitHub",
        notFoundTitle: "README.md não encontrado",
        notFoundDesc:
          'Ops! O repositório "{user}/{repo}" ainda não possui um arquivo README.md público.',
        notFoundAlt: "Ícone de erro 404 - README não encontrado",
        rateLimitTitle: "Limite da API do GitHub Atingido",
        rateLimitDesc:
          "O limite temporário de requisições da API pública do GitHub foi alcançado (60 req/h para consultas sem token). Por favor, tente novamente em alguns instantes.",
        errorTitle: "Erro ao carregar documentação",
        errorDesc:
          'Houve uma falha ao tentar se conectar com a API do GitHub para obter o README de "{repo}". Verifique sua conexão e tente novamente.',
      },
      toast: {
        emailCopied: "E-mail ({email}) copiado com sucesso!",
        cvDownloaded: "Download do currículo iniciado em PDF.",
      },
    },
    "en-US": {
      meta: {
        title: "Lucas Lima | Back-end Software Engineer • Python & Java",
        description:
          "Professional portfolio of Lucas dos Santos Lima (Lucas Lima) — Back-end Software Engineer (Python, FastAPI, Java, Kotlin), former Software Engineering Intern at Google and B.S. in Information Systems from PUC Minas. Focused on RESTful APIs, TDD, Cloud and AI-First engineering.",
      },
      skip: {
        content: "Skip to main content",
      },
      nav: {
        brandAria: "Lucas Lima's Home Page",
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        statusTitle: "Available for new challenges and collaborations",
        statusText: "Available",
        langAria: "Switch language to Portuguese (pt-BR)",
        langTitle: "Switch to Portuguese (pt-BR)",
        themeAria: "Toggle between light and dark theme",
        themeTitle: "Toggle theme",
        mobileAria: "Open or close navigation menu",
      },
      hero: {
        academicPill: "B.S. in Information Systems • PUC Minas • Completed",
        name: "Lucas dos Santos Lima",
        tagline:
          "Back-end Software Engineer | Python & Java | REST APIs | Cloud & AI Automations",
        bio: "B.S. in Information Systems from <strong>PUC Minas</strong> and former Software Engineering Intern at <strong>Google</strong>. I specialize in building robust Back-end systems, RESTful APIs, and automations, with deep proficiency in <strong>Python (FastAPI)</strong>, <strong>Java</strong>, and <strong>Kotlin</strong>, applying architectural best practices, automated testing (TDD/JUnit/Mockito), and systems analysis. I champion an <em>AI-First</em> engineering culture to accelerate velocity, supported by a strong foundation in corporate infrastructure, Linux, and databases (SQL/NoSQL) for rigorous root cause analysis and bottleneck diagnosis.",
        btnContactAria: "Go to contact section",
        btnContact: "Let's Connect",
        btnCvAria: "Download Lucas Lima's resume in PDF format",
        btnCv: "Download Resume (PDF)",
        btnProjectsAria: "Navigate to projects section",
        btnProjects: "View Projects",
      },
      statPUC: {
        kicker: "Academic Background",
        title: "B.S. in Information Systems",
        subtitle: "Pontifical Catholic University of Minas Gerais (PUC Minas)",
        date: '<time datetime="2021-08">Aug 2021</time> — <time datetime="2026-07">Jul 2026</time> • Completed',
        desc: "Comprehensive background in structured systems development, software architecture, relational databases, and information retrieval models.",
      },
      statGoogle: {
        kicker: "Software Engineering",
        subtitle: "Software Engineering Intern • Belo Horizonte",
        desc: "Worked within the Android ecosystem using Java and Kotlin on Family Link, driving refactoring, feature implementations, and testing to ensure high code quality. Bidirectional Code Reviews. Enhanced native Android BugReport data to streamline anomaly triage.",
      },
      metrics: {
        backendTitle: "Back-end",
        backendSubtitle: "Python, Java & Kotlin",
        googleSubtitle: "Former Software Engineering Intern",
        aiSubtitle: "AI-Assisted Engineering",
      },
      experience: {
        kicker: "Career Trajectory",
        title: "Experience & Technical Roles",
        subtitle:
          "Continuous growth bridging large-scale SaaS product experience, software engineering, and corporate infrastructure.",
        filterAll: "All Roles",
        filterEng: "Software Engineering",
        filterSaas: "SaaS Support & Data",
        filterInfra: "Infrastructure & Cloud",
      },
      expGoogle: {
        role: "Software Engineering Intern",
        location: "Belo Horizonte, Brazil",
        date: '<time datetime="2024-09">Sep 2024</time> — <time datetime="2026-03">Mar 2026</time>',
        desc: "Worked within the Android ecosystem using Java and Kotlin on feature implementation and maintenance for Family Link, crafting mocked, parameterized, and stub test suites, and engaging in bidirectional Code Reviews with global engineering teams:",
        ach1: "<strong>Quality &amp; TDD:</strong> Ensured robust deliverables by practicing Test-Driven Development (TDD) with unit and parameterized tests via Mockito.",
        ach2: "<strong>Backend &amp; Decoupling:</strong> Contributed to centralized backend computation of <em>device capabilities</em>, eliminating logical coupling and redundant evaluations across client and server.",
        ach3: "<strong>Anomaly Triage &amp; Logs:</strong> Enhanced native Android BugReport telemetry by transforming raw sensor flags into structured, readable logs, significantly expediting issue diagnosis.",
      },
      expSolides: {
        role: "Technical Support Intern / Junior Analyst",
        location: "Belo Horizonte, Brazil",
        date: '<time datetime="2023-04">Apr 2023</time> — <time datetime="2024-09">Sep 2024</time>',
        desc: "Provided tier-1 technical support on the company's enterprise SaaS platform, solving corporate client escalations and serving as the technical liaison between Software Engineering and Database teams:",
        ach1: "<strong>Diagnosis &amp; Mitigation:</strong> Investigated and resolved functional platform issues, managed granular RBAC access controls, and audited contract-level system discrepancies.",
        ach2: "<strong>QA &amp; Fix Verification:</strong> Reproduced complex defects, documented edge-case data inconsistencies, and validated developer bug fixes before production deployment.",
        ach3: "<strong>Knowledge Base &amp; Training:</strong> Authored internal engineering runbooks, incident response playbooks, and end-user documentation while onboarding new support engineers.",
      },
      expNetscanner: {
        role: "Technical Support Intern",
        location: "Belo Horizonte, Brazil",
        date: '<time datetime="2022-11">Nov 2022</time> — <time datetime="2023-03">Mar 2023</time>',
        desc: "Tier-1 corporate IT infrastructure support (Windows Server/Active Directory) and remote operations, developing onboarding documentation for seamless Microsoft 365 migrations:",
        ach1: "<strong>Windows Server &amp; AD:</strong> Configured network printers, user accounts and security groups in Active Directory, network shares, and enterprise mail clients (SMTP, IMAP, Zimbra, Thunderbird).",
        ach2: "<strong>Microsoft 365 Cloud:</strong> Administered licenses, provisioned Exchange mailboxes, and conducted user training across the Microsoft 365 ecosystem (OneDrive, SharePoint, Teams).",
        ach3: "<strong>Remote Operations:</strong> Handled hardware provisioning and diagnostics, automated hardware inventory via OCS, and provided remote assistance via LogMeIn.",
        ach4: "<strong>Standardization:</strong> Built end-to-end user onboarding guides, establishing standardized operational workflows during cloud email migrations.",
      },
      expLogOne: {
        role: "Infrastructure Support Intern",
        location: "Remote",
        date: '<time datetime="2021-10">Oct 2021</time> — <time datetime="2022-07">Jul 2022</time>',
        desc: "Remote infrastructure operations, AWS cloud routine maintenance, and relational database administration:",
        ach1: "<strong>Cloud &amp; Mail Services:</strong> Maintained corporate mail infrastructure (SMTP/POP/IMAP), monitored service uptime, and executed routine backups and instance maintenance on AWS.",
        ach2: "<strong>Linux Administration:</strong> Managed package updates and configuration on virtualized Linux instances, keeping operational runbooks up-to-date.",
        ach3: "<strong>Oracle &amp; SQL Server:</strong> Executed SQL migration, import, and export scripts across Oracle and Microsoft SQL Server databases.",
      },
      skills: {
        kicker: "Capabilities & Knowledge",
        title: "Technical & Methodological Skills",
        subtitle:
          "Practical expertise spanning software engineering, data management, cloud infrastructure, and clear communication.",
      },
      skillGroup1: {
        title: "Languages & Frameworks",
        desc: "Building resilient APIs and well-structured code",
      },
      skillGroup2: {
        title: "Databases & Cloud",
        desc: "Relational modeling, persistence, and cloud computing",
      },
      skillGroup3: {
        title: "Engineering, Testing & Quality",
        desc: "Software architecture and reliability assurance",
        codeReview: "Bidirectional Code Review",
        restArch: "RESTful API Architecture",
        ir: "Information Retrieval (TF-IDF & Vector Search)",
      },
      skillGroup4: {
        title: "DevOps, Infra & Reliability",
        desc: "Observability, servers, and production diagnostics",
        linux: "Linux (Servers & Virtualization)",
        logs: "Log Analysis & Enrichment",
        rca: "Root Cause Analysis (RCA)",
        troubleshooting: "Systemic Troubleshooting",
      },
      skillGroup5: {
        title: "AI Productivity, Communication & Languages",
        desc: "AI-First engineering, automation, and cross-functional technical articulation",
        aiDev: "AI-Assisted Development",
        testGen: "Test Suite Generation & Refactoring",
        workflow: "Workflow Automation",
        english:
          'Intermediate English (<a href="https://certs.duolingo.com/3p4306smp786ay4v" target="_blank" rel="noopener noreferrer">B1</a>)',
        spanish: "Spanish (Basic)",
        comm: "Assertive Communication",
        biz: "Systemic Business Acumen",
      },
      projects: {
        kicker: "Code Portfolio",
        title: "Personal Projects",
        subtitle:
          'Original projects integrated via GitHub API (<a href="https://github.com/snt-lucas" target="_blank" rel="noopener noreferrer" class="link-subtle" aria-label="snt-lucas GitHub profile (opens in new tab)">@snt-lucas</a>).',
        loadingReposAria: "Loading repositories from GitHub...",
        loadMoreAria: "Load more repositories from GitHub",
        loadMore: "Load More",
        endMessage: "That's all for now 😊",
        exploreGithubAria:
          "Explore all public repositories of Lucas Lima on GitHub (opens in new tab)",
        exploreGithub: "Explore All Repositories on GitHub",
        syncing: "Loading projects...",
        synced: "GitHub API Synced",
        cacheSynced: "GitHub API (Session Cache)",
        offline: "Featured Mode Active (Offline)",
        rateLimitAlertTitle: "Request Rate Limit Reached",
        rateLimitAlertDesc:
          "The hourly rate limit of the GitHub public API has been reached (60 req/h). Showing project catalog from cached data.",
        offlineAlertTitle: "Offline Connection to GitHub API",
        offlineAlertDesc:
          "Could not synchronize repositories in real-time with the GitHub API. Showing curated project catalog.",
        updatedPrefix: "Updated on: ",
        viewReadme: "View README",
        starsTitle: "{count} stars on GitHub",
        openReadmeAria: "Open README documentation for project {name}",
        viewGhAria:
          "View source code for project {name} on GitHub (opens in new tab)",
        liveDemoAria: "Access live demo of {name} (opens in new tab)",
        defaultDesc:
          "Repository focused on software development and best practices.",
        publicRepoType: "Public Repository",
      },
      contact: {
        badge: "Let's Build Something Amazing",
        title: "Liked what you saw? Get in touch!",
        desc: "Whether you want to discuss opportunities in <strong>Software Development</strong>, project collaboration, or engineering challenges, my direct channel is open.",
        btnWhatsappAria:
          "Start WhatsApp conversation with Lucas Lima (opens in new tab)",
        btnWhatsapp: "Chat on WhatsApp",
        btnLinkedinAria:
          "Access Lucas Lima's profile on LinkedIn (opens in new tab)",
        btnLinkedin: "Connect on LinkedIn",
        btnEmailAria: "Copy email address to clipboard",
        btnEmail: "Copy Email",
        emailCopied: "Copied!",
        locationLabel: "Location",
        locationValue: "Belo Horizonte, MG • Brazil",
      },
      footer: {
        brandAria: "Go to top of page",
        copyright:
          '&copy; <time id="current-year" datetime="2026">2026</time> <strong>Lucas dos Santos Lima</strong>. All rights reserved.',
        credit:
          'Crafted with the assistance of <span class="footer-highlight">Google Antigravity</span> using <span class="footer-tech-tag">Semantic HTML5</span>, <span class="footer-tech-tag">Modern CSS3 (Bento Box)</span>, <span class="footer-tech-tag">Vanilla JavaScript (ES6+)</span>, and <span class="footer-tech-tag">GitHub REST API</span>.',
        fabAria: "Open WhatsApp chat with Lucas Lima (opens in new tab)",
        fabTooltip: "Chat with me on WhatsApp",
      },
      modal: {
        subtitle: "GitHub Live Mirror • snt-lucas",
        ghAria: "Open repository on GitHub (opens in new tab)",
        viewGithub: "View on GitHub",
        closeAria: "Close README modal (press Esc)",
        closeTitle: "Close (Esc)",
        loadingTitle: "Loading official documentation...",
        loadingSubtitle:
          "Fetching README.md from {user}/{repo} directly from GitHub",
        notFoundTitle: "README.md not found",
        notFoundDesc:
          'Oops! The repository "{user}/{repo}" does not have a public README.md file yet.',
        notFoundAlt: "404 Error icon - README not found",
        rateLimitTitle: "GitHub API Rate Limit Reached",
        rateLimitDesc:
          "Temporary rate limit for GitHub public API reached (60 req/h without a token). Please try again in a few moments.",
        errorTitle: "Error loading documentation",
        errorDesc:
          'Failed to connect to the GitHub API to fetch the README for "{repo}". Please check your connection and try again.',
      },
      toast: {
        emailCopied: "Email ({email}) copied to clipboard!",
        cvDownloaded: "Resume download started in PDF.",
      },
    },
  });
  class I18nManager {
    constructor() {
      this.storageKey = "lucas_portfolio_lang";
      this.supportedLanguages = ["pt-BR", "en-US"];
      this.currentLang = "pt-BR";
      this.listeners = [];
      this.langToggleBtn = document.getElementById("lang-toggle");
      this.langIndicator = document.getElementById("lang-indicator");
      this.init();
    }
    init() {
      let initialLang = "pt-BR";
      try {
        const savedLang = localStorage.getItem(this.storageKey);
        if (this.supportedLanguages.includes(savedLang)) {
          initialLang = savedLang;
        } else if (
          navigator.language &&
          navigator.language.toLowerCase().startsWith("en")
        ) {
          initialLang = "en-US";
        }
      } catch (_) {
        initialLang = "pt-BR";
      }
      this.setLanguage(initialLang, false);
      if (this.langToggleBtn) {
        this.langToggleBtn.addEventListener("click", () =>
          this.toggleLanguage(),
        );
      }
    }
    toggleLanguage() {
      const nextLang = this.currentLang === "pt-BR" ? "en-US" : "pt-BR";
      this.setLanguage(nextLang, true);
    }
    setLanguage(lang, persist = true) {
      if (!this.supportedLanguages.includes(lang)) {
        lang = "pt-BR";
      }
      this.currentLang = lang;
      if (persist) {
        try {
          localStorage.setItem(this.storageKey, lang);
        } catch (_) {}
      }
      document.documentElement.setAttribute("lang", lang);
      if (this.langIndicator) {
        this.langIndicator.textContent = lang === "pt-BR" ? "EN" : "PT";
      }
      this.translateDom();
      this.notifyListeners(lang);
    }
    onChange(callback) {
      if (typeof callback === "function") {
        this.listeners.push(callback);
      }
    }
    notifyListeners(lang) {
      this.listeners.forEach((cb) => {
        try {
          cb(lang);
        } catch (_) {}
      });
    }
    t(path) {
      const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS["pt-BR"];
      const fallbackDict = TRANSLATIONS["pt-BR"];
      const resolve = (obj, p) =>
        p
          .split(".")
          .reduce(
            (acc, part) => (acc && acc[part] !== undefined ? acc[part] : null),
            obj,
          );
      return resolve(dict, path) ?? resolve(fallbackDict, path) ?? path;
    }
    getCurrentCvName() {
      return this.currentLang === "en-US"
        ? "LucasLima_Resume_EN.pdf"
        : "LucasLima_Resume_PT.pdf";
    }
    translateDom() {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const val = this.t(key);
        if (val !== key) {
          el.textContent = val;
        }
      });
      document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        const val = this.t(key);
        if (val !== key) {
          el.innerHTML = val;
        }
      });
      document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria");
        const val = this.t(key);
        if (val !== key) {
          el.setAttribute("aria-label", val);
        }
      });
      document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        const key = el.getAttribute("data-i18n-title");
        const val = this.t(key);
        if (val !== key) {
          el.setAttribute("title", val);
        }
      });
      const docTitle = this.t("meta.title");
      if (docTitle) {
        document.title = docTitle;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const descVal = this.t("meta.description");
        if (descVal) {
          metaDesc.setAttribute("content", descVal);
        }
      }
    }
  }
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
  class ReadmeModalManager {
    constructor(i18nManager) {
      this.i18nManager = i18nManager;
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
      this.closeBtn.addEventListener("click", () => this.close());
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
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
      if (this.modalTitle) {
        this.modalTitle.textContent = `${CONFIG.GITHUB_USER} / ${repoName}`;
      }
      if (this.modalSubtitle) {
        this.modalSubtitle.textContent = this.i18nManager
          ? this.i18nManager.t("modal.subtitle")
          : "GitHub Live Mirror • snt-lucas";
      }
      if (this.modalGhLink) {
        this.modalGhLink.href = sanitizeUrl(
          repoUrl || `https://github.com/${CONFIG.GITHUB_USER}/${repoName}`,
        );
      }
      this.modal.classList.add("open");
      this.modal.setAttribute("aria-hidden", "false");
      this.renderLoading(repoName);
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
      const sessionKey = `lucas_readme_${repoName}`;
      const cachedHtml = SessionStorageManager.get(sessionKey);
      if (cachedHtml && typeof cachedHtml === "string" && cachedHtml.trim()) {
        this.renderReadmeContent(cachedHtml, repoName);
        return;
      }
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
        if (!readmeHtml || !readmeHtml.trim()) {
          this.renderNotFound(repoName);
          return;
        }
        SessionStorageManager.set(sessionKey, readmeHtml);
        this.renderReadmeContent(readmeHtml, repoName);
      } catch (err) {
        this.renderNotFound(repoName);
      }
    }
    renderLoading(repoName) {
      this.modalBody.innerHTML = "";
      const box = createSafeElement("div", "readme-loading-box");
      const spinner = createSafeElement("div", "readme-spinner");
      const titleText = this.i18nManager
        ? this.i18nManager.t("modal.loadingTitle")
        : "Carregando documentação oficial...";
      const title = createSafeElement("div", "readme-loading-title", titleText);
      const subtitleTemplate = this.i18nManager
        ? this.i18nManager.t("modal.loadingSubtitle")
        : `Buscando README.md de {user}/{repo} diretamente do GitHub`;
      const subtitleText = subtitleTemplate
        .replace("{user}", CONFIG.GITHUB_USER)
        .replace("{repo}", repoName);
      const subtitle = createSafeElement(
        "div",
        "readme-loading-subtitle",
        subtitleText,
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
      img.alt = this.i18nManager
        ? this.i18nManager.t("modal.notFoundAlt")
        : "Ícone de erro 404 - README não encontrado";
      img.className = "readme-not-found-img";
      img.width = 140;
      img.height = 140;
      const titleText = this.i18nManager
        ? this.i18nManager.t("modal.notFoundTitle")
        : "README.md não encontrado";
      const title = createSafeElement(
        "h3",
        "readme-not-found-title",
        titleText,
      );
      const descTemplate = this.i18nManager
        ? this.i18nManager.t("modal.notFoundDesc")
        : `Ops! O repositório "{user}/{repo}" ainda não possui um arquivo README.md público.`;
      const descText = descTemplate
        .replace("{user}", CONFIG.GITHUB_USER)
        .replace("{repo}", repoName);
      const desc = createSafeElement("p", "readme-not-found-desc", descText);
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
      const titleText = this.i18nManager
        ? this.i18nManager.t("modal.rateLimitTitle")
        : "Limite da API do GitHub Atingido";
      const titleSpan = createSafeElement("span", "", titleText);
      title.appendChild(titleSpan);
      const descText = this.i18nManager
        ? this.i18nManager.t("modal.rateLimitDesc")
        : "O limite temporário de requisições da API pública do GitHub foi alcançado (60 req/h para consultas sem token). Por favor, tente novamente em alguns instantes.";
      const desc = createSafeElement("p", "alert-desc", descText);
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
      const titleText = this.i18nManager
        ? this.i18nManager.t("modal.errorTitle")
        : "Erro ao carregar documentação";
      const titleSpan = createSafeElement("span", "", titleText);
      title.appendChild(titleSpan);
      const descTemplate = this.i18nManager
        ? this.i18nManager.t("modal.errorDesc")
        : `Houve uma falha ao tentar se conectar com a API do GitHub para obter o README de "{repo}". Verifique sua conexão e tente novamente.`;
      const descText = descTemplate.replace("{repo}", repoName);
      const desc = createSafeElement("p", "alert-desc", descText);
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
  class GitHubProjectsManager {
    constructor(readmeModalManager, i18nManager) {
      this.container = document.getElementById("projects-container");
      this.statusBadge = document.getElementById("github-sync-badge");
      this.statusText = document.getElementById("github-status-text");
      this.loadMoreBtn = document.getElementById("load-more-projects-btn");
      this.endMessage = document.getElementById("projects-end-message");
      this.readmeModalManager = readmeModalManager;
      this.i18nManager = i18nManager;
      this.allProjects = [];
      this.renderedCount = 0;
      this.PAGE_SIZE = 6;
      this.featuredProjects = [
        {
          name: "Phishio",
          description: {
            "pt-BR":
              "Sistema de detecção de phishing e motor de busca para HTML (TF-IDF, Similaridade de Cosseno e Índice Invertido). Arquitetura multi-worker (30 nodes) que processou 450 mil URLs e 297 mil páginas em 8 dias, com extensão colaborativa em FastAPI, persistência em Firebase e cache local SQLite com LRU.",
            "en-US":
              "Phishing detection system and HTML search engine (TF-IDF, Cosine Similarity, and Inverted Index). Multi-worker architecture (30 nodes) processing 450k URLs and 297k pages in 8 days, with a FastAPI collaborative extension, Firebase, and local SQLite LRU cache.",
          },
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
          type: {
            "pt-BR": "TCC • Recuperação de Informação",
            "en-US": "Capstone • Information Retrieval",
          },
        },
        {
          name: "LucasLima",
          aliases: ["ProjetoCapa"],
          description: {
            "pt-BR":
              "Portfólio interativo de alta performance com arquitetura Bento Box neo-minimalista, espelhamento ao vivo de documentações do GitHub, acessibilidade estrita (WCAG 2.1 AA) e internacionalização nativa zero dependências (pt-BR / en-US).",
            "en-US":
              "High-performance interactive portfolio featuring a neo-minimalist Bento Box layout, real-time GitHub documentation mirroring, strict accessibility (WCAG 2.1 AA), and zero-dependency native internationalization (pt-BR / en-US).",
          },
          language: "JavaScript / HTML5 / CSS3",
          topics: [
            "portfolio",
            "vanilla-js",
            "bento-box",
            "a11y-wcag",
            "i18n",
            "github-api",
          ],
          html_url: "https://github.com/snt-lucas/LucasLima",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2026-10-01T14:00:00Z",
          isCustomFeatured: true,
          type: {
            "pt-BR": "Portfólio & Engenharia Web",
            "en-US": "Portfolio & Web Engineering",
          },
        },
        {
          name: "FoodFlow-ERP",
          description: {
            "pt-BR":
              "Sistema de gestão integrada (ERP) desenvolvido em TypeScript, focado na otimização de fluxos operacionais, controle de demandas e automação de processos.",
            "en-US":
              "Integrated Enterprise Resource Planning (ERP) system built in TypeScript, focused on streamlining operational workflows, demand tracking, and process automation.",
          },
          language: "TypeScript",
          topics: ["erp", "typescript", "management", "business-flow"],
          html_url: "https://github.com/snt-lucas/FoodFlow-ERP",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2025-12-02T22:02:06Z",
          isCustomFeatured: true,
          type: {
            "pt-BR": "Sistema ERP",
            "en-US": "ERP System",
          },
        },
        {
          name: "RIWRS_Colector",
          description: {
            "pt-BR":
              "Coletor de dados e automação de rotinas em Python, projetado para extração confiável, manipulação de fluxos e integração com serviços analíticos.",
            "en-US":
              "Data collector and routine automation pipeline in Python, engineered for resilient extraction, stream processing, and analytics integration.",
          },
          language: "Python",
          topics: ["python", "collector", "automation", "data-pipeline"],
          html_url: "https://github.com/snt-lucas/RIWRS_Colector",
          homepage: null,
          stargazers_count: 0,
          pushed_at: "2026-03-03T00:15:07Z",
          isCustomFeatured: true,
          type: {
            "pt-BR": "Automação & Dados",
            "en-US": "Automation & Data",
          },
        },
      ];
      this.init();
    }
    async init() {
      if (this.loadMoreBtn) {
        this.loadMoreBtn.addEventListener("click", () => this.loadMore());
      }
      if (this.i18nManager) {
        this.i18nManager.onChange(() => {
          this.refreshCurrentView();
        });
      }
      const cachedRepos = SessionStorageManager.get(
        CONFIG.SESSION_STORAGE_REPOS_KEY,
      );
      if (Array.isArray(cachedRepos) && cachedRepos.length > 0) {
        this.processAndRender(cachedRepos);
        const cacheLabel = this.i18nManager
          ? this.i18nManager.t("projects.cacheSynced")
          : "GitHub API (Cache de Sessão)";
        this.updateStatus(cacheLabel, "synced");
        return;
      }
      try {
        const loadingLabel = this.i18nManager
          ? this.i18nManager.t("projects.syncing")
          : "Carregando projetos...";
        this.updateStatus(loadingLabel, "syncing");
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
          repositorios.sort(
            (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
          );
          SessionStorageManager.set(
            CONFIG.SESSION_STORAGE_REPOS_KEY,
            repositorios,
          );
          this.processAndRender(repositorios);
          const syncedLabel = this.i18nManager
            ? this.i18nManager.t("projects.synced")
            : "GitHub API Sincronizada";
          this.updateStatus(syncedLabel, "synced");
        } else {
          throw new Error("INVALID_FORMAT");
        }
      } catch (err) {
        this.renderErrorState(err.message === "RATE_LIMIT");
        this.processAndRender([]);
        const offlineLabel = this.i18nManager
          ? this.i18nManager.t("projects.offline")
          : "Modo Destaques Ativo (Offline)";
        this.updateStatus(offlineLabel, "offline");
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
          ? this.i18nManager
            ? this.i18nManager.t("projects.rateLimitAlertTitle")
            : "Limite de Requisições Atingido"
          : this.i18nManager
            ? this.i18nManager.t("projects.offlineAlertTitle")
            : "Conexão Offline com GitHub API",
      );
      title.appendChild(titleSpan);
      const msg = isRateLimit
        ? this.i18nManager
          ? this.i18nManager.t("projects.rateLimitAlertDesc")
          : "O limite temporário de requisições por hora da API pública do GitHub foi alcançado (60 req/h). Exibindo catálogo de projetos com dados salvos."
        : this.i18nManager
          ? this.i18nManager.t("projects.offlineAlertDesc")
          : "Não foi possível sincronizar os repositórios em tempo real com a API do GitHub. Exibindo catálogo curado de projetos.";
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
    processAndRender(apiRepos) {
      const finalProjects = [...this.featuredProjects];
      if (Array.isArray(apiRepos) && apiRepos.length > 0) {
        apiRepos.forEach((repo) => {
          if (!repo || typeof repo !== "object") return;
          const repoName = String(repo.name || "");
          const existingIdx = finalProjects.findIndex(
            (p) =>
              p.name.toLowerCase() === repoName.toLowerCase() ||
              (Array.isArray(p.aliases) &&
                p.aliases.some(
                  (alias) => alias.toLowerCase() === repoName.toLowerCase(),
                )),
          );
          if (existingIdx !== -1) {
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
            let description = repo.description ? String(repo.description) : "";
            const summaryMatch = description.match(
              /<!--\s*portfolio-summary:\s*(.*?)\s*-->/i,
            );
            if (summaryMatch && summaryMatch[1]) {
              description = summaryMatch[1].trim();
            }
            finalProjects.push({
              name: repoName,
              description: description || null,
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
              type: null,
            });
          }
        });
      }
      finalProjects.sort(
        (a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0),
      );
      this.allProjects = finalProjects;
      this.renderedCount = 0;
      if (!this.container) return;
      const existingAlert = this.container.querySelector(".inspector-alert");
      this.container.innerHTML = "";
      if (existingAlert) {
        this.container.appendChild(existingAlert);
      }
      this.loadMore();
    }
    loadMore() {
      if (!this.container || this.allProjects.length === 0) return;
      const nextBatch = this.allProjects.slice(
        this.renderedCount,
        this.renderedCount + this.PAGE_SIZE,
      );
      nextBatch.forEach((proj) => {
        const card = this.createProjectCard(proj);
        this.container.appendChild(card);
      });
      this.renderedCount += nextBatch.length;
      this.updatePaginationUI();
    }
    updatePaginationUI() {
      if (!this.loadMoreBtn || !this.endMessage) return;
      if (this.allProjects.length === 0) {
        this.loadMoreBtn.style.display = "none";
        this.endMessage.style.display = "none";
        return;
      }
      if (this.renderedCount < this.allProjects.length) {
        this.loadMoreBtn.style.display = "inline-flex";
        this.endMessage.style.display = "none";
      } else {
        this.loadMoreBtn.style.display = "none";
        this.endMessage.style.display = "block";
      }
    }
    refreshCurrentView() {
      if (!this.container || this.allProjects.length === 0) return;
      const existingAlert = this.container.querySelector(".inspector-alert");
      this.container.innerHTML = "";
      if (existingAlert) {
        this.container.appendChild(existingAlert);
      }
      const currentBatch = this.allProjects.slice(0, this.renderedCount);
      currentBatch.forEach((proj) => {
        const card = this.createProjectCard(proj);
        this.container.appendChild(card);
      });
      this.updatePaginationUI();
    }
    createProjectCard(proj) {
      const currentLang = this.i18nManager
        ? this.i18nManager.currentLang
        : "pt-BR";
      let descText = "";
      if (proj.description && typeof proj.description === "object") {
        descText =
          proj.description[currentLang] || proj.description["pt-BR"] || "";
      } else if (typeof proj.description === "string") {
        descText = proj.description;
      }
      if (!descText) {
        descText = this.i18nManager
          ? this.i18nManager.t("projects.defaultDesc")
          : "Repositório focado no desenvolvimento de software e boas práticas.";
      }
      let typeText = "";
      if (proj.type && typeof proj.type === "object") {
        typeText = proj.type[currentLang] || proj.type["pt-BR"] || "";
      } else if (typeof proj.type === "string") {
        typeText = proj.type;
      }
      if (!typeText) {
        typeText = this.i18nManager
          ? this.i18nManager.t("projects.publicRepoType")
          : "Repositório Público";
      }
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("data-repo-name", proj.name);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-haspopup", "dialog");
      const openReadmeTemplate = this.i18nManager
        ? this.i18nManager.t("projects.openReadmeAria")
        : "Abrir documentação README do projeto {name}";
      const openReadmeAria = openReadmeTemplate.replace("{name}", proj.name);
      card.setAttribute("aria-label", openReadmeAria);
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
      const topBlock = document.createElement("div");
      const headerDiv = createSafeElement("div", "project-header");
      const typeTag = createSafeElement("span", "project-type-tag", typeText);
      headerDiv.appendChild(typeTag);
      const starsDiv = createSafeElement("div", "project-stars");
      const starCount =
        typeof proj.stargazers_count === "number" ? proj.stargazers_count : 0;
      const starsTitleTemplate = this.i18nManager
        ? this.i18nManager.t("projects.starsTitle")
        : "{count} estrelas no GitHub";
      starsDiv.title = starsTitleTemplate.replace("{count}", String(starCount));
      starsDiv.innerHTML = SVG_ICONS.star;
      const starCountSpan = createSafeElement("span", "", String(starCount));
      starsDiv.appendChild(starCountSpan);
      headerDiv.appendChild(starsDiv);
      topBlock.appendChild(headerDiv);
      const title = createSafeElement("h3", "project-title", proj.name);
      const desc = createSafeElement("p", "project-desc", descText);
      topBlock.appendChild(title);
      topBlock.appendChild(desc);
      if (proj.pushed_at) {
        const dateWrapper = createSafeElement("div", "project-updated-wrapper");
        dateWrapper.innerHTML = SVG_ICONS.calendar;
        const datePrefixText = this.i18nManager
          ? this.i18nManager.t("projects.updatedPrefix")
          : "Atualizado em: ";
        const datePrefix = createSafeElement("span", "", datePrefixText);
        dateWrapper.appendChild(datePrefix);
        const timeEl = document.createElement("time");
        timeEl.className = "project-date";
        timeEl.setAttribute("datetime", proj.pushed_at);
        timeEl.textContent = formatIsoDateOnly(proj.pushed_at, currentLang);
        dateWrapper.appendChild(timeEl);
        topBlock.appendChild(dateWrapper);
      }
      card.appendChild(topBlock);
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
      const readmeBtn = createSafeElement("button", "project-link-btn");
      readmeBtn.type = "button";
      readmeBtn.innerHTML = SVG_ICONS.book;
      const viewReadmeText = this.i18nManager
        ? this.i18nManager.t("projects.viewReadme")
        : "Ver README";
      const readmeBtnText = createSafeElement("span", "", viewReadmeText);
      readmeBtn.appendChild(readmeBtnText);
      readmeBtn.setAttribute("aria-label", openReadmeAria);
      readmeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.readmeModalManager) {
          this.readmeModalManager.open(proj.name, proj.html_url);
        }
      });
      linksContainer.appendChild(readmeBtn);
      const ghLink = createSafeElement("a", "project-link-btn");
      ghLink.href = sanitizeUrl(proj.html_url);
      ghLink.target = "_blank";
      ghLink.rel = "noopener noreferrer";
      ghLink.title = "GitHub";
      const viewGhTemplate = this.i18nManager
        ? this.i18nManager.t("projects.viewGhAria")
        : "Ver código fonte do projeto {name} no GitHub (abre em nova aba)";
      ghLink.setAttribute(
        "aria-label",
        viewGhTemplate.replace("{name}", proj.name),
      );
      ghLink.innerHTML = SVG_ICONS.github;
      const ghSpan = createSafeElement("span", "", "GitHub");
      ghLink.appendChild(ghSpan);
      linksContainer.appendChild(ghLink);
      if (proj.homepage && sanitizeUrl(proj.homepage) !== "#") {
        const liveLink = createSafeElement("a", "project-link-btn");
        liveLink.href = sanitizeUrl(proj.homepage);
        liveLink.target = "_blank";
        liveLink.rel = "noopener noreferrer";
        liveLink.title = "Live Demo";
        const liveDemoTemplate = this.i18nManager
          ? this.i18nManager.t("projects.liveDemoAria")
          : "Acessar demonstração online de {name} (abre em nova aba)";
        liveLink.setAttribute(
          "aria-label",
          liveDemoTemplate.replace("{name}", proj.name),
        );
        liveLink.innerHTML = SVG_ICONS.external;
        const liveSpan = createSafeElement("span", "", "Live Demo");
        liveLink.appendChild(liveSpan);
        linksContainer.appendChild(liveLink);
      }
      footer.appendChild(linksContainer);
      card.appendChild(footer);
      return card;
    }
  }
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
  function showToast(message, duration = 3500) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }
  async function copyEmailToClipboard(i18nManager) {
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
        const copiedLabel = i18nManager
          ? i18nManager.t("contact.emailCopied")
          : "Copiado!";
        copyTextSpan.textContent = copiedLabel;
        setTimeout(() => {
          const revertLabel = i18nManager
            ? i18nManager.t("contact.btnEmail")
            : "Copiar E-mail";
          copyTextSpan.textContent = revertLabel;
        }, 2000);
      }
      const toastTemplate = i18nManager
        ? i18nManager.t("toast.emailCopied")
        : "E-mail ({email}) copiado com sucesso!";
      showToast(toastTemplate.replace("{email}", CONFIG.EMAIL));
    } catch (_) {
      showToast("E-mail: " + CONFIG.EMAIL);
    }
  }
  function downloadCV(i18nManager) {
    const downloadName = i18nManager
      ? i18nManager.getCurrentCvName()
      : CONFIG.CV_DOWNLOAD_NAME;
    const link = document.createElement("a");
    link.href = CONFIG.CV_PATH;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const toastMsg = i18nManager
      ? i18nManager.t("toast.cvDownloaded")
      : "Download do currículo iniciado em PDF.";
    showToast(toastMsg);
  }
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
  document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    const i18nManager = new I18nManager();
    const readmeModalManager = new ReadmeModalManager(i18nManager);
    new ThemeManager();
    new GitHubProjectsManager(readmeModalManager, i18nManager);
    new TimelineFilterManager();
    const btnHeroCv = document.getElementById("btn-hero-cv");
    if (btnHeroCv) {
      btnHeroCv.addEventListener("click", () => downloadCV(i18nManager));
    }
    const btnFooterCv = document.getElementById("btn-footer-cv");
    if (btnFooterCv) {
      btnFooterCv.addEventListener("click", () => downloadCV(i18nManager));
    }
    const btnCopyEmail = document.getElementById("btn-copy-email");
    if (btnCopyEmail) {
      btnCopyEmail.addEventListener("click", () =>
        copyEmailToClipboard(i18nManager),
      );
    }
    setupNavigation();
  });
})();
