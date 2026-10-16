<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { experiences } from '../data/profile'

// Calcula o tempo de casa automaticamente a partir da data de início
function tenure(start: string): string {
  const [y, m] = start.split('-').map(Number) as [number, number]
  const now = new Date()
  const months = Math.max(1, (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m) + 1)
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
  if (rest) parts.push(`${rest} ${rest === 1 ? 'mês' : 'meses'}`)
  return parts.join(' e ')
}

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`
// "Grupo Benenutri" -> "B" (ignora palavras genéricas)
const initial = (company: string) =>
  (company.split(' ').find((w) => !/^(grupo|empresa|the)$/i.test(w)) ?? company).charAt(0).toUpperCase()
</script>

<template>
  <section id="experiencia" class="section">
    <div class="container">
      <SectionHeader index="02" title="Experiência" subtitle="Onde aplico no dia a dia o que estudo." />

      <ol class="timeline">
        <li v-for="(exp, i) in experiences" :key="exp.company + exp.role" v-reveal="i * 120" class="timeline__item">
          <span class="timeline__dot" :class="{ 'timeline__dot--live': exp.current }" aria-hidden="true" />
          <article class="card exp">
            <header class="exp__head">
              <div class="exp__id">
                <component
                  :is="exp.url ? 'a' : 'div'"
                  :href="exp.url"
                  target="_blank"
                  rel="noopener"
                  class="exp__logo"
                  :aria-label="`Site da ${exp.company}`"
                >
                  <img v-if="exp.logo" :src="asset(exp.logo)" :alt="`Logo ${exp.company}`" />
                  <span v-else>{{ initial(exp.company) }}</span>
                </component>
                <div>
                  <h3>{{ exp.role }}</h3>
                  <p class="exp__company">{{ exp.company }}</p>
                </div>
              </div>
              <div class="exp__meta mono">
                <span>{{ exp.period }}</span>
                <span class="muted">{{ tenure(exp.start) }} · {{ exp.location }}</span>
              </div>
            </header>

            <p class="exp__summary">{{ exp.summary }}</p>

            <ul class="exp__list">
              <li v-for="h in exp.highlights" :key="h">{{ h }}</li>
            </ul>

            <div class="chips">
              <span v-for="s in exp.stack" :key="s" class="chip">{{ s }}</span>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: linear-gradient(var(--accent), var(--line) 60%);
}
.timeline__item {
  position: relative;
  padding-left: 2.25rem;
}
.timeline__item + .timeline__item {
  margin-top: 1.5rem;
}
.timeline__dot {
  position: absolute;
  left: 0;
  top: 1.8rem;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
}
.timeline__dot--live {
  background: var(--accent);
  box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 60%, transparent);
  animation: pulse 2.2s infinite;
}
@keyframes pulse {
  70% {
    box-shadow: 0 0 0 12px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
.exp__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.exp__id {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.25rem;
}
.exp__logo {
  flex: none;
  display: grid;
  place-items: center;
  min-width: 60px;
  height: 60px;
  padding: 0 18px;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: 0 6px 20px -8px rgb(0 0 0 / 0.35);
  transition: transform 0.2s;
}
a.exp__logo:hover {
  transform: translateY(-2px);
}
.exp__logo img {
  height: 36px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
}
.exp__logo span {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0b0d10;
}
h3 {
  font-size: 1.3rem;
}
.exp__company {
  color: var(--accent);
  font-weight: 500;
}
.exp__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.82rem;
  gap: 0.2rem;
}
.exp__summary {
  margin-bottom: 1rem;
}
.exp__list {
  display: grid;
  gap: 0.55rem;
  padding: 0;
  margin: 0 0 1.4rem;
  list-style: none;
}
.exp__list li {
  position: relative;
  padding-left: 1.3rem;
  color: var(--muted);
}
.exp__list li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--accent);
}
@media (max-width: 640px) {
  .exp__meta {
    align-items: flex-start;
  }
}
@media (prefers-reduced-motion: reduce) {
  .timeline__dot--live {
    animation: none;
  }
}
</style>
