<template>
  <Dashboard>
    <article class="text-center my-60 mx-4">
      <h1 class="text-3xl mb-4 font-bold"> O melhor presente que nos podem dar é estarem presentes no nosso
        casamento.
      </h1>
      <p>
        No entanto se tiverem intenção de nos oferecer uma ajuda podem fazer das seguintes maneiras:
      </p>
      <br>
      <ul style="text-align: left; display: inline-block;">
        <li><b>IBAN: </b>
          <span
              @click="copyText"
              class="cursor-pointer underline text-primary-500"
          >{{ IBAN }}</span
          >
        </li>
        <li><b>MBWay:</b> 966836874 ou 912286911</li>
        <li><b>Numerário:</b> podem entregar a nós no dia do casamento</li>
      </ul>
    </article>
  </Dashboard>
</template>

<script setup lang="ts">
import {useToast} from 'vue-toastification';

const toast = useToast();
const IBAN = 'PT50 0018 0003 49646441020 71';

const copyText = () => {
  navigator.clipboard.writeText(IBAN);
  toast.success('Copiado!');
};
</script>

<style scoped></style>
