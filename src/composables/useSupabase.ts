import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

supabase.auth.onAuthStateChange(async (event, session) => {
  const { user, userSession } = useAuth();
  userSession.value = session || null;
  user.value = session?.user || null;
});

export const useSupabase = () => {
  return { supabase };
};
