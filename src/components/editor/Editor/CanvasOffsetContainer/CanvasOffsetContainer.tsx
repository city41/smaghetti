import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';

import { MouseMode } from '../../editorSlice';

import checkerboardStyles from '../../../../styles/checkerboard.module.css';
import styles from './CanvasOffsetContainer.module.css';

type CanvasOffsetContainerProps = {
	className?: string;
	offset: Point;
	scale: number;
	mouseMode: MouseMode;
	preventPanClicks?: boolean;
	dragOffset: Point | null;
	onSelectDrag: (arg: { bounds: Bounds; startingPoint: Point }) => void;
	onCancelDrag: () => void;
	onDragComplete: (shiftPressed: boolean) => void;
	onPan: (delta: Point) => void;
	onPressForPan: () => void;
	onLiftFromPan: () => void;
	children?: ReactNode;
};

const MODAL_OPEN_CLASS = 'ReactModal__Body--open';

function CanvasOffsetContainer({
	className,
	offset,
	scale,
	mouseMode,
	preventPanClicks,
	dragOffset,
	onSelectDrag,
	onPan,
	onPressForPan,
	onLiftFromPan,
	onCancelDrag,
	onDragComplete,
	children,
}: CanvasOffsetContainerProps) {
	const [shiftDown, setShiftDown] = useState(false);
	const startingMousePoint = useRef<Point | null>(null);
	const lastMousePoint = useRef<Point | null>(null);
	const mouseDownRef = useRef(false);
	const selectBoxRef = useRef<HTMLDivElement | null>(null);
	const mouseModeRef = useRef(mouseMode);
	const dragOffsetRef = useRef(dragOffset);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.keyCode === 32) {
				document.removeEventListener('keydown', handleKeyDown);
				document.addEventListener('keyup', handleKeyUp);

				onPressForPan();
			}
		}

		function handleKeyUp(e: KeyboardEvent) {
			if (e.keyCode === 32) {
				document.removeEventListener('keyup', handleKeyUp);
				document.addEventListener('keydown', handleKeyDown);

				onLiftFromPan();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.shiftKey || e.key === 'Shift') {
				setShiftDown(true);
			}

			if (e.key === 'Escape') {
				onCancelDrag();
				mouseDownRef.current = false;
			}
		}

		function handleKeyUp(e: KeyboardEvent) {
			if (e.shiftKey || e.key === 'Shift') {
				setShiftDown(false);
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		const handleMouseUp = (e: MouseEvent) => {
			if (!mouseDownRef.current) {
				return;
			}

			mouseDownRef.current = false;
			selectBoxRef.current!.style.display = 'none';

			if (lastMousePoint.current && mouseModeRef.current === 'select') {
				const upperLeftX = dragOffsetRef.current
					? lastMousePoint.current.x
					: e.clientX;
				const upperLeftY = dragOffsetRef.current
					? lastMousePoint.current.y
					: e.clientY;
				const lowerRightX = dragOffsetRef.current
					? e.clientX
					: lastMousePoint.current.x;
				const lowerRightY = dragOffsetRef.current
					? e.clientY
					: lastMousePoint.current.y;

				const bounds = {
					upperLeft: {
						x: Math.min(lastMousePoint.current.x, upperLeftX),
						y: Math.min(lastMousePoint.current.y, upperLeftY),
					},
					lowerRight: {
						x: Math.max(lowerRightX, e.clientX),
						y: Math.max(lowerRightY, e.clientY),
					},
				};

				onSelectDrag({ bounds, startingPoint: startingMousePoint.current! });
			}

			onDragComplete(e.shiftKey);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!mouseDownRef.current) {
				return;
			}

			if (mouseModeRef.current !== 'pan' && mouseModeRef.current !== 'select') {
				return;
			}

			selectBoxRef.current!.style.display = 'none';

			if (mouseModeRef.current === 'pan') {
				onPan({
					x: e.clientX - lastMousePoint.current!.x,
					y: e.clientY - lastMousePoint.current!.y,
				});

				lastMousePoint.current = { x: e.clientX, y: e.clientY };
			} else if (lastMousePoint.current) {
				// this is very weird code. It works, but I will totally forget how it works
				// TODO: refactor this and make it sane

				// the trick is when in select mode, drags alternate between selecting things
				// and dragging them. when selecting, we want to maximize the rectangle. but when
				// dragging, the rectangle should be {(startPoint), (currentPoint)}

				const upperLeftX = dragOffsetRef.current
					? lastMousePoint.current.x
					: e.clientX;
				const upperLeftY = dragOffsetRef.current
					? lastMousePoint.current.y
					: e.clientY;
				const lowerRightX = dragOffsetRef.current
					? e.clientX
					: lastMousePoint.current.x;
				const lowerRightY = dragOffsetRef.current
					? e.clientY
					: lastMousePoint.current.y;

				const bounds = {
					upperLeft: {
						x: Math.min(lastMousePoint.current.x, upperLeftX),
						y: Math.min(lastMousePoint.current.y, upperLeftY),
					},
					lowerRight: {
						x: Math.max(lowerRightX, e.clientX),
						y: Math.max(lowerRightY, e.clientY),
					},
				};

				onSelectDrag({ bounds, startingPoint: startingMousePoint.current! });

				if (!dragOffsetRef.current) {
					selectBoxRef.current!.style.top = bounds.upperLeft.y + 'px';
					selectBoxRef.current!.style.left = bounds.upperLeft.x + 'px';
					selectBoxRef.current!.style.width =
						bounds.lowerRight.x - bounds.upperLeft.x + 'px';
					selectBoxRef.current!.style.height =
						bounds.lowerRight.y - bounds.upperLeft.y + 'px';
					selectBoxRef.current!.style.display = 'block';
				}
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseleave', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseleave', handleMouseUp);
		};
	}, []);

	useEffect(() => {
		mouseModeRef.current = mouseMode;
		dragOffsetRef.current = dragOffset;
	}, [mouseMode, dragOffset]);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		// TODO: HACK! bailing if a modal is open is strange. but mouse down causes strange interactions as
		// can't tell if the user wants to drag or is interacting with a detail pane
		if (
			e.button !== 0 ||
			(mouseModeRef.current !== 'pan' && mouseModeRef.current !== 'select') ||
			document.body.classList.contains(MODAL_OPEN_CLASS) ||
			(e.target as HTMLElement).tagName.toLowerCase() === 'input'
		) {
			return;
		}

		mouseDownRef.current = true;
		lastMousePoint.current = { x: e.clientX, y: e.clientY };
		startingMousePoint.current = { x: e.clientX, y: e.clientY };

		const bounds = {
			upperLeft: { ...lastMousePoint.current },
			lowerRight: { ...lastMousePoint.current },
		};
		onSelectDrag({ bounds, startingPoint: startingMousePoint.current });
	}, []);

	const handleMouseDownCapture = (e: React.MouseEvent) => {
		if (mouseModeRef.current === 'pan' && preventPanClicks) {
			e.stopPropagation();
			e.preventDefault();
			handleMouseDown(e);
		}
	};

	const absoluteStyle = {
		position: 'absolute' as const,
		left: -offset.x * scale,
		top: -offset.y * scale,
	};

	return (
		<div
			className={clsx(
				className,
				checkerboardStyles.checkerboard,
				'relative overflow-hidden w-full h-full',
				{
					[styles.pan]: mouseModeRef.current === 'pan',
					[styles.panning]: mouseDownRef.current,
					[styles.copying]: shiftDown && mouseDownRef.current,
				}
			)}
			onMouseDown={handleMouseDown}
			onMouseDownCapture={handleMouseDownCapture}
		>
			<div style={absoluteStyle}>{children}</div>
			<div
				ref={selectBoxRef}
				className="absolute border-2 border-white pointer-events-none z-100"
			>
				<div className="bg-white opacity-25 w-full h-full" />
			</div>
		</div>
	);
}

export { CanvasOffsetContainer };
export type { CanvasOffsetContainerProps };
