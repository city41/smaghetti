import React from 'react';
import clsx from 'clsx';

import { Editor } from '../Editor';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';

type MakePageProps = {
	allFilesReady: boolean;
};

function MakePage({ allFilesReady }: MakePageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Editor />
		</>
	);
}

export { MakePage };
