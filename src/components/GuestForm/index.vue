<template>
  <input type="text" name="name" placeholder="Nome" v-model="guest.name" />
  <textarea
    type="text"
    name="restrictions"
    placeholder="Escreva as restrições alimentares ou qualquer outra observação"
    v-model="guest.restrictions"
  />
  <div class="grid grid-cols-2 gap-6">
    <button
      type="button"
      class="cancel-guest-btn"
      @click="removeGuest(guest)"
      :disabled="!guest.name.trim()"
    >
      <CancelSVG class="cancel-svg fill-white" />
    </button>
    <button
      type="button"
      class="add-guest-btn"
      @click="acceptGuest(guest)"
      :disabled="!guest.name.trim()"
    >
      <CheckSVG class="check-svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import CheckSVG from "@/assets/check.svg?component";
import CancelSVG from "@/assets/cancel.svg?component";

defineProps<{
  guest: Guest;
  index: number;
  acceptGuest: (guest: Guest, isUser?: boolean) => void;
  removeGuest: (guest: Guest) => void;
}>();
</script>

<style lang="postcss" scoped>
div {
  & label {
    @apply text-sm font-bold text-gray-700 text-left;
  }

  & input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none;
  }

  & textarea {
    @apply block px-4 py-2 w-full text-gray-900 rounded-lg border border-gray-300;
  }
}

button[type="button"],
button[type="submit"] {
  @apply px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 m-0;

  &[disabled] {
    @apply bg-primary-100 cursor-not-allowed;
  }

  &.add-new-guest-btn {
    @apply w-full rounded-none shadow-none bg-transparent;
  }

  &.accordion-btn {
    @apply w-full flex justify-between rounded-none bg-transparent shadow-transparent text-secondary-600 hover:bg-secondary-50 border-b-secondary-200 border-b;
  }

  &.send-btn {
    @apply w-full rounded-none shadow-none bg-secondary-500 hover:bg-secondary-600;

    &[disabled] {
      @apply bg-secondary-100 cursor-not-allowed;
    }
  }

  & svg.plus-svg {
    @apply w-6 h-6 mx-auto;

    & .st0 {
      @apply fill-black;
    }
  }
  &&&.cancel-guest-btn {
    @apply w-full rounded-none bg-red-600 mt-0 shadow-none;

    &[disabled] {
      @apply bg-red-200 cursor-not-allowed;
    }

    & svg.cancel-svg {
      @apply w-6 h-6 mx-auto;
    }
  }

  &&&.add-guest-btn {
    @apply w-full rounded-none bg-primary-600 mt-0 shadow-none;

    &[disabled] {
      @apply bg-primary-200 cursor-not-allowed;
    }

    & .check-svg {
      @apply w-6 h-6 mx-auto;
    }
  }
}
</style>
