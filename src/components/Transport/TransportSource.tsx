import React, { ComponentType, CSSProperties } from 'react';
import clsx from 'clsx';
import { FaDoorClosed } from 'react-icons/fa';
import { GiWarpPipe } from 'react-icons/gi';

import styles from './transportStyles.module.css';
import focusedStyles from '../../styles/focused.module.css';

import { TILE_SIZE } from '../../tiles/constants';

type TransportSourceProps = {
	className?: string;
	style?: CSSProperties;
	destRoom: number;
	destX: number;
	destY: number;
	exitType: number;
	label?: string;
	focused?: boolean;
};

const exitTypeIconMap: Record<number, ComponentType<{ className: string }>> = {
	0: FaDoorClosed,
	1: GiWarpPipe,
};

function TransportSource({
	className,
	style,
	destRoom,
	destX,
	destY,
	exitType,
	label,
	focused,
}: TransportSourceProps) {
	const finalStyle = {
		...style,
		'--size': `${TILE_SIZE}px`,
	} as CSSProperties;

	const Icon = exitTypeIconMap[exitType] ?? FaDoorClosed;

	const hasDest = destRoom > -1 && destX > -1 && destY > -1;

	return (
		<div
			className={clsx(className, styles.root, {
				[focusedStyles.focused]: focused,
			})}
			style={finalStyle}
		>
			<div
				className={clsx(
					'w-full h-full border rounded flex flex-col items-center justify-center space-y-0.5 overflow-hidden',
					{
						'bg-red-800 border-red-200 text-red-100': !hasDest && !label,
						'bg-green-800 border-green-200 text-green-100': hasDest || label,
					}
				)}
			>
				<Icon className={styles.icon} />
				<div
					className={clsx(
						'w-full h-0.5 text-center flex flex-col items-center justify-center'
					)}
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
	);
}

export { TransportSource };
