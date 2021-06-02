import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { FaDoorClosed } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import focusedStyles from '../../styles/focused.module.css';

import { TILE_SIZE } from '../../tiles/constants';
import { TransportDestinationModal } from './TransportDestinationModal';
import { DestinationSetProps } from './TransportDestinationModal/TransportDestinationModal';
import { IconType } from 'react-icons';

type TransportSourceProps = {
	className?: string;
	style?: CSSProperties;
	destRoom?: number;
	destX?: number;
	destY?: number;
	exitCategory: EditorTransport['exitCategory'];
	label?: string;
	focused?: boolean;
	onDestinationSet?: (props: DestinationSetProps | null) => void;
};

const exitCategoryIconMap: Record<EditorTransport['exitCategory'], IconType> = {
	door: FaDoorClosed,
	pipe: GiWarpPipe,
};

function TransportSource({
	className,
	style,
	destRoom = -1,
	destX = -1,
	destY = -1,
	exitCategory,
	label,
	focused,
	onDestinationSet,
}: TransportSourceProps) {
	const [showDestModal, setShowDestModal] = useState(false);

	const finalStyle = {
		...style,
		'--size': `${TILE_SIZE - 6}px`,
	} as CSSProperties;

	const Icon = exitCategoryIconMap[exitCategory];

	const hasDest = destRoom > -1 && destX > -1 && destY > -1;

	return (
		<>
			<TransportDestinationModal
				destX={destX}
				destY={destY}
				destRoom={destRoom}
				isOpen={showDestModal && !!onDestinationSet}
				onRequestClose={() => {
					setShowDestModal(false);
				}}
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
