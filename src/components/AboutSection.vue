<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { education, profile } from '../data/profile'
</script>

<template>
  <section id="sobre" class="section">
    <div class="container">
      <SectionHeader index="01" title="Sobre mim" />

      <div class="about">
        <div class="about__text">
          <p v-for="(p, i) in profile.about" :key="i" v-reveal="i * 100">{{ p }}</p>
        </div>

        <aside class="about__side">
          <article v-for="(ed, i) in education" :key="ed.course" v-reveal="150 + i * 100" class="card">
            <span class="mono tag">Formação</span>
            <h3>{{ ed.course }}</h3>
            <p class="about__inst">{{ ed.institution }} · <span class="accent">{{ ed.status }}</span></p>
            <p class="muted">{{ ed.description }}</p>
          </article>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2.5rem;
  align-items: start;
}
.about__text p {
  font-size: 1.12rem;
  margin-bottom: 1.2rem;
}
.about__side {
  display: grid;
  gap: 1rem;
}
h3 {
  font-size: 1.25rem;
  margin: 0.9rem 0 0.25rem;
}
.about__inst {
  font-weight: 500;
  margin-bottom: 0.8rem;
}
@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
