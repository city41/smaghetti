import React from 'react';
import { Root } from '../layout/Root';

function CreditsPage() {
	return (
		<Root
			title="Credits"
			metaDescription="Thanks for those who made Smaghetti possible"
		>
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">
					Credits (to come...)
				</h1>
				<div className="space-y-8">
					<p>
						Over the past decade or so, a <i>lot</i> of people have contributed
						to the collective knowledge on Super Mario Advance 4 and the Game
						Boy Advance. Smaghetti would never have happened without all this
						excellent work. Before Smaghetti hits 1.0 and is fully usable, I
						want to flesh this page out and thank everyone who helped.
					</p>
					<p>
						Did you reverse engineer, make a tool, test, or contribute anything
						related to SMA4 or Smaghetti? Do you want to be credited here?
						Please let me know at{' '}
						<a className="text-blue-300" href="mailto:matt.e.greer@gmail.com">
							matt.e.greer@gmail.com
						</a>
					</p>
				</div>
			</div>
		</Root>
	);
}

export { CreditsPage };
