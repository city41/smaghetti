import React from 'react';
import { Root } from '../../layout/Root';
import { Menu, MenuEntry } from './Menu';
import { Pagination } from './Pagination';

const categories = [
	{ title: 'Newest', slug: 'newest' },
	{ title: 'Popular', slug: 'popular' },
	{ title: 'By Tag', slug: 'by-tag' },
	{ title: 'E-Coins', slug: 'e-coin' },
	{ title: "Dev's Favs", slug: 'dev-favs' },
] as const;

type CategorySlug = typeof categories[number]['slug'];

type PublicLevels2PageProps = {
	currentSlug: CategorySlug;
	onSlugClick: (newSlug: CategorySlug) => void;
};

type InternalLevels2PageProps = {
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
};

function Levels2Page({
	currentSlug,
	onSlugClick,
	currentPage,
	onNextClick,
	onPreviousClick,
}: PublicLevels2PageProps & InternalLevels2PageProps) {
	return (
		<Root metaDescription="" title="Levels">
			<div className="max-w-2xl mx-auto pt-16">
				<Menu>
					{categories.map((c) => {
						return (
							<MenuEntry
								key={c.slug}
								current={currentSlug === c.slug}
								onClick={() => {
									onSlugClick(c.slug);
								}}
							>
								{c.title}
							</MenuEntry>
						);
					})}
				</Menu>
				<Pagination
					currentPage={currentPage}
					onNextClick={onNextClick}
					onPreviousClick={onPreviousClick}
				/>
			</div>
		</Root>
	);
}

export { Levels2Page, categories };
export type { PublicLevels2PageProps, CategorySlug };
