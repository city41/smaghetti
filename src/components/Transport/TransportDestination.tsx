import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { FaDoorOpen } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import { TransportDestinationModal } from './TransportDestinationModal';
import { DestinationSetProps } from './TransportDestinationModal/TransportDestinationModal';
import { MouseMode } from '../editor/editorSlice';

type TransportDestinationProps = {
	style?: CSSProperties;
	mouseMode: MouseMode;
	exitType: EditorTransport['exitType'];
	destX: number;
	destY: number;
	destRoom: number;
	onDestinationChange?: (props: DestinationSetProps | null) => void;
};

function TransportDestination({
	style,
	mouseMode,
	exitType,
	destX,
	destY,
	destRoom,
	onDestinationChange,
}: TransportDestinationProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const Icon = exitType === 'door' ? FaDoorOpen : GiWarpPipe;

	const finalStyle = {
		...style,
		'--size': '8px',
	} as CSSProperties;

	return (
		<>
			<TransportDestinationModal
				isOpen={modalOpen && !!onDestinationChange}
				onRequestClose={() => setModalOpen(false)}
				destRoom={destRoom}
				destX={destX}
				destY={destY}
				onDestinationSet={onDestinationChange}
			/>
			<div
				style={finalStyle}
				className={styles.root}
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
					setModalOpen(mouseMode === 'select');
				}}
			>
				<div
					className={clsx(
						'w-full h-full flex flex-col items-center justify-center overflow-hidden bg-blue-800 border-blue-200 text-blue-100',
						{
							'cursor-pointer transform hover:scale-110':
								mouseMode === 'select' && !!onDestinationChange,
						}
					)}
				>
					<Icon className={styles.icon} />
				</div>
			</div>
		</>
	);
}

export { TransportDestination };
