<template>
	<div class="search-container">
		<form ref="searchResultsContainer">
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only"
				>Pesquisa</label
			>
			<div class="relative">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<SearchSvg class="w-5 h-5 text-gray-900" />
				</div>
				<input
					type="search"
					id="default-search"
					class="block w-full p-4 pl-10 text-sm text-gray-900 border-b border-secondary-600 bg-transparent !outline-none opacity-50 focus:opacity-100"
					placeholder="Pesquisa por artista, música..."
					v-model="search"
					@click="updateItems"
					@input="perfomSearch"
					required />
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-secondary-700 hover:bg-secondary-800 font-medium rounded-lg text-sm px-4 py-2"
					@keyup.enter="onSubmit"
					@click="onSubmit">
					Pesquisa
				</button>
			</div>
		</form>
		<div v-if="!searchResultsIsEmpty" class="results-container">
			<ul class="p-8 overflow-y-auto h-96">
				<li
					v-for="item in searchResults"
					:key="item.id"
					class="flex flex-row items-center justify-between mt-4 border-b"
					@click="handleAddTrack(item)">
					<img
						:src="item.album.images[0].url"
						:alt="item.album.name"
						class="w-32 h-32 rounded-lg !my-4" />
					<div class="text-right">
						<p class="text-sm font-medium text-gray-900">
							{{ item.name }}
						</p>
						<p class="text-sm text-gray-500">{{ item.artists[0].name }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="my-suggested-tracks-container">
			<ul class="!pl-0">
				<Track
					v-for="track in suggestedTracks"
					:key="track.id"
					:track="track"
					@delete="deleteTrack" />
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { onClickOutside } from '@vueuse/core';

	import SearchSvg from '@/assets/search.svg?component';
	import { useAuth } from '@/composables/useAuth';
	import { useSpotify } from '@/composables/useSpotify';
	import { supabase } from '@/composables/useSupabase';
	import { useDebounceFn } from '@vueuse/core';
	import { useToast } from 'vue-toastification';

	const { userSession } = useAuth();
	const { searchForItem, getTrack } = useSpotify();
	const toast = useToast();

	const tracks = ref<Track[]>([]);
	const search = ref<string>('');
	const searchResultsContainer = ref(null);
	const isLoading = ref(false);
	const searchResults = ref<any>([]);

	const updateItems = useDebounceFn(async () => {
		isLoading.value = true;
		if (search.value && search.value.length >= 3) {
			const results = await searchForItem(search.value);
			searchResults.value = results!.tracks!.items;
		} else {
			searchResults.value = [];
		}
		isLoading.value = false;
	}, 200);

	const onSubmit = (e: Event) => {
		e.preventDefault();
		perfomSearch();
	};

	const perfomSearch = async () => {
		updateItems();
	};

	const searchResultsIsEmpty = computed(
		() => Object.keys(searchResults.value).length === 0
	);

	const handleAddTrack = async (track: Track) => {
		searchResults.value = [];
		try {
			const res = await supabase.from('user-song-requests').upsert(
				{
					link: track.href,
					track_id: track.id,
					user_id: userSession.value?.user.id,
					user_name:
						userSession.value?.user.user_metadata.name ||
						userSession.value?.user.user_metadata.full_name,
					track_approval_status: 'PENDING',
				} as UserSongRequest,
				{ ignoreDuplicates: true }
			);
			if (!res.error && res.status === 201) {
				toast.success('Música adicionada com sucesso!');
				tracks.value.push(await getTrack(track.id));
			}
			if (res.error) throw res.error;
		} catch (error) {
			console.error(error);
		}
	};

	const getTracks = async (): Promise<UserSongRequest[] | undefined> => {
		try {
			const { data, error } = await supabase
				.from('user-song-requests')
				.select('*')
				.eq('user_id', userSession.value?.user.id);
			if (error) throw error;
			return data as UserSongRequest[];
		} catch (error) {
			console.error(error);
		}
	};

	const deleteTrack = async (id: string) => {
		try {
			const { error, status } = await supabase
				.from('user-song-requests')
				.delete()
				.eq('track_id', id);
			if (!error && status === 204) {
				tracks.value = tracks.value.filter((track) => track.id !== id);
				toast.success('Música removida com sucesso!');
			}
			if (error) throw error;
		} catch (error) {
			console.error(error);
		}
	};

	const suggestedTracks = computed(() =>
		tracks.value.sort((a, b) => a.name.localeCompare(b.name))
	);

	onClickOutside(searchResultsContainer, () => {
		searchResults.value = [];
	});

	onMounted(async () => {
		const tracksFromDB = await getTracks();
		tracksFromDB?.map(async (track: UserSongRequest) =>
			tracks.value.push({
				...(await getTrack(track.track_id)),
				status: track.track_approval_status,
			})
		);
	});
</script>

<style lang="postcss" scoped>
	.search-container {
		@apply relative;

		& .results-container {
			@apply absolute w-full overflow-hidden bg-white border border-gray-300 rounded-xl mt-4 z-10;
		}
	}
</style>
