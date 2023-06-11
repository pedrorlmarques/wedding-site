<template>
  <div>
    <h2 class="!m-0 p-0" :id="`accordion-${index}`">
      <button
        type="button"
        class="accordion-btn"
        :data-accordion-target="`#accordion-${index}`"
        aria-expanded="true"
        :aria-controls="`accordion-${index}`"
      >
        <span class="whitespace-nowrap">{{ guest.name }}</span>

        <div class="flex flex-row justify-end">
          <button
            v-if="toggleAccordion"
            type="button"
            class="arrow-btn"
            @click.prevent="toggleAccordion && toggleAccordion(guest)"
          >
            <Arrow :class="guest.isOpen ? ' rotate-180' : ''" />
          </button>
          <button
            v-if="editedGuest"
            type="button"
            class="edit-btn"
            @click.prevent="editedGuest && editedGuest(guest)"
          >
            <EditPencilSVG />
          </button>
          <button
            v-if="removeGuest"
            type="button"
            class="remove-btn"
            @click.prevent="removeGuest && removeGuest(guest)"
          >
            <DeleteSVG />
          </button>
        </div>
      </button>
    </h2>
    <div
      id="accordion-collapse-body-1"
      :class="guest.isOpen ? '' : 'hidden'"
      :aria-labelledby="`accordion-${index}`"
    >
      <div class="restrictions--wrapper">
        <p class="restrictions--description">
          {{
            guest.restrictions
              ? `Observações: ${guest.restrictions}`
              : "Sem observações"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Arrow from "@/assets/arrow-down-up.svg?component";
import EditPencilSVG from "@/assets/edit-pencil.svg?component";
import DeleteSVG from "@/assets/delete.svg?component";

defineProps<{
  index: number;
  guest: Guest;
  toggleAccordion?: (guest: Guest) => void;
  editedGuest?: (guest: Guest) => void;
  removeGuest?: (guest: Guest) => void;
}>();
</script>

<style lang="postcss" scoped>
div.accordion {
  @apply w-full;
  &&& h2 {
    @apply m-0 p-0;

    &:last-of-type {
      @apply mb-4;
    }
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

  &&&.edit-btn,
  &&&.remove-btn,
  &&&.arrow-btn {
    @apply w-6 h-6 bg-transparent shadow-none hover:opacity-50 mx-1 my-0 p-0;

    & svg {
      @apply w-6 h-6 text-secondary-500 mx-auto;

      & path {
        @apply stroke-secondary-500;
      }
    }

    &:last-of-type {
      @apply mr-0;
    }
  }

  &&&&.edit-btn {
    & svg {
      @apply fill-secondary-500;
    }
    & path {
      @apply stroke-none;
    }
  }

  &&&&.remove-btn {
    & svg {
      @apply h-5 w-5;

      & path {
        @apply stroke-secondary-500;
      }
    }
  }
}

.restrictions--wrapper {
  @apply p-0 px-4 text-left;

  &&& .restrictions--description {
    @apply mt-4 pb-4 text-gray-500;
  }
}
</style>
