# Portfólio Lucas Lima

<!-- portfolio-summary:
Portfólio interativo de alta performance construído com JavaScript Vanilla, CSS Moderno (Bento Box & Dark Mode nativo) e HTML5 semântico (WCAG 2.1 AA). Apresenta integração dinâmica com a API do GitHub para espelhamento em tempo real do README, sistema resiliente de cache em sessionStorage e arquitetura estrita Zero-XSS.
-->

Portfólio profissional e interativo desenvolvido com foco em UI/UX moderna, arquitetura **Bento Box**, suporte nativo a **Dark Mode**, microinterações elegantes e consumo dinâmico da API pública do GitHub.

O portfólio destaca a evolução de **Lucas Lima** na área de desenvolvimento de software: **Desenvolvedor de Software Back-end** com domínio em **Python (FastAPI)**, **Java** e **Kotlin**, formação como **Bacharel em Sistemas de Informação pela PUC Minas**, atuação como ex-estagiário de Engenharia de Software no **Google** (ecossistema Android, TDD, Mockito, Device Capabilities e BugReport nativo), vivência prévia em plataformas **SaaS** (Sólides) e governança de infraestrutura corporativa/bancos de dados (Linux, Oracle, MSSQL e AWS).

---

## 🚀 Destaques da Arquitetura & UI/UX

1. **Hero Section (Bento Box)**:
   - Apresentação executiva focada em desenvolvimento Back-end, APIs RESTful, engenharia AI-First e observabilidade de sistemas.
   - Formação concluída em Sistemas de Informação na **PUC Minas**.
   - Destaque à experiência em Engenharia de Software no **Google** em Belo Horizonte.
   - Métricas de experiência e atalhos rápidos para download do currículo e contato direto via WhatsApp.

2. **Timeline Dinâmica de Experiências**:
   - Linha do tempo interativa com filtros dinâmicos por categoria (_Engenharia de Software_, _Suporte SaaS & Dados_, _Infraestrutura & Cloud_).
   - Experiências em **Google** (Estágio em Engenharia de Software Android), **Sólides Tecnologia** (Suporte SaaS e validação de dados), **Netscanner Soluções em TI** (Windows Server, Redes e Microsoft 365) e **Log.One** (Linux, Oracle, SQL Server e AWS).

3. **Habilidades Técnicas & Power Skills**:
   - Organização em categorias no padrão Bento: _Linguagens & Frameworks_ (Python FastAPI, Java, Kotlin), _Bancos de Dados & Nuvem_ (PostgreSQL, SQLite LRU, Oracle, SQL Server, AWS), _Engenharia, Testes & Qualidade_ (TDD, JUnit, Mockito, Pytest, Code Review L3, APIs RESTful), _DevOps & Infra_ (Docker, Linux, Logs, RCA) e _Produtividade com IA & Idiomas_ (AI-First, Inglês B1, Espanhol).

4. **Projetos em Destaque & Integração com a API do GitHub**:
   - Consumo assíncrono do endpoint oficial: `https://api.github.com/users/snt-lucas/repos?sort=pushed&direction=desc`.
   - Ordenação algorítmica rigorosa por atualização: `repositorios.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));`.
   - Todas as datas de modificação dos projetos envolvidas na tag semântica `<time datetime="...">`.
   - **Espelho Exato do README.md em Tempo Real (Live Mirror Modal)**: Ao clicar no card de qualquer projeto (ou no botão _Ver README_), abre-se um modal sobreposto com rolagem vertical independente, backdrop com desfoque e fechamento acessível (botão X, tecla `Esc` ou clique externo). A requisição é enviada com o cabeçalho `Accept: application/vnd.github.v3.html` para `https://api.github.com/repos/snt-lucas/[NOME_DO_REPO]/readme`, trazendo a renderização HTML nativa e fiel do GitHub sem necessidade de bibliotecas de terceiros no front-end.
   - Cache em `sessionStorage` para repositórios e arquivos README, eliminando latência e prevenindo estouro de rate limit da API.
   - Tratamento amigável de erro na interface com fallback resiliente para o catálogo curado de projetos (**Phishio**, **FoodFlow-ERP**, **RIWRS_Colector** e **ProjetoCapa**).

5. **Contato Estratégico & Microinterações**:
   - Botão flutuante (FAB) de acesso direto ao WhatsApp (`(31) 99616-6591`) com mensagem estruturada.
   - Redirecionamento configurado para a API do WhatsApp e perfil no LinkedIn (`/in/snt-lucas/`).
   - Função de cópia rápida do e-mail profissional com feedback visual via _Toast Notification_.
   - Download automatizado do currículo em PDF (`LucasLima_Resume_PT.pdf`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estrutura acessível, marcas ARIA, meta tags Open Graph e SEO.
- **CSS3 Moderno**:
  - CSS Custom Properties (Variáveis CSS para temas claro e escuro).
  - Background responsivo em camadas com imagens da pasta `assets/` e gradiente de proteção de contraste (_ambient overlay_).
  - CSS Grid (Layout Bento Box modular) e Flexbox.
  - Efeitos de profundidade, _Glassmorphism_ (`backdrop-filter`) e animações suaves de transição.
  - Estilização completa de Markdown nativo do GitHub (`.markdown-body`).
- **JavaScript Puro (Vanilla JS)**:
  - Gerenciador de tema com persistência e detecção de `prefers-color-scheme`.
  - Fetch assíncrono à API do GitHub com esqueleto de carregamento (_skeleton loading_).
  - Modal interativo para visualização de `README.md` processado pelo GitHub.
  - Filtro em tempo real de experiências profissionais.
  - Sistema leve de notificações _toast_.

---

## 📂 Estrutura de Arquivos

```text
ProjetoCapa/
├── assets/                  # Identidade visual, avatares e planos de fundo
├── dist/                    # Distribuição de produção gerada por build.ps1 (minificada e anonimizada)
├── .gitignore               # Configurações de exclusão do Git
├── build.ps1                # Script PowerShell para geração da build de produção anonimizada
├── curriculo.pdf            # Documento PDF do currículo pronto para download
├── index.html               # Marcação semântica completa (WCAG 2.1, Skip Link, Modal README, Tags Semânticas)
├── style.css                # Folha de estilo e Design System Neo-Minimalista (Design Tokens, Fluid Typography, Modal, Markdown)
├── script.js                # Lógicas interativas (IIFE, Readme Modal, GitHub REST API, Zero-XSS, sessionStorage)
├── LICENSE                  # Licença de uso
└── README.md                # Documentação técnica do projeto
```

---

## 🛡️ Boas Práticas & Segurança Implementadas

- **Acessibilidade & HTML Semântico (WCAG 2.1 AA):**
  - Tags semânticas (`<header>`, `<main>`, `<section>`, `<article>`, `<time datetime="...">`).
  - _Skip Link_ acessível para navegação por teclado (`.skip-to-content`).
  - Modal com atributos acessíveis (`role="dialog"`, `aria-modal="true"`, foco gerenciado e fechamento por tecla `Esc`).
  - Atributos `aria-label` e `aria-live` em botões, links de ícones e badges dinâmicos.
  - Indicadores de foco universais com `:focus-visible` e suporte a `prefers-reduced-motion`.
- **Tratamento de Estados Assíncronos & Performance:**
  - _Skeleton screens_ e spinners nativos durante a comunicação com a API do GitHub.
  - _Cache no `sessionStorage`_ para evitar latência e contornar rate limits do GitHub.
  - _Fallback resiliente_ para projetos em destaque caso a rede esteja indisponível.
- **Segurança no Front-end (Zero XSS):**
  - Montagem de elementos DOM estritamente via `document.createElement()` e `.textContent`, sem interpolação de strings não sanitizadas no `innerHTML`.
  - Sanitização rigorosa de protocolos em URLs externas (`sanitizeUrl()`).
  - Atributos `rel="noopener noreferrer"` em todos os links externos com `target="_blank"`.
- **Anonimização & Higiene no DevTools dos Navegadores:**
  - Encapsulamento completo de escopo em **IIFE** com `'use strict'`, impedindo o vazamento de variáveis, classes e estado global para o objeto `window`.
  - Neutralização de métodos `console.log`, `console.debug` e `console.info` fora de ambientes de desenvolvimento local.
  - Script automatizado de build (`build.ps1`) para gerar a distribuição de produção (`/dist`) com código minificado e comentários de desenvolvimento removidos.

---

## 💻 Como Executar Localmente

1. Clone o repositório ou baixe os arquivos do projeto:
   ```bash
   git clone https://github.com/snt-lucas/ProjetoCapa.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari).
3. Não requer instalação de dependências ou servidores adicionais (100% nativo).

### 📦 Gerando a Versão de Produção Anonimizada (/dist)

Para gerar os arquivos prontos para publicação em produção com remoção de comentários e minificação:

```powershell
powershell -ExecutionPolicy Bypass -File .\build.ps1
```

Os arquivos otimizados serão compilados dentro da pasta `dist/`.
