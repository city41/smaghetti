import localForage from 'localforage';
import { LOCAL_DATA_ROOT_KEY } from './constants';

export async function deleteLevel(id: string) {
	const localLevels =
		(await localForage.getItem<SerializedLevel[] | undefined>(
			LOCAL_DATA_ROOT_KEY
		)) ?? [];

	const updatedLocalLevels = localLevels.filter((l) => l.id !== id);

	await localForage.setItem<SerializedLevel[]>(
		LOCAL_DATA_ROOT_KEY,
		updatedLocalLevels
	);
}
