<template>
  <main>
    <Timer />
    <InvitationForm />
  </main>
</template>
<script setup>
import Timer from "@components/Timer/index.vue";
import InvitationForm from "@components/InvitationForm/index.vue";
</script>
<style scoped lang="postcss">
main {
  @apply flex flex-col items-center justify-center min-h-screen h-full bg-secondary-50;
}
</style>
