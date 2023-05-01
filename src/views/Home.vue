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
						Adicione as pessoas que vão ao casamento bem como as suas restrições alimentares!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Fotografias" path="/fotos" disabled>
					<template #icon>
						<CameraSvg />
					</template>
					<template #description>
						Faça upload das várias fotografias que vai tirar no nosso casamento!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Menu" path="/menu" disabled>
					<template #icon>
						<ForkAndSpoonSvg />
					</template>
					<template #description>
						Não sabe o Menu? Aqui pode ver em detalhe!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Playlist" path="/playlist" disabled>
					<template #icon>
						<DiscoBallSvg />
					</template>
					<template #description>
						Conhece bem os noivos e sabe quais são os seus gostos? Muito bem,
						então sugira as melhores músicas nesta fantástica Playlist!
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
