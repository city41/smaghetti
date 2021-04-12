import React, { ComponentType, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { FaDoorOpen } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import {
	DestinationSetProps,
	TransportDestinationModal,
} from './TransportDestinationModal';
import { MouseMode, RoomState } from '../make/editorSlice';

type TransportDestinationProps = {
	style?: CSSProperties;
	mouseMode: MouseMode;
	exitType: number;
	destX: number;
	destY: number;
	destRoom: number;
	rooms: RoomState[];
	onDestinationChange?: (props: DestinationSetProps) => void;
};

const exitTypeIconMap: Record<number, ComponentType<{ className: string }>> = {
	0: FaDoorOpen,
	1: GiWarpPipe,
};

function TransportDestination({
	style,
	mouseMode,
	exitType,
	destX,
	destY,
	destRoom,
	rooms,
	onDestinationChange,
}: TransportDestinationProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const Icon = exitTypeIconMap[exitType] ?? FaDoorOpen;

	const finalStyle = {
		...style,
		'--size': '8px',
	} as CSSProperties;

	return (
		<>
			{rooms && (
				<TransportDestinationModal
					isOpen={modalOpen}
					onRequestClose={() => setModalOpen(false)}
					rooms={rooms}
					destRoom={destRoom}
					destX={destX}
					destY={destY}
					exitType={exitType}
					onDestinationSet={onDestinationChange}
				/>
			)}
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
								mouseMode === 'select',
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
