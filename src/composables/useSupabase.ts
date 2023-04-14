import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/composables/useAuth';

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

supabase.auth.getSession().then(({ data: { session } }) => {
	const { userSession } = useAuth();
	userSession.value = session;
});

supabase.auth.onAuthStateChange(async (event, session) => {
	const { userSession } = useAuth();

	if (event == 'SIGNED_OUT') {
		userSession.value = null;
	} else {
		userSession.value = session;
	}
});

export const useSupabase = () => {
	return { supabase };
};
