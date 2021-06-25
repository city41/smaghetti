export function isBrokenLevel(
	level: Level | BrokenLevel
): level is BrokenLevel {
	return 'broken' in level;
}
