import React from 'react';
import screenshotPng from '../../../screenshot.png';

import { Root } from '../layout/Root';

function A(props: Omit<JSX.IntrinsicElements['a'], 'className'>) {
	return <a {...props} className="underline text-blue-300" />;
}

function IndexPage() {
	return (
		<Root title="Smaghetti" metaDescription="">
			<div className="max-w-2xl mx-auto pt-16">
				<div className="space-y-4 pt-4 pb-16">
					<h1 className="text-2xl font-bold">
						A level editor for Super Mario Advance 4
					</h1>
					<p className="block bg-red-100 text-red-900 text-3xl p-2">
						Very early days, still tons of work to do!
					</p>
					<a
						className="inline-block p-4 rounded-lg bg-green-300 text-green-900 hover:text-white hover:bg-green-600 text-2xl font-bold"
						href="/make"
					>
						Try the editor
					</a>
					<img
						src={screenshotPng}
						width={1259}
						height={713}
						alt="screenshot of the editor"
					/>
				</div>
				<h2 className="text-2xl font-bold">Status</h2>
				<div className="space-y-4 pt-4 pb-16">
					<p>
						The level editor can build levels and inject them into a SMA4 save
						file as an e-reader level. From there you can play the level.
						Smaghetti includes GBA.js so you can test your level right from the
						editor.
					</p>
					<p className="font-bold">
						At a high level, here is what needs to be done yet:
					</p>
					<ul className="list-disc space-y-4 ml-4 pb-16">
						<li>
							Finish reverse engineering SMA4 and figure out the IDs and
							parameters for all sprites, objects and settings.
						</li>
						<li>
							Add room and transport support. ie, pipes taking you to other
							rooms.
						</li>
						<li>
							Dashboard where you can manage all of your levels (in progress)
						</li>
						<li>
							Reverse engineer normal (non e-reader) level format so can build
							entire games
						</li>
					</ul>
					<h2 className="text-2xl font-bold">Credit</h2>
					<div className="space-y-4 pt-4 pb-16">
						<p>
							Over the years tons of people have researched, reverse engineered
							and built tools for SMA4. Also all the people out there who have
							built GBA emulators were key in this working. They have all been
							very helpful and I couldn&apos;t have built this without them.
						</p>
						<p>
							A proper credit page will be built before Smaghetti fully
							launches.
						</p>
					</div>
					<h2 className="text-2xl font-bold">Contact</h2>
					<ul className="list-disc space-y-4 ml-4">
						<li>
							<A href="https://github.com/city41/smaghetti">GitHub repo</A>
						</li>
						<li>
							<A href="https://twitter.com/mattegreer">My Twitter</A>
						</li>
						<li>
							<A href="mailto:matt.e.greer@gmail.com">matt.e.greer@gmail.com</A>
						</li>
					</ul>
				</div>
			</div>
		</Root>
	);
}

export { IndexPage };
