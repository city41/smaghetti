import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';
import {
	IconHeart,
	IconAlert,
	IconExperiment,
	IconVolumeMute,
} from '../../icons';

import typographyStyles from '../../styles/typography.module.css';

import airshipExamplesPng from './AirshipPlatformExamples.png';
import badWaterExamplePng from './BadBodyOfWaterExample.png';
import goodWaterExamplePng from './GoodBodyOfWaterExample.png';
import convertedButNotFixedPng from './convertedButNotFixed.png';
import castleCorruptECoinPng from './castleCorruptECoin.png';
import exitingAGiantPipePng from './exitingAGiantPipe.png';
import giantPipeExitPointPng from './giantPipeExitPoint.png';
import ripVanFishSleepsPng from './ripVanFishSleeps.png';
import endOfLevelBackdropExamplePng from './endOfLevelBackdropExample.png';
import entityListPng from './entityList.png';

function dateToHumanString(input: string): string {
	const date = new Date(input);

	const month = date.toLocaleDateString('en-us', {
		month: 'short',
	});

	const day = date.toLocaleDateString('en-us', {
		day: 'numeric',
	});

	const year = date.toLocaleDateString('en-us', {
		year: 'numeric',
	});

	return `${day} ${month} ${year}`;
}

function toId(s: string): string {
	return s
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '');
}

function NewEntry({
	title,
	date,
	children,
	alertingChange,
}: {
	title: string;
	date: string;
	children: ReactNode;
	alertingChange?: boolean;
}) {
	const id = toId(`${title} ${date}`);

	return (
		<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
			<a href={`#${id}`}>
				<h3
					id={id}
					className="group relative font-bold mb-4 text-xl flex flex-row justify-between items-baseline"
				>
					<div className="flex-1">
						<div className="text-gray-400 flex flex-row gap-x-2 items-center">
							{alertingChange && (
								<IconAlert className="w-8 h-8 text-yellow-300" />
							)}
							{title}
						</div>
					</div>
					<time className="text-sm text-gray-400" dateTime={date}>
						{dateToHumanString(date)}
					</time>
				</h3>
			</a>
			<div
				className={clsx(typographyStyles.typography, 'space-y-4 text-gray-50')}
			>
				{children}
			</div>
		</div>
	);
}

function WhatsNewPage() {
	return (
		<Root
			title="What’s New"
			metaDescription="A list of the latest features and additions to smaghetti.com"
		>
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">What&apos;s new</h1>
				<NewEntry
					title="Cannon has been deprecated"
					date="2022-02-14"
					alertingChange
				>
					<p>
						Since Cannon let you choose bobomb or cannon ball, it ended up only
						allowing the compatibility that works for both of them, limiting its
						usability.
					</p>
					<p>
						I have added &quot;Cannon - Fires Bobomb&quot; and &quot;Cannon -
						Fires CannonBall&quot; to replace it. If you are using Cannon in
						your level, switching to these new types will increase compatibility
						in your level, possibly allowing you to use more types of entities.
					</p>
				</NewEntry>
				<NewEntry title="Camera Nudge left and right" date="2022-02-07">
					<p>
						Camera Nudge can now nudge left and right. It also now sports the
						experimental icon to remind we still need to learn more about how it
						works.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-02-06">
					<ul>
						<li>Camera Nudge</li>
						<li>Fortress Axe</li>
					</ul>
					<p>
						Camera nudge (in meta category) is experimental, but give it a try
						and see if it works for you.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-02-05">
					<ul>
						<li>Big Boo</li>
						<li>Buzzy Beetle - Pixel Positioned</li>
						<li>Cheep Cheep - Hop</li>
						<li>Goomba - Pixel Positioned</li>
						<li>Green Koopa Troopa - Pixel Positioned</li>
						<li>Question Block - Giant, Spent</li>
						<li>Red Koopa Troopa - Pixel Positioned</li>
						<li>Spiny - Pixel Positioned</li>
					</ul>
				</NewEntry>
				<NewEntry title="Entity List improvements" date="2022-02-04">
					<p>
						The entity list is now slightly useful:
						<ul>
							<li>The rows are more compact</li>
							<li>
								You can jump from room to room (click on next or previous in the
								room header)
							</li>
							<li>
								You can delete an entity from the listing, hover over it to see
								the trash can
							</li>
							<li>
								Clicking on an entity in the list takes you to that entity in
								the room
							</li>
						</ul>
					</p>
					<img
						src={entityListPng}
						alt="entity list screenshot"
						width={232}
						height={155}
					/>
					<p>
						The real point of the entity list is to enable you to control how
						overlapping entities stack. This will enable you to decide how
						overlapping colorful boxes or plateaus look and work in your level
						for example. That&apos;s not here yet, but it is coming!
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-02-03">
					<ul>
						<li>Brick - Giant</li>
						<li>Coral - Giant</li>
						<li>Ice Block - Giant</li>
						<li>Lakitu Cloud - Giant</li>
						<li>Wood Block - Giant</li>
					</ul>
					<p>Giant Land in full effect</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-02-02">
					<ul>
						<li>Colorful Metal Box - With Shadow</li>
						<li>Stone Plateau</li>
					</ul>
					<p>
						The classic boxes found in SMB3 1-1 are finally in Smaghetti. The
						other colorful boxes that Smaghetti already had are a bit different.
						These new ones cast shadows, but must be placed on top of a wood
						floor.
					</p>
				</NewEntry>
				<NewEntry title="Play as Luigi" date="2022-02-01">
					<p>
						You can now test your levels as Luigi. In the lower left corner,
						click the toggle button to switch to Luigi.
					</p>
				</NewEntry>
				<NewEntry
					title="Level votes restored!"
					date="2022-01-31"
					alertingChange
				>
					<p>
						Phew! Turns out my backups were not misconfigured after all. I was
						able to restore all level votes.
					</p>
				</NewEntry>
				<NewEntry title="All level votes lost" date="2022-01-31" alertingChange>
					<p>
						Sorry everyone, I screwed up and all level votes were lost :( I have
						taken some steps to ensure that does not happen again. Really sorry
						about that.
					</p>
					<p>
						If you have some time, please{' '}
						<a href="/levels">go vote on your favorite levels</a>.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2022-01-30">
					<ul>
						<li>Basic Castle</li>
						<li>Basic Ghost House</li>
						<li>High Up In The Clouds</li>
						<li>Large Pulsating Bricks</li>
						<li>Long Clouds</li>
						<li>Pyramid Split Inside and Out</li>
						<li>Underground Double Cave</li>
						<li>Underwater More Terrain</li>
					</ul>
				</NewEntry>
				<NewEntry title="Entity List" date="2022-01-29">
					<p>
						Down in the editor&apos;s footer, over where warnings and errors
						appear, is now an entity listing. It will still show you
						warnings/errors, but if you click on it, it also shows all the
						entities in your level. You can click on an entity to focus it in
						the editor.
					</p>
					<p>
						This isn&apos;t very useful ... yet. But it will have more features
						that will make it more useful in the future.
					</p>
				</NewEntry>
				<NewEntry
					title="Spiny and Buzzy Beetle bug fix"
					date="2022-01-29"
					alertingChange
				>
					<p>
						Buzzy Beetle, Buzzy Beetle - Ceiling, Spiny and Spiny - Ceiling all
						had a bug that can cause compatibility to be incorrectly determined.
						If you have a level with any of these in it, possibly your level
						will have things removed next time you load it.
					</p>
					<p>Thanks to VGamer78 for alerting this</p>
				</NewEntry>
				<NewEntry title="Basic Object Priorities In Place" date="2022-01-27">
					<p>
						The first step for object priorities is now live. Don&apos;t know
						what I&apos;m talking about? Don&apos;t worry, this is a more behind
						the scenes kind of thing.
					</p>
					<p>
						With this change it is now possible to make water levels using the{' '}
						<b>Water</b> entity. And it is now possible to put stuff on top of
						the end of level backdrop, like this:
					</p>
					<img
						src={endOfLevelBackdropExamplePng}
						alt="items on top of an end of level backdrop"
					/>
					<p>Still a lot more object priority changes to come.</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-01-27">
					<ul>
						<li>Airship Window</li>
						<li>Wood Column - Wide</li>
						<li>Wood Floor - Moldy</li>
					</ul>
				</NewEntry>
				<NewEntry title="E-Coin Gallery" date="2022-01-26">
					<p>
						All custom e-coins gathered into one <a href="/e-coins">spot</a>.
					</p>
				</NewEntry>
				<NewEntry title="Wrap Around Rooms" date="2022-01-26">
					<p>
						You can now make a room wrap around. Set it in the same place you
						set a room&apos;s width and height.
					</p>
					<p>
						Wrap around rooms are one screen wide, and if you walk off the edge
						of the screen you appear on the other side.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-01-26">
					<ul>
						<li>Checkered Inner Corner - Lower Left, Left Edge</li>
						<li>Checkered Inner Corner - Lower Right, Bottom Edge</li>
						<li>Checkered Inner Corner - Upper Left, Left Edge</li>
						<li>Checkered Inner Corner - Upper Right, Top Edge</li>
						<li>Directional Lift</li>
						<li>Question Block - Giant, Solid</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-01-16">
					<ul>
						<li>Bob-omb - Parachute</li>
					</ul>
					<p>Again thanks to Bryce for adding this one</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-01-15">
					<ul>
						<li>Spiny Egg - Green</li>
					</ul>
					<p>Thanks to Bryce for adding this one</p>
				</NewEntry>
				<NewEntry title="Extracting Graphics issue" date="2022-01-15">
					<p>
						Next time you launch the editor, you may notice it sits on
						&quot;extracting graphics&quot; for a long time. This could be from
						10 seconds to about a minute. This is because I had to make a change
						that fixes an issue, and that reset all of the graphics. This long
						graphics extraction will only happen once, then it will be fast
						again like normal going forward.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2022-01-03">
					<ul>
						<li>Jelectro - Still</li>
					</ul>
					<p>Thanks to Bryce for finding this one</p>
				</NewEntry>
				<NewEntry title="New levels page" date="2022-01-01">
					<p>Happy new year!</p>
					<p>
						The new levels page is now live. It is now easier to find levels
						that interest you. You can also link directly to certain levels, for
						example{' '}
						<a href="/levels/by-tag/popular/kaizo">
							here are the most popular kaizo levels
						</a>
						.
					</p>
				</NewEntry>
				<NewEntry title="Creator pages" date="2021-12-24">
					<p>Happy holidays everyone!</p>
					<p>
						I just added simple creator pages. On the{' '}
						<a href="/levels">levels page</a>, click on a user&apos;s name to go
						to their page. It will show a listing of their levels. For example,{' '}
						<a href="/creator/matt">here are my levels</a>.
					</p>
				</NewEntry>
				<NewEntry title="Taking a break..." date="2021-11-10" alertingChange>
					<p>
						I am going to take a break from Smaghetti. Not sure how long,
						thinking I&apos;ll hop back on sometime in December. I&apos;ll be
						back for sure. Finishing Smaghetti and making it super awesome is
						important to me.
					</p>
					<p>
						Want to keep chatting Smaghetti? Check out the{' '}
						<a
							href="https://discord.gg/wBVE4yyWhM"
							rel="noreferrer noopener"
							target="_blank"
						>
							Discord server
						</a>
					</p>
					<img
						className="block mx-auto pt-4"
						src={ripVanFishSleepsPng}
						alt="Rip Van Fish sleeping"
					/>
				</NewEntry>
				<NewEntry title="Making underwater rooms" date="2021-11-08">
					<p>
						A new entity, <b>Underwater Water</b>, was just added. This makes it
						a bit easier to make an underwater level. Truthfully making
						underwater levels is pretty painful,{' '}
						<a href="/tips#underwater-water">here are some tips to help out</a>.
					</p>
					<p>
						Making underwater levels much easier to build is on the todo list.
						But at least it is possible!
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-11-07">
					<ul>
						<li>Line Track Pulley (in decorations)</li>
					</ul>
				</NewEntry>
				<NewEntry title="Emulator audio" date="2021-11-06">
					<p>
						When testing your level, you can now turn the audio on with the{' '}
						<IconVolumeMute className="bg-green-500 inline-block p-1 w-6 h-6" />{' '}
						button at the bottom of the screen.
					</p>
					<p>
						Audio works best in Chrome, but that is true of the emulator in
						general.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-11-06">
					<ul>
						<li>Boo - Choose its speed</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Experiment: game audio" date="2021-11-05">
					<p>
						Down in the lower right of the editor is this beaker icon{' '}
						<IconExperiment className="inline-block w-6 h-6" />. If you click it
						you can try out some experimental and unfinished features.
					</p>
					<p>
						A new experiment is game audio. If you turn it on, when testing your
						level you&apos;ll get sound effects and music. But it will probably
						be scratchy, slow and kinda junky. That is why it is experimental
						for now.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-10-31">
					<ul>
						<li>Jungle No Sky</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Bug fix: Allow double ended pipes to be warp destinations"
					date="2021-10-30"
				>
					Double ended pipes always warp to their opposite end. But they can
					still be warp destinations from other pipes. Smaghetti did not allow
					this, not it does.
				</NewEntry>
				<NewEntry
					title="Bug fix: desert and hills at night backgrounds"
					date="2021-10-29"
				>
					<p>
						These two backgrounds had the wrong background color set. This has
						now been fixed. If your level uses these backgrounds, to get the fix
						you need to change the background to something else, then back
						again.
					</p>
				</NewEntry>
				<NewEntry title="Configurable GBA buttons" date="2021-10-29">
					<p>
						You can now configure your keyboard and gamepad when testing your
						level in the GBA emulator. When playing your level, click on
						&quot;configure&quot; down at the bottom.
					</p>
					<p>
						The config is saved to your browser, so if you later use Smaghetti
						on a different computer, you may need to configure your buttons
						again.
					</p>
				</NewEntry>
				<NewEntry title="New 'Music' Track" date="2021-10-28">
					<p>You can now choose &quot;silence&quot; for a room&apos;s music.</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-10-28">
					<ul>
						<li>Blank</li>
						<li>Blue and Green Stars</li>
						<li>Colorful Brick Wall</li>
						<li>Far Away Hills in Clouds</li>
						<li>Tall Hills But Shorter</li>
						<li>Underground Cave</li>
					</ul>
					<p>Thanks again, Bryce</p>
				</NewEntry>
				<NewEntry title="Giant pipes as warp exits" date="2021-10-27">
					<p>
						It is possible to set a giant pipe as an exit. When you do this,
						Mario exits a bit on the left side.
						<img
							className="mt-4"
							src={exitingAGiantPipePng}
							alt="Mario exiting a giant pipe"
						/>
					</p>
					<p>
						Smaghetti now allows this, be sure to set the exit point here on a
						giant pipe
						<img src={giantPipeExitPointPng} alt="giant pipe exit point" />
					</p>
				</NewEntry>
				<NewEntry title="Airship pipe update" date="2021-10-27">
					<p>
						You can&apos;t use downward airship pipes to start a warp to
						someplace else, but you can use them as a warp destination.
						Yesterday Smaghetti didn&apos;t quite support that, but now it does.
					</p>
					<p>
						The downward airship pipe is now in the &quot;Warps&quot; section in
						the entity chooser.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-10-26">
					<ul>
						<li>Desert Brick Wall</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-10-26">
					<ul>
						<li>Pipe Airship - Down</li>
						<li>Pipe Vertical - Double Ended</li>
						<li>Tan Metal Brick - Large</li>
						<li>Tan Metal Brick - Medium</li>
					</ul>
					<p>You guessed it, Bryce yet again</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-10-25">
					<ul>
						<li>Blooper Nanny - Four Way</li>
						<li>Dolphin - Horizontal</li>
						<li>Dolphin - Vertical</li>
						<li>Snow Covered Grass Floor</li>
						<li>Wood Floor - Giant Left End Cap</li>
						<li>Wood Floor - Giant Right End Cap</li>
					</ul>
					<p>Props to Bryce yet again, and Maikli Messes as well</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-10-25">
					<ul>
						<li>Jungle</li>
						<li>Toad House</li>
					</ul>
					<p>
						For Toad House, it is only big enough for a single screen room. So a
						bit limiting, but with a scroll stop in place it can be used.
					</p>
					<p>Again thanks to Bryce for locating these</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-10-24">
					<ul>
						<li>Boomerang Bro - Drops Boomerang</li>
						<li>Bullet Bill - Targeting Generator</li>
						<li>Nipper Plant - Shooting</li>
						<li>Nipper Plant - Walking</li>
						<li>P-Wing</li>
						<li>Para Beetle Generator</li>
						<li>Platform Wood - Bobs</li>
					</ul>
					<p>
						Thanks to Bryce for finding these! The Para Beetle generator
						generates &quot;green&quot; para beetles! Except they are brown...
					</p>
				</NewEntry>
				<NewEntry title="Bug fix: Waterfall background" date="2021-10-24">
					<p>
						The waterfall background no longer has the invisible water nor the
						weird blue tint. It is now just a normal background.
					</p>
				</NewEntry>
				<NewEntry title="New Background" date="2021-10-23">
					<ul>
						<li>Hills in Clouds</li>
					</ul>
					<p>
						Despite the lack of updates, I have been working on Smaghetti. But
						lately it has been a lot of behind the scenes stuff. Eventually this
						work will allow for some cool things.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-10-08">
					<ul>
						<li>Cloud Platform - Thicc</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Now distinguishing errors and warnings"
					date="2021-10-08"
				>
					<p>
						The warning list now shows errors and warnings.
						<ul>
							<li>
								<b>Errors:</b> This really breaks your level in a significant
								way, such as very garbled graphics, soft locks or crashes the
								game. You definitely want to fix these.
							</li>
							<li>
								<b>Warnings:</b> These likely mess up your level and cause
								strangeness, but you can still play for the most part. These
								should be fixed too, but if you miss one, it&apos;s not the end
								of the world.
							</li>
						</ul>
					</p>
					<p>
						I am considering not allow publishing levels that have errors, but
						still debating on that one.
					</p>
				</NewEntry>
				<NewEntry title="New footer in the editor" date="2021-10-07">
					<p>
						There is now a footer at the bottom of the editor. It shows two
						things:
						<ul>
							<li>
								A warning count. If you have warnings, click on this to see them
								in detail. You can then click on an individual warning to be
								taken to the entity causing the warning.
							</li>
							<li>
								Level size meter. If your level gets too big, it will crash the
								game, more info <a href="/tips#level-size-meter">here</a>.
							</li>
						</ul>
					</p>
					<p>
						Soon, some types of warnings will show up as errors instead. An
						error is something that will definitely cause a problem in your
						level and should be fixed, where as a warning might cause a problem
						or it might not.
					</p>
				</NewEntry>
				<NewEntry
					title="Bug fix: buried veggies with e-coins"
					date="2021-10-03"
				>
					<p>
						If your level has a buried veggy with an e-coin inside of it, it
						could cause sprites (enemies, power ups, etc) to not spawn. This has
						now been fixed. Those dang e-coins :)
					</p>
				</NewEntry>
				<NewEntry title="Did your E-coin get stuck?" date="2021-10-02">
					<p>
						The E-coin editor had a bug in it that could cause it to be totally
						blank. That has now been fixed.
					</p>
					<p>
						If you still find your E-coin is blank, deleting it then re-adding
						it again will fix it.
					</p>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-10-01">
					<ul>
						<li>Bubble, new payloads: Hammer Bro Suit and Boomerang</li>
						<li>Buried Vegetable: E-Coin payload</li>
						<li>Buried Vegetable - Monty Mole (in terrain)</li>
						<li>
							Chest, new payloads: Hammer Bro Suit, Music Box, One Up, Three Up
						</li>
						<li>Classic Column (in decorations)</li>
						<li>Stairs - Down Right (in terrain)</li>
						<li>Stairs - Up Right (in terrain)</li>
						<li>Stalagmite (in terrain)</li>
						<li>Wood Ramp - Down Right (in terrain)</li>
						<li>Wood Ramp - Up Right (in terrain)</li>
					</ul>
					<p>
						Monty Mole as a Buried Vegetable payload was separated out into its
						own entity because it has different compatibility from all other
						Buried Vegetable payloads.
					</p>
				</NewEntry>
				<NewEntry title="E-Coins now work in the castle" date="2021-09-30">
					<p>
						After you collect the E-coin in your level, it will now show up
						correctly in the E-coin castle.
					</p>
					<p>
						<span className="inline-block px-2 bg-red-600 text-white">
							NOTE:
						</span>{' '}
						When testing your level inside Smaghetti, you can only go into the
						E-coin castle once. If you go into it again, the game will glitch
						out. This bug only happens in Smaghetti. If you take your save file
						and play it on a real GBA or in a normal emulator, this problem
						doesn&apos;t happen. I will see if I can get this fixed, but at
						least it only happens inside Smaghetti.
					</p>
				</NewEntry>
				<NewEntry
					title="E-Coins don't work in the castle ... yet"
					date="2021-09-28"
				>
					<p>
						After collecting an e-coin in a Smaghetti level, if you go to the
						castle, it will look like this
					</p>
					<img
						width={480}
						height={320}
						src={castleCorruptECoinPng}
						alt="Screenshot showing Smaghetti not creating water correctly"
					/>
					<p>
						I think I know why and I am working on a fix. I can&apos;t promise
						I&apos;ll pull this off, but I think seeing Smaghetti e-coins in the
						castle should be doable.
					</p>
				</NewEntry>
				<NewEntry title="E-Coin image editor" date="2021-09-27">
					<p>
						You can now design your own e-coins. You can either use the built in
						drawing pad to draw a simple coin, or import an image file.{' '}
						<a href="/tips#e-coin-photos">
							Here are some tips on using image files
						</a>
						.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-25">
					<ul>
						<li>E-Coin (in objects)</li>
					</ul>
					<p>
						So far the E-Coin has the Smaghetti logo on it. But letting you draw
						your own coin is coming.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-18">
					<ul>
						<li>Spin Platform (in gizmos)</li>
					</ul>
				</NewEntry>
				<NewEntry title="Moved Snake Block out of unfinished" date="2021-09-17">
					<p>
						Snake Block still needs to let you choose how fast it is and what
						its initial direction will be. But since it works other than that, I
						moved it out of unfinished.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-16">
					<ul>
						<li>Snake Block</li>
					</ul>
					<p>
						Snake Block is in the unfinished section because there are still a
						few things to figure out with it yet. But it is currently usable, so
						check it out, it&apos;s a fun entity. I hope to get Snake Block
						totally finished by this weekend.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-15">
					<ul>
						<li>Platform - Wood, Moves Left, Fall on Touch</li>
						<li>Platform - Wood, Move Right on Touch</li>
					</ul>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-09-14">
					<ul>
						<li>Platform Rope Support</li>
						<li>Muncher: greatly increased compatibility</li>
					</ul>

					<p>
						Muncher is now compatible with pretty much everything except airship
						entities. They come in many colors, so what color your munchers end
						up being is pretty random. But a strange colored muncher is better
						than no muncher at all!
					</p>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-09-13">
					<ul>
						<li>Bolt Head: Can now face up</li>
						<li>Stalactite - Single</li>
					</ul>
					<p>
						I don&apos;t think Nintendo made Bolt Heads in the other directions
						(left and down)
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-09-12">
					<ul>
						<li>Green Mountains</li>
					</ul>
					<p>
						There are supposed to be clouds that go with these mountains. But so
						far they are proving elusive. So for now at least, some mountains.
					</p>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-09-11">
					<ul>
						<li>Bill Blaster Burner: can now be turned upside down</li>
					</ul>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-09-10">
					<ul>
						<li>Bill Blaster: can now be turned upside down</li>
						<li>Fire Snake</li>
					</ul>
					<p>
						You will be able to turn Bill Blaster Burners upside down too, just
						haven&apos;t gotten to implementing that just yet.
					</p>
					<p>
						It&apos;s a mystery why Fire Snake ends up purple in Smaghetti
						levels. Still much to figure out...
					</p>
				</NewEntry>
				<NewEntry title="Unofficial Discord Server" date="2021-09-07">
					MrSkittles420 has started{' '}
					<a
						href="https://discord.gg/wBVE4yyWhM"
						target="_blank"
						rel="nofollower noreferrer"
					>
						an unofficial Smaghetti Discord server
					</a>
					.
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-06">
					<ul>
						<li>Fortress Lamp</li>
						<li>Wood Platform - Giant</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-05">
					<ul>
						<li>Grass Floor</li>
						<li>Pipe - Horizontal, Mini, Double Ended</li>
						<li>Platform - Blue/White Checkered</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-04">
					<ul>
						<li>Cloud Platform - Aero, Moving</li>
						<li>Nipper Plant</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-09-03">
					<ul>
						<li>Quicksand</li>
					</ul>
					<p>
						Quicksand is a bit of a turning point entity, as it is the first
						entity added to Smaghetti by reverse engineering the main game
						instead of e-reader levels. Reverse engineering of the main game is
						my main focus now.
					</p>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-09-01">
					<ul>
						<li>
							Airship Platform: now supports the upper window &quot;hatch&quot;,
							um, thing :)
						</li>
						<li>Para Bobomb Canceler</li>
						<li>Para Galoomba Canceler</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-09-01">
					<ul>
						<li>Pipes</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-30">
					<ul>
						<li>Bill Blaster - Burner</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Changes to 'liquid' terrain"
					date="2021-08-27"
					alertingChange
				>
					<p>
						All liquid terrains are now done using a drag handle, similar to how
						things like Colorful Metal Box work. The old way of
						&quot;painting&quot; the tiles is not good enough for these
						entities, as in more complex scenarios Smaghetti was unable to
						figure out how you wanted your liquid to work. For example,
						Smaghetti would build bodies of water that looked like this:
					</p>
					<img
						width={480}
						height={320}
						src={badWaterExamplePng}
						alt="Screenshot showing Smaghetti not creating water correctly"
					/>
					<p>
						With the new way liquid entities are handled, you can now get the
						expected result:
					</p>
					<img
						width={480}
						height={320}
						src={goodWaterExamplePng}
						alt="Screenshot showing Smaghetti now creating the water correctly"
					/>
					<p>
						But! If Smaghetti was making bad liquid for you before, you will
						need to go into your level and fix it using the new entities. The
						old liquid tiles will be replaced automatically for you, but the bad
						scenarios can not be automatically fixed. In other words, the above
						scenario will first look like this in the editor:
					</p>
					<img
						width={582}
						height={255}
						src={convertedButNotFixedPng}
						alt="Screenshot showing Smaghetti has converted the entities, but not fixed the problem"
					/>
					<p>
						And you will need to manually fix up your level to get the correct
						water.
					</p>
					<p>The impacted entities are:</p>
					<ul>
						<li>Choppy Water</li>
						<li>Lava</li>
						<li>Pool of Water</li>
						<li>Waterfall</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Giant Piranha can now fit in giant pipes"
					date="2021-08-21"
				>
					<p>
						Giant Piranha can be made to fit in a giant pipe after all. You can
						now choose whether it should be positioned for a regular or giant
						pipe by clicking its hammer button. Thanks again to NintyAlex for
						figuring this out.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-20">
					<ul>
						<li>Pipe - Vertical Giant</li>
						<li>Wood Floor - Giant</li>
					</ul>
					<p>
						Why don&apos;t giant piranha plants fit properly inside giant
						pipes?!
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-19">
					<ul>
						<li>Bolt - Down</li>
						<li>Bolt - Up</li>
						<li>Cloud Floor</li>
						<li>Pipe - Vertical Mini Muncher</li>
					</ul>
					<p>Bolts have been moved to terrain, in the airship section.</p>
					<p>
						Turns out vertical mini pipes must have munchers inside them.
						It&apos;s very strange how Nintendo implemented them O_o. Smaghetti
						has shown me many strange things Nintendo did, but this one takes
						the cake so far!
					</p>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-08-18">
					<ul>
						<li>Airship Crate</li>
						<li>Airship Metal Plate</li>
						<li>Magikoopa</li>
						<li>Piranha Plant - Giant</li>
						<li>Stalactite: now fully compatible with everything</li>
						<li>Surprise Donut Lift</li>
					</ul>
					<p>No giant pipes yet, but giant Piranhas do fit in normal pipes!</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-17">
					<ul>
						<li>Checkered Block</li>
						<li>Checkered Inner Corner - Upper Left</li>
						<li>Checkered Inner Corner - Upper Right</li>
						<li>Stalactite - Falling</li>
					</ul>
					<p>
						There are still 13 Checkered Terrain entities that need to be added.
						I have also found that the checkered terrain can behave weird in
						some layouts. Eventually (and it won&apos;t be for quite a while) I
						will add a checkered terrain auto-tiler. Where you just draw with a
						&quot;checkered terrain brush&quot; and Smaghetti figures out the
						tiles for you.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-08-17">
					<ul>
						<li>Bowser&apos;s Castle</li>
					</ul>
				</NewEntry>
				<NewEntry title="New/Changed Entities" date="2021-08-15">
					<ul>
						<li>Ghost Player</li>
						<li>Ace Coin: You can now choose the position for Ace Coins</li>
					</ul>
					<p>
						The Ghost Player lets you put Mario in a temporary starting spot for
						testing purposes. More details on the{' '}
						<a href="/tips#ghost-player">tips page</a>.
					</p>
					<p>
						Ace Coins have a specific position associated with them. For
						example, if a coin has position #2, when the player gets that coin,
						the second Ace Coin up in the HUD will get filled in. Before
						Smaghetti picked these positions automatically, and did a bad job.
						Now you can pick them yourself. This is helpful as you can now
						arrange it so Ace Coins generally get picked up in order.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-08-13">
					<ul>
						<li>Waterfalls</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-13">
					<ul>
						<li>Bill Blaster</li>
						<li>Bullet Bill - Targeting</li>
						<li>Burner: can now shoot flames up or down</li>
						<li>Platform Wood - Left/Right</li>
					</ul>
					<p>
						The previous Bill Blaster was a special one meant only for airship
						levels. It is still available in the enemies airship section. That
						one can not have a body.
					</p>
					<p>
						This new Bill Blaster is the general one that can be used in any
						level, and it can have a body of whatever height you choose. Thanks
						to NintyAlex for working these out.
					</p>
					<p>
						Bill Blasters can shoot various things, but so far Smaghetti only
						supports normal Bullet Bills. The other payloads will get added
						eventually.
					</p>
				</NewEntry>
				<NewEntry title="Liking levels" date="2021-08-08">
					<p>
						Found a level on the <a href="/levels">levels</a> page you liked?
						Click on the heart!{' '}
						<IconHeart className="text-red-600 inline-block w-6 h-6" />
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-08" alertingChange>
					<ul>
						<li>Piranha Plant - Facing Left, Red</li>
						<li>Piranha Plant - Facing Left, Red, Fire</li>
						<li>Piranha Plant - Facing Right, Red</li>
						<li>Piranha Plant - Facing Right, Red, Fire</li>
					</ul>

					<p>
						<span className="inline-block bg-yellow-200 text-yellow-900 p-1">
							I needed to rename Horizontal Piranha Plant.
						</span>{' '}
						So if it is in your levels, you will find it is now missing. You
						need to re-add it, sorry about that.
					</p>
					<p>
						Renames like this should be very rare, Horizontal Piranha Plant was
						one of the first entities in Smaghetti and I didn&apos;t think
						through its name very well in those early days.
					</p>
				</NewEntry>
				<NewEntry
					title="Change in how testing your level works"
					date="2021-08-07"
					alertingChange
				>
					<p>
						When you go to play your level, you will start in whatever room the
						editor is currently focused on.
					</p>
					<p>
						So if you are working on room 2, and go to test your level, you will
						start in room 2. The entire level will still be available. So for
						example if you have a warp that goes from room 2 to room 1, it will
						still work.
					</p>
					<p className="bg-yellow-200 text-yellow-900 py-1 px-2 -mx-2">
						When starting in a room other than 1, you start wherever Mario is
						positioned in that room. Make sure to move him to where it makes
						sense.
					</p>
					<p>
						If you want to test your level from the beginning, just return to
						room 1 before testing.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-07">
					<ul>
						<li>Piranha Plant - Fire</li>
						<li>Piranha Plant - Red</li>
						<li>Piranha Plant - Red, Fire</li>
						<li>Piranha Plant - Upside Down, Red</li>
						<li>Piranha Plant - Upside Down, Red, Fire</li>
						<li>Piranha Plant - Upside Down, Red, Short</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-08-07">
					<ul>
						<li>Inside Airship</li>
						<li>Mountains</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-08-06">
					<ul>
						<li>Basement Dungeon</li>
						<li>Pyramids</li>
						<li>Stone Wall</li>
					</ul>
					<p>The pyramids background is so cool!</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-06">
					<ul>
						<li>Angry Sun (see entry below)</li>
						<li>Burner</li>
						<li>Cheep Cheep - Jumping</li>
						<li>Note Block Warp</li>
						<li>Platform - Pullied</li>
						<li>Upward Water Current - Narrow</li>
						<li>Wood Floor - Snow Covered</li>
						<li>Wood Window Frame</li>
					</ul>
				</NewEntry>
				<NewEntry title="Angry Sun finished" date="2021-08-06">
					<p>
						Turns out the Angry Sun does work. It just takes a long time. If you
						put it in a level, it won&apos;t chase Mario until he has traveled
						quite a ways.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-05">
					<ul>
						<li>Pipe Vertical - Mini (unfinished)</li>
						<li>Bolt Head</li>
					</ul>
				</NewEntry>
				<NewEntry title="Tag your levels" date="2021-08-04">
					<p>
						You can now tag your levels such as &quot;traditional&quot; or
						&quot;kaizo&quot;. Find the tags in the same place you name your
						level. Tags will show up on the <a href="/levels">levels</a> page.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-04">
					<ul>
						<li>Platform - Wood Up/Down</li>
					</ul>
				</NewEntry>
				<NewEntry title="Level save bug fix" date="2021-08-03">
					<p>
						There was a bug preventing levels that had Stone Supports in them
						from saving. That has now been fixed.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-03">
					<ul>
						<li>Spiny Cheep Cheep Generator</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-02">
					<ul>
						<li>Platform - Left/Right</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-08-01">
					<ul>
						<li>Platform - Basic</li>
						<li>Platform - Up/Down</li>
						<li>Platform - Wrap Around</li>
					</ul>
					<p>Find them under gizmos in the new platforms subcategory</p>
				</NewEntry>
				<NewEntry title="Better camera settings" date="2021-08-01">
					<p>
						The previous camera settings really pushed the camera up and you
						could not see much below you. I have tweaked them to be more
						balanced.
					</p>
					<p className="bg-green-500 text-white p-1.5 -mx-1.5">
						Ultimately Smaghetti will let you configure the camera so that it
						makes sense for your level. But that probably won&apos;t be for a
						long time, as there is still a lot of work needed to pull that off.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-31">
					<ul>
						<li>Airship Propeller</li>
						<li>Cannon - Rotating</li>
						<li>Giant Cannon Ball</li>
						<li>Pipe Cannon - Mini</li>
						<li>Wall Mounted Cannon</li>
					</ul>
					<p>
						Almost all airship entities are now in Smaghetti. Sadly Smaghetti
						still can&apos;t do any kind of autoscrolling yet, so can&apos;t
						quite make a traditional airship level. But it is getting there!
					</p>
				</NewEntry>
				<NewEntry title="New Background" date="2021-07-30">
					<ul>
						<li>Stormy Clouds</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-30">
					<ul>
						<li>Airship Platform</li>
						<li>Porthole</li>
						<li>Rocky Wrench</li>
						<li>Wood Column</li>
					</ul>
					<p>Airship Platform can be configured in many ways</p>
					<div className="flex flex-row justify-center pt-6">
						<img
							width={480}
							height={320}
							src={airshipExamplesPng}
							alt="airship platform examples"
						/>
					</div>
					<p>
						Why is Wood Column so weird and limited? You&apos;ll have to ask
						Nintendo :)
					</p>
				</NewEntry>
				<NewEntry title="Cannon: all directions" date="2021-07-30">
					<p>
						Cannons can now be configured to face in all four directions. In
						other words, ceiling cannons are now possible.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-30">
					<ul>
						<li>Rope</li>
					</ul>
					<p>
						Rope is a cool entity because unlike vines you have complete control
						over its height. It is also fully compatible with everything, so you
						can put them in any room you want.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-29">
					<ul>
						<li>Bill Blaster</li>
						<li>Bullet Bill Generator Canceler</li>
					</ul>
					<p>
						You can now limit bullet bill generators to sections of a level.
					</p>
					<p>
						Bill Blasters need more work. So far they have no body and can only
						shoot Bullet Bills. Stay tuned for more.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-25">
					<ul>
						<li>Pipe Corner Transition</li>
						<li>Tan Metal Bricks - Pyramid</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-22">
					<ul>
						<li>Flying Cheep Cheep Generator</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-16">
					<ul>
						<li>Bullet Bill Generator - Cardinal</li>
						<li>Bullet Bill Generator - Diagonal</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-11">
					<ul>
						<li>Bowser Fireball</li>
						<li>Bowser Fire Generator</li>
						<li>Giant Question Block: Hammer Bro suit payload</li>
						<li>Para Bobomb Generator</li>
						<li>Para Galoomba Generator</li>
					</ul>
				</NewEntry>
				<NewEntry title="Giant Question Block ready" date="2021-07-10">
					<p>
						Giant Question Block has been stuck in the unfinished tab for ages.
						But not anymore! More giant stuff should be coming as well, stay
						tuned.
					</p>
					<p>
						Weirdly, it doesn&apos;t work with giant enemies :( Need to figure
						out why...
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-09">
					<ul>
						<li>Checkered Ceiling</li>
						<li>Checkered Inner Corner - Lower Left</li>
						<li>Checkered Inner Corner - Lower Right</li>
						<li>Checkered Interior</li>
						<li>Checkered Outer Corner - Lower Left</li>
						<li>Checkered Outer Corner - Lower Right</li>
						<li>Checkered Outer Corner - Upper Left</li>
						<li>Checkered Outer Corner - Upper Right</li>
						<li>Checkered Platform - Center</li>
						<li>Checkered Platform - Left Cap</li>
						<li>Checkered Platform - Right Cap</li>
						<li>Checkered Wall - Left</li>
						<li>Checkered Wall - Right</li>
					</ul>

					<p>
						Checkered terrain has its own subcategory in the item choose now,
						because there is a ton of different ones. I&apos;ll be adding all
						the checkered terrain gradually over the coming days. Go make those
						bonus rooms! Thanks to NintyAlex for figuring out the details on
						these.
					</p>
				</NewEntry>
				<NewEntry title="Cannon Balls" date="2021-07-09">
					<p>Cannons can now shoot either bobombs or cannon balls</p>
				</NewEntry>
				<NewEntry title="Fixed a camera bug" date="2021-07-08">
					<p>
						There was a bug that would cause items about 4 tiles above Mario to
						not render when first starting a level. That has now been fixed.
						Sorry about that, it made some levels really strange.
					</p>
					<p>
						This bug is also what was causing the confusion with Grass Chutes.
						So Grass Chutes have been moved out of the unfinished tab and are
						fully usable now.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-05">
					<ul>
						<li>Grass Chute - Down Left (unfinished)</li>
						<li>Grass Chute - Down Right (unfinished)</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-07-02">
					<ul>
						<li>Cannon</li>
					</ul>
					<p>The first airship entity. But so far, it can only fire bobombs.</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-30">
					<ul>
						<li>Podoboo (aka Lava Bubble)</li>
						<li>Podoboo - Ceiling</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Make a copy when doing drag and drop"
					date="2021-06-25"
				>
					<p>
						When you select some entities then drag them some place else, you
						can make a copy of them by holding down the shift key while
						dragging.
					</p>
				</NewEntry>
				<NewEntry title="Start Mario anywhere in the level" date="2021-06-24">
					<p>
						You can now place Mario anywhere you&apos;d like in your level. You
						can also resize a room to any size you want, so this can open up
						some cooler level types like starting way at the top of a tall level
					</p>
				</NewEntry>
				<NewEntry
					title="Download multiple levels to a save file"
					date="2021-06-23"
				>
					<p>
						On the <a href="/levels">levels</a> page, you can now choose to save
						up to 30 levels into a save file. You can then load that save file
						into a Game Boy using a flash cart, or into an emulator, and try out
						all the levels you chose.
					</p>
					<p>Doing this on your own levels inside the editor is coming</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-22">
					<ul>
						<li>Background Hills - Striped, Large</li>
						<li>Background Hills - Textured, Large</li>
						<li>Background Hills - Textured, Medium</li>
						<li>Background Hills - Textured, Small</li>
					</ul>
					<p>All hill backgrounds are now extracted</p>
				</NewEntry>
				<NewEntry title="Community Levels Page" date="2021-06-21">
					<p>You can now publish your levels to let other people try them.</p>
					<p>
						Published levels will show up on the <a href="/levels">levels</a>{' '}
						page. People can load your published levels into the editor and play
						with them, but they can&apos;t save them, not even a copy. I might
						loosen that restriction later, what do you prefer?
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-19">
					<ul>
						<li>Spike Top</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-06-19">
					<ul>
						<li>Night Sky</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-18">
					<ul>
						<li>Checkered Floor - Perspective</li>
						<li>Grass Plateau</li>
						<li>Pipe - Horizontal Mini</li>
						<li>Seaweed</li>
						<li>Snow Plateau</li>
					</ul>
				</NewEntry>
				<NewEntry title="Set Room Height" date="2021-06-18">
					<p>
						You can now set how tall a room is. Find it in the &quot;manage
						rooms&quot; mode, same place as background and music settings.
					</p>
					<p>
						Still need to figure out how to position Mario. Also be careful with
						really large rooms, you can make a level that is too big to fit in a
						save file. Eventually Smaghetti will warn when you do that, but for
						now, just be careful if you make really big rooms with lots of stuff
						in them.
					</p>
				</NewEntry>
				<NewEntry title="New Backgrounds" date="2021-06-17">
					<ul>
						<li>Crystal Underground</li>
						<li>Hills at Night</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-17">
					<ul>
						<li>Cloud Platform - Aero</li>
						<li>Cloud Platform - Thin</li>
						<li>Stone Support</li>
						<li>Warp Area</li>
						<li>Wiggler</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-16">
					<ul>
						<li>Stone Floor</li>
						<li>Tanooki Block</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Room Backgrounds" date="2021-06-15">
					<ul>
						<li>Metal Brick</li>
					</ul>
				</NewEntry>
				<NewEntry title="Set Room Width" date="2021-06-15">
					<p>
						You can now set how wide a room is. Find it in the &quot;manage
						rooms&quot; mode, same place as background and music settings.
					</p>
					<p>
						Level height and positioning Mario are coming, but they are proving
						harder to figure out.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-14">
					<ul>
						<li>Background Hills - Striped, Small</li>
						<li>Grass Slope - 30° Up Left</li>
						<li>Grass Slope - 30° Up Right</li>
						<li>Grass Staircase - Up Left</li>
						<li>Grass Staircase - Up Right</li>
						<li>Palm Tree</li>
						<li>Roto Disc</li>
					</ul>

					<p>
						There are more Roto Disc variants, so far only one the simple one
						has been brought in.
					</p>
				</NewEntry>
				<NewEntry title="New Room Backgrounds" date="2021-06-13">
					<ul>
						<li>Winter</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-13">
					<ul>
						<li>Background Hills - Striped, Medium</li>
						<li>Colorful Metal Box</li>
						<li>Scroll Stop - Horizontal</li>
					</ul>
				</NewEntry>
				<NewEntry
					title="Wood Floor, Underwater Floor changes!"
					date="2021-06-13"
				>
					<div className="bg-red-200 text-red-900 font-bold p-2">
						If your level uses wood or underwater floor, please read
					</div>
					<p>
						Underwater floor and wood floor were not implemented well. It was
						possible to use them in such a way your level would get corrupted.
						So I redid how they work. They now behave more like pipes and
						conveyor belts in that you have to size them with a drag handle.
					</p>
					<p>
						If your level had underwater or wood floor in it, they will be
						removed the next time you load the level. You will need to re-add
						them using the new approach. Sorry about that, but breaking changes
						like this are inevitable during early preview.
					</p>
					<div className="bg-green-200 text-green-900 p-2">
						But some good news, this new approach paves the way for the big
						&quot;boxes&quot; you see in levels like SMB3 1-1 and some other
						entities that Smaghetti wasn&apos;t yet able to have. Stay tuned.
					</div>
				</NewEntry>
				<NewEntry title="New Room Backgrounds" date="2021-06-12">
					<ul>
						<li>Bonus Room</li>
						<li>Desert</li>
						<li>Ghost House</li>
						<li>Plains</li>
						<li>Tall Hills*</li>
						<li>Tetris Room*</li>
					</ul>

					<p>Mario can finally get some fresh air</p>
					<p>Tall Hills and Tetris Room are unused assets in the game</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-11">
					<ul>
						<li>Goomba Generator</li>
					</ul>
					<p>
						Hanging out in its own subcategory in the palette because this game
						has a lot of generators, many more to come.
					</p>
				</NewEntry>
				<NewEntry title="Choose your music" date="2021-06-10">
					<p>
						You can now choose what music a room plays. It&apos;s in the same
						spot as choosing the background graphic.
					</p>
					<p>
						Why can you choose any song? Like credits, game over, etc? Because
						the game lets you do it :) So if you want strange music in your
						levels, go for it.
					</p>
				</NewEntry>
				<NewEntry title="Stretch Boo split into two entities" date="2021-06-10">
					<p>
						Originally Stretch Boo was one entity and Smaghetti would choose to
						make it upside down or upright depending on how you placed it in
						your level. This is convenient, but it is also limiting. It would
						mean you couldn&apos;t position a Stretch Boo how you wanted it in
						some situations.
					</p>
					<p>
						So now Stretch Boo comes in upright and upside down variants and you
						need to choose the right one for the situation.
					</p>
					<p>
						This is the same reason spiny and buzzy beetle come in separate
						ceiling versions.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-09">
					<ul>
						<li>Checkered Floor</li>
					</ul>
					<p>
						This is the first entity in the &quot;checkered terrain
						series&quot;, once all are added, you&apos;ll be able to construct
						entire rooms in a checkered motif
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-08">
					<ul>
						<li>Hot Foot</li>
						<li>Hot Foot - Shy</li>
						<li>Lava Lotus</li>
						<li>Stretch Boo</li>
						<li>Stretch Boo platform</li>
					</ul>
				</NewEntry>
				<NewEntry title="Fixed warp bug" date="2021-06-07">
					<p>
						After warping to a different room, did you notice missing graphics
						and things seemed glitchy?
					</p>
					<p>
						I believe I tracked down the problem and levels are working a lot
						better now after you warp.
					</p>
				</NewEntry>
				<NewEntry title="Flag Pole resizable" date="2021-06-07">
					<p>You can now pick how big to make a flag pole just like pipes</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-07">
					<ul>
						<li>Airship Pipe</li>
						<li>Blue Coin</li>
						<li>Coral Donut Block</li>
						<li>Monty Mole</li>
						<li>Underwater Floor</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-06">
					<ul>
						<li>Bomb</li>
						<li>Bumpty</li>
						<li>Bumpty - Aggressive</li>
						<li>Jelectro</li>
						<li>P-Switch Door</li>
						<li>Porcupo</li>
						<li>Rip Van Fish</li>
						<li>Rotating Checkered Block - Large</li>
						<li>Rotating Checkered Block - Small</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-05">
					<ul>
						<li>Blooper Nanny</li>
						<li>Galoomba - Parachute</li>
					</ul>
				</NewEntry>
				<NewEntry title="Keyboard shortcut for layers" date="2021-06-05">
					<p>
						Press the L key to toggle which layers are locked. Each time you
						press &apos;l&apos; it works through locking actors, locking stage,
						locking none.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-05">
					<ul>
						<li>Note Block - Three Way</li>
					</ul>
				</NewEntry>
				<NewEntry title="Bowser Laser Statue" date="2021-06-04">
					<p>Now shoots lasers.</p>
					<p>
						So far this is not optional, debating whether to make this a config
						or not...
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-04">
					<ul>
						<li>Amazing Flyin&apos; Hammer Bro</li>
						<li>Clapping Chuck</li>
						<li>Dolphin Pod</li>
						<li>Green Para Troopa - Patrolling</li>
						<li>Ice Block - Coin</li>
						<li>Ice Block - Muncher</li>
						<li>Ice Block - Small</li>
						<li>Piranha Plant - Horizontal Red</li>
						<li>Wood Platform</li>
						<li>Wood Support</li>
					</ul>
				</NewEntry>
				<NewEntry title="Horizontal Pipe" date="2021-06-04">
					<p>Horizontal pipe is now ready for use</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-03">
					<ul>
						<li>Iggy</li>
						<li>Larry</li>
						<li>Lemmy</li>
						<li>Morton</li>
						<li>Roy</li>
						<li>Wendy</li>
					</ul>
					<p>All Koopalings!</p>
				</NewEntry>
				<NewEntry title="Ludwig configuration" date="2021-06-03">
					<p>
						You can now configure how many fireballs it takes to kill Ludwig, as
						well as how many stomps it takes.
					</p>
					<p>
						Thanks to NintyAlex for figuring this out. He also figured out more
						info on Bowser, Boom Boom, as well as other Koopalings, which will
						get added to Smaghetti eventually.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-06-02">
					<ul>
						<li>Beach Ball</li>
						<li>See Saw Platform</li>
					</ul>
					<p>
						Beach Ball is an unused item in the game and it&apos;s pretty cool!
					</p>
				</NewEntry>
				<NewEntry title="Vertical Pipes" date="2021-06-02">
					<p>
						Vertical pipes are now ready to use. Find them in the warp section
						in the palette. They are still a bit raw and will get better as I
						work on them more.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-30">
					<ul>
						<li>Pipe - Vertical (unfinished)</li>
						<li>Piranha Plant</li>
					</ul>
					<p>
						Vertical pipes are close, but still some things to figure out. You
						can try one out by grabbing it from the Unfinished tab in the
						palette.
					</p>
					<p>
						Technically piranha plants can work without pipes, but they look
						broken. To stick it in a pipe, just drop it on top of the pipe with
						its mouth just below the pipe&apos;s lip. Remember you can lock
						either the stage or actor layers as needed to make this easier.
					</p>
				</NewEntry>
				<NewEntry title="Conveyor Belts config reworked" date="2021-05-31">
					<p>
						Conveyor belts now have a more intuitive and easier way to set them
						up. Still rougher than I ultimately want, but a good first step.
						Making Smaghetti really easy to use is a top priority.
					</p>
					<p>
						<a
							href="https://www.youtube.com/watch?v=u6iu-oajE30"
							rel="noreferrer"
						>
							Here is a quick video
						</a>{' '}
						showing the before and after.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-30">
					<ul>
						<li>Flag Pole</li>
						<li>Rope Railing</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-29">
					<ul>
						<li>Amazing Flyin&apos; Hammer Bro (unfinished)</li>
						<li>Big Bass</li>
						<li>Big Bertha</li>
						<li>Blooper</li>
						<li>Bolts and Bolt Lifts</li>
						<li>Flame Chomp</li>
						<li>Flurry</li>
						<li>Porcu-Puffer</li>
						<li>Swooper</li>
					</ul>
				</NewEntry>
				<NewEntry title="Set level timer" date="2021-05-28">
					<p>
						You can now set your level&apos;s timer. In the upper right corner,
						click the pencil to go into management mode. Once there, you can
						change the level name, timer and add/delete rooms
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-27">
					<ul>
						<li>Homing Fireball</li>
						<li>Hoopster</li>
						<li>Ptooie Potted Piranha Plant</li>
						<li>Ptooie Walking Piranha Plant</li>
					</ul>
					<p>
						The fireball is an enemy from Yoshi&apos;s island. It is unused in
						SMA4, now available to add to levels for the first time.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-27">
					<ul>
						<li>Wood Floor</li>
						<li>Pool of Water renamed to Choppy Water</li>
						<li>new Pool of Water which is still/sparkly water</li>
					</ul>
				</NewEntry>
				<NewEntry title="Conveyor Belt and Thwomp details" date="2021-05-27">
					<p>Conveyor belts can now be configured to go in either direction</p>
					<p>Thwomp&apos;s pursuit direction can now be configured</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-26">
					<ul>
						<li>Flying Piranha Plant</li>
						<li>Grass - Horizontal</li>
						<li>Grass - Upper Left Corner</li>
						<li>Grass - Upper Right Corner</li>
						<li>Grass - Vertical Left</li>
						<li>Grass - Vertical Right</li>
					</ul>
				</NewEntry>
				<NewEntry title="Save a copy of a level" date="2021-05-26">
					<p>
						When editing one of your levels, the save button now has an option
						to save a copy.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-25">
					<ul>
						<li>Pool of Water</li>
						<li>Vine</li>
						<li>Waterfall</li>
					</ul>
				</NewEntry>
				<NewEntry title="Coin Challenge Details Pane" date="2021-05-24">
					<p>
						You can now decide how many coins a Coin Challenge will require the
						player to collect.
					</p>
				</NewEntry>
				<NewEntry title="Fire Bar Details Pane" date="2021-05-24">
					<p>Fire Bar can now be fully configured.</p>
					<ul>
						<li>Rotate clockwise or counter-clockwise</li>
						<li>Pivot point at the end or in the center</li>
						<li>Number of fireballs</li>
					</ul>
					<p>
						The details pane is pretty ugly, but that&apos;s true of all detail
						panes :) Making them look nicer is on the TODO list.
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-22">
					<ul>
						<li>Hopping Bowser Statue</li>
					</ul>
				</NewEntry>
				<NewEntry title="Layers" date="2021-05-22">
					<p>The editor is now divided into two layers: actors and stage</p>
					<p>
						Often these layers don&apos;t matter much, but they become important
						when working with large objects such as the black backdrop at the
						end of levels and large terrain. The layers enable working with
						these large entities without smaller things like enemies getting in
						the way, and vice versa
					</p>
					<p>
						Now that layers are in place, large terrain is the next thing to add
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-16">
					<ul>
						<li>Ceiling Buzzy Beetle</li>
						<li>Ceiling Spiny</li>
					</ul>
				</NewEntry>
				<NewEntry title="Lakitu payloads" date="2021-05-15">
					<p>
						Lakitu can now be set to either throw an orange egg, which becomes a
						spiny upon landing. Or a green egg, which stays an egg upon landing
						and is more aggressive than spinies.
					</p>
					<p>
						Possibly can configure Lakitu to throw coins as well, but so far
						have not been able to find that setting.
					</p>
				</NewEntry>
				<NewEntry title="New Entity" date="2021-05-14">
					<ul>
						<li>Fluffy Cloud</li>
					</ul>
				</NewEntry>
				<NewEntry title="Compatibility Pages" date="2021-05-13">
					<p>
						If the palette says an entity can&apos;t be added, it&apos;s because
						that entity is not compatible with another entity you&apos;ve
						already added to the room. Now if you click on the &quot;see
						compatibility chart&quot; link in the palette, it will show you a
						breakdown of which entities work and don&apos;t work together. For
						example,{' '}
						<a
							href="/compatibility/GrandGoomba"
							target="_blank"
							rel="noreferrer"
						>
							here is Grand Goomba&apos;s compatibility page
						</a>
						.
					</p>
				</NewEntry>
				<NewEntry title="Object Sets" date="2021-05-13">
					<p>
						Smaghetti now understands object sets. That means it knows which
						objects can be in the same room together and how to load them.
					</p>
					<p>
						With object sets now in place, these new entities have now been
						added:
					</p>
					<ul>
						<li>Cactus</li>
						<li>Cement Block</li>
						<li>Flower Bush</li>
						<li>Lakitu Cloud</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-7">
					<ul>
						<li>Beached Cheep Cheep</li>
						<li>Fishbone</li>
						<li>Galoomba</li>
						<li>Invisible Block</li>
						<li>One Way Door</li>
						<li>River Cheep Cheep</li>
						<li>Winged Platform</li>
						<li>Baby Cheep Cheep</li>
						<li>Bowser Fire Statue</li>
						<li>Dolphin Pod</li>
						<li>Fall Away Spike</li>
						<li>Flutter</li>
						<li>Hothead</li>
						<li>Water Cheep Cheep</li>
					</ul>
					<p>
						Fishbone and Flutter are unused entities, now usable for the first
						time in SMA4!
					</p>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-7">
					<p>
						Both of these are unused entities that Nintendo left in the game,
						now usable for the first time in SMA4!
					</p>
					<ul>
						<li>Floating Block</li>
						<li>Arrow Lift</li>
					</ul>
				</NewEntry>
			</div>
		</Root>
	);
}

export { WhatsNewPage, toId };
