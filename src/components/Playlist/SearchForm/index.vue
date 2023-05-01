<!-- <template>
  <div class="search-container">
    <form>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >Pesquisa</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <SearchSvg class="w-5 h-5 text-gray-900" />
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border-b border-secondary-600 bg-transparent !outline-none opacity-50 focus:opacity-100"
          placeholder="Pesquisa por artista, música..."
          v-model="search"
          @input="perfomSearch()"
          required
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-secondary-700 hover:bg-secondary-800 font-medium rounded-lg text-sm px-4 py-2"
          @click="onSubmit"
        >
          Pesquisa
        </button>
      </div>
    </form>
    <div v-if="!searchResultsIsEmpty" class="results-container">
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-primary-50"
      >
        <ul class="flex flex-wrap !-mb-px !mt-0 !list-none !pl-0">
          <li class="mr-2 !mt-0 !mb-0">
            <button
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg !no-underline hover:text-gray-600 hover:border-gray-300"
            >
              Geral
            </button>
          </li>
          <li class="mr-2 !mt-0 !mb-0">
            <button
              class="inline-block p-4 text-primary-600 border-b-2 border-primary-600 !no-underline rounded-t-lg active"
            >
              Músicas
            </button>
          </li>
          <li class="mr-2 !mt-0 !mb-0">
            <button
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg !no-underline hover:text-gray-600 hover:border-gray-300"
            >
              Artistas
            </button>
          </li>
          <li class="mr-2 !mt-0 !mb-0">
            <button
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg !no-underline hover:text-gray-600 hover:border-gray-300"
            >
              Albuns
            </button>
          </li>
        </ul>
      </div>
      <ul class="p-4 overflow-y-auto h-96">
        <li
          v-for="item in searchResults.tracks.items"
          :key="item.id"
          class="flex flex-row items-center justify-between mt-4 border-b"
        >
          <img
            :src="item.album.images[0].url"
            :alt="item.album.name"
            class="w-32 h-32 rounded-lg !my-4"
          />
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">
              {{ item.name }}
            </p>
            <p class="text-sm text-gray-500">{{ item.artists[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchSvg from "@/assets/search.svg?component";
import { useSpotify } from "@/composables/useSpotify";
import { useDebounceFn } from "@vueuse/core";

const { searchForItem } = useSpotify();
const search = ref("");
const isLoading = ref(false);
const searchResults = ref({});

const updateItems = useDebounceFn(async () => {
  isLoading.value = true;
  if (search.value.length >= 3) {
    const results = await searchForItem(search.value);
    searchResults.value = results;
    console.log(searchResults.value);
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
</script>

<style lang="postcss" scoped>
.results-container {
  @apply overflow-hidden bg-white border border-gray-300 rounded-xl mt-4;
}
</style>
 -->

<template></template>
<script></script>
