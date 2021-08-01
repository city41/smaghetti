import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';

import typographyStyles from '../../styles/typography.module.css';

import airshipExamples from './AirshipPlatformExamples.png';

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
	breakingChange,
}: {
	title: string;
	date: string;
	children: ReactNode;
	breakingChange?: boolean;
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
						<span
							className={clsx({
								'text-white bg-red-700 p-1': breakingChange,
								'text-gray-400': !breakingChange,
							})}
						>
							{title}
						</span>
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
				<NewEntry title="New Entities" date="2021-08-01">
					<ul>
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
						quite make a tradition airship level. But it is getting there!
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
							src={airshipExamples}
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
					<p>
						If you hit any strange bugs in the future, feel free to reach out on{' '}
						<a
							target="_blank"
							rel="noreferrer"
							href="https://reddit.com/r/smaghetti"
						>
							Reddit
						</a>
						,{' '}
						<a
							target="_blank"
							rel="noreferrer"
							href="https://github.com/city41/smaghetti/issues"
						>
							GitHub
						</a>
						, or{' '}
						<a
							target="_blank"
							rel="noreferrer"
							href="mailto:matt.e.greer@gmail.com"
						>
							email me
						</a>
						.
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
