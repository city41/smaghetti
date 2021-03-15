import type { Howl } from 'howler';

import { image_resources } from './resources_generated_images';

import buttonClickedMp3 from './buttonClicked.mp3';
import tilePaintedMp3 from './tilePainted.mp3';

type Resource = {
	src: string;
	loaded: boolean;
	// type: 'image' | 'audio';
	resource: HTMLImageElement | Howl | null;
};

function getImageResourceObject() {
	if (typeof window !== 'undefined') {
		return new Image();
	}
	return {
		width: 0,
		height: 0,
	};
}

const resources: Record<string, Resource> = {
	...image_resources,
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

export {
	resources,
	totalResources,
	getResource,
	getResourceUrl,
	hasAResource,
	getImageResourceObject,
};
export type { Resource, ResourceKey };
