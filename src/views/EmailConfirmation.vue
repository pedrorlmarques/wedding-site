import { RouterLink } from 'vue-router';

<template>
	<Default>
		<div class="wrapper">
			<div
				class="relative flex flex-col items-center justify-center overflow-hidden">
				<div class="max-w-xl px-5 text-center">
					<h2 class="mb-2 text-[42px] font-bold text-zinc-800">
						Vê o teu email!
					</h2>
					<p class="mb-2 text-lg text-zinc-500">
						Nós ficamos felizes que te tenhas registado na plataforma do nosso
						casamento. Mandamos um email de confirmação para
						<span class="font-medium text-secondary-500">
							{{ $route.query.email }} </span
						>.
					</p>
					<RouterLink
						as="a"
						to="/"
						class="mt-3 inline-block w-96 rounded bg-primary-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-primary-700">
						Abrir a aplicação
					</RouterLink>
				</div>
			</div>
		</div>
	</Default>
</template>
