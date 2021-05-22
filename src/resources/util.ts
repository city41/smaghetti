import { Resource, StaticResource } from './types';

function isStaticResource(
	obj: Resource | undefined | null
): obj is StaticResource {
	if (!obj) {
		return false;
	}

	return !('extract' in obj);
}

export { isStaticResource };
