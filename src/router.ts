import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { supabase } from '@/composables/useSupabase';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			requiresAuth: true,
		},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/convite',
		name: 'Invitation',
		meta: {
			requiresAuth: true,
		},
		component: () => import('@/views/Invitation.vue'),
	},
	{
		path: '/fotos',
		name: 'CommunityPhotos',
		meta: {
			requiresAuth: true,
		},
		component: () => import('@/views/CommunityPhotos.vue'),
	},
	{
		path: '/playlist',
		name: 'Playlist',
		meta: {
			requiresAuth: true,
		},
		component: () => import('@/views/Playlist.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: () => import('@/views/ForgotPassword.vue'),
	},
	{
		path: '/email-verification',
		name: 'EmailConfirmation',
		component: () => import('@/views/EmailConfirmation.vue'),
	},
	{
		path: '/recover-password',
		name: 'RecoverPassword',
		component: () => import('@/views/RecoverPassword.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

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

router.beforeEach(async (to, _from, next) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !user) next('/login');
	else if (!requiresAuth && user) next('/');
	else next();
});

export default router;
