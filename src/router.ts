import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

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
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _from, next) => {
	const { isLoggedIn } = useAuth();
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !isLoggedIn()) next('/login');
	else if (!requiresAuth && isLoggedIn()) next('/');
	else next();
});

export default router;
