<template>
  <!--  <div class="my-16">
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
    <h1>Vens ao nosso Casamento?</h1> -->
  <FormKit type="form" :actions="false" #default="{ state: { valid } }">
    <div>
      <label for="name"
        >Nome Completo <span class="text-red-500">*</span></label
      >
      <FormKit
        type="text"
        id="name"
        placeholder="O seu nome"
        validation="required"
        :validation-messages="{
          required: 'Por favor insira o seu nome',
        }"
        v-model="invitedPerson.name"
      />
    </div>
    <div>
      <label for="guests">Convidados</label>

      <div
        id="accordion-collapse"
        data-accordion="collapse"
        v-for="(guest, guestIdx) in invitedPerson.guests"
      >
        <template v-if="guest.added">
          <h2 class="m-0 p-0" :id="`accordion-${guestIdx}`">
            <button
              type="button"
              class="accordion-btn"
              @click="toggleAccordion(guest)"
              :data-accordion-target="`#accordion-${guestIdx}`"
              aria-expanded="true"
              :aria-controls="`accordion-${guestIdx}`"
            >
              <span>{{ guest.name }}</span>
              <Arrow
                class="w-6 h-6 shrink-0"
                :class="guest.isOpen ? ' rotate-180' : ''"
              />
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            :class="guest.isOpen ? '' : 'hidden'"
            :aria-labelledby="`accordion-${guestIdx}`"
          >
            <div class="p-2.5 px-0 border border-b-0 border-gray-200 text-left">
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                Observações: {{ guest.restrictions }}
              </p>
              <div class="flex flex-row">
                <button type="button" @click="() => (guest.added = false)">
                  Editar
                </button>
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-300"
                  @click="removeGuest(guestIdx)"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>

      <FormKit
        type="group"
        v-for="(guest, idx) in invitedPerson.guests"
        #default="{ state: { valid } }"
      >
        <template v-if="!guest.added">
          <FormKit
            :key="idx"
            type="text"
            name="guest-name"
            placeholder="Nome do Convidado"
            v-model="guest.name"
            validation="required"
            :validation-messages="{
              required: 'Por favor insira o nome do convidado',
            }"
          />
          <FormKit
            :key="idx"
            type="textarea"
            name="guest-restrictions"
            placeholder="Escreve as restricções alimentares ou uma outra observação aqui..."
            v-model="guest.restrictions"
          />
        </template>
        <button
          type="button"
          v-if="!guest.added"
          class="add-guest-btn"
          @click="addGuestInput(guest)"
          :disabled="!valid"
        >
          Adicionar convidado
        </button>
      </FormKit>
      <button
        type="button"
        class="add-guest-btn"
        v-if="!invitedPerson.guests.length || checkIfAllGuestsAreAdded()"
        @click="() => addNewGuest()"
      >
        Adicionar convidado
      </button>
    </div>
    <button
      type="button"
      class="send-btn"
      :disabled="!valid"
      @click="handleInvitation"
    >
      Enviar Lista de Convidados
    </button>
  </FormKit>
</template>
<script setup>
import { ref } from "vue";
import Arrow from "@assets/arrow-down-up.svg?component";

const invitedPerson = ref({
  name: "",
  guests: [],
});

const addGuestInput = (oldGuest) => {
  oldGuest.added = true;
};

const addNewGuest = () => {
  invitedPerson.value.guests.push({
    name: "",
    restrictions: "",
    added: false,
    isOpen: false,
  });
};

const removeGuest = (guestIdx) => {
  invitedPerson.value.guests.splice(guestIdx, 1);
};

const toggleAccordion = (guest) => {
  guest.isOpen = !guest.isOpen;
};

const checkIfAllGuestsAreAdded = () =>
  invitedPerson.value.guests?.every((guest) => guest.added);

const handleInvitation = () => {
  console.log(invitedPerson.value);
};
</script>
<style lang="postcss">
h1 {
  @apply text-4xl font-bold text-center my-8;
}

form {
  @apply flex flex-col items-center w-full max-w-lg mx-auto space-y-4;

  & div {
    @apply flex flex-col w-full space-y-2 text-sm;

    & label {
      @apply text-sm font-bold text-gray-700 text-left;
    }

    & input {
      @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none;
    }

    & textarea {
      @apply block px-4 py-2 w-full text-gray-900 rounded-lg border border-gray-300;
    }

    & .formkit-outer[data-invalid="true"] {
      & input {
        @apply border-red-500;
      }
    }

    & .formkit-messages {
      @apply p-0 m-0;

      & .formkit-message {
        @apply text-xs text-red-500 text-left list-none m-0;
      }
    }
  }
}

.accordion {
  @apply w-full max-w-2xl mx-auto;
  & > div {
    @apply mb-4;
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

button[type="button"] {
  @apply px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 m-0;

  &[disabled] {
    @apply bg-primary-100 cursor-not-allowed;
  }

  &.add-guest-btn {
    @apply w-full rounded-none shadow-none;
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
}
</style>
