import React from 'react';
import { Root } from '../layout/Root';
import { Milestone } from './Milestone';
import {
	MilestoneChecklist,
	MilestoneChecklistItem,
} from './MilestoneChecklist';

const alphaChecklist: MilestoneChecklistItem[] = [
	{ status: 'completed', description: 'Load e-reader level into the game' },
	{ status: 'completed', description: 'A pretty good and easy to use editor' },
	{ status: 'completed', description: 'Object Sets' },
	{ status: 'completed', description: 'Test out your level in an emulator' },
	{ status: 'completed', description: 'Download levels as save files' },
	{ status: 'completed', description: 'Sprite Graphic Sets' },
	{
		status: 'completed',
		description: 'Many entities in SMA4 are available to build levels with',
	},
	{
		status: 'completed',
		description: 'Pipes and pipe warps',
	},
	{
		status: 'completed',
		description:
			'Bring large objects like background hills and terrain into the editor',
	},
	{
		status: 'completed',
		description:
			'Layers (mostly to support complex terrain and background things)',
	},
	{ status: 'completed', description: 'Room settings' },
	{ status: 'completed', description: "Set a room's size" },
	{ status: 'completed', description: "Change player's starting location" },
];

const betaChecklist: MilestoneChecklistItem[] = [
	{ status: 'in-progress', description: 'Movement vectors for platforms' },
	{
		status: 'completed',
		description: 'Most entities in SMA4 are available to build levels with',
	},
	{ status: 'in-progress', description: 'Water levels' },
	{ status: 'in-progress', description: 'Giant object grid' },
	{ status: 'in-progress', description: 'Airship Levels' },
	{ status: 'not-started', description: 'All entities are fully configurable' },
	{ status: 'in-progress', description: 'Level file format is finalized' },
	{ status: 'in-progress', description: 'Autoscroll rooms' },
	{ status: 'in-progress', description: 'Object priorities' },
	{ status: 'not-started', description: 'Wrap-around rooms' },
	{ status: 'not-started', description: 'Adjustable camera' },
	{ status: 'completed', description: 'Configurable controls' },
	{ status: 'not-started', description: 'Save states' },
	{ status: 'not-started', description: 'Movement trails to help gauge jumps' },
];

const finalChecklist: MilestoneChecklistItem[] = [
	{ status: 'completed', description: 'Warning if level gets too full' },
	{
		status: 'not-started',
		description: 'All entities in SMA4 are available to build levels with',
	},
	{
		status: 'not-started',
		description: 'All known bugs fixed and editor is very stable',
	},
	{ status: 'in-progress', description: 'Save many levels to one save file' },
	{ status: 'completed', description: 'E-Coin editor' },
];

function RoadmapPage() {
	return (
		<Root title="Roadmap" metaDescription="The path to 1.0">
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">Roadmap</h1>
				<div className="grid grid-cols-4 gap-x-4">
					<Milestone>Early Preview</Milestone>
					<Milestone isCurrent>Alpha</Milestone>
					<Milestone>Beta</Milestone>
					<Milestone>1.0</Milestone>
				</div>
				<div className="space-y-8 my-16">
					<p>
						Smaghetti is now alpha. This means the core is well defined, but
						things can still be buggy. There are still missing features too.
					</p>
				</div>
				<div className="space-y-8">
					<MilestoneChecklist title="Alpha features" items={alphaChecklist} />
					<MilestoneChecklist title="To get to beta" items={betaChecklist} />
					<MilestoneChecklist title="To get to 1.0" items={finalChecklist} />
				</div>
				<p className="mt-8 text-gray-300">
					Beyond 1.0, I&apos;d like to expand beyond e-reader levels and allow
					changing main levels in the game, allow editing the overworld maps to
					enable building of entire games, customizing graphics and sounds, and
					much more. But that is very, <em>very</em> far down the line. Who
					knows if it will ever happen :)
				</p>
			</div>
		</Root>
	);
}

export { RoadmapPage };
