import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../store';

import { TransportDestinationModal } from './TransportDestinationModal';
import type { PublicTransportDestinationModalProps } from './TransportDestinationModal';

function ConnectedTransportDestinationModal(
	props: PublicTransportDestinationModalProps
) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	return <TransportDestinationModal {...props} rooms={rooms} />;
}

export { ConnectedTransportDestinationModal };
