import React, {
	useState,
	useEffect,
	forwardRef,
	useRef,
	RefObject,
	Ref,
} from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';
import { IconButtonGroup } from '../../IconButton/IconButtonGroup';
import { IconButton } from '../../IconButton';
import { RoomThumbnail } from '../../RoomThumbnail';
import { RoomState } from '../../editor/editorSlice';
import { TILE_SIZE } from '../../../tiles/constants';
import { Button } from '../../Button';

import styles from './TransportDestinationModal.module.css';

type DestinationHighlightProps = {
	x: number;
	y: number;
	scale: number;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
};

const DestinationHighlight = forwardRef<
	HTMLDivElement,
	DestinationHighlightProps
>(function DestinationHighlight({ x, y, scale }, ref) {
	const BORDER_WIDTH = 3;

	const style = {
		top: y * scale * TILE_SIZE - BORDER_WIDTH,
		left: x * scale * TILE_SIZE - BORDER_WIDTH,
		width: TILE_SIZE * scale + BORDER_WIDTH * 2,
		height: TILE_SIZE * scale + BORDER_WIDTH * 2,
		borderWidth: BORDER_WIDTH,
	};

	return <div ref={ref} className="absolute border-white" style={style} />;
});

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
	onDestinationSet?: (props: DestinationSetProps | null) => void;
};

type InternalTransportDestinationModalProps = {
	rooms: RoomState[];
};

const SCALE = 1;

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
	const highlightRef = useRef<HTMLDivElement>(null);
	const [curDestRoomIndex, setCurDestRoomIndex] = useState(
		Math.max(destRoom, 0)
	);
	const [curDestX, setCurDestX] = useState(destX ?? -1);
	const [curDestY, setCurDestY] = useState(destY ?? -1);

	const cantOkay = curDestX < 0 || curDestY < 0;
	const curDestRoom = rooms[curDestRoomIndex];

	const roomButtons = [];

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				highlightRef.current?.scrollIntoView();
			}, 10);
		}
	}, [isOpen]);

	useEffect(() => {
		setCurDestX(destX ?? -1);
		setCurDestY(destY ?? -1);
	}, [destX, destY]);

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

		const destX = Math.floor(
			(e.clientX - bounds.left + scrollLeft) / (TILE_SIZE * SCALE)
		);
		const destY = Math.floor(
			(e.clientY - bounds.top + scrollTop) / (TILE_SIZE * SCALE)
		);

		if (
			destX >= 0 &&
			destX < curDestRoom.roomTileWidth &&
			destY >= 0 &&
			destY < curDestRoom.roomTileHeight
		) {
			setCurDestX(destX);
			setCurDestY(destY);
		}
	}

	return (
		<Modal
			className={styles.modal}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			onXClick={onRequestClose}
			title="Warp Destination"
		>
			<div
				className={clsx(styles.room, 'flex flex-col items-center space-y-4')}
			>
				<div className="flex flex-col items-center">
					<div className="font-bold p-1 rounded-t-xl pl-2">Room</div>
					<IconButtonGroup>{roomButtons}</IconButtonGroup>
				</div>
				<div
					className="xmax-w-full max-h-64 overflow-auto grid place-items-center cursor-crosshair"
					style={{ maxWidth: '85vw' }}
					onMouseDown={handleThumbnailClick}
				>
					{curDestRoom && (
						<RoomThumbnail
							className="relative bg-blue-300 border-2 border-white"
							upperLeftTile={{ x: 0, y: 0 }}
							widthInTiles={curDestRoom.roomTileWidth}
							heightInTiles={curDestRoom.roomTileHeight}
							scale={SCALE}
							room={curDestRoom}
						>
							{curDestX > -1 && curDestY > -1 && (
								<DestinationHighlight
									ref={highlightRef}
									x={curDestX}
									y={curDestY}
									scale={SCALE}
								/>
							)}
						</RoomThumbnail>
					)}
				</div>
				<Button
					variant="destructive"
					className="absolute bottom-4 left-4"
					disabled={destX === undefined || destX < 0}
					onClick={() => {
						onDestinationSet?.(null);
						onRequestClose();
					}}
				>
					Clear Warp
				</Button>
				<div className="flex flex-row items-center space-x-2">
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
					<Button onClick={onRequestClose}>Cancel</Button>
				</div>
			</div>
		</Modal>
	);
}

export { TransportDestinationModal };
export type { DestinationSetProps, PublicTransportDestinationModalProps };
