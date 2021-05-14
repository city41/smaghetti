import React from 'react';
import { Root } from '../../components/layout/Root';
import clsx from 'clsx';
import typographyStyles from '../../styles/typography.module.css';

function NextToolsIndexPage() {
	return (
		<Root title="tools" metaDescription="">
			<div
				className={clsx(typographyStyles.typography, 'max-w-2xl mx-auto pt-16')}
			>
				<h1
					className="font-bold text-5xl text-center mb-8"
					style={{ fontSize: '3rem' }}
				>
					Tools
				</h1>
				<p>
					These are tools I have built to help in the reverse engineering of
					SMA4.
				</p>
				<p className="p-2 -mx-2 bg-red-600 text-white">
					<h2 className="block text-lg">These tools are very raw and buggy</h2>
					They are just good enough to get the job done. I put them here in case
					people are curious and want to try them. If you want to help reverse
					engineer the game with these tools and are having trouble,{' '}
					<a href="mailto:matt.e.greer@gmail.com">let me know</a> and I can make
					them easier to use
				</p>
				<ul>
					<li>
						<p>
							<a href="./hex-tree">Hex Tree</a>: A pretty powerful tool that
							lets you explore a level, edit it, and see your changes right away
							in an emulator. Becoming the best way to reverse engineer the
							game.
						</p>
						<p>
							Still a work in progress, but the goal is to be a powerful tool
							that really allows reverse engineering to be effective, stay
							tuned.
						</p>
					</li>
					<li>
						<a href="./palettes">Palettes</a>: renders the currently extracted
						sprites in a bunch of palettes pulled from the game. This is to help
						find the correct palette to assign to a sprite or object in the
						editor.
					</li>
					<li>
						<a href="./tiles">Tiles</a>: extracts all of the compressed and
						uncompressed tiles from the ROM and displays them on the screen. It
						also includes a byte search to enable locating a tile using data
						pulled from an emulator (I am using mGBA).
					</li>
				</ul>
			</div>
		</Root>
	);
}

export default NextToolsIndexPage;
