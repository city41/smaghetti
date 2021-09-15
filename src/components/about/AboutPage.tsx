import React from 'react';
import { Root } from '../layout/Root';
import typographyStyles from '../../styles/typography.module.css';

import sma4BannerJpg from './sma4Banner.jpg';
import gbaVsSnesOverlayPng from './gbaVsSnesOverlay.png';
import ereaderJpg from './ereader.jpg';
import levelCardsJpg from './levelCards.jpg';
import jumpClubPng from './jumpClub.png';
import earlySmaghettiPng from './earlySmaghetti.png';
import { YoutubeEmbeddedVideo } from './YoutubeEmbeddedVideo';

function AboutPage() {
	return (
		<Root title="About" metaDescription="About SMA4 and Smaghetti">
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">About Smaghetti</h1>
				<div className={typographyStyles.typography}>
					<img
						src={sma4BannerJpg}
						alt="Super Mario Advance 4 Banner Image"
						className="flow"
						width={800}
						height={400}
					/>
					<p>
						Super Mario Advance 4 is the Game Boy Advance version of Super Mario
						Bros 3. It&apos;s a somewhat strange version of the game. It uses
						the graphics from the Super Mario All Stars version of SMB3 from the
						SNES but with various fixes and enhancements. The playfield is
						cramped due to the GBA&apos;s lower resolution. They added voices
						for Mario and Luigi that most people find annoying (myself
						included). It has low quality, scratchy audio that is a common
						plague of GBA games. So in a few key ways, it&apos;s not a great way
						to play SMB3. But there&apos;s more to consider.
					</p>
					<figure>
						<img
							src={gbaVsSnesOverlayPng}
							alt="SNES and GBA screenshots overlayed to show size difference better"
							width={256}
							height={192}
						/>
						<figcaption>
							SNES SMB3 and SMA4 overlayed to show the screen size difference
						</figcaption>
					</figure>
					<h2>The GBA E-Reader</h2>
					<p>
						The E-Reader is a device that plugs into the GBA and allows you to
						swipe cards through it loading a small chunk of data. In the case of
						SMA4, the E-Reader was used to add 37 bonus levels to the game.
						These levels go above and beyond normal SMB3 by adding things from
						other Mario games. All in all, these E-Reader levels are really fun
						and a neat treasure trove of Mario goodness.
						<img
							src={ereaderJpg}
							alt="The E-Reader plugged into a Game Boy Advance"
							className="flow"
							width={585}
							height={476}
						/>
						<figure>
							<img
								src={levelCardsJpg}
								alt="E-Reader bonus level cards photo"
								width={598}
								height={502}
							/>
							<figcaption>E-Reader bonus level cards</figcaption>
						</figure>
					</p>
					<h2>Unused stuff found on the game cart</h2>
					<p>
						The E-Reader cards can hold very little data. So these levels only
						tell the game what should be in the level. All of the definitions
						for the items, enemies, etc that the levels use must be present on
						the cart. Presumably in preparation for even more E-Reader levels,
						the SMA4 cart contains various items, gizmos and enemies that went
						completely unused by Nintendo. This includes some pretty neat stuff,
						such as this fireball enemy.
					</p>
					<figure>
						<YoutubeEmbeddedVideo
							videoId="WB1WGQqWq7k"
							title="Unused homing fireball"
						/>
						<figcaption>One of the unused enemies found on the cart</figcaption>
					</figure>
					<h2>A bit of a mixed bag</h2>
					<p>
						This all adds up to an interesting game. On the one hand, the tiny
						screen and questionable audio make it kinda lame. But the E-Reader
						functionality, things from other Mario games, and the unused stuff
						really lets it stand out. To really let this game shine, we need a
						level editor that lets all of this get used to its full potential
						...
					</p>

					<h2>Making my own Mario Maker</h2>
					<p>
						I loved Mario Maker on the Wii U! But I also found it frustrating
						how difficult it was to share and find levels. Mario Maker on the
						Switch isn&apos;t really any better, and not having things like a
						keyboard and mouse makes designing levels more tedious than it needs
						to be.
					</p>
					<p>
						I thought how cool would it be if you could just send someone a URL
						of a level you made? People could easily share levels on social
						media. You could make a tweet linking straight to a level you just
						made, everyone else would just have to click,{' '}
						<a href="/editor/HTCbl1q6/Invaded-Beach/">like this!</a>
					</p>
					<p>
						So I started building my own, web based, Mario Maker clone called
						Jump Club.
					</p>
					<figure>
						<img
							src={jumpClubPng}
							alt="Screenshot of Jump Club"
							width={580}
							height={431}
						/>
						<figcaption>Jump Club</figcaption>
					</figure>
					<p>
						But after a while I realized Jump Club was just too big of a
						project. Making a level editor, a sharing platform and a game engine
						not to mention all of the graphics, animation and music is a{' '}
						<em>ton</em> of work! I decided to pivot and re-use Jump Club&apos;s
						editor for something else. That something else became Smaghetti.
					</p>

					<figure>
						<img
							src={earlySmaghettiPng}
							alt="A screenshot of Smaghetti when it first started"
							width={640}
							height={487}
						/>
						<figcaption>
							An early screenshot of Smaghetti showing its Jump Club roots
						</figcaption>
					</figure>
					<h2>Standing on the shoulders of giants</h2>
					<p>
						To build a level editor for an existing commercial game, you need to
						reverse engineer it and learn how it works. In the early 2010s a
						whole bunch of people were digging into the game and doing just
						that. This group of people created documents and tools that made it
						much easier to start learning the workings of the game. Using this
						existing body of knowledge, I was able to get a huge jump start on
						creating Smaghetti.
					</p>
					<p>
						Tools such as Solar Magic Advance by LuigiBlood, sma4savtool by
						purplebridge001, various GBA and ereader tools by CaitSith2 and
						others were all essential in getting Smaghetti off the ground.
					</p>
					<p>
						GBA emulators are also important tools for Smaghetti. Smaghetti uses
						GBA.js to let you test out your level, a web based GBA emulator
						created by Endrift. Endrift also created{' '}
						<a href="https://mgba.io" rel="noreferrer nofollower">
							mGBA
						</a>
						, a native GBA emulator. I use mGBA extensively when I am working on
						Smaghetti.
					</p>
					<p>
						Also want to thank those who have been directly helping with
						Smaghetti such as nintyalex, bumptytobumpty, mariomadproductions and
						others. If you&apos;ve reported a bug, or contributed any knowledge
						to reverse engineering SMA4, thank you!
					</p>
					<h2>Going forward</h2>
					<p>
						Smaghetti is far from done (checkout the{' '}
						<a href="/roadmap">roadmap</a> for an overview). I have a lot of big
						ideas for it, such as supporting Super Mario All-Stars on the SNES,
						building entire games rather than just E-Reader levels and more.
						Can&apos;t promise any of these things will actually happen, but who
						knows, let&apos;s see where this all goes...
					</p>
				</div>
			</div>
		</Root>
	);
}

export { AboutPage };
