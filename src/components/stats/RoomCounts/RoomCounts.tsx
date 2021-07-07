import React from 'react';
import clsx from 'clsx';
import { LevelStats } from '../../../stats/types';

type RoomCountProps = {
	className?: string;
	roomsPerLevelPercentages: LevelStats['roomsPerLevelPercentages'];
};

function RoomCountRow({ count, percent }: { count: string; percent: number }) {
	return (
		<div
			className="relative grid gap-x-4 items-center"
			style={{ gridTemplateColumns: '50px 1fr' }}
		>
			<div className="grid place-items-center text-2xl">{count}</div>
			<div>
				<div>{percent}%</div>
			</div>
			<div
				className="absolute bg-gray-600 h-full"
				style={{
					width: `calc(${percent}% - 55px)`,
					left: 55,
					zIndex: -1,
				}}
			/>
		</div>
	);
}

function RoomCounts({ className, roomsPerLevelPercentages }: RoomCountProps) {
	return (
		<div>
			<h1 className="font-bold text-2xl text-center mb-2 flex flex-row space-x-4">
				<div>Room Counts</div>
			</h1>
			<p className="text-gray-400 text-sm my-2">
				How many rooms levels have, by percentage
			</p>
			<div className={clsx(className, 'space-y-8 mt-8 h-96 overflow-y-auto')}>
				{Object.keys(roomsPerLevelPercentages).map((count) => (
					<RoomCountRow
						key={count}
						count={count}
						percent={
							roomsPerLevelPercentages[
								Number(count) as keyof typeof roomsPerLevelPercentages
							]
						}
					/>
				))}
			</div>
		</div>
	);
}

export { RoomCounts };
