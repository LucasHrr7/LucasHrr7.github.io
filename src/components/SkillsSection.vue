<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { skills } from '../data/profile'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <SectionHeader index="03" title="Skills" subtitle="Tecnologias e práticas que uso ou estou estudando." />

      <div class="skills">
        <article v-for="(g, i) in skills" :key="g.title" v-reveal="i * 90" class="card skills__card">
          <span class="mono tag">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ g.title }}</h3>
          <div class="chips">
            <span v-for="item in g.items" :key="item" class="chip">{{ item }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
.skills__card h3 {
  font-size: 1.15rem;
  margin: 0.9rem 0 1.1rem;
}
</style>
