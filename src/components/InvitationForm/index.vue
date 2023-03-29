<template>
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
            <div class="restrictions--wrapper">
              <p class="restrictions--description">
                {{
                  guest.restrictions
                    ? `Observações: ${guest.restrictions}`
                    : "Sem observações"
                }}
              </p>
              <div class="flex flex-row justify-end">
                <button
                  type="button"
                  class="edit-btn"
                  @click="editedGuest(guest)"
                >
                  <EditPencilSVG />
                </button>
                <button
                  type="button"
                  class="remove-btn"
                  @click="removeGuest(guestIdx)"
                >
                  <DeleteSVG />
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
          <PlusSVG class="plus-svg" />
        </button>
      </FormKit>
      <button
        type="button"
        class="add-guest-btn"
        v-if="!invitedPerson.guests.length || checkIfAllGuestsAreAdded()"
        @click="() => addNewGuest()"
      >
        <PlusSVG class="plus-svg" />
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
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import PlusSVG from "@/assets/plus.svg?component";
import Arrow from "@/assets/arrow-down-up.svg?component";
import EditPencilSVG from "@/assets/edit-pencil.svg?component";
import DeleteSVG from "@/assets/delete.svg?component";
import { useAuth } from "@/composables/useAuth";
import { useConfirmations } from "@/composables/useConfirmations";
import { useRouter } from "vue-router";

const router = useRouter();
const { userSession } = useAuth();
const { addNewGuests, getConfirmations, updateGuests } = useConfirmations();

const guestId = ref<string>("");
const invitedPerson = reactive<InvitedPerson>({
  name: userSession.value?.user.user_metadata.full_name || "",
  uuid: userSession.value?.user.id,
  guests: [],
});

const addGuestInput = (guest: Guest) => {
  guest.added = true;
};

const addNewGuest = () => {
  const newGuest: Guest = {
    name: "",
    restrictions: "",
    added: false,
    isOpen: false,
  };
  invitedPerson.guests = [...invitedPerson.guests, newGuest];
};

const editedGuest = (guest: Guest) => {
  guest.added = false;
};

const removeGuest = (guestIndex: Number) => {
  invitedPerson.guests.splice(Number(guestIndex), 1);
};

const toggleAccordion = (guest: Guest) => {
  guest.isOpen = !guest.isOpen;
};

const checkIfAllGuestsAreAdded = () =>
  invitedPerson.guests?.every((guest) => guest.added);

const handleInvitation = async () => {
  if (!guestId.value) {
    await addNewGuests(invitedPerson);
  } else {
    await updateGuests(invitedPerson);
  }

  // router.push("/");
};

const updateGuestsOnForm = (guests: GuestsFromDB[]) => {
  const companionFromDB = guests[0]?.companions;
  invitedPerson.guests = companionFromDB ? JSON.parse(companionFromDB) : [];
};

onMounted(async () => {
  if (invitedPerson.uuid) {
    const getAllPastInvitedGuests: GuestsFromDB[] = await getConfirmations(
      invitedPerson.uuid
    );

    if (getAllPastInvitedGuests.length) {
      guestId.value = getAllPastInvitedGuests[0].id;
    }

    updateGuestsOnForm(getAllPastInvitedGuests);
  }
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
    @apply m-0 py-4 text-gray-500;
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

  & svg.plus-svg {
    @apply w-6 h-6 mx-auto;

    & .st0 {
      @apply fill-white;
    }
  }

  &&&.edit-btn,
  &&&.remove-btn {
    @apply w-12 h-12 bg-transparent shadow-none hover:opacity-50 m-0 p-0;

    & svg {
      @apply w-8 h-8 text-secondary-500 mx-auto;
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
