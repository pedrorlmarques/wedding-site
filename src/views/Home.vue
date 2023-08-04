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
						Adicione as pessoas que vão ao casamento bem como as suas restrições
						alimentares!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton
					title="Sessão Noivado"
					href="https://home.mycloud.com/action/share/325d25fe-b184-403e-b388-4f054c6ee7d9"
					target="_blank">
					<template #icon>
						<HeartSvg />
					</template>
					<template #description>
						Os noivos tornaram-se modelos por um dia? Veja as fotografias da
						sessão de noivado!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Playlist" path="/playlist">
					<template #icon>
						<DiscoBallSvg />
					</template>
					<template #description>
						Conhece bem os noivos e sabe quais são os seus gostos? Muito bem,
						então sugira as melhores músicas nesta fantástica Playlist!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Fotografias" path="/fotos">
					<template #icon>
						<CameraSvg />
					</template>
					<template #description>
						Faça upload das várias fotografias que vai tirar no nosso casamento!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Menu" path="/menu">
					<template #icon>
						<ForkAndSpoonSvg />
					</template>
					<template #description>
						Não sabe o Menu? Aqui pode ver em detalhe!
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton title="Prenda" path="/gift" target="_blank">
					<template #icon>
						<GiftSvg />
					</template>
					<template #description>
						O melhor presente que nos podem dar é estarem presentes!
						<br />
						No entanto, se tiverem a intenção de nos oferecer uma ajuda deixamos
						o nosso Iban
					</template>
				</AnchorToPagesButton>
				<AnchorToPagesButton
					title="Inquérito"
					href="https://forms.gle/iDNgZmnWZ6pbuZyD9"
					target="_blank">
					<template #icon>
						<SurveySvg />
					</template>
					<template #description>
						Dá-nos uma opinião sobre o website do Casamento!
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
	import GiftSvg from '@/assets/gift.svg?component';
	import SurveySvg from '@/assets/survey.svg?component';
</script>

<style scoped lang="postcss">
	div.hr-heart {
		@apply relative clear-both my-4 block h-auto overflow-hidden whitespace-nowrap w-full text-center;

		& span.first-line,
		& span.second-line {
			@apply relative inline-block align-middle mx-2 w-full max-w-[20vw] h-[1px] left-0 top-1/2 -mt-[1px] border-t border-secondary-200;
		}

		& svg {
			@apply inline-block align-middle w-4 h-4 stroke-primary-400 stroke-[3px];
		}
	}
</style>
