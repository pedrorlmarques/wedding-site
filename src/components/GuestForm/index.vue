<template>
  <input
    type="text"
    name="name"
    placeholder="Nome do Convidado"
    v-model="guest.name"
  />
  <textarea
    type="text"
    name="restrictions"
    placeholder="Escreve as restricções alimentares ou uma outra observação aqui..."
    v-model="guest.restrictions"
  />
  <div class="grid grid-cols-2 gap-6">
    <button
      type="button"
      class="cancel-guest-btn"
      @click="removeGuest(guest)"
      :disabled="!guest.name.trim()"
    >
      <CancelSVG class="cancel-svg" />
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
