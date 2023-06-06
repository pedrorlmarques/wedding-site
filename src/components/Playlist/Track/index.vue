<template>
  <li class="flex flex-row items-center justify-start mt-4 border-b">
    <img
      :src="track.album.images[0].url"
      :alt="track.album.name"
      class="w-24 h-24 rounded-lg !my-4"
    />
    <div class="text-left ml-8">
      <p class="text-sm font-medium text-gray-900">
        {{ track.name }}
      </p>
      <p class="text-sm text-gray-500">{{ track.artists[0].name }}</p>
    </div>
    <div class="text-right ml-auto">
      <button type="button" @click="emit('delete', track.id)">
        <CancelSVG class="cancel-svg w-8 h-8 opacity-30 hover:opacity-100" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import CancelSVG from "@/assets/cancel.svg?component";
import type { PropType } from "vue";

const emit = defineEmits(["delete"]);

defineProps({
  track: {
    type: Object as PropType<Track>,
    required: true,
  },
});
</script>

<style></style>
