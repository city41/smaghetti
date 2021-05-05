import React from 'react';
import { Root } from '../../components/layout/Root';
import clsx from 'clsx';
import typographyStyles from '../../styles/typography.module.css';

function NextHowEntitiesAreDividedIntoSetsPage() {
	return (
		<Root title="How entities are divided into sets" metaDescription="">
			<div
				className={clsx(typographyStyles.typography, 'max-w-2xl mx-auto pt-16')}
			>
				<h1>How entities are divided into sets</h1>
				<p>
					The Game Boy Advance can only load so many graphic tiles into memory.
					So Nintendo divided up all the entities in the game (enemies, terrain,
					etc) into different sets. Very common entities like Goomba and
					Mushroom are in many sets and can almost always be added to a room.
					But more unique entities such as Sledge Bro or Buster Beetle are
					usually only found in one set.
				</p>
				<p>
					Each room in a level can at most load six sets. So when you add
					entities into your room, they may cause other entities to no longer be
					able to be added. This is because the sets these two entities are in
					can never be loaded at the same time as they both want to occupy the
					same position within the available six slots.
				</p>
				<p className="bg-green-500 py-2 px-4 text-white inline-block">
					TODO: explain this way better and make this page a lot better
				</p>
			</div>
		</Root>
	);
}

export default NextHowEntitiesAreDividedIntoSetsPage;
