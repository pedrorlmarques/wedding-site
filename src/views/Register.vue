<template>
	<Default>
		<div class="card">
			<div class="space">
				<router-link as="button" type="button" to="/" class="btn">
					<ArrowLeftIcon class="stroke-primary-600 inline-block" />
					Voltar
				</router-link>
				<h1 class="hello">Bem vindos ao Casamento do Ano!</h1>
				<RegisterForm />
			</div>
		</div>
	</Default>
</template>

<script setup>
	import ArrowLeftIcon from '@/assets/arrow-left.svg?component';
</script>
