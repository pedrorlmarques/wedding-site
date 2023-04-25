<template>
	<HomeLayout>
		<div class="container mx-auto px-2 sm:px-32">
			<div class="hr-heart">
				<span class="first-line"></span>
				<HeartSvg />
				<span class="second-line"></span>
			</div>
			<div
				class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mx-8 sm:mx-0">
				<AnchorToPagesButton title="Convite" path="/convite">
					<template #icon>
						<WeddingInvitationSvg />
					</template>
					<template #description>
						Pedimos que aqui adiciones todas as pessoas vão contigo e que
						menciones quais são as restrições alimentares de cada 1 das pessoas
						que vem contigo. Contamos contigo!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Fotografias" path="/fotos" disabled>
					<template #icon>
						<CameraSvg />
					</template>
					<template #description>
						Ao carregares aqui queremos que faças upload das muitas fotografias
						que vais tirar no nosso casamento!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Menu" path="/menu" disabled>
					<template #icon>
						<ForkAndSpoonSvg />
					</template>
					<template #description>
						Não sabes o que contém o Menu? Aqui podes ver em detalhe!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Playlist" path="/playlist" disabled>
					<template #icon>
						<DiscoBallSvg />
					</template>
					<template #description>
						Conheces bem os noivos e sabes quais são os gostos deles? Muito bem,
						então sugere as melhores músicas nesta fantástica Playlist!
					</template>
				</AnchorToPagesButton>
			</div>
		</div>
	</HomeLayout>
</template>

<script setup>
	import WeddingInvitationSvg from '@/assets/wedding-invitation.svg?component';

	import HeartSvg from '@/assets/heart.svg?component';
	import CameraSvg from '@/assets/camera.svg?component';
	import DiscoBallSvg from '@/assets/disco-ball.svg?component';
	import ForkAndSpoonSvg from '@/assets/fork-and-spoon.svg?component';
</script>

<style scoped lang="postcss">
	svg > .st0 {
		@apply fill-current text-secondary-500;
	}

	div.hr-heart {
		@apply relative clear-both my-4 block h-auto overflow-hidden whitespace-nowrap w-full text-center;

		& span.first-line,
		& span.second-line {
			@apply relative inline-block align-middle mx-2 w-full max-w-[20vw] h-[1px] left-0 top-1/2 -mt-[1px] border-t-[1px] border-secondary-200;
		}
		& span.first-line {
		}

		& svg {
			@apply inline-block align-middle w-4 h-4 stroke-primary-400 stroke-[3px];
		}

		& span.second-line {
		}
	}
</style>
