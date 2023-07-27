<template>
	<nav class="bg-transparent px-2 sm:px-4 py-2.5 w-full" ref="nav">
		<div
			class="container flex flex-wrap md:flex-nowrap items-center justify-end mx-auto">
			<div class="flex items-center md:order-2 relative">
				<button
					type="button"
					class="btn-menu"
					id="user-menu-button"
					@click="toggleMenu()"
					:aria-expanded="openMenu">
					<span class="sr-only">Open user menu</span>
					<UserSvg v-if="!user?.user_metadata.avatar_url" class="user-icon" />
					<img
						v-else
						:src="user?.user_metadata.avatar_url"
						class="user-icon"
						alt="user photo" />

					<ArrowSvg class="arrow-icon" :class="openMenu ? 'rotate-180' : ''" />
				</button>

				<!-- Dropdown menu -->
				<div
					v-if="openMenu"
					class="absolute top-8 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
					ref="menu"
					id="user-dropdown">
					<div class="px-4 py-3">
						<span class="block text-sm text-gray-900 whitespace-nowrap">{{
							user?.user_metadata.name || user?.user_metadata.full_name
						}}</span>

						<span
							class="block text-sm font-medium text-gray-500 truncate whitespace-nowrap"
							>{{ user?.email }}</span
						>
					</div>
					<ul class="py-2">
						<li>
							<button
								@click="logout()"
								class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
								Logout
							</button>
						</li>
					</ul>
				</div>
				<button
					v-if="withNavigation"
					type="button"
					class="btn-menu"
					:aria-expanded="openMainMenu"
					@click="toggleMainMenu()">
					<MenuSvg class="block w-6 h-6 md:!hidden" />
				</button>
			</div>
			<div
				v-if="withNavigation && (openMainMenu || isDesktop)"
				class="items-center justify-between w-full md:flex md:order-1"
				ref="mainMenu">
				<ul
					class="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
					<li
						class="relative nav-link"
						v-for="page in dashboardLinks"
						:disabled="page.disabled">
						<router-link
							v-if="page.link"
							custom
							:to="page.link"
							v-slot="{ href, isActive, isExactActive, navigate }"
							><a
								:href="href"
								@click="navigate"
								class="relative flex items-center justify-between py-2 pl-3 pr-4 stroke-black rounded hover:bg-primary-200 md:hover:bg-transparent md:hover:text-primary-600 md:p-0"
								:class="{
									'bg-primary-200 md:bg-transparent md:text-primary-600':
										isActive,
									'md:bg-transparent md:text-primary-600': isExactActive,
									'opacity-40 text-gray-400 hover:cursor-not-allowed pointer-events-none':
										page.disabled,
								}"
								:disabled="page.disabled">
								{{ page.label }}
								<HeartSvg
									:class="{
										'md:bg-transparent md:stroke-primary-600':
											isActive || isExactActive,
										'opacity-40 text-gray-400 hover:cursor-not-allowed pointer-events-none':
											page.disabled,
									}" />
							</a>
						</router-link>
						<a
							v-else
							:href="page.href"
							:target="page.target"
							class="relative flex items-center justify-between py-2 pl-3 pr-4 stroke-black rounded hover:bg-primary-200 md:hover:bg-transparent md:hover:text-primary-600 md:p-0"
							:disabled="page.disabled">
							{{ page.label }}
							<HeartSvg />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { onClickOutside, useWindowSize } from '@vueuse/core';

	import HeartSvg from '@assets/heart.svg?component';
	import MenuSvg from '@assets/menu.svg?component';
	import UserSvg from '@assets/user.svg?component';
	import ArrowSvg from '@assets/arrow-down-up.svg?component';

	import { useAuth } from '@/composables/useAuth';
	import { useRouter } from 'vue-router';

	defineProps({
		withNavigation: {
			type: Boolean,
			default: false,
		},
	});

	const { width: windowWidth } = useWindowSize();

	const nav = ref(null);
	const menu = ref(null);
	const openMenu = ref(false);
	const mainMenu = ref(null);
	const openMainMenu = ref(false);

	const router = useRouter();
	const { userSession, handleLogout } = useAuth();

	const user = computed(() => userSession.value?.user);
	const isDesktop = computed(() => windowWidth.value >= 768);

	const dashboardLinks = ref([
		{
			link: '/',
			label: 'Home',
		},
		{
			link: '/convite',
			label: 'Convite',
		},
		{
			label: 'Sessão Noivado',
			href: 'https://home.mycloud.com/action/share/325d25fe-b184-403e-b388-4f054c6ee7d9',
			target: '_blank',
		},
		{
			link: '/playlist',
			label: 'Playlist',
		},
		{
			link: '/fotos',
			label: 'Fotografias',
		},
		{
			link: '/menu',
			label: 'Menu',
			disabled: true,
		},
		{
			label: 'Prenda',
			href: 'https://zgymwxdubdiijrxkdttl.supabase.co/storage/v1/object/public/img/comprovativoIBAN.pdf?t=2023-07-26T07%3A53%3A25.237Z',
			target: '_blank',
		},
	]);

	onClickOutside(menu, () => (openMenu.value = false));
	onClickOutside(
		mainMenu,
		() => isDesktop.value && (openMainMenu.value = false)
	);

	const toggleMenu = () => (openMenu.value = !openMenu.value);

	const toggleMainMenu = () => (openMainMenu.value = !openMainMenu.value);

	const logout = async () => {
		await handleLogout();
		router.push({ name: 'Login' });
	};
</script>
<style lang="postcss" scoped>
	button[type='button'].btn-menu {
		@apply flex items-center text-sm bg-transparent rounded-full md:mr-0 shadow-none p-0.5 hover:opacity-50 hover:bg-transparent;

		& svg,
		& img {
			&.user-icon {
				@apply w-10 h-10 rounded-full mr-2;
			}

			&.arrow-icon {
				@apply w-8 h-8 text-black;
			}
		}
	}

	.nav-link {
		& svg {
			@apply ml-2 w-4 h-4 stroke-[3px];
		}

		&[disabled='true'] {
			& svg {
				@apply text-gray-400 stroke-gray-400;
			}
		}
	}
</style>
