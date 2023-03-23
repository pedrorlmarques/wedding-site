<template>
  <div class="countdown">
    <div class="block">
      <p class="digit">{{ date.days }}</p>
      <p class="text">Dias</p>
    </div>
    <div class="block">
      <p class="digit">{{ date.hours }}</p>
      <p class="text">Horas</p>
    </div>
    <div class="block">
      <p class="digit">{{ date.minutes }}</p>
      <p class="text">Minutos</p>
    </div>
    <div class="block">
      <p class="digit">{{ date.seconds }}</p>
      <p class="text">Segundos</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";

const date = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const calculateTimeLeft = () => {
  const difference = +new Date("2023-05-08T12:30:00") - +new Date();

  if (difference > 0) {
    date.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    date.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    date.minutes = Math.floor((difference / 1000 / 60) % 60);
    date.seconds = Math.floor((difference / 1000) % 60);
  }
};

onMounted(() => {
  calculateTimeLeft();
  setInterval(calculateTimeLeft, 1000);
});
</script>

<style scoped lang="postcss">
.countdown {
  @apply flex justify-center items-center space-x-4;

  & .block {
    @apply flex flex-col items-center !mx-8;

    & .digit {
      @apply text-6xl font-bold text-gray-900;
    }

    & .text {
      @apply text-xl text-secondary-500 mt-2 uppercase tracking-widest;
    }
  }
}
</style>
