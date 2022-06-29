import React from 'react';
import { HexExplorer } from '../../HexExplorer';

type WiiUExplorerPageProps = {
	bytes: number[];
};

function WiiUExplorerPage({ bytes }: WiiUExplorerPageProps) {
	return (
		<div className="w-full h-screen">
			<HexExplorer bytes={bytes} />
		</div>
	);
}

export { WiiUExplorerPage };
