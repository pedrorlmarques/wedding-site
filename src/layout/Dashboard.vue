<template>
  <main>
    <Navigation />
    <slot />
  </main>
</template>

<script setup>
import Navigation from "@/components/Navigation/index.vue";
</script>

<style lang="postcss">
body {
  @apply bg-secondary-50;
}

main {
  @apply flex flex-col min-h-screen mx-auto bg-secondary-50;
}
</style>
