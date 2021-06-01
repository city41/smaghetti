import React, { ComponentType, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { FaDoorClosed } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import focusedStyles from '../../styles/focused.module.css';

import { TILE_SIZE } from '../../tiles/constants';
import { TransportDestinationModal } from './TransportDestinationModal';
import { DestinationSetProps } from './TransportDestinationModal/TransportDestinationModal';

type TransportSourceProps = {
	className?: string;
	style?: CSSProperties;
	destRoom?: number;
	destX?: number;
	destY?: number;
	exitType: number;
	label?: string;
	focused?: boolean;
	onDestinationSet?: (props: DestinationSetProps) => void;
};

const exitTypeIconMap: Record<number, ComponentType<{ className: string }>> = {
	0: FaDoorClosed,
	1: GiWarpPipe,
};

function TransportSource({
	className,
	style,
	destRoom = -1,
	destX = -1,
	destY = -1,
	exitType,
	label,
	focused,
	onDestinationSet,
}: TransportSourceProps) {
	const [showDestModal, setShowDestModal] = useState(false);

	const finalStyle = {
		...style,
		'--size': `${TILE_SIZE - 6}px`,
	} as CSSProperties;

	const Icon = exitTypeIconMap[exitType] ?? FaDoorClosed;

	const hasDest = destRoom > -1 && destX > -1 && destY > -1;

	return (
		<>
			<TransportDestinationModal
				isOpen={showDestModal && !!onDestinationSet}
				onRequestClose={() => {
					setShowDestModal(false);
				}}
				exitType={0}
				onDestinationSet={onDestinationSet}
			/>
			<button
				className={clsx(className, styles.root, {
					[focusedStyles.focused]: focused,
				})}
				style={finalStyle}
				onMouseDown={(e) => {
					e.stopPropagation();
					e.preventDefault();

					setShowDestModal(true);
				}}
			>
				<div
					className={clsx(
						'w-full h-full flex flex-col items-center justify-center overflow-hidden',
						{
							'bg-red-800 border-red-200 text-red-100': !hasDest && !label,
							'bg-green-800 border-green-200 text-green-100': hasDest || label,
							'cursor-default': !onDestinationSet,
							'cursor-pointer': !!onDestinationSet,
						}
					)}
				>
					<Icon className={styles.icon} />
					<div
						className={clsx(
							'w-full text-center flex flex-col items-center justify-center'
						)}
					>
						{label ? (
							<div>{label}</div>
						) : hasDest ? (
							<div>
								R{destRoom + 1} ({destX},{destY})
							</div>
						) : (
							<div>no dest</div>
						)}
					</div>
				</div>
			</button>
		</>
	);
}

export { TransportSource };
