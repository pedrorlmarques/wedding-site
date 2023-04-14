<template>
	<Layout>
		<div class="card mx-auto">
			<div class="space">
				<h1 class="hello text-center">Casamento <br />Maria Inês & Pedro</h1>
				<LoginForm />
			</div>
		</div>
	</Layout>
</template>

<script setup>
	import Layout from '@layout/Default.vue';
	import LoginForm from '@/components/LoginForm/index.vue';
</script>
