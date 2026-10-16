<script setup lang="ts">
defineProps<{ index: string; title: string; subtitle?: string }>()
</script>

<template>
  <div v-reveal class="section-header">
    <span class="mono section-header__index">{{ index }}</span>
    <h2>{{ title }}</h2>
    <p v-if="subtitle" class="muted">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: 2.75rem;
}
.section-header__index {
  color: var(--accent);
  font-size: 0.85rem;
}
h2 {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  letter-spacing: -0.03em;
  margin: 0.35rem 0 0.5rem;
}
p {
  max-width: 36rem;
}
</style>
