import React from 'react';
import { useSelector } from 'react-redux';

import { Resizer } from './Resizer';
import type { PublicResizerProps } from './Resizer';
import { AppState } from '../../store';

function ConnectedResizer(props: PublicResizerProps) {
	const { rooms, currentRoomIndex } = useSelector(
		(state: AppState) => state.editor.present
	);

	return <Resizer scale={rooms[currentRoomIndex].scale} {...props} />;
}

export { ConnectedResizer };
