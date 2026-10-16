<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { useTypewriter } from '../composables/useTypewriter'
import { experiences, profile } from '../data/profile'

const role = useTypewriter(profile.roles)
const current = experiences.find((e) => e.current)
const photo = `${import.meta.env.BASE_URL}${profile.photo}`
</script>

<template>
  <section id="topo" class="hero">
    <div class="hero__glow" aria-hidden="true" />
    <div class="container hero__inner">
      <div class="hero__text">
        <p v-if="current" v-reveal class="pill">
          <span class="pill__dot" /> {{ current.role }} · {{ current.company }}
        </p>

        <h1 v-reveal="80" class="hero__title">
          Olá, eu sou<br />
          <span class="gradient-text">{{ profile.shortName }}</span>
        </h1>

        <p v-reveal="160" class="hero__role mono">
          <span class="muted">&gt;</span> {{ role }}<span class="caret" aria-hidden="true" />
        </p>

        <p v-reveal="240" class="hero__tagline">{{ profile.tagline }}</p>

        <div v-reveal="320" class="hero__cta">
          <a href="#projetos" class="btn btn--primary">
            Ver projetos <AppIcon name="arrow" :size="16" />
          </a>
          <a :href="`https://github.com/${profile.github}`" target="_blank" rel="noopener" class="btn">
            <AppIcon name="github" :size="18" /> GitHub
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener" class="btn">
            <AppIcon name="linkedin" :size="16" /> LinkedIn
          </a>
        </div>
      </div>

      <div v-reveal="200" class="hero__photo">
        <div class="hero__ring" aria-hidden="true" />
        <img :src="photo" :alt="`Foto de ${profile.name}`" width="640" height="640" fetchpriority="high" />
        <span class="hero__badge">
          <AppIcon name="pin" :size="14" /> {{ profile.location }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 7rem 0 4rem;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
  opacity: 0.55;
  pointer-events: none;
}
.hero__glow {
  position: absolute;
  width: 620px;
  aspect-ratio: 1;
  right: -120px;
  top: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in oklab, var(--accent) 28%, transparent), transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}
.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  align-items: center;
  gap: 3rem;
}
.hero__title {
  font-size: clamp(2.6rem, 6.5vw, 4.6rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 1.4rem 0 1rem;
}
.hero__role {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--accent);
  min-height: 1.6em;
}
.caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.18em;
  background: var(--accent);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.hero__tagline {
  max-width: 34rem;
  margin: 1.4rem 0 2.2rem;
  font-size: 1.08rem;
  color: var(--muted);
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.hero__photo {
  position: relative;
  justify-self: center;
  width: min(100%, 380px);
}
.hero__photo img {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 32px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}
.hero__ring {
  position: absolute;
  inset: -14px;
  border-radius: 42px;
  background: conic-gradient(from 180deg, var(--accent), transparent 30%, var(--accent-2), transparent 70%, var(--accent));
  opacity: 0.55;
  filter: blur(18px);
  animation: spin 14s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.hero__badge {
  position: absolute;
  left: -18px;
  bottom: 28px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}
.hero__badge svg {
  color: var(--accent);
}

@media (max-width: 860px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero__photo {
    order: -1;
    width: min(70%, 280px);
  }
  .hero__badge {
    left: 50%;
    bottom: -16px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__ring,
  .caret {
    animation: none;
  }
}
</style>
