<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useTheme } from '../composables/useTheme'
import { profile } from '../data/profile'

const links = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'skills', label: 'Skills' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

const { theme, toggle } = useTheme()
const active = ref('')
const scrolled = ref(false)
const open = ref(false)

let observer: IntersectionObserver | undefined
const onScroll = () => (scrolled.value = window.scrollY > 12)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  // Destaca no menu a seção que está visível na tela
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const l of links) {
    const el = document.getElementById(l.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner container">
      <a href="#topo" class="nav__brand" aria-label="Início">
        <span class="nav__logo">{{ profile.initials }}</span>
        <span class="nav__name">{{ profile.shortName }}</span>
      </a>

      <nav class="nav__links" :class="{ 'nav__links--open': open }" aria-label="Principal">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          :class="{ active: active === l.id }"
          @click="open = false"
          >{{ l.label }}</a
        >
      </nav>

      <div class="nav__actions">
        <button
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="toggle"
        >
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
        </button>
        <button class="icon-btn nav__burger" :aria-expanded="open" aria-label="Abrir menu" @click="open = !open">
          <AppIcon :name="open ? 'close' : 'menu'" :size="18" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: color-mix(in oklab, var(--bg) 75%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  border-color: var(--line);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 1rem;
}
.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
}
.nav__logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent);
  border: 1px solid color-mix(in oklab, var(--accent) 40%, transparent);
  background: color-mix(in oklab, var(--accent) 10%, transparent);
}
.nav__links {
  display: flex;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--surface) 70%, transparent);
}
.nav__links a {
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--muted);
  transition: color 0.2s, background 0.2s;
}
.nav__links a:hover {
  color: var(--text);
}
.nav__links a.active {
  color: var(--text);
  background: var(--surface-2);
}
.nav__actions {
  display: flex;
  gap: 0.5rem;
}
.nav__burger {
  display: none;
}

@media (max-width: 820px) {
  .nav__name {
    display: none;
  }
  .nav__burger {
    display: grid;
  }
  .nav__links {
    position: absolute;
    top: 72px;
    left: 16px;
    right: 16px;
    flex-direction: column;
    border-radius: 18px;
    padding: 0.5rem;
    background: var(--surface);
    box-shadow: var(--shadow);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .nav__links--open {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
  .nav__links a {
    padding: 0.8rem 1rem;
    border-radius: 12px;
  }
}
</style>
