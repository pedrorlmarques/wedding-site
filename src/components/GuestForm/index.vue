<!-- <template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="nameValue" />
    <span>{{ nameError }}</span>
    <input type="text" v-model="restrictionsValue" />
    <div class="grid grid-cols-2 gap-6">
      <button type="button" class="cancel-guest-btn" @click="resetForm()">
        <CancelSVG class="cancel-svg" />
      </button>
      <button type="submit" class="add-guest-btn">
        <CheckSVG class="check-svg" />
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: false },
  restrictions: { type: String, required: false },
});

const initialValues: Guest = reactive({
  name: props.name || "",
  restrictions: props.restrictions || "",
});

const { handleSubmit, isSubmitting, resetForm } = useForm<Guest>({
  initialValues,
});
const { value: nameValue, errorMessage: nameError } = useField(
  "name",
  yup.string().required()
);
const { value: restrictionsValue, errorMessage: restrictionsError } =
  useField("restrictions");

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

const isFormValid = computed(() => !isSubmitting.value && !nameError.value);
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
</style>
 -->
