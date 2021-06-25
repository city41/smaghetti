import React, { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { EditorFocusRect, MouseMode } from '../../editorSlice';

import checkerboardStyles from '../../../../styles/checkerboard.module.css';
import styles from './CanvasOffsetContainer.module.css';

type CanvasOffsetContainerProps = {
	className?: string;
	offset: Point;
	scale: number;
	mouseMode: MouseMode;
	dragOffset: Point | null;
	onSelectDrag: (arg: { bounds: Bounds; startingPoint: Point }) => void;
	onDragComplete: (shiftPressed: boolean) => void;
	onPan: (delta: Point) => void;
	onPressForPan: () => void;
	onLiftFromPan: () => void;
	onEditorVisibleWindowChanged: (rect: EditorFocusRect) => void;
	children?: ReactNode;
};

const MODAL_OPEN_CLASS = 'ReactModal__Body--open';

function CanvasOffsetContainer({
	className,
	offset,
	scale,
	mouseMode,
	dragOffset,
	onSelectDrag,
	onPan,
	onPressForPan,
	onLiftFromPan,
	onEditorVisibleWindowChanged,
	onDragComplete,
	children,
}: CanvasOffsetContainerProps) {
	const startingMousePoint = useRef<Point | null>(null);
	const lastMousePoint = useRef<Point | null>(null);
	const mouseDownRef = useRef(false);
	const selectBoxRef = useRef<HTMLDivElement | null>(null);

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
		function onWindowSizeChange() {
			onEditorVisibleWindowChanged({
				offset,
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		// set it right away
		onWindowSizeChange();

		// and whenever the window size changes
		window.addEventListener('resize', onWindowSizeChange);

		return () => window.removeEventListener('resize', onWindowSizeChange);
	}, []);

	useEffect(() => {
		const handleMouseUp = (e: MouseEvent) => {
			if (!mouseDownRef.current) {
				return;
			}

			mouseDownRef.current = false;
			selectBoxRef.current!.style.display = 'none';

			if (lastMousePoint.current && mouseMode === 'select') {
				const upperLeftX = dragOffset ? lastMousePoint.current.x : e.clientX;
				const upperLeftY = dragOffset ? lastMousePoint.current.y : e.clientY;
				const lowerRightX = dragOffset ? e.clientX : lastMousePoint.current.x;
				const lowerRightY = dragOffset ? e.clientY : lastMousePoint.current.y;

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

			if (mouseMode !== 'pan' && mouseMode !== 'select') {
				return;
			}

			selectBoxRef.current!.style.display = 'none';

			if (mouseMode === 'pan') {
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

				const upperLeftX = dragOffset ? lastMousePoint.current.x : e.clientX;
				const upperLeftY = dragOffset ? lastMousePoint.current.y : e.clientY;
				const lowerRightX = dragOffset ? e.clientX : lastMousePoint.current.x;
				const lowerRightY = dragOffset ? e.clientY : lastMousePoint.current.y;

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

				if (!dragOffset) {
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
	}, [mouseMode, dragOffset, onSelectDrag, onPan, onDragComplete]);

	const handleMouseDown = (e: React.MouseEvent) => {
		// TODO: HACK! bailing if a modal is open is strange. but mouse down causes strange interactions as
		// can't tell if the user wants to drag or is interacting with a detail pane
		if (
			e.button !== 0 ||
			(mouseMode !== 'pan' && mouseMode !== 'select') ||
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
					[styles.pan]: mouseMode === 'pan',
					[styles.panning]: mouseDownRef.current,
				}
			)}
			onMouseDown={handleMouseDown}
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
