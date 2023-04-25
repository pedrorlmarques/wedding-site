import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

supabase.auth.getSession().then(({ data: { session } }) => {
	const { userSession } = useAuth();
	userSession.value = session;
});

supabase.auth.onAuthStateChange(async (event, session) => {
	console.log(event);
	const { userSession } = useAuth();
	if (event == 'SIGNED_OUT') {
		userSession.value = null;
		router.push('/login');
	}
});

export const useSupabase = () => {
	return { supabase };
};
