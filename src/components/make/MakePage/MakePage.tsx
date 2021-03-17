import React, { Fragment, useEffect, useState } from 'react';

import { Editor } from '../Editor';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { IfNotTooSmall } from '../../IfNotTooSmall';
import { TooSmall } from './TooSmall';
import { NoscriptWarning } from './NoscriptWarning';

type MakePageProps = {
	allFilesReady: boolean;
};

function MakePage({ allFilesReady }: MakePageProps) {
	const [afterFirstRender, setAfterFirstRender] = useState(false);

	useEffect(() => {
		setAfterFirstRender(true);
	}, []);

	if (!afterFirstRender) {
		return <NoscriptWarning />;
	}

	return (
		<IfNotTooSmall tooSmallDisplay={<TooSmall />}>
			{() => {
				return (
					<Fragment>
						<NoscriptWarning />
						<FileLoaderModal isOpen={!allFilesReady} />
						<Editor />
					</Fragment>
				);
			}}
		</IfNotTooSmall>
	);
}

export { MakePage };
