# Portfólio · Lucas Henrique

Meu portfólio pessoal: quem eu sou, onde trabalho, o que sei fazer e os projetos que estou construindo.

🔗 **Acesse:** https://lucashrr7.github.io/

## Tecnologias

- **Vue 3** com Composition API (`<script setup>`)
- **TypeScript** em modo estrito
- **Vite** para desenvolvimento e build
- CSS moderno puro: variáveis, `color-mix()`, `clamp()`, View Transitions API
- **GitHub Actions** + **GitHub Pages** para deploy automático

## Destaques

- 🌗 Tema claro/escuro com transição suave, respeitando a preferência do sistema
- 📦 Projetos carregados em tempo real pela **API do GitHub** (com cache e estado de carregamento)
- ✨ Animações de entrada com `IntersectionObserver` em uma diretiva própria (`v-reveal`)
- ⌨️ Efeito de digitação no título, feito do zero em um composable
- 📱 Layout responsivo e acessível (`prefers-reduced-motion`, foco visível, textos alternativos)
- 🧩 Todo o conteúdo centralizado em `src/data/profile.ts`

## Como rodar

```bash
npm install
npm run dev      # servidor local em http://localhost:5173/
npm run build    # checa os tipos e gera a versão de produção em dist/
```

## Estrutura

```
src/
├── components/     # seções da página (Hero, Sobre, Experiência, Skills, Projetos, Contato)
├── composables/    # lógica reutilizável: tema, GitHub API, digitação, animação
├── data/profile.ts # conteúdo do site
├── App.vue
├── main.ts
└── style.css       # tokens de design e estilos globais
public/             # foto, logo e favicon
```

## Deploy

A cada `push` na `main`, o workflow em `.github/workflows/deploy.yml` faz o build e publica no GitHub Pages.
Na primeira vez, ative em **Settings → Pages → Source: GitHub Actions**.
