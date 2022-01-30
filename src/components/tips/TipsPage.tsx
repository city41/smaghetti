import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';
import typographyStyles from '../../styles/typography.module.css';
import { toId } from '../whats-new/WhatsNewPage';

import eCoinTemplateWPalettePng from './eCoinTemplateWPalette.png';
import pipeWarpsPng from './pipeWarps.png';
import seaToSkyScreenshotPng from './seaToSkyScreenshot.png';
import eraseForFloorPng from './eraseForFloor.png';
import advanceCoinsInHudPng from './advanceCoinsInHud.png';
import advanceCoinPositioningPng from './advanceCoinPositioning.png';
import advanceCoinHudGapPng from './advanceCoinHudGap.png';

import styles from './TipsPage.module.css';
import { entityMap } from '../../entities/entityMap';

function TipEntry({ title, children }: { title: string; children: ReactNode }) {
	const id = toId(title);

	return (
		<div className="mt-12 px-4 sm:px-0'">
			<a href={`#${id}`}>
				<h3
					id={id}
					className={clsx(
						styles.headerTarget,
						'group text-white font-bold text-xl'
					)}
				>
					{title}
				</h3>
			</a>
			<div className={clsx(typographyStyles.typography, 'text-gray-200 ml-6')}>
				{children}
			</div>
		</div>
	);
}

function TipsPage() {
	return (
		<Root
			title="Tips"
			metaDescription="Tips on using Smaghetti more effectively"
		>
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">Editor Tips</h1>
				<p className="bg-red-200 -mx-4 p-4 mb-24 text-gray-900">
					Really simple so far. I plan to expand this page into nice advanced
					usage docs. Stay tuned.
				</p>
				<TipEntry title="You can't trust the editor">
					<p>
						What you see in the editor might not match what happens in the real
						game. You should always test your level out thoroughly to make sure
						it is doing what you expect.
					</p>
					<p>
						Smaghetti&apos;s editor tries its best to mimick the real game. But
						there are just way too many combinations of entities. Most of the
						time, things work out just fine. But sometimes if you put two
						certain entities together in a new way, they may behave strangely in
						game, maybe even cause a crash.
					</p>
				</TipEntry>
				<TipEntry title="Mario's position and the camera">
					<p>
						Where Mario starts in a room has an influence on the camera. If you
						start him down low, then the camera will bias up high. If you start
						him about 3 or 4 files up from the bottom, the camera will be more
						balanced.
					</p>
					<p>
						This is temporary, eventually Smaghetti will give you controls to
						configure the camera. But that probably won&apos;t get added for a
						good while.
					</p>
				</TipEntry>
				<TipEntry title="The actors and stage layers">
					<p>
						At the top of the editor, towards the right are two padlocks labeled
						&quot;actors&quot; and &quot;stage&quot;. Actors are things like
						enemies, items, gizmos, etc. The stage is things like terrain,
						pipes, etc.
					</p>
					<p>
						Sometimes you need to have two things overlap, like putting a
						piranha plant inside a pipe. Once they are both laid down, they
						become hard to work with. That is where the locks come in. If you
						click the stage lock, the pipe will get locked down and you can work
						on the piranha, and vice-versa with the actors lock.
					</p>
				</TipEntry>
				<TipEntry title="Keyboard shortcuts">
					<p>
						In the editor press &apos;?&apos; to see all the shortcuts
						available.
					</p>
				</TipEntry>
				<TipEntry title="Hold shift when dragging to copy">
					<p>
						When dragging something in the editor, if you hold shift it will
						make a copy of what you are dragging. This is especially useful when
						you need many copies of something that has to be configured.
						Configure the first one, then make copies.
					</p>
				</TipEntry>
				<TipEntry title="Press 'p' twice to get playing again quicker">
					<p>
						&apos;p&apos; toggles between playing and editing. If you die and
						want to try again, press p twice. This will reset the emulator and
						it&apos;s much faster than waiting for the game to let you try the
						level again.
					</p>
					<p>You need a pretty fast machine for this tip unfortunately.</p>
				</TipEntry>
				<TipEntry title="Vine and Wood Support">
					<p>
						These two behave a little different from other entities. They
						automatically grow downward until they hit something. That&apos;s
						just how Nintendo made these entities work.
					</p>
				</TipEntry>
				<TipEntry title="Scroll Stop">
					<p>
						In the meta section of the item chooser is &quot;Scroll Stop -
						Horizontal&quot;. This entity prevents the screen from scrolling
						past it. You can click on its arrow to change the direction of
						scrolling it stops.
					</p>
					<p>
						With this entity, you can chop one room into several smaller rooms.
						The scroll stop will prevent the player from seeing other parts of
						the level.
					</p>
				</TipEntry>
				<TipEntry title="Try Chrome if the emulator is too slow">
					<p>
						I hate having to suggest this. But it is true that Chrome runs the
						emulator much faster than Firefox.
					</p>
				</TipEntry>
				<TipEntry title="Ghost Player">
					<p>
						The Ghost Player entity is found in the meta section of the entity
						chooser. It lets you start Mario at a temporary location in your
						room, for testing purposes.
					</p>
					<ul>
						<li>
							There can only be one Ghost Player per room. If you draw a new
							one, the old one gets erased. Use this to quickly set up a new
							ghost wherever you are working in your room.
						</li>
						<li>
							The Ghost Player always stays in slot 1 in the palette. So you can
							quickly switch to it by pressing 1 on your keyboard.
						</li>
						<li>
							When testing a room, if it has a ghost, that is where Mario will
							start the level, otherwise he starts in his real position.
						</li>
						<li>Whenever you save your level, all ghosts are removed.</li>
					</ul>
				</TipEntry>
				<TipEntry title="E-Coin Photos">
					<p>
						You can use an image file for your E-Coin. The image will get scaled
						to 24x24, so smaller images work better. The image&apos;s colors
						will also be converted to the E-Coin palette.
					</p>
					<img
						src={eCoinTemplateWPalettePng}
						className="w-24 h-24"
						alt="E-Coin template image"
					/>
					<p>
						If you want to design a coin in the same style as Nintendo&apos;s,
						you can use this template image as your starting point. The e-coin
						palette is in the upper corner for reference. No need to delete the
						palette, when you use the image it will ignore all pixels outside
						the coin area.
					</p>
					<h3>Offensive images warning</h3>
					<p>
						if you publish your level with an offensive coin image, you may find
						your level unpublished. Repeat offenders will be banned from
						publishing levels. Crude, dumb, immature, etc images are fine.
					</p>
				</TipEntry>
				<TipEntry title="Level size meter">
					<p>
						The meter at the bottom of the editor shows your level&apos;s
						current size in bytes. If your level is too big, it may cause
						problems when playing it:
						<ul>
							<li>
								<span className="p-1 font-bold bg-green-500">
									Under 2024 bytes:
								</span>{' '}
								You are fine, no problems
							</li>
							<li>
								<span className="p-1 font-bold bg-yellow-500 text-black">
									2025 to 2070 bytes:
								</span>{' '}
								Your level will probably still work but might experience issues.
								If you can&apos;t get it down under 2024, you should test it
								thoroughly, especially warping between rooms.
							</li>
							<li>
								<span className="p-1 font-bold bg-red-500 text-white">
									Greater than 2070 bytes:
								</span>{' '}
								If it is above 2070 bytes, you will almost certainly hit issues
								such as the level not loading at all, or crashing when warping
								to another room.
							</li>
						</ul>
					</p>
				</TipEntry>
				<TipEntry title="Pipe warp exits">
					<p>
						When making a pipe warp, you need to set the destination on the
						correct part of the exit pipe in order for the warp animation to
						look correct in game.
					</p>
					<p>Here are the correct exit locations for all pipe orientations:</p>
					<img
						src={pipeWarpsPng}
						className="h-24"
						alt="Correct pipe exit locations"
					/>
					<p className="bg-red-200 text-red-900 -mx-2 p-2">
						Making this easier and less error prone is on the TODO list.
					</p>
				</TipEntry>
				<TipEntry title="Underwater Water">
					<p>
						<b>
							You can also make a{' '}
							<a href="#how-to-make-a-standard-water-level">
								standard water level
							</a>{' '}
							which is a bit easier
						</b>
					</p>
					<p>
						Underwater Water is a normal tile entity. If you use it in a regular
						room, it will look and behave just like Choppy Water.
					</p>
					<p>
						But if you choose the underwater background, then Underwater Water
						will be invisible, but maintain the swimming mechanic. So you can
						create an underwater level by choosing this background, and filling
						it up with Underwater Water (the paint bucket tool is handy for
						this). For coins, be sure to use the water version (it has a little
						water icon in the lower corner). The water version of coins allow
						Mario to keep swimming when he collects them.
					</p>
					<p>
						This is how Nintendo made some underwater e-reader rooms. For
						example, the second room of Sea to Sky was built this way
						<img
							className="my-4 mx-auto"
							src={seaToSkyScreenshotPng}
							alt="Sea to Sky level screenshot"
						/>
					</p>
					<p className="-mx-2 p-2 bg-red-200 text-red-900">
						There are some downsides to this approach:
						<ul>
							<li>
								Mario will make an &quot;enter water splash&quot; animation
								right when the level starts if you have him just sitting in the
								water. To avoid that, you can make him enter the room via a
								pipe. If you have him start out standing on something, the
								splash is less noticable.
							</li>
							<li>
								Filling a huge room with Underwater Water might slow the editor
								down. Hopefully I can make improvements here.
							</li>
						</ul>
						Also the Underwater Floor is a bit of a pain to use. You need to
						make sure there are no Underwater Water tiles behind any floors. The
						easiest way to do that is to fill the whole level with water. Then
						use the eraser to clear out areas you want the floor to go, then
						drop in the floors.
						<img
							src={eraseForFloorPng}
							alt="erasing water to make room for the floor"
						/>
						If you don&apos;t do this, your floors will show up corrupted when
						playing your level.
					</p>
				</TipEntry>
				<TipEntry title="How to make a standard water level">
					<ol className="list-decimal flex flex-col gap-y-4 mt-4">
						<li>Change the background of your room to underwater</li>
						<li>
							Place the water entity (found under terrain in the water section)
							in the upper left corner of the room. It looks like this:
							<div className="my-2">{entityMap.Water.simpleRender(50)}</div>
						</li>
					</ol>
					<p>
						There&apos;s no step three! Real Nintendo water levels also have
						some meta sprites that fix up scrolling and other things that make
						water levels a bit more polished. Those are still to come in
						Smaghetti.
					</p>
					<p>
						<span className="bg-red-200 text-red-900 px-2 py-1">Warning:</span>{' '}
						The water entity will not completely fill out a tall level. Water
						can only be about 30 tiles tall.
					</p>
				</TipEntry>
				<TipEntry title="Positioning Advance Coins">
					<p>
						When your level has Advance Coins in it, the HUD has a little spot
						to tell the player which ones they have collected.
						<img
							className="my-4"
							src={advanceCoinsInHudPng}
							alt="Advance Coins in the HUD"
							width={204}
							height={88}
						/>
					</p>
					<p>
						For each Advance Coin in your level, you need to specify which slot
						it will be in the HUD. The first coin a player finds is usually
						number 1, then number 2, and so on. That way if the player collects
						a coin and there are gaps in the HUD, they know they missed some
						coins.
						<img
							className="my-4"
							src={advanceCoinHudGapPng}
							alt="A gap in the Advance Coin HUD"
							width={204}
							height={96}
						/>
					</p>
					<p>
						Just click on your Advance Coins and assign them a position
						<img
							className="my-4"
							src={advanceCoinPositioningPng}
							alt="Assigning position to an Advance Coin"
						/>
					</p>
				</TipEntry>
			</div>
		</Root>
	);
}

export { TipsPage };
