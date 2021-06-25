import React, { useEffect, useState } from 'react';

import { Editor } from '../Editor';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { IfNotTooSmall } from '../../IfNotTooSmall';
import { TooSmall } from './TooSmall';
import { NoscriptWarning } from './NoscriptWarning';
import { Head } from '../../layout/Head';

type InternalMakePageProps = {
	allFilesReady: boolean;
};

type PublicMakePageProps = {
	publishedLevelToLoad?: string;
};

function MakePage({
	allFilesReady,
	publishedLevelToLoad,
}: InternalMakePageProps & PublicMakePageProps) {
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
							<Editor publishedLevelToLoad={publishedLevelToLoad} />
						</>
					);
				}}
			</IfNotTooSmall>
		</>
	);
}

export { MakePage };
export type { PublicMakePageProps };
