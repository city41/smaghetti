import { getAllLevels } from './getAllLevels';

export async function getLevel(
	id: string
): Promise<SerializedLevel | undefined> {
	const localLevels = await getAllLevels();
	return localLevels.find((savedLevel) => savedLevel.id === id);
}
