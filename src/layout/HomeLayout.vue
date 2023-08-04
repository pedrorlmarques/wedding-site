<template>
	<main>
		<div class="relative">
			<img class="groom-img" :src="GroomsImgUrl" alt="noivos" />
			<div class="relative container z-10 mx-auto px-2 sm:px-32">
				<Navigation />
				<Timer class="my-4" />
				<h1 class="wedding-font">Maria Inês e Pedro</h1>
			</div>
		</div>
		<slot />
		<footer class="m-4 mb-0">
			<div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<hr
					class="my-6 border-t border-secondary-200 mx-auto lg:my-8 max-w-[50vw]" />
				<span class="block text-sm text-gray-500 text-center"
					>© 2023
					<a
						href="https://pedropcruz.pt/"
						class="hover:underline hover:opacity-50 text-primary-500"
						>pedropcruz.pt</a
					>. All Rights Reserved.</span
				>
			</div>
		</footer>
	</main>
</template>
<script setup>
	import Timer from '@components/Timer/index.vue';
	import Navigation from '@/components/Navigation/index.vue';
	import GroomsImgUrl from '@/assets/noivos.jpg?url';
</script>

<style lang="postcss" scoped>
	body {
		@apply bg-secondary-50;
	}

	main {
		@apply flex flex-col min-h-screen mx-auto bg-secondary-50;
	}

	.wedding-font {
		@apply font-bacalisties font-normal text-5xl my-16 md:my-24 md:text-7xl text-secondary-400 text-center;
	}

	.groom-img {
		object-position: 25% 75%;
		@apply absolute top-0 left-0 w-full h-full object-cover opacity-20;
	}
</style>
