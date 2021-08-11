import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Root } from '../layout/Root';
import typographyStyles from '../../styles/typography.module.css';
import { toId } from '../whats-new/WhatsNewPage';

function TipEntry({ title, children }: { title: string; children: ReactNode }) {
	const id = toId(title);

	return (
		<div className="mt-12 px-4 sm:px-0">
			<a href={`#${id}`}>
				<h3 id={id} className="group text-white font-bold text-xl">
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
				<TipEntry title="Move Mario to skip ahead">
					<p>
						Working on a later part of a room? Move Mario so you don&apos;t have
						to work through the whole room each time. Just remember to move him
						back when done.
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
			</div>
		</Root>
	);
}

export { TipsPage };
