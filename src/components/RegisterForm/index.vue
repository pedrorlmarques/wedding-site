<template>
	<FormKit
		type="form"
		:actions="false"
		@submit="handleSubmit"
		#default="{ state: { valid } }">
		<p>
			Registe-se no nosso site com facilidade - insira o seu email e crie a sua
			própria password, ou faça login instantaneamente com a sua conta Google.
		</p>
		<div>
			<label for="name">Nome <span class="text-red-500">*</span></label>
			<FormKit
				type="text"
				name="name"
				id="name"
				placeholder="o seu nome"
				v-model="user.name"
				validation="required"
				:validation-messages="{
					required: 'Por favor insira o seu nome',
				}" />
		</div>
		<div>
			<label for="email">E-mail <span class="text-red-500">*</span></label>
			<FormKit
				type="email"
				name="email"
				id="email"
				placeholder="nome@email.pt"
				v-model="user.email"
				validation="required|email"
				:validation-messages="{
					required: 'Por favor insira o seu email',
					email: 'Por favor insira um email válido',
				}" />
		</div>
		<FormKit type="group">
			<div>
				<label
					for="password"
					class="block mb-2 text-sm font-medium text-gray-900"
					>Password <span class="text-red-500">*</span></label
				>
				<FormKit
					type="password"
					name="password"
					placeholder="••••••••"
					v-model="user.password"
					validation="required|length:6|matches:/[^a-zA-Z]/"
					:validation-messages="{
						required: 'Por favor insira a sua password',
						length: 'A password deve ter pelo menos 6 caracteres',
						matches: 'A password deve conter pelo menos um número',
					}" />
			</div>
			<div>
				<label
					for="password_confirm"
					class="block mb-2 text-sm font-medium text-gray-900">
					Confirmação da Password <span class="text-red-500">*</span>
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
		</FormKit>
		<button type="submit" :disabled="!valid">Criar uma conta</button>
	</FormKit>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import { useAuth } from '@/composables/useAuth';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const auth = useAuth();

	const user: User = reactive({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = () => {
		auth.handleSignup({
			email: user.email,
			password: user.password,
			name: user.name,
		});
		router.push({
			name: 'EmailConfirmation',
			query: { email: user.email },
		});
	};
</script>
