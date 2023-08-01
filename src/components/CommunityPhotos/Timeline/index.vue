<template>
	<div
		class="border border-gray-200 rounded-lg shadow mb-4 mx-4 md:mx-0 p-8 bg-white">
		<div class="flex items-center">
			<div class="overflow-hidden">
				<img
					v-if="user?.user_metadata.avatar_url"
					class="w-10 rounded-full"
					:src="user?.user_metadata.avatar_url"
					alt="user photo" />
				<UserSvg v-else class="user-icon" />
			</div>
			<textarea
				class="col-span-5 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 resize-none overflow-hidden"
				rows="1"
				@input="textAreaResize"
				v-model="userPostText"
				placeholder="O que vês no casamento? Partilha com os noivos..." />
		</div>
		<ul
			v-show="imageData && imageData.length > 0"
			class="flex flex-1 flex-wrap ml-14 mt-4">
			<li
				class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
				v-for="image in imageData"
				:key="image.id">
				<article
					class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
					<img
						class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
						:src="image.url" />
					<section
						class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
						<h1 class="flex-1">{{ image.name }}</h1>
						<div class="flex">
							<span class="p-1">
								<i>
									<svg
										class="fill-current w-4 h-4 ml-auto pt-"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24">
										<path
											d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"></path>
									</svg>
								</i>
							</span>

							<p class="p-1 size text-xs">{{ image.size }}</p>
							<button
								class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
								@click="deleteImage(image.id)"
								data-target="blob:https://tailwindcomponents.com/6773577e-37b2-452f-9d40-9c144c07ac67">
								<svg
									class="pointer-events-none fill-current w-4 h-4 ml-auto"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24">
									<path
										class="pointer-events-none"
										d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"></path>
								</svg>
							</button>
						</div>
					</section>
				</article>
			</li>
		</ul>
		<ul
			v-show="videoData && videoData.length > 0"
			class="flex flex-1 flex-wrap ml-14 mt-4">
			<li
				class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
				v-for="video in videoData"
				:key="video.id">
				<article
					class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
					<video
						class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
						:src="video.url"></video>
					<section
						class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
						<h1 class="flex-1">{{ video.name }}</h1>
						<div class="flex">
							<span class="p-1">
								<i>
									<svg
										class="fill-current w-4 h-4 ml-auto pt-"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24">
										<path
											d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"></path>
									</svg>
								</i>
							</span>

							<p class="p-1 size text-xs">{{ video.size }}</p>
							<button
								class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
								@click="deleteVideo(video.id)"
								data-target="blob:https://tailwindcomponents.com/6773577e-37b2-452f-9d40-9c144c07ac67">
								<svg
									class="pointer-events-none fill-current w-4 h-4 ml-auto"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24">
									<path
										class="pointer-events-none"
										d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"></path>
								</svg>
							</button>
						</div>
					</section>
				</article>
			</li>
		</ul>
		<form
			class="sm:flex flex-row items-center justify-between ml-14 mr-4 mt-4"
			@submit.prevent="onSubmit">
			<div class="flex flex-row items-center justify-between">
				<input
					class="hidden"
					id="img-upload"
					multiple
					type="file"
					accept="image/*"
					@change="onSelectFile"
					@click="onInputClick" />
				<label
					for="img-upload"
					class="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg hover:cursor-pointer flex flex-row items-center">
					<span class="mr-2">
						<svg
							class="fill-current w-4 h-4 ml-auto pt-"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path
								d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"></path>
						</svg>
					</span>
					Adiciona uma fotografia
				</label>
				<input
					id="video-upload"
					class="hidden"
					type="file"
					multiple
					accept="video/mp4,video/mkv, video/x-m4v,video/*"
					@change="onSelectVideo" />
				<label
					for="video-upload"
					class="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg hover:cursor-pointer flex flex-row items-center ml-4">
					<span class="mr-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							width="256"
							height="256"
							class="fill-current w-4 h-4 ml-auto pt-"
							viewBox="0 0 256 256"
							xml:space="preserve">
							<defs></defs>
							<g
								transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
								<path
									d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 4 C 22.393 4 4 22.393 4 45 s 18.393 41 41 41 s 41 -18.393 41 -41 S 67.607 4 45 4 z"
									style="
										stroke: none;
										stroke-width: 1;
										stroke-dasharray: none;
										stroke-linecap: butt;
										stroke-linejoin: miter;
										stroke-miterlimit: 10;
										fill-rule: nonzero;
										opacity: 1;
									"
									transform=" matrix(1 0 0 1 0 0) "
									stroke-linecap="round" />
								<path
									d="M 34.054 65.546 c -0.775 0 -1.551 -0.204 -2.257 -0.611 c -1.414 -0.816 -2.257 -2.278 -2.257 -3.91 V 28.975 c 0 -1.632 0.844 -3.093 2.257 -3.909 c 1.413 -0.816 3.101 -0.816 4.515 0 L 64.067 41.09 c 1.413 0.816 2.257 2.278 2.257 3.91 s -0.844 3.094 -2.257 3.91 l 0 0 L 36.311 64.935 C 35.604 65.342 34.829 65.546 34.054 65.546 z M 34.054 28.457 c -0.103 0 -0.191 0.034 -0.258 0.073 c -0.117 0.068 -0.257 0.2 -0.257 0.445 v 32.049 c 0 0.245 0.14 0.378 0.257 0.445 c 0.117 0.069 0.301 0.124 0.514 0 l 27.756 -16.024 c 0.212 -0.123 0.257 -0.31 0.257 -0.446 s -0.045 -0.323 -0.257 -0.446 L 34.311 28.53 C 34.219 28.477 34.133 28.457 34.054 28.457 z M 63.067 47.178 h 0.01 H 63.067 z"
									style="
										stroke: none;
										stroke-width: 1;
										stroke-dasharray: none;
										stroke-linecap: butt;
										stroke-linejoin: miter;
										stroke-miterlimit: 10;
										fill-rule: nonzero;
										opacity: 1;
									"
									transform=" matrix(1 0 0 1 0 0) "
									stroke-linecap="round" />
							</g>
						</svg>
					</span>
					Adiciona um vídeo
				</label>
			</div>
			<div class="mt-4 w-full sm:mt-0 sm:w-auto">
				<button
					v-if="!isLoadingUpload"
					type="submit"
					class="border border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white px-4 py-2 rounded-lg">
					Publicar
				</button>
				<button
					v-else
					disabled
					type="button"
					class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 inline-flex items-center">
					<svg
						aria-hidden="true"
						role="status"
						class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor" />
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="#1C64F2" />
					</svg>
					A fazer upload...
				</button>
			</div>
		</form>
	</div>
	<div class="my-4 w-full sm:mt-0 sm:w-auto" v-if="publications.length">
		<ul>
			<li
				v-for="publication in publications"
				:key="publication.id"
				class="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
				<article class="prose-sm">
					<div class="flex justify-between mb-8 items-center">
						<div class="flex items-center">
							<UserSvg class="w-8 h-8 mr-4" />
							<span>
								<strong>{{ publication.user_name }}</strong>
								<p class="text-gray-400 my-0">
									Publicado em
									{{ formatPublicationDate(publication.created_at) }}
								</p>
							</span>
						</div>
						<div v-show="publication.user_id === userSession?.user.id">
							<button
								class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
								@click="deletePublication(publication)">
								Apagar publicação
							</button>
						</div>
					</div>
					<div v-if="publication.title">
						{{ publication.title }}
					</div>

					<FancyBox
						:options="{
							Carousel: {
								adaptiveHeight: false,
								infinite: false,
							},
						}"
						class="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div v-for="(file, index) in publication.files" :key="index">
							<template v-if="file.type.startsWith('image')">
								<img
									data-fancybox="gallery"
									class="h-auto max-w-full rounded-lg"
									:alt="file.path"
									:src="`${file.path}&width=200&height=200`" />
							</template>
							<template v-if="file.type.startsWith('video')">
								<video
									class="h-auto max-w-full rounded-lg"
									controls
									data-fancybox="video">
									<source :src="file.path" :type="file.type" />
								</video>
							</template>
						</div>
					</FancyBox>
				</article>
			</li>
		</ul>
	</div>
	<div v-else class="text-center prose mx-auto my-8">
		<h1>Partilha momentos com os noivos!</h1>
		<p>
			Basta escreveres algo aqui em cima, e partilha com eles fotos, videos e
			pensamentos! Este dia será memorável para todos!
		</p>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, computed, ref } from 'vue';
	import { useToast } from 'vue-toastification';

	import dayjs from 'dayjs';
	import 'dayjs/locale/pt';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import '@fancyapps/ui';

	import { useAuth } from '@/composables/useAuth';
	import { useSupabase } from '@/composables/useSupabase';
	import FancyBox from '@/components/CommunityPhotos/FancyBox/index.vue';

	import UserSvg from '@assets/user.svg?component';

	dayjs.extend(localizedFormat);

	const bucketName = 'communityPhotos';

	interface IFileUpload {
		id: number;
		url: string;
		size: string;
		name: string;
		file: File;
	}

	const { userSession } = useAuth();
	const toast = useToast();
	const { supabase } = useSupabase();

	const isLoadingUpload = ref(false);
	const userPostText = ref('');

	const imageData = ref<IFileUpload[] | []>([]);
	const videoData = ref<IFileUpload[] | []>([]);

	const publications = ref<IPublication[]>([]);

	const container = ref(null);

	const user = computed(() => userSession.value?.user);

	const textAreaResize = (e: Event) => {
		const textarea = e.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};

	const onSelectFile = ($event: Event) => {
		const files = ($event.target as HTMLInputElement).files;
		if (files != null && !files.length) return;
		createImage(files!);
	};

	const onSelectVideo = ($event: Event) => {
		const files = ($event.target as HTMLInputElement).files;
		if (files != null && !files.length) return;
		createVideoPreview(files!);
	};

	const createImage = (files: FileList) => {
		[...files].map((file: File, index: number) => {
			const imgUrl = URL.createObjectURL(file);
			imageData.value = [
				...imageData.value,
				{
					url: imgUrl as string,
					id: index + 1,
					size: `${Math.round(file.size / 1024)}kb`,
					name: file.name,
					file,
				},
			];
		});
	};

	const createVideoPreview = (files: FileList) => {
		[...files].map((file: File, index: number) => {
			const videoUrl = URL.createObjectURL(file);
			videoData.value = [
				...videoData.value,
				{
					url: videoUrl,
					id: index + 1,
					size: `${Math.round(file.size / 1024)}kb`,
					name: file.name,
					file,
				},
			];
		});
	};

	const onInputClick = (event: Event) => {
		(event.target as HTMLInputElement).value = '';
	};

	const deleteImage = (id: number) => {
		imageData.value = imageData.value.filter((image) => image.id !== id);
	};

	const deleteVideo = (id: number) => {
		videoData.value = videoData.value.filter((video) => video.id !== id);
	};

	const onSubmit = async () => {
		const now = dayjs().format();

		const publicationData = ref([...imageData.value, ...videoData.value]);

		isLoadingUpload.value = true;

		const uploadFileToBucket = await Promise.all(
			publicationData.value.map(async ({ file, name }) => {
				const fileName = name.replace(/[^\A-Za-z0-9._-]/g, '');
				const { data, error } = await supabase.storage
					.from(bucketName)
					.upload(`${now}_${userSession.value?.user.id}_${fileName}`, file);

				if (!error) {
					const { data: fileData } = await supabase.storage
						.from(bucketName)
						.createSignedUrl(data.path, 60 * 60 * 24 * 365);

					return { path: fileData?.signedUrl as string, type: file.type };
				}
			})
		);

		if (uploadFileToBucket != null) {
			const { status } = await supabase.from('publications').insert({
				user_name: userSession.value?.user.user_metadata.name,
				comments: {},
				title: userPostText.value,
				files: uploadFileToBucket,
				user_id: userSession.value?.user.id,
			});

			if (status === 201) {
				isLoadingUpload.value = false;
				userPostText.value = '';
				imageData.value = [];
				videoData.value = [];
				toast.success('Publicação enviada com sucesso!');
				fetchPublications();
			}
		}
	};

	const deletePublication = async (publication: IPublication) => {
		if (publication.files.length) {
			await supabase.storage
				.from(bucketName)
				.remove(publication.files.map((file) => file.path));
		}

		await supabase.from('publications').delete().eq('id', publication.id);

		toast.success('Apagado com sucesso!');

		fetchPublications();
	};

	const formatPublicationDate = (date: string) => {
		return dayjs(date).locale('pt').format('LLL');
	};

	const fetchPublications = async () => {
		const { data } = await supabase
			.from('publications')
			.select('*')
			.order('created_at', { ascending: false });

		if (data) publications.value = data;
	};

	onMounted(() => {
		fetchPublications();
	});
</script>

<style scoped lang="postcss">
	.hasImage:hover section {
		background-color: rgba(5, 5, 5, 0.4);
	}
	.hasImage:hover button:hover {
		background: rgba(5, 5, 5, 0.45);
	}

	div.img-gallery {
		&:after {
			@apply basis-96 content-none;
		}
	}
</style>
