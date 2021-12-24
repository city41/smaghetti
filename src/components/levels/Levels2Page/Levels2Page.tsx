import React from 'react';
import { Root } from '../../layout/Root';

function Levels2Page() {
	return (
		<Root metaDescription="" title="Levels">
			<div className="max-w-2xl mx-auto pt-16">
				<div className="grid grid-cols-5">
					<button className="py-8">Newest</button>
					<button className="py-8">Most Liked</button>
					<button className="py-8">By Tag</button>
					<button className="py-8">E-Coins</button>
					<button className="py-8">Dev's Favs</button>
				</div>
			</div>
		</Root>
	);
}

export { Levels2Page };
