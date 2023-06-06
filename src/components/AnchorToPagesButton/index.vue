<template>
  <router-link v-if="path" :to="path" custom v-slot="{ navigate }">
    <button @click="navigate" class="btn anchor-wrapper" :disabled="disabled">
      <slot name="icon"></slot>
      <h5>{{ title }}</h5>
      <p>
        <slot name="description"></slot>
      </p>
      <router-link
        :to="path"
        class="anchor-link"
        :disabled="disabled"
        :class="{ 'cursor-not-allowed': disabled }"
      >
        Veja aqui
        <svg
          class="open-svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
          ></path>
          <path
            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
          ></path>
        </svg>
      </router-link>
    </button>
  </router-link>
  <a v-else :href="href" class="btn anchor-wrapper" :target="target">
    <slot name="icon"></slot>
    <h5>{{ title }}</h5>
    <p>
      <slot name="description"></slot>
    </p>
    <a
      :href="href"
      class="anchor-link"
      :target="target"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      Veja aqui
      <svg
        class="open-svg"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
        ></path>
        <path
          d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
        ></path>
      </svg>
    </a>
  </a>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: false,
  },
  target: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="postcss">
button.anchor-wrapper,
a.anchor-wrapper {
  @apply w-full flex flex-col justify-items-center items-start p-6 bg-white border border-gray-200 rounded-lg shadow my-4 no-underline text-left;

  &[disabled] {
    @apply bg-gray-100 opacity-50 cursor-not-allowed;

    .anchor-link {
      @apply text-gray-200 hover:no-underline cursor-not-allowed;
    }
  }

  & a {
    @apply no-underline;
  }

  & svg {
    @apply w-10 h-10 mb-2 text-gray-500 fill-gray-500;
  }

  & h5 {
    @apply mb-2 text-2xl font-semibold tracking-tight text-gray-900;
  }

  & p {
    @apply mb-3 font-normal text-gray-500;
  }

  .anchor-link {
    @apply inline-flex items-center text-primary-600 hover:underline mt-auto;
  }

  & svg.open-svg {
    @apply w-5 h-5 ml-2 mb-0;
  }
}
</style>
