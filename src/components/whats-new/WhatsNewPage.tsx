import React, { ReactNode } from 'react';
import { Root } from '../layout/Root';

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

function NewEntry({
	title,
	date,
	children,
}: {
	title: string;
	date: string;
	children: ReactNode;
}) {
	return (
		<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
			<h3 className="text-gray-400 font-bold mb-4 text-xl flex flex-row justify-between items-baseline">
				<span className="flex-1">{title}</span>
				<time className="text-sm" dateTime={date}>
					{dateToHumanString(date)}
				</time>
			</h3>
			<div className="space-y-4 text-gray-50">{children}</div>
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
				<h2 className="font-bold mb-12 text-2xl pl-4 sm:pl-0">What’s new</h2>
				<NewEntry title="Compatibility Pages" date="2021-05-13">
					<p>
						If the palette says an entity can&apos;t be added, it&apos;s because
						that entity is not compatible with another entity you&apos;ve
						already added to the room. Now if you click on the &quot;see
						compatibility chart&quot; link in the palette, it will show you a
						breakdown of which entities work and don&apos;t work together. For
						example,{' '}
						<a
							className="text-blue-500"
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
						With object sets now in place, these new entities could be added:
					</p>
					<ul className="ml-8 list-disc">
						<li>Cactus</li>
						<li>Cement Block</li>
						<li>Flower Bush</li>
						<li>Lakitu Cloud</li>
					</ul>
				</NewEntry>
				<NewEntry title="New Entities" date="2021-05-7">
					<ul className="ml-8 list-disc">
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
					<ul className="ml-8 list-disc">
						<li>Floating Block</li>
						<li>Arrow Lift</li>
					</ul>
				</NewEntry>
			</div>
		</Root>
	);
}

export { WhatsNewPage };
