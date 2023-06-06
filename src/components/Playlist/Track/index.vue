<template>
	<li class="flex flex-row items-center justify-start mt-4 border-b">
		<img
			:src="track.album.images[0].url"
			:alt="track.album.name"
			class="w-24 h-24 rounded-lg !my-4" />
		<div class="text-left ml-8">
			<p class="text-sm font-medium text-gray-900">
				{{ track.name }}
			</p>
			<p class="text-sm text-gray-500">{{ track.artists[0].name }}</p>
			<p v-if="track.status" class="status">
				<span
					:class="{
						pending: track.status === 'PENDING',
						approved: track.status === 'APPROVED',
						rejected: track.status === 'REJECTED',
					}"
					>{{ renderLabel(track.status) }}</span
				>
			</p>
		</div>
		<div class="text-right ml-auto">
			<button type="button" @click="emit('delete', track.id)">
				<CancelSVG class="cancel-svg w-8 h-8 opacity-30 hover:opacity-100" />
			</button>
		</div>
	</li>
</template>

<script setup lang="ts">
	import CancelSVG from '@/assets/cancel.svg?component';
	import type { PropType } from 'vue';

	const emit = defineEmits(['delete']);

	defineProps({
		track: {
			type: Object as PropType<Track>,
			required: true,
		},
	});

	const renderLabel = (
		label: UserSongRequest['track_approval_status']
	): string => {
		switch (label) {
			case 'PENDING':
				return 'Pendente';
			case 'APPROVED':
				return 'Aprovado';
			case 'REJECTED':
				return 'Rejeitado';
			default:
				return '';
		}
	};
</script>

<style lang="postcss" scoped>
	.status {
		& .pending {
			@apply bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded;
		}

		& .approved {
			@apply bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded;
		}

		& .rejected {
			@apply bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded;
		}
	}
</style>
