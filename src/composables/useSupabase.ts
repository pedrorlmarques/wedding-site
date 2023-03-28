import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/composables/useAuth";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

supabase.auth.getSession().then(({ data }) => {
  const { userSession } = useAuth();
  userSession.value = data.session;
});

supabase.auth.onAuthStateChange(async (event, session) => {
  const { userSession } = useAuth();
  userSession.value = session;
});

export const useSupabase = () => {
  return { supabase };
};
