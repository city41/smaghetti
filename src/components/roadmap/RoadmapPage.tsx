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
		status: 'in-progress',
		description: 'Many entities in SMA4 are available to build levels with',
	},
	{
		status: 'in-progress',
		description: 'Pipes and pipe warps',
	},
	{
		status: 'completed',
		description:
			'Layers (mostly to support complex terrain and background things)',
	},
	{ status: 'not-started', description: 'Movement vectors for platforms' },
	{ status: 'not-started', description: 'Room settings' },
	{ status: 'not-started', description: "Set a room's size" },
	{ status: 'not-started', description: "Change player's starting location" },
];

const betaChecklist: MilestoneChecklistItem[] = [
	{
		status: 'not-started',
		description: 'Most entities in SMA4 are available to build levels with',
	},
	{ status: 'not-started', description: 'Water levels' },
	{ status: 'not-started', description: 'Airship Levels' },
	{ status: 'not-started', description: 'All entities are fully configurable' },
	{ status: 'not-started', description: 'Level file format is finalized' },
	{ status: 'not-started', description: 'Autoscroll rooms' },
];

const finalChecklist: MilestoneChecklistItem[] = [
	{ status: 'not-started', description: 'Warning if level gets too full' },
	{
		status: 'not-started',
		description: 'All entities in SMA4 are available to build levels with',
	},
	{ status: 'not-started', description: 'Credits page' },
	{
		status: 'not-started',
		description: "Fork other people's levels and share levels with friends",
	},
	{
		status: 'not-started',
		description: 'All known bugs fixed and editor is very stable',
	},
	{ status: 'not-started', description: 'Offline local version' },
	{ status: 'not-started', description: 'Save many levels to one save file' },
];

function RoadmapPage() {
	return (
		<Root title="Roadmap" metaDescription="The path to 1.0">
			<div className="max-w-2xl mx-auto pt-16">
				<h1 className="font-bold text-5xl text-center mb-8">Roadmap</h1>
				<div className="grid grid-cols-4 gap-x-4">
					<Milestone isCurrent>Early Preview</Milestone>
					<Milestone>Alpha</Milestone>
					<Milestone>Beta</Milestone>
					<Milestone>1.0</Milestone>
				</div>
				<div className="space-y-8 my-16">
					<p>
						Currently Smaghetti is in early preview. This means the core of the
						tool is actively being built and significant reverse engineering of
						the game is taking place. During early preview, things will change
						and break as I figure out the best way to build this thing.
					</p>
					<p className="font-bold -mx-2 p-2 bg-red-400">
						Any levels you make now will almost certainly stop working, please
						don&apos;t put a lot of effort into a level yet. Better to just play
						with the tool for now.
					</p>
				</div>
				<div className="space-y-8">
					<MilestoneChecklist title="To get to alpha" items={alphaChecklist} />
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
