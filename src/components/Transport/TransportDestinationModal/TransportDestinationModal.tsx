import React, { useState } from 'react';
import { Modal } from '../../Modal';
import { IconButtonGroup } from '../../IconButton/IconButtonGroup';
import { IconButton } from '../../IconButton';
import { LevelThumbnail } from '../../LevelThumbnail';
import { RoomState } from '../../make/editorSlice';
import { TILE_SIZE } from '../../../tiles/constants';
import { Button } from '../../Button';

function DestinationHighlight({
	x,
	y,
	scale,
}: {
	x: number;
	y: number;
	scale: number;
}) {
	const BORDER_WIDTH = 3;

	const style = {
		top: y * scale * TILE_SIZE - BORDER_WIDTH,
		left: x * scale * TILE_SIZE - BORDER_WIDTH,
		width: TILE_SIZE * scale + BORDER_WIDTH * 2,
		height: TILE_SIZE * scale + BORDER_WIDTH * 2,
		borderWidth: BORDER_WIDTH,
	};

	return <div className="absolute border-white" style={style} />;
}

type DestinationSetProps = {
	room: number;
	x: number;
	y: number;
};

type PublicTransportDestinationModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
	destRoom?: number;
	destX?: number;
	destY?: number;
	exitType: number;
	onDestinationSet?: (props: DestinationSetProps) => void;
};

type InternalTransportDestinationModalProps = {
	rooms: RoomState[];
};

// <div className="flex flex-row items-center space-x-2">
// 	<div>Exit Type</div>
// 	<IconButtonGroup>
// 		<IconButton icon={GiPerson} label="Appear" />
// 		<IconButton icon={GiWarpPipe} label="Up from pipe" />
// 		<IconButton
// 			icon={() => <GiWarpPipe className="transform rotate-90" />}
// 			label="Right from pipe"
// 		/>
// 		<IconButton
// 			icon={() => <GiWarpPipe className="transform rotate-180" />}
// 			label="Down from pipe"
// 		/>
// 		<IconButton
// 			icon={() => <GiWarpPipe className="transform -rotate-90" />}
// 			label="Left from pipe"
// 		/>
// 	</IconButtonGroup>
// </div>

const SCALE = 0.5;

function TransportDestinationModal({
	isOpen,
	onRequestClose,
	rooms,
	destRoom = 0,
	destX,
	destY,
	onDestinationSet,
}: PublicTransportDestinationModalProps &
	InternalTransportDestinationModalProps) {
	const [curDestRoomIndex, setCurDestRoomIndex] = useState(
		Math.max(destRoom, 0)
	);
	const [curDestX, setCurDestX] = useState(destX ?? -1);
	const [curDestY, setCurDestY] = useState(destY ?? -1);

	const cantOkay = curDestX < 0 || curDestY < 0;
	const curDestRoom = rooms[curDestRoomIndex];

	const roomButtons = [];

	for (let i = 0; i < 4; ++i) {
		roomButtons.push(
			<IconButton
				key={i}
				disabled={i >= rooms.length}
				label={(i + 1).toString()}
				toggled={curDestRoomIndex === i}
				onClick={() => {
					setCurDestRoomIndex(i);
					setCurDestX(-1);
					setCurDestY(-1);
				}}
			/>
		);
	}

	function handleThumbnailClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		e.preventDefault();

		const bounds = e.currentTarget.getBoundingClientRect();
		const { scrollLeft, scrollTop } = e.currentTarget;

		setCurDestX(
			Math.floor((e.clientX - bounds.left + scrollLeft) / (TILE_SIZE * SCALE))
		);
		setCurDestY(
			Math.floor((e.clientY - bounds.top + scrollTop) / (TILE_SIZE * SCALE))
		);
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			onXClick={onRequestClose}
			title="Warp Destination"
		>
			<div className="flex flex-col items-center space-y-4">
				<div className="flex flex-col items-center">
					<div className="font-bold p-1 rounded-t-xl pl-2">Room</div>
					<IconButtonGroup>{roomButtons}</IconButtonGroup>
				</div>
				<div
					className="max-w-full max-h-32 overflow-auto grid place-items-center cursor-crosshair"
					onMouseDown={handleThumbnailClick}
				>
					<LevelThumbnail
						className="relative bg-blue-300 border-2 border-white"
						tileX={0}
						tileY={0}
						tileWidth={curDestRoom.roomTileWidth}
						tileHeight={curDestRoom.roomTileHeight}
						scale={SCALE}
						matrix={curDestRoom.matrix}
						entities={curDestRoom.entities}
					>
						{curDestX > -1 && curDestY > -1 && (
							<DestinationHighlight x={curDestX} y={curDestY} scale={SCALE} />
						)}
					</LevelThumbnail>
				</div>
				<Button
					disabled={cantOkay}
					onClick={() => {
						onDestinationSet?.({
							room: curDestRoomIndex,
							x: curDestX,
							y: curDestY,
						});
						onRequestClose();
					}}
				>
					Okay
				</Button>
			</div>
		</Modal>
	);
}

export { TransportDestinationModal };
export type { DestinationSetProps, PublicTransportDestinationModalProps };
