import React from 'react';
import { HexExplorer } from '../../HexExplorer';

type WiiUExplorerPageProps = {
	bytes: Uint8Array;
};

function WiiUExplorerPage({ bytes }: WiiUExplorerPageProps) {
	console.log('bytes.length', bytes.length);
	return (
		<div>
			h-e
			<HexExplorer bytes={bytes} />
		</div>
	);
}

export { WiiUExplorerPage };
