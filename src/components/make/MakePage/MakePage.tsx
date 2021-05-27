import React, { useEffect, useState } from 'react';

import { Editor } from '../Editor';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { IfNotTooSmall } from '../../IfNotTooSmall';
import { TooSmall } from './TooSmall';
import { NoscriptWarning } from './NoscriptWarning';
import { Head } from '../../layout/Head';
import { LevelChooserModal } from '../Editor/LevelChooserModal';

type MakePageProps = {
	allFilesReady: boolean;
	showLevelChooser: boolean;
};

function MakePage({ allFilesReady, showLevelChooser }: MakePageProps) {
	const [afterFirstRender, setAfterFirstRender] = useState(false);
	const head = <Head title="Level Editor" metaDescription="" />;

	useEffect(() => {
		setAfterFirstRender(true);
	}, []);

	if (!afterFirstRender) {
		return (
			<>
				{head}
				<NoscriptWarning />
			</>
		);
	}

	return (
		<>
			{head}
			<IfNotTooSmall tooSmallDisplay={<TooSmall />}>
				{() => {
					return (
						<>
							<NoscriptWarning />
							<FileLoaderModal isOpen={!allFilesReady} />
							<LevelChooserModal isOpen={allFilesReady && showLevelChooser} />
							<Editor />
						</>
					);
				}}
			</IfNotTooSmall>
		</>
	);
}

export { MakePage };
