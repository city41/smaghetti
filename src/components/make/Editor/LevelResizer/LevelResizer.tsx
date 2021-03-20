import React, { useCallback, useRef, useState, memo } from 'react';

import { RiDragMoveFill } from 'react-icons/ri';

type LevelResizerProps = {
	onResizeLevel: (delta: Point) => void;
	onResizeLevelComplete: () => void;
};

// const Handle = styled.div`
// 	position: absolute;
// 	bottom: -16px;
// 	right: -16px;
//
// 	width: 32px;
// 	height: 32px;
// 	z-index: 100;
//
// 	cursor: move;
//
// 	display: grid;
// 	place-items: center;
//
// 	& svg {
// 		color: black;
// 		width: 80%;
// 		height: auto;
// 	}
//
// 	&.dragging {
// 		transform-origin: bottom center;
// 		animation: ${pulse} 0.7s linear 0s infinite;
// 	}
//
// 	background-color: orange;
//
// 	border-radius: 50%;
//
// 	&.dragging {
// 		&::after {
// 			background-color: orange;
// 		}
// 	}
// `;

const LevelResizer = memo(function LevelResizer({
	onResizeLevel,
	onResizeLevelComplete,
}: LevelResizerProps) {
	const start = useRef<Point>({ x: 0, y: 0 });
	const ref = useRef<HTMLDivElement | null>(null);
	const [listeningToDoc, setListeningToDoc] = useState(false);

	function handleResizeLevel(e: MouseEvent) {
		const x = e.pageX;
		const y = e.pageY;
		const deltaX = x - start.current.x;
		const deltaY = y - start.current.y;

		onResizeLevel({ x: deltaX, y: deltaY });
		start.current.x = x;
		start.current.y = y;
	}

	const onDocumentMouseMove = useCallback(function onDocumentMouseMove(
		e: MouseEvent
	) {
		handleResizeLevel(e);
	},
	[]);

	const onDocumentMouseUp = useCallback(function onDocumentMouseUp(
		e: MouseEvent
	) {
		document.removeEventListener('mousemove', onDocumentMouseMove);
		document.removeEventListener('mouseup', onDocumentMouseUp);
		document.removeEventListener('mouseleave', onDocumentMouseUp);
		setListeningToDoc(false);
		handleResizeLevel(e);
		onResizeLevelComplete();
	},
	[]);

	return (
		<div
			className="absolute -bottom-4 -right-4 w-8 h-8 z-10 cursor-move grid place-items-center rounded-full bg-purple-600 text-white"
			ref={ref}
			onMouseDown={(e) => {
				if (ref.current && !listeningToDoc) {
					start.current.x = e.pageX;
					start.current.y = e.pageY;

					document.addEventListener('mousemove', onDocumentMouseMove);
					document.addEventListener('mouseup', onDocumentMouseUp);
					document.addEventListener('mouseleave', onDocumentMouseUp);

					setListeningToDoc(true);
				}
			}}
		>
			<RiDragMoveFill />
		</div>
	);
});

export { LevelResizer };
export type { LevelResizerProps };
