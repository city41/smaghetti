import 'ignore-styles';
import { LevelStats } from '../../src/stats/types';

export function roomsPerLevelPercentages(
	levels: LevelData[]
): LevelStats['roomsPerLevelPercentages'] {
	const roomCounts = levels.reduce<LevelStats['roomsPerLevelPercentages']>(
		(building, level) => {
			const roomCount = level.rooms.length as 1 | 2 | 3 | 4;
			building[roomCount] += 1;
			return building;
		},
		{ 1: 0, 2: 0, 3: 0, 4: 0 }
	);

	roomCounts[1] = Math.round((roomCounts[1] / levels.length) * 100);
	roomCounts[2] = Math.round((roomCounts[2] / levels.length) * 100);
	roomCounts[3] = Math.round((roomCounts[3] / levels.length) * 100);
	roomCounts[4] = Math.round((roomCounts[4] / levels.length) * 100);

	return roomCounts;
}
