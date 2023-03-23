<template>
  <div class="">
    <hr />
    <h3>Nós vamo-nos casar</h3>
    <div class="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
      <div>
        <glassShoe class="img" />
        <h2>Chegada dos convidados</h2>
        <p>
          Iremos ter aqui muita diversão, mas não podemos revelar tudo aqui. Vai
          ser um dia cheio de emoções
        </p>
      </div>
      <div>
        <church class="img" />
        <h2>Cerimónia</h2>
        <p>
          Vamos casar-nos pela igreja. Vai ser um dia muito especial para nós.
        </p>
      </div>
      <div>
        <camera class="img" />
        <h2>Tira fotos!</h2>
        <p>
          Sim sim, podes tirar fotos! Até temos aqui esta página onde podes
          fazer upload das fotos que vais tirando ao longo do dia!
        </p>
      </div>
      <div>
        <cake class="img" />
        <h2>Bolo do Casamento</h2>
        <p>
          Até que chega o momento mais esperado do dia, o bolo do casamento!
        </p>
      </div>
    </div>
    <h1>Vens ao nosso Casamento?</h1>
    <FormKit type="form" :actions="false">
      <div>
        <label for="email">Nome Completo</label>
        <FormKit
          type="email"
          name="email"
          id="email"
          placeholder="O seu nome"
        />
      </div>
      <div>
        <label for="guests">Convidados</label>
        <FormKit type="group" v-for="(guest, idx) in invitedPerson.guests">
          <FormKit
            :key="idx"
            type="text"
            name="guest-name"
            placeholder="Nome do Convidado"
            v-model="guest.value"
          />
        </FormKit>
      </div>
      <button type="button" @click="addGuestInput">Adicionar convidado</button>
    </FormKit>
  </div>
</template>
<script setup>
import { ref } from "vue";

import glassShoe from "@/assets/glass-shoe.svg?component";
import church from "@/assets/church.svg?component";
import camera from "@/assets/camera.svg?component";
import cake from "@/assets/cake.svg?component";

const invitedPerson = ref({
  name: "",
  guests: [{ value: "" }],
});

const addGuestInput = () => {
  invitedPerson.value.guests.push({ value: "" });
};
</script>
<style lang="postcss">
hr {
  @apply border-[0.02rem] border-gray-300 my-8;
}
h3 {
  @apply text-3xl font-bold text-center my-8;
}

h1 {
  @apply text-4xl font-bold text-center my-8;
}

form {
  @apply flex flex-col items-center w-full max-w-lg mx-auto space-y-4;

  & div {
    @apply flex flex-col w-full space-y-2;

    & label {
      @apply text-sm font-bold text-gray-700;
    }

    & input {
      @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none;
    }
  }
}

.grid {
  & > div {
    @apply flex flex-col items-center justify-center p-4 space-y-4 text-center bg-white rounded-lg shadow-lg;
  }
}

.img {
  @apply w-24 h-24 mx-auto;
  & .st0 {
    @apply fill-primary-200;
  }

  & .cls-1 {
    @apply fill-none stroke-primary-200;
  }
}

button {
  @apply px-4 py-2 text-sm font-medium text-white !bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 mr-0 ml-auto;
}
</style>
