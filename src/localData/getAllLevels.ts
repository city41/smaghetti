import localForage from 'localforage';
import { LOCAL_DATA_ROOT_KEY } from './constants';

export async function getAllLevels(): Promise<SerializedLevel[]> {
	const localLevels =
		(await localForage.getItem<SerializedLevel[] | undefined>(
			LOCAL_DATA_ROOT_KEY
		)) ?? [];

	return localLevels ?? [];
}
