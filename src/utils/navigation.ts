import WeddingInvitationSvg from '@/assets/wedding-invitation.svg?raw';
import HeartSvg from '@/assets/heart.svg?raw';
import CameraSvg from '@/assets/camera.svg?raw';
import DiscoBallSvg from '@/assets/disco-ball.svg?raw';
import ForkAndSpoonSvg from '@/assets/fork-and-spoon.svg?raw';
import GiftSvg from '@/assets/gift.svg?raw';

export const dashboardLinks = [
	{
		link: '/',
		label: 'Home',
	},
	{
		link: '/convite',
		label: 'Convite',
		icon: WeddingInvitationSvg,
		description:
			'Adicione as pessoas que vão ao casamento bem como as suas restrições alimentares!',
	},
	{
		label: 'Sessão Noivado',
		href: 'https://home.mycloud.com/action/share/325d25fe-b184-403e-b388-4f054c6ee7d9',
		target: '_blank',
		icon: HeartSvg,
		description:
			'Os noivos tornaram-se modelos por um dia? Veja as fotografias da sessão de noivado!',
	},
	{
		link: '/playlist',
		label: 'Playlist',
		icon: DiscoBallSvg,
		description:
			'Conhece bem os noivos e sabe quais são os seus gostos? Muito bem, então sugira as melhores músicas nesta fantástica Playlist!',
	},
	{
		link: '/fotografias',
		label: 'Fotografias',
		icon: CameraSvg,
		disabled: true,
		description:
			'Faça upload das várias fotografias que vai tirar no nosso casamento!',
	},
	{
		link: '/menu',
		label: 'Menu',
		icon: ForkAndSpoonSvg,
		description: 'Não sabe o Menu? Aqui pode ver em detalhe!',
	},
	{
		label: 'Prenda',
		link: '/gift',
		icon: GiftSvg,
		description:
			'O melhor presente que nos podem dar é estarem presentes! <br /> No entanto, se tiverem a intenção de nos oferecer uma ajuda deixamos o nosso Iban',
	},
];
