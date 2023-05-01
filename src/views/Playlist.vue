<template>
  <Dashboard>
    <div class="wrapper">
      <EmbeddedPlaylist />
      <SearchForm />
    </div>
  </Dashboard>
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply prose grid grid-cols-1 md:grid-cols-2 gap-4 my-16 !px-2 md:px-0 !max-w-7xl items-start mt-16 md:mt-32;
}
</style>
