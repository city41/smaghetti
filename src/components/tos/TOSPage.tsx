import React from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';

import typographyStyles from '../../styles/typography.module.css';

function TOSPage() {
	return (
		<Root title="Terms of Service" metaDescription="">
			<div
				className={clsx(typographyStyles.typography, 'max-w-2xl mx-auto pt-16')}
			>
				<h1
					className="font-bold text-5xl text-center mb-8"
					style={{ fontSize: '3rem' }}
				>
					Terms of Service
				</h1>
				<h2>Introduction</h2>
				<p>
					Here are the rules you must follow, otherwise you may be banned. In
					short, don&apos;t be a jerk
				</p>
				<ul>
					<li>No hateful, derogatory or discriminatory speech of any kind</li>
					<li>No pornography or anything suggestive of it</li>
					<li>
						Careful with swear words. Anything overly offensive may get changed
						by the admin
					</li>
					<li>
						Don&apos;t steal other people&apos;s levels and/or try to claim them
						as your own, whether those levels came from Smaghetti or other games
						entirely.
					</li>
					<li>
						Do not share any copyrighted data such as the SMA4 ROM with anyone.
						You must own the game and use your own copy.
					</li>
				</ul>
			</div>
		</Root>
	);
}

export { TOSPage };
