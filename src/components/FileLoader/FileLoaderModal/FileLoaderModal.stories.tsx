import React from 'react';
import { Meta } from '@storybook/react';

import { FileLoaderModal } from './FileLoaderModal';

const meta: Meta = {
	title: 'FileLoaderModal',
	component: FileLoaderModal,
};

export default meta;

export const LoadingNeededFiles = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="loading"
			romFileState="not-chosen"
			onRomFileChosen={() => {}}
		/>
	);
};

export const LoadingAll = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="loading"
			romFileState="loading"
			onRomFileChosen={() => {}}
		/>
	);
};

export const OtherNeededFilesLoadedSuccessfully = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="success"
			romFileState="not-chosen"
			onRomFileChosen={() => {}}
		/>
	);
};

export const ROMLoadedSuccessfully = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="success"
			romFileState="success"
			onRomFileChosen={() => {}}
		/>
	);
};

export const ROMChecksumError = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="success"
			romFileState="checksum-error"
			onRomFileChosen={() => {}}
		/>
	);
};

export const ROMGeneralError = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="success"
			romFileState="error"
			onRomFileChosen={() => {}}
		/>
	);
};

export const OtherFilesGeneralError = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="not-started"
			extractionGraphicState={{
				done: 0,
				total: 0,
				mostRecentlyFinished: null,
			}}
			otherFilesState="error"
			romFileState="success"
			onRomFileChosen={() => {}}
		/>
	);
};

export const ExtractingResources = () => {
	return (
		<FileLoaderModal
			isOpen={true}
			overallExtractionState="extracting"
			extractionGraphicState={{
				done: 4,
				total: 20,
				mostRecentlyFinished: 'just-finished',
			}}
			otherFilesState="success"
			romFileState="success"
			onRomFileChosen={() => {}}
		/>
	);
};
