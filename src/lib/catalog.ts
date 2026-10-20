import condimentos_1000 from '$lib/assets/img/condimentos-1000.webp';
import condimentos_640 from '$lib/assets/img/condimentos-640.webp';
import granos_1000 from '$lib/assets/img/granos-1000.webp';
import granos_640 from '$lib/assets/img/granos-640.webp';
import frutos_1000 from '$lib/assets/img/frutos-secos-1000.webp';
import frutos_640 from '$lib/assets/img/frutos-secos-640.webp';

export interface Family {
	id: string;
	name: string;
	headline: string;
	description: string;
	items: string[];
	image: { src: string; srcset: string; alt: string };
}

export const families: Family[] = [
	{
		id: 'condimentos',
		name: 'Condimentos',
		headline: 'El aroma que despierta cada plato.',
		description: 'Especias enteras y molidas, y mezclas para la cocina de todos los días.',
		items: ['Pimentón ahumado', 'Comino', 'Curry', 'Orégano'],
		image: {
			src: condimentos_1000,
			srcset: `${condimentos_640} 640w, ${condimentos_1000} 1000w`,
			alt: 'Montoncitos de pimentón, cúrcuma y comino molidos junto a clavos de olor'
		}
	},
	{
		id: 'granos',
		name: 'Granos',
		headline: 'La base de la mesa, a tu medida.',
		description: 'Legumbres, cereales y semillas a granel, frescos y sin aditivos.',
		items: ['Lentejas', 'Garbanzos', 'Arroz integral', 'Quinua'],
		image: {
			src: granos_1000,
			srcset: `${granos_640} 640w, ${granos_1000} 1000w`,
			alt: 'Montones de lenteja roja, fríjol negro y quinua sobre piedra oscura'
		}
	},
	{
		id: 'frutos-secos',
		name: 'Frutos secos',
		headline: 'Energía con sabor a lo bueno.',
		description: 'Nueces, almendras y mezclas tostadas con cuidado.',
		items: ['Almendras', 'Nueces', 'Pistachos', 'Arándanos'],
		image: {
			src: frutos_1000,
			srcset: `${frutos_640} 640w, ${frutos_1000} 1000w`,
			alt: 'Mezcla de almendras, marañones, nueces y pistachos con arándanos'
		}
	}
];
