import { computed, ref } from "vue";
import { useToast, POSITION } from "vue-toastification";
import { supabase } from "@/composables/useSupabase";
import { Session, Provider } from "@supabase/gotrue-js/dist/main/lib/types";

const userSession = ref<Session | null>(null);

const toast = useToast();

export const useConfirmations = () => {
  /**
   * Success toast
   */
  const successToast = computed(() => (message: string) => {
    toast.success(message, {
      position: POSITION.TOP_RIGHT,
    });
  });

  /**
   * Error toast
   */
  const errorToast = computed(() => (message: string) => {
    toast.error(message, {
      position: POSITION.TOP_RIGHT,
    });
  });

  /**
   *
   * Handle API call
   *
   * @param apiCallback
   * @param successMessage
   * @param errorMessage
   * @returns
   */
  const handleApiCall = async (
    apiCallback: () => Promise<any>,
    successMessage?: string,
    errorMessage?: string
  ) => {
    try {
      const { status, data } = await apiCallback();
      if ((status === 200 || status === 204) && successMessage)
        successToast.value(successMessage);
      if (status === 400 && errorMessage) errorToast.value(errorMessage);
      if (status === 400) throw new Error(errorMessage);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addNewGuests = async (userWithGuests: InvitedPerson) => {
    return await handleApiCall(
      () =>
        // @ts-ignore
        supabase
          .from("confirmations")
          .insert({
            user_id: userWithGuests.uuid,
            companions: JSON.stringify(userWithGuests.guests),
          })
          .single(),
      "Os teus convidados já foram adicionados à lista de confirmações e com as devidas observações. Obrigado!",
      "Ocorreu um erro ao adicionar os convidados à lista de confirmações. Por favor, tenta novamente."
    );
  };

  const updateGuests = async (userWithGuests: InvitedPerson) => {
    return await handleApiCall(
      () =>
        // @ts-ignore
        supabase
          .from("confirmations")
          .update({
            user_id: userWithGuests.uuid,
            companions: JSON.stringify(userWithGuests.guests),
          })
          .eq("user_id", userWithGuests.uuid),
      "A tua lista de convidados foi atualizado com sucesso! Obrigado!",
      "Ocorreu um erro ao remover os convidados da lista de confirmações. Por favor, tenta novamente."
    );
  };

  const getConfirmations = async (userId: string) => {
    return await handleApiCall(() =>
      // @ts-ignore
      supabase.from("confirmations").select("*").eq("user_id", userId)
    );
  };

  return {
    userSession,
    addNewGuests,
    updateGuests,
    getConfirmations,
  };
};
