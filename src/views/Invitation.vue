<template>
  <Dashboard>
    <article>
      <div>
        <h1 class="block mt-8">
          Recebeu um convite de <br />Maria Inês & Pedro
        </h1>
        <img src="@/assets/illustration-bg.png" />
        <ul class="!m-0 !p-0 list-none">
          <li class="flex !p-0 items-center text-left">
            <ClockIcon
              width="24"
              height="24"
              style="stroke-width: 1.5px; fill: none; stroke: black"
            />
            <span class="ml-4">Sábado, 5 de Agosto de 2023 - 12H30</span>
          </li>
          <li class="flex !p-0 items-center text-left">
            <ChurchIcon
              width="24"
              height="24"
              style="stroke-width: 1.5px; fill: none; stroke: black"
            />
            <a
              href="https://goo.gl/maps/opBnV4KxckzcAUxF7"
              target="_blank"
              class="ml-4"
              >Igreja de Santa Maria, R. Nossa Sra. do Castelo. 11, Sesimbra</a
            >
          </li>
          <li class="flex !p-0 items-center text-left">
            <RestaurantIcon width="24" height="24" />
            <a
              href="https://goo.gl/maps/YCLRwfW8HYerAGAH7"
              target="_blank"
              class="ml-4"
              >Halma - Estrada do Vale dos Barris, 2950-055 Palmela</a
            >
          </li>
        </ul>
      </div>
      <div>
        <p class="text-center md:text-left !mt-0">
          Insira o seu nome bem como as suas restrições alimentares e o mesmo
          para as pessoas que o acompanham.
        </p>
        <InvitationForm />
      </div>
    </article>
  </Dashboard>
</template>

<script setup lang="ts">
import ClockIcon from "@/assets/clock.svg?component";
import ChurchIcon from "@/assets/church.svg?component";
import RestaurantIcon from "@/assets/restaurant.svg?component";
</script>

<style lang="postcss" scoped>
&& article {
  @apply prose grid grid-cols-1 md:grid-cols-2 gap-4 text-center my-16 !px-2 md:px-0 !max-w-7xl items-start mt-16 md:mt-32;

  & img {
    @apply w-full mx-auto md:mr-auto h-auto my-16;
  }

  & h1 {
    @apply text-4xl font-bold text-gray-900;
  }
}

& button.btn {
  @apply flex justify-end items-center border border-primary-600 no-underline py-2 px-4 rounded mr-auto bg-transparent text-primary-600 shadow-none;

  & svg {
    @apply w-6 h-6 mr-2 stroke-primary-600;
  }

  &:hover {
    @apply bg-primary-600 text-white border-primary-600;

    & svg {
      @apply stroke-white;
    }
  }
}
</style>
