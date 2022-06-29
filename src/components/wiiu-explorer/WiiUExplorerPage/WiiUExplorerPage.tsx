import React from 'react';
import { HexExplorer } from '../../HexExplorer';

type WiiUExplorerPageProps = {
	bytes: Uint8Array;
};

function WiiUExplorerPage({ bytes }: WiiUExplorerPageProps) {
	return <HexExplorer bytes={bytes} />;
}

export { WiiUExplorerPage };
