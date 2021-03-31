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
						<a href="./hex-editor">Hex Editor</a>: A very raw and crappy hex
						editor, but it has the advantage of immediately injecting the
						changes into a running SMA4 game for a nice feedback loop.
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
					<li>
						<a href="./render-level">Render Level</a>: This tool takes an
						e-reader level file and renders it out. If it knows what a given
						sprite or object is, it will show it, otherwise it will just show a
						square. Clicking on a sprite or object shows the raw binary data for
						that entity. This helps discover the different sprites and objects
						in SMA4 levels.
					</li>
				</ul>
			</div>
		</Root>
	);
}

export default NextToolsIndexPage;
