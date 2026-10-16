<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <section id="contato" class="section">
    <div class="container">
      <div v-reveal class="contact card">
        <span class="mono accent">05 · Contato</span>
        <h2>Vamos conversar?</h2>
        <p class="muted">
          Estou sempre aberto a trocar ideias sobre back-end, integrações e automação, ou a colaborar em projetos.
        </p>
        <div class="contact__links">
          <a :href="profile.linkedin" target="_blank" rel="noopener" class="btn btn--primary">
            <AppIcon name="linkedin" :size="16" /> LinkedIn
          </a>
          <a :href="`https://github.com/${profile.github}`" target="_blank" rel="noopener" class="btn">
            <AppIcon name="github" :size="18" /> GitHub
          </a>
          <a v-if="profile.email" :href="`mailto:${profile.email}`" class="btn">
            <AppIcon name="mail" :size="18" /> E-mail
          </a>
        </div>
      </div>
    </div>

    <footer class="footer container mono">
      <span>© {{ year }} {{ profile.name }}</span>
      <span class="muted">Feito com Vue 3 + Vite + TypeScript</span>
    </footer>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem;
}
.contact::before {
  content: '';
  position: absolute;
  inset: auto -20% -60% -20%;
  height: 120%;
  background: radial-gradient(ellipse at center, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%);
  pointer-events: none;
}
.contact > * {
  position: relative;
}
h2 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: -0.035em;
  margin: 0.6rem 0 0.8rem;
}
.contact p {
  max-width: 32rem;
  margin: 0 auto 2rem;
}
.contact__links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 4rem;
  font-size: 0.78rem;
}
</style>
