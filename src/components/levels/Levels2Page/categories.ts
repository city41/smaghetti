export const categories = [
	{ title: 'Newest', subtitle: null, slug: 'newest', userOrder: false },
	{ title: 'Popular', subtitle: null, slug: 'popular', userOrder: false },
	{
		title: 'By Tag',
		subtitle: 'not implemented yet',
		slug: 'by-tag',
		userOrder: true,
	},
	{
		title: 'Coins',
		subtitle: 'These levels have ace coins and/or e-coins for you to seek out',
		slug: 'coins',
		userOrder: true,
	},
	{
		title: "Dev's Favs",
		subtitle:
			"Hi I'm Matt and I am making Smaghetti. These are some of my favorite levels.",
		slug: 'dev-favs',
		userOrder: true,
	},
] as const;

export const userOrders = ['newest', 'popular'] as const;

export type CategorySlug = typeof categories[number]['slug'];
export type CategoryUserOrder = typeof userOrders[number];
