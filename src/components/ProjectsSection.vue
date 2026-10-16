<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import SectionHeader from './SectionHeader.vue'
import { useGithubRepos } from '../composables/useGithubRepos'
import { featuredRepos, profile } from '../data/profile'

const { repos, loading } = useGithubRepos(profile.github, featuredRepos)

const langColors: Record<string, string> = {
  Java: '#e76f00',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#663399',
  C: '#8a8a8a',
  Python: '#3572a5',
}

// "Sistema-banco-Java-" -> "Sistema banco Java"; "SmartShoppingJava" -> "Smart Shopping Java"
const formatName = (name: string) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(new Date(iso))
</script>

<template>
  <section id="projetos" class="section">
    <div class="container">
      <SectionHeader
        index="04"
        title="Projetos"
        subtitle="Alguns dos projetos que construí estudando e praticando. Os dados vêm direto do meu GitHub."
      />

      <div v-if="loading" class="projects">
        <div v-for="n in 3" :key="n" class="card skeleton" />
      </div>

      <div v-else class="projects">
        <article v-for="(r, i) in repos" :key="r.id" v-reveal="i * 80" class="card project">
          <div class="project__top">
            <AppIcon name="github" :size="22" class="muted" />
            <span v-if="r.homepage" class="project__live mono">● no ar</span>
          </div>
          <h3>
            <a :href="r.html_url" target="_blank" rel="noopener" class="project__link">{{ formatName(r.name) }}</a>
          </h3>
          <p class="muted project__desc">{{ r.description || 'Sem descrição ainda.' }}</p>
          <footer class="project__foot">
            <div class="project__meta mono">
              <span v-if="r.language" class="project__lang">
                <span class="dot" :style="{ background: langColors[r.language] ?? 'var(--accent)' }" />
                {{ r.language }}
              </span>
              <span v-if="r.stargazers_count"><AppIcon name="star" :size="13" /> {{ r.stargazers_count }}</span>
              <span class="muted">{{ formatDate(r.updated_at) }}</span>
            </div>
            <a v-if="r.homepage" :href="r.homepage" target="_blank" rel="noopener" class="project__demo">
              Ver online <AppIcon name="external" :size="14" />
            </a>
          </footer>
        </article>
      </div>

      <div v-reveal class="projects__more">
        <a :href="`https://github.com/${profile.github}?tab=repositories`" target="_blank" rel="noopener" class="btn">
          <AppIcon name="github" :size="18" /> Ver todos no GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.project {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 230px;
}
.project:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklab, var(--accent) 40%, transparent);
  box-shadow: var(--shadow);
}
/* o card inteiro é clicável, mas o "Ver online" continua sendo um link próprio */
.project__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.project__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
}
.project__live {
  font-size: 0.72rem;
  color: #22c55e;
}
h3 {
  font-size: 1.12rem;
  margin-bottom: 0.5rem;
}
.project__desc {
  flex: 1;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.project__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.4rem;
}
.project__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 0.78rem;
}
.project__meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.project__demo {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent);
}
.project__demo:hover {
  text-decoration: underline;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.skeleton {
  min-height: 230px;
  background: linear-gradient(100deg, var(--surface) 30%, var(--surface-2) 50%, var(--surface) 70%);
  background-size: 300% 100%;
  animation: shimmer 1.4s infinite linear;
}
@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}
.projects__more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
