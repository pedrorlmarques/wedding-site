<template>
  <main>
    <section>
      <Navigation />
      <slot />
    </section>
  </main>
</template>

<script setup>
import Navigation from "@/components/Navigation/index.vue";
</script>

<style lang="postcss" scoped>
main {
  @apply flex flex-col min-h-screen bg-secondary-50 w-full;
}

section {
  @apply max-w-7xl mx-auto relative w-full;
}
</style>
