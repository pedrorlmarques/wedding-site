import { Ref, computed, ref } from "vue";
import { useToast, POSITION } from "vue-toastification";
import { supabase } from "@/composables/useSupabase";
import { Session, Provider } from "@supabase/gotrue-js/dist/main/lib/types";

const user = ref<User | null>(null);
const userSession = ref<Session | null>(null);

const toast = useToast();

export const useAuth = () => {
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
      const { data, error } = await apiCallback();
      console.log(data);
      if (successMessage && data.user) successToast.value(successMessage);
      if (errorMessage && error) errorToast.value(errorMessage);
      if (error) throw error;
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Login with email and password
   * @param credentials
   */
  const handleLogin = async ({ email, password }: Credentials) => {
    await handleApiCall(
      () => supabase.auth.signInWithPassword({ email, password }),
      "Login feito com sucesso!",
      "Erro ao fazer login!"
    );
  };

  /**
   * Login with refresh token
   * Usefor for logging in after email confirmation
   * @param token
   * @returns
   */

  const handleLoginWithRefreshToken = async (token: string) => {
    await handleApiCall(() =>
      supabase.auth.refreshSession({ refresh_token: token })
    );
  };

  /**
   * Login with google
   * @param provider
   */
  const handleOAuthLogin = async (provider: Provider) => {
    await handleApiCall(
      () =>
        supabase.auth.signInWithOAuth({
          provider,
          options: { redirectTo: import.meta.env.VITE_BASE_URL },
        }),
      "Login feito com sucesso!",
      "Erro ao fazer login!"
    );
  };

  /**
   * Logout
   */
  const handleLogout = async () => {
    await handleApiCall(
      () => supabase.auth.signOut(),
      "Logout feito com sucesso!",
      "Erro ao fazer logout!"
    );
  };

  /**
   * Register
   * @param credentials
   */
  const handleSignup = async ({ email, password }: Credentials) => {
    await handleApiCall(
      () =>
        supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: import.meta.env.VITE_BASE_URL,
          },
        }),
      "Registo feito com sucesso!",
      "Erro ao se registar!"
    );
  };

  /**
   * Check if user is logged in or not
   */
  const isLoggedIn = () => !!user.value;

  /**
   * send user an email to reset their password
   * @param email
   * @returns
   */
  const sendPasswordResetEmail = async (email: string) => {
    await handleApiCall(
      () =>
        supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${import.meta.env.VITE_BASE_URL}/recover-password`,
        }),
      "Email enviado com sucesso!",
      "Erro ao enviar email!"
    );
  };

  /**
   * Update User
   * @param email
   */
  const updateUser = async (password: string) => {
    await handleApiCall(
      () => supabase.auth.updateUser({ password }),
      "Password atualizada com sucesso!",
      "Erro ao atualizar password!"
    );
  };

  return {
    user,
    userSession,
    isLoggedIn,
    handleLogin,
    handleLoginWithRefreshToken,
    handleLogout,
    handleSignup,
    handleOAuthLogin,
    sendPasswordResetEmail,
    updateUser,
  };
};
