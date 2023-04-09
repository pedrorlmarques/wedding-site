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

const props = defineProps<{
  index: number;
  guest: Guest;
  toggleAccordion?: (guest: Guest) => void;
  editedGuest?: (guest: Guest) => void;
  removeGuest?: (guest: Guest) => void;
}>();
</script>

<style lang="postcss" scoped></style>
