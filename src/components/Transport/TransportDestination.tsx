import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { FaDoorOpen } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import { TransportDestinationModal } from './TransportDestinationModal';
import { DestinationSetProps } from './TransportDestinationModal/TransportDestinationModal';
import { MouseMode } from '../make/editorSlice';
import { IconType } from 'react-icons';

type TransportDestinationProps = {
	style?: CSSProperties;
	mouseMode: MouseMode;
	exitCategory: EditorTransport['exitCategory'];
	destX: number;
	destY: number;
	destRoom: number;
	onDestinationChange?: (props: DestinationSetProps | null) => void;
};

const exitCategoryIconMap: Record<EditorTransport['exitCategory'], IconType> = {
	door: FaDoorOpen,
	pipe: GiWarpPipe,
};

function TransportDestination({
	style,
	mouseMode,
	exitCategory,
	destX,
	destY,
	destRoom,
	onDestinationChange,
}: TransportDestinationProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const Icon = exitCategoryIconMap[exitCategory];

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
