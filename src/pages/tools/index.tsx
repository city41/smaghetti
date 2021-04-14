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
				<h1>Tools</h1>
				<p>
					These are tools I have built to help in the reverse engineering of
					SMA4.
				</p>
				<ul>
					<li>
						<p>
							<a href="./hex-tree">Hex Tree</a>: A very raw tool that parses a
							level&apos;s data into a tree structure, and from there lets you
							mess with it and see how it changes in the running level.
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
