<template>
	<FormKit
		type="form"
		:actions="false"
		@submit="handleUpdate()"
		#default="{ state: { valid } }">
		<div>
			<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
				>Nova Password</label
			>
			<FormKit
				type="password"
				name="password"
				placeholder="••••••••"
				v-model="user.password"
				validation="required|length:6|matches:/[^a-zA-Z]/"
				:validation-messages="{
					required: 'Por favor insira uma password',
					length: 'A password deve ter pelo menos 6 caracteres',
					matches: 'A password deve conter pelo menos um número',
				}" />
		</div>
		<div>
			<label
				for="password_confirm"
				class="block mb-2 text-sm font-medium text-gray-900">
				Confirmação da Password
			</label>
			<FormKit
				type="password"
				name="password_confirm"
				placeholder="••••••••"
				validation="required|confirm"
				v-model="user.confirmPassword"
				:validation-messages="{
					required: 'Por favor insira a sua password',
					confirm: 'A password deve ser igual à anterior',
				}"
				help="A password deve ser igual à anterior" />
		</div>
		<button type="submit" :disabled="!valid">Enviar</button>
	</FormKit>
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { useAuth } from '@/composables/useAuth';

	const { updateUser } = useAuth();

	const user = ref({
		password: '',
		confirmPassword: '',
	});

	const handleUpdate = () => {
		if (user.value.password === user.value.confirmPassword) {
			updateUser(user.value.password);
		}
	};
</script>
