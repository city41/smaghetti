import localForage from 'localforage';
import { LOCAL_DATA_ROOT_KEY } from './constants';

export async function saveLevel(
	id: string | null,
	name: string,
	_description: string,
	data: SerializedLevelData
): Promise<string> {
	const localLevels =
		(await localForage.getItem<SerializedLevel[] | undefined>(
			LOCAL_DATA_ROOT_KEY
		)) ?? [];

	const updatedRootData = localLevels.map<SerializedLevel>((savedLevel) => {
		if (savedLevel.id === id) {
			return {
				...savedLevel,
				name,
				data,
			};
		} else {
			return savedLevel;
		}
	});

	const levelAlreadyExists = !!updatedRootData.find(
		(savedLevel) => savedLevel.id === id
	);

	if (!levelAlreadyExists) {
		id = id ?? crypto.randomUUID();
		updatedRootData.push({
			id,
			version: 'local',
			name,
			created_at: new Date().toISOString(),
			data,
		});
	}

	await localForage.setItem<SerializedLevel[]>(
		LOCAL_DATA_ROOT_KEY,
		updatedRootData
	);

	return id!;
}
