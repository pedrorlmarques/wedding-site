<template>
	<RouterView />
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';

	import { useRouter } from 'vue-router';

	import { supabase } from '@/composables/useSupabase';

	const router = useRouter();

	const session = ref();

	watch(
		() => session.value,
		(session) => {
			if (session) {
				router.push({ name: 'Home' });
			}
		}
	);

	onMounted(() => {
		supabase.auth.getSession().then(({ data }) => {
			session.value = data.session;
		});
		supabase.auth.onAuthStateChange((_, _session) => {
			session.value = _session;
		});
	});
</script>
