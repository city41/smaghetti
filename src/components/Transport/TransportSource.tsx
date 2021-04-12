import React, {
	ComponentType,
	CSSProperties,
	forwardRef,
	Ref,
	RefObject,
	useState,
} from 'react';
import clsx from 'clsx';
import { FaDoorOpen } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import focusedStyles from '../../styles/focused.module.css';

import { TILE_SIZE } from '../../tiles/constants';
import {
	DestinationSetProps,
	TransportDestinationModal,
} from './TransportDestinationModal';
import { MouseMode, RoomState } from '../make/editorSlice';

type TransportProps = {
	style?: CSSProperties;
	rooms?: RoomState[];
	destRoom: number;
	destX: number;
	destY: number;
	exitType: number;
	label?: string;
	focused?: boolean;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
	mouseMode?: MouseMode;
	onDestinationChange?: (props: DestinationSetProps) => void;
};

const exitTypeIconMap: Record<number, ComponentType<{ className: string }>> = {
	0: FaDoorOpen,
	1: GiWarpPipe,
};

const TransportSource = forwardRef<HTMLDivElement, TransportProps>(
	function Transport(
		{
			style,
			rooms,
			destRoom,
			destX,
			destY,
			exitType,
			label,
			focused,
			mouseMode,
			onDestinationChange,
		},
		ref
	) {
		const [modalOpen, setModalOpen] = useState(false);

		const finalStyle = {
			...style,
			'--size': `${TILE_SIZE}px`,
		} as CSSProperties;

		const Icon = exitTypeIconMap[exitType] ?? FaDoorOpen;

		const hasDest = destRoom > -1 && destX > -1 && destY > -1;

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
					ref={ref}
					className={clsx(styles.root, { [focusedStyles.focused]: focused })}
					style={finalStyle}
				>
					<div
						className={clsx(
							'w-full h-full border rounded flex flex-col items-center justify-center space-y-0.5 overflow-hidden',
							{
								'bg-red-800 border-red-200 text-red-100': !hasDest && !label,
								'bg-green-800 border-green-200 text-green-100':
									hasDest || label,
							}
						)}
					>
						<Icon className={styles.icon} />
						<div
							className={clsx(
								'w-full h-0.5 text-center flex flex-col items-center justify-center',
								{
									'hover:text-white cursor-pointer transform hover:scale-110':
										mouseMode === 'select',
								}
							)}
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setModalOpen(mouseMode === 'select');
							}}
						>
							{label ? (
								<div>{label}</div>
							) : hasDest ? (
								<div>
									R{destRoom} ({destX},{destY})
								</div>
							) : (
								<div>no dest</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
);

export { TransportSource };
