import { computed, ref, Ref } from "vue";
import { useToast, POSITION } from "vue-toastification";
import { supabase } from "@/composables/useSupabase";

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
      if (
        (status === 200 || status === 204 || status === 201) &&
        successMessage
      )
        successToast.value(successMessage);
      if (status === 400 && errorMessage) errorToast.value(errorMessage);
      if (status === 400) throw new Error(errorMessage);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCompanionsObj = (guests: Guest[]) =>
    guests.map((guest) => ({
      name: guest.name,
      restrictions: guest.restrictions,
    }));

  const addNewGuests = async (userWithGuests: InvitedPerson, uid: string) => {
    return await handleApiCall(
      () =>
        // @ts-ignore
        supabase
          .from("confirmations")
          .insert({
            user_id: uid,
            companions: JSON.stringify(
              updateCompanionsObj(userWithGuests.guests)
            ),
            user_restrictions: userWithGuests.user.restrictions,
          })
          .single(),
      "Os teus convidados já foram adicionados à lista de confirmações e com as devidas observações. Obrigado!",
      "Ocorreu um erro ao adicionar os convidados à lista de confirmações. Por favor, tenta novamente."
    );
  };

  const updateGuests = async (userWithGuests: InvitedPerson, uid: string) => {
    return await handleApiCall(
      () =>
        // @ts-ignore
        supabase
          .from("confirmations")
          .update({
            user_id: uid,
            companions: JSON.stringify(
              updateCompanionsObj(userWithGuests.guests)
            ),
            user_restrictions: userWithGuests.user.restrictions,
          })
          .eq("user_id", uid),
      "A tua lista de convidados foi atualizado com sucesso! Obrigado!",
      "Ocorreu um erro ao remover os convidados da lista de confirmações. Por favor, tenta novamente."
    );
  };

  const getConfirmations = async (
    userId?: string
  ): Promise<{
    guests: Guest[];
    user: { restrictions: string } | null;
  } | null> => {
    if (!userId) return null;
    const dbGuests: CompanionsFromDB = await handleApiCall(() =>
      // @ts-ignore
      supabase.from("confirmations").select("*").eq("user_id", userId).single()
    );

    const { companions, user_restrictions: userRestrictions } = dbGuests;

    return {
      guests: companions ? JSON.parse(companions) : [],
      user: userRestrictions ? { restrictions: userRestrictions } : null,
    };
  };

  return {
    addNewGuests,
    updateGuests,
    getConfirmations,
  };
};
