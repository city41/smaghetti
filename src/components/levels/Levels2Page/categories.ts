export const categories = [
	{
		title: 'All',
		subtitle: 'All {count} levels that were published',
		slug: 'all',
	},
	{
		title: 'By Tag',
		subtitle: 'Find levels by a certain style',
		slug: 'by-tag',
	},
	{
		title: 'Coins',
		subtitle:
			'These {count} levels have ace coins and/or e-coins for you to seek out',
		slug: 'coins',
	},
] as const;

export const userOrders = ['newest', 'popular'] as const;

export type CategorySlug = typeof categories[number]['slug'];
export type CategoryUserOrder = typeof userOrders[number];
