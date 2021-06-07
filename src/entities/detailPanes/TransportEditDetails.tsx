import React, { ReactNode, useState } from 'react';
import { FaDoorOpen, FaLock, FaUnlock } from 'react-icons/fa';
import { TransportDestinationModal } from '../../components/Transport/TransportDestinationModal';
import { DestinationSetProps } from '../../components/Transport/TransportDestinationModal/TransportDestinationModal';

type TransportEditDetailsProps = {
	width: number;
	height: number;
	destination?: DestinationSetProps | null;
	locked?: boolean;
	onDestinationSet: (destination: DestinationSetProps | null) => void;
	onLockChange?: (locked: boolean) => void;
	hideLock?: boolean;
	children: ReactNode;
};

const PADDING = 1;

function TransportEditDetails({
	width,
	height,
	destination,
	locked,
	onDestinationSet,
	onLockChange,
	hideLock,
	children,
}: TransportEditDetailsProps) {
	const [showDestModal, setShowDestModal] = useState(false);

	const style = {
		top: -PADDING,
		left: -PADDING,
		width: width + 2 * PADDING,
		minHeight: height + 2 * PADDING,
		padding: PADDING,
	};

	const LockIcon = locked ? FaUnlock : FaLock;

	return (
		<>
			<div className="absolute bg-gray-700 z-10" style={style}>
				{children}
				<div className="flex flex-row space-x-1 my-0.5 items-center justify-center">
					<button
						onMouseDown={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setShowDestModal(true);
						}}
					>
						<FaDoorOpen className="w-1 h-1 hover:bg-gray-500" />
					</button>
					{!hideLock && (
						<button
							onMouseDown={(e) => {
								if (onLockChange) {
									e.stopPropagation();
									e.preventDefault();
									onLockChange(!locked);
								}
							}}
						>
							<LockIcon className="w-1 h-1 hover:bg-gray-500" />
						</button>
					)}
				</div>
			</div>
			<TransportDestinationModal
				isOpen={showDestModal}
				destX={destination?.x}
				destY={destination?.y}
				destRoom={destination?.room}
				onRequestClose={() => {
					setShowDestModal(false);
				}}
				onDestinationSet={onDestinationSet}
			/>
		</>
	);
}

export { TransportEditDetails };
