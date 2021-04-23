import React, { ReactNode, useState } from 'react';
import { FaDoorOpen } from 'react-icons/fa';
import { TransportDestinationModal } from '../Transport/TransportDestinationModal';
import { DestinationSetProps } from '../Transport/TransportDestinationModal/TransportDestinationModal';

type TransportEditDetailsProps = {
	width: number;
	height: number;
	onDestinationSet: (destination: DestinationSetProps) => void;
	onLockChange: (locked: boolean) => void;
	children: ReactNode;
};

const PADDING = 1;

function TransportEditDetails({
	width,
	height,
	onDestinationSet,
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

	return (
		<>
			<div className="absolute bg-gray-700 z-10" style={style}>
				{children}
				<div className="flex flex-col my-0.5 items-center justify-center">
					<button
						onMouseDown={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setShowDestModal(true);
						}}
					>
						<FaDoorOpen className="w-1 h-1 hover:bg-gray-500" />
					</button>
				</div>
			</div>
			<TransportDestinationModal
				isOpen={showDestModal}
				onRequestClose={() => {
					setShowDestModal(false);
				}}
				exitType={0}
				onDestinationSet={onDestinationSet}
			/>
		</>
	);
}

export { TransportEditDetails };
