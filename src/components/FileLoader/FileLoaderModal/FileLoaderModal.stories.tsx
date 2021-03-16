import React, { useState } from 'react';
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
			otherFilesState="error"
			romFileState="success"
			onRomFileChosen={() => {}}
		/>
	);
};
