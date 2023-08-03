<template>
	<Dashboard>
		<article class="text-center my-96 mx-4">
			<h1 class="text-3xl mb-4 font-bold">
				Nós damos imenso valor á tua presença. Obrigado por seres nosso
				querido/amigo
			</h1>
			<p class="mb-3">
				Aqui tens o IBAN
				<span
					@click="copyText"
					class="cursor-pointer underline text-primary-500"
					>{{ IBAN }}</span
				>
				(carrega no IBAN para copiares o IBAN), em nome de
				<span class="font-bold">PEDRO RUBEN LOPES MARQUES</span>
			</p>
		</article>
	</Dashboard>
</template>

<script setup lang="ts">
	import { useToast } from 'vue-toastification';

	const toast = useToast();
	const IBAN = 'PT50 0018 0003 49646441020 71';

	const copyText = () => {
		navigator.clipboard.writeText(IBAN);
		toast.success('Copiado!');
	};
</script>

<style scoped></style>
