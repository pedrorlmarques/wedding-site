<template>
  <form @submit="handleInvitation" v-if="!isLoading">
    <div>
      <label for="name">Convidado <span class="text-red-600">*</span></label>
      <template v-if="invitedPerson.user && invitedPerson.user.added">
        <GuestAccordion
          :index="0"
          :guest="invitedPerson.user"
          :toggle-accordion="toggleAccordion"
          :edited-guest="editedGuest"
        />
      </template>
      <template v-else>
        <GuestForm
          :index="0"
          :guest="invitedPerson.user"
          :remove-guest="cancelGuest"
          :accept-guest="() => acceptGuest(invitedPerson.user, true)"
        />
      </template>
    </div>
    <div>
      <label for="guests">Outros Convidados</label>
      <div
        v-show="invitedPerson.guests.length === 0"
        class="alert alert-warning"
        role="alert"
      >
        <WarningIcon class="w-5 h-5 mr-3 flex-shrink-0" />
        <p class="description">
          <span class="font-extrabold">Atenção!</span>
          É importante mencionar as restrições alimentares caso existam.
        </p>
      </div>
      <div
        class="accordion"
        id="accordion-collapse"
        data-accordion="collapse"
        v-for="(guest, guestIdx) in invitedPerson.guests"
      >
        <template v-if="guest.added">
          <GuestAccordion
            :index="guestIdx"
            :guest="guest"
            :edited-guest="editedGuest"
            :remove-guest="removeGuest"
            :toggle-accordion="toggleAccordion"
          />
        </template>
        <template v-else>
          <GuestForm
            :index="guestIdx"
            :guest="guest"
            :remove-guest="cancelGuest"
            :accept-guest="() => acceptGuest(guest)"
          />
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
    </div>
    <button
      type="submit"
      class="send-btn"
      :disabled="!(FormMeta.dirty && FormMeta.valid)"
    >
      Confirmar
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

import WarningIcon from "@assets/warning.svg?component";

import GuestAccordion from "@/components/GuestAccordion/index.vue";
import GuestForm from "@/components/GuestForm/index.vue";

import PlusSVG from "@/assets/plus.svg?component";

import { useAuth } from "@/composables/useAuth";
import { useConfirmations } from "@/composables/useConfirmations";

const isLoading = ref(true);
const newPerson = ref(true);

const { userSession } = useAuth();
const { addNewGuests, updateGuests, getConfirmations } = useConfirmations();

const invitedPerson = ref<InvitedPerson>({
  user: {
    name: "",
    restrictions: "",
    isOpen: false,
    added: true,
  },
  guests: [],
});

// Form
const schema = {
  user: yup.object().shape({
    name: yup.string(),
    restrictions: yup.string(),
  }),
  guests: yup.array().of(
    yup
      .object()
      .shape({
        name: yup.string(),
        restrictions: yup.string(),
      })
      .nullable()
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

const acceptGuest = (guest: Guest, isUser?: boolean) => {
  guest.added = true;
  if (isUser) {
    invitedPerson.value.user = guest;
    setFieldValue("user", invitedPerson.value.user);
    return;
  }
  setFieldValue("guests", invitedPerson.value.guests);
};

const editedGuest = (guest: Guest) => {
  guest.added = false;
};

const cancelGuest = (guest: Guest) => {
  invitedPerson.value.guests.splice(
    invitedPerson.value.guests.indexOf(guest),
    1
  );
  guest.added = true;
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

  resetForm({ values });
});

onMounted(async () => {
  const result = await getConfirmations(userSession.value?.user.id);
  if (result != null) {
    const oldUser = {
      ...result.user,
      name:
        userSession.value?.user.user_metadata.name ||
        userSession.value?.user.user_metadata.full_name ||
        "",
      added: true,
      isOpen: false,
    };
    const oldGuests = result.guests.map((guest) => ({
      ...guest,
      added: true,
      isOpen: false,
    }));
    invitedPerson.value.user = oldUser as UserForInvitation;
    invitedPerson.value.guests = oldGuests;
    newPerson.value = false;
    setFieldValue("user", invitedPerson.value.user);
    setFieldValue("guests", invitedPerson.value.guests);
    resetForm({
      values: invitedPerson.value,
    });
  } else {
    const name =
      userSession.value?.user.user_metadata.name ||
      userSession.value?.user.user_metadata.full_name ||
      "";
    newPerson.value = true;
    setFieldValue("user", {
      name,
      restrictions: "",
      isOpen: false,
      added: true,
    });
    invitedPerson.value.user.name = name;
  }
  isLoading.value = false;
});
</script>

<style lang="postcss" scoped>
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

button[type="button"],
button[type="submit"] {
  @apply px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 m-0;

  &.send-btn {
    @apply w-full rounded-none shadow-none bg-secondary-500 hover:bg-secondary-600;

    &[disabled] {
      @apply bg-secondary-100 cursor-not-allowed;
    }
  }

  &.add-new-guest-btn {
    @apply w-full rounded-none shadow-none bg-transparent;

    & svg.plus-svg {
      @apply w-6 h-6 mx-auto;

      & .st0 {
        @apply fill-black;
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
</style>
