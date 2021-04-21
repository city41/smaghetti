import { Resource, StaticResource } from './types';

function isStaticResource(obj: Resource): obj is StaticResource {
	return !('extract' in obj);
}

export { isStaticResource };
