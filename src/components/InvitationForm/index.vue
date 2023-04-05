<template>
  <form @submit.prevent="handleInvitation" v-if="!isLoading">
    <div>
      <label for="name"
        >Nome Completo <span class="text-red-600">*</span></label
      >
      <input
        type="text"
        placeholder="O seu nome"
        v-model="invitedPerson.name"
      />
    </div>
    <div>
      <label for="guests">Convidados</label>

      <div
        v-show="invitedPerson.guests.length === 0"
        class="alert alert-warning"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Info</span>
        <p class="description">
          <span class="font-medium">Atenção!</span>
          Este aviso aparece apenas caso não queiras mesmo levar convidados, e
          quando adicionares não te esqueças de referir as suas
          <strong>restrições alimentares</strong> ou outras observações.
        </p>
      </div>
      <div
        class="accordion"
        id="accordion-collapse"
        data-accordion="collapse"
        v-for="(guest, guestIdx) in invitedPerson.guests"
      >
        <template v-if="guest.added">
          <h2 class="m-0 p-0" :id="`accordion-${guestIdx}`">
            <button
              type="button"
              class="accordion-btn"
              @click.prevent="toggleAccordion(guest)"
              :data-accordion-target="`#accordion-${guestIdx}`"
              aria-expanded="true"
              :aria-controls="`accordion-${guestIdx}`"
            >
              <span class="whitespace-nowrap">{{ guest.name }}</span>

              <div class="flex flex-row justify-end">
                <button type="button" class="arrow-btn">
                  <Arrow :class="guest.isOpen ? ' rotate-180' : ''" />
                </button>
                <button
                  type="button"
                  class="edit-btn"
                  @click.prevent="editedGuest(guest)"
                >
                  <EditPencilSVG />
                </button>
                <button
                  type="button"
                  class="remove-btn"
                  @click.prevent="removeGuest(guest)"
                >
                  <DeleteSVG />
                </button>
              </div>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            :class="guest.isOpen ? '' : 'hidden'"
            :aria-labelledby="`accordion-${guestIdx}`"
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
        </template>
        <template v-else>
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
            >
              <CancelSVG class="cancel-svg" />
            </button>
            <button
              type="button"
              class="add-guest-btn"
              @click="acceptGuest(guest)"
              :disabled="!guest.name"
            >
              <CheckSVG class="check-svg" />
            </button>
          </div>
        </template>
      </div>
      <template></template>
      <button
        type="button"
        class="add-new-guest-btn"
        v-if="!invitedPerson.guests.length || checkIfAllGuestsAreAdded()"
        @click="addNewGuest()"
      >
        <PlusSVG class="plus-svg" />
      </button>
      <template> </template>
    </div>
    <button type="submit" class="send-btn" :disabled="!FormMeta.dirty">
      Enviar Lista de Convidados
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

import PlusSVG from "@/assets/plus.svg?component";
import Arrow from "@/assets/arrow-down-up.svg?component";
import EditPencilSVG from "@/assets/edit-pencil.svg?component";
import DeleteSVG from "@/assets/delete.svg?component";
import CheckSVG from "@/assets/check.svg?component";
import CancelSVG from "@/assets/cancel.svg?component";

import { useAuth } from "@/composables/useAuth";
import { useConfirmations } from "@/composables/useConfirmations";

const isLoading = ref(true);
const newPerson = ref(true);

const { userSession } = useAuth();
const { addNewGuests, updateGuests, getConfirmations } = useConfirmations();

const invitedPerson = ref<InvitedPerson>({
  name:
    userSession.value?.user.user_metadata.name ||
    userSession.value?.user.user_metadata.full_name ||
    "",
  guests: [],
});

// Form
const schema = {
  name: yup.string().required("O nome é obrigatório"),
  guest: yup.array().of(
    yup.object().shape({
      name: yup.string().required("O nome é obrigatório"),
      restrictions: yup.string(),
    })
  ),
};

const {
  handleSubmit,
  resetForm,
  meta: FormMeta,
  setFieldValue,
} = useForm<InvitedPerson>({
  initialValues: invitedPerson.value,
  validateOnMount: true,
  validationSchema: schema,
});

const addNewGuest = () => {
  invitedPerson.value.guests.push({
    name: "",
    restrictions: "",
    added: false,
    isOpen: false,
  });
};

const acceptGuest = (guest: Guest) => {
  guest.added = true;
  guest.isOpen = false;
  setFieldValue("guests", invitedPerson.value.guests);
};

const editedGuest = (guest: Guest) => {
  guest.added = false;
};

const removeGuest = (guest: Guest) => {
  invitedPerson.value.guests.splice(
    invitedPerson.value.guests.indexOf(guest),
    1
  );
  setFieldValue("guests", invitedPerson.value.guests);
};

const toggleAccordion = (guest: Guest) => {
  guest.isOpen = !guest.isOpen;
};

const checkIfAllGuestsAreAdded = () =>
  invitedPerson.value.guests?.every((guest) => guest.added);

const handleInvitation = handleSubmit(async (values) => {
  if (!userSession.value?.user.id) return;
  if (newPerson.value) {
    await addNewGuests(invitedPerson.value, userSession.value?.user.id);
    newPerson.value = false;
  } else {
    await updateGuests(invitedPerson.value, userSession.value?.user.id);
  }

  resetForm({ values: invitedPerson.value });
});

onMounted(async () => {
  const result = await getConfirmations(userSession.value?.user.id);
  if (result != null) {
    const newGuests = result.map((guest) => ({
      ...guest,
      added: true,
      isOpen: false,
    }));
    invitedPerson.value.guests = newGuests;
    newPerson.value = false;
  } else {
    newPerson.value = true;
  }
  isLoading.value = false;
  resetForm({ values: invitedPerson.value });
});
</script>

<styles lang="postcss" scoped>
form {
  @apply flex flex-col items-center w-full mx-auto space-y-4;

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

h1 {
  @apply text-4xl font-bold text-center my-8;
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

div.accordion {
  @apply w-full;
  &&& h2 {
    @apply m-0 p-0;

    &:last-of-type {
      @apply mb-4;
    }
  }
}

.restrictions--wrapper {
  @apply p-0 px-4 text-left;

  &&& .restrictions--description {
    @apply m-0 pb-4 text-gray-500;
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
    }
  }

  &&&.cancel-guest-btn {
    @apply w-full rounded-none bg-red-600 mt-0 shadow-none;

    &[disabled] {
      @apply bg-red-200 cursor-not-allowed;
    }

    & .cancel-svg {
      @apply w-6 h-6 mx-auto;

      & path {
        @apply fill-white;
      }
    }
  }

  &&&.add-guest-btn {
    @apply w-full rounded-none bg-primary-600 mt-0 shadow-none;

    &[disabled] {
      @apply bg-primary-200 cursor-not-allowed;
    }

    & .check-svg {
      @apply w-6 h-6 mx-auto;

      & path {
        @apply stroke-white;
      }
    }
  }
}

div.alert {
  @apply flex flex-row text-left justify-start items-center p-4 mt-0 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50;

  & p.description {
    @apply m-0;

    & span {
      @apply block;
    }

    && strong {
      @apply text-secondary-600 font-extrabold;
    }
  }
}
</styles>
