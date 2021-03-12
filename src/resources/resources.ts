import type { Howl } from 'howler';

import buttonClickedMp3 from './buttonClicked.mp3';
import tilePaintedMp3 from './tilePainted.mp3';

type Resource = {
	src: string;
	loaded: boolean;
	// type: 'image' | 'audio';
	resource: HTMLImageElement | Howl | null;
};

const resources: Record<string, Resource> = {
	buttonClicked: {
		src: buttonClickedMp3,
		loaded: false,
		resource: null,
	},
	tilePainted: {
		src: tilePaintedMp3,
		loaded: false,
		resource: null,
	},
};

const totalResources = Object.keys(resources).length;

type ResourceKey = keyof typeof resources;

function getResource(key: ResourceKey): Resource {
	return resources[key];
}

function getResourceUrl(key: ResourceKey): string {
	return getResource(key).src;
}

function hasAResource(key: string): key is ResourceKey {
	return key in resources;
}

export { resources, totalResources, getResource, getResourceUrl, hasAResource };
export type { Resource, ResourceKey };
