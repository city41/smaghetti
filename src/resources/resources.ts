import { image_resources } from './resources_generated_images';

import tilesPng from './tiles.png';

type ImageResource = {
	type: 'image';
	url: string;
};

type ExtractedResource = {
	type: 'extracted';
	url: string;
	romOffset: number;
	tiles: number[][];
	palette?: number[];
};

type Resource = ImageResource | ExtractedResource;

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
	tiles: {
		url: tilesPng,
		type: 'image',
	},
};

const totalResources = Object.keys(resources).length;

type ResourceKey = keyof typeof resources;

function getResource(key: ResourceKey): Resource {
	return resources[key];
}

function getResourceUrl(key: ResourceKey): string {
	return getResource(key).url;
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
export type { ExtractedResource, Resource, ResourceKey };
