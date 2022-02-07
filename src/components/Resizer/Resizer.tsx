import React, {
	CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import {
	IconArrowHorizontal,
	IconArrowVertical,
	IconArrowCross,
} from '../../icons';
import type { IconType } from '../../icons';

type Axis = 'x' | 'y' | 'xy' | 'x-or-y';
type Direction = 'x' | 'y';

type PublicResizerProps = {
	className?: string;
	style?: CSSProperties;
	size: number | Point;
	increment: number | Point;
	axis: Axis;
	onSizeChange: (newSize: Point) => void;
	onResizeStart?: () => void;
	onResizeEnd?: () => void;
};

type InternalResizerProps = {
	scale: number;
};

const icons: Record<Axis, IconType> = {
	x: IconArrowHorizontal,
	y: IconArrowVertical,
	xy: IconArrowCross,
	'x-or-y': IconArrowCross,
};

const CSSProperty: Record<Direction, string> = {
	x: 'left',
	y: 'top',
};

function otherAxis(a: Axis): 'x' | 'y' {
	if (a === 'x') return 'y';

	return 'x';
}

function Resizer({
	className,
	style,
	size,
	axis,
	scale,
	increment,
	onSizeChange,
	onResizeStart,
	onResizeEnd,
}: PublicResizerProps & InternalResizerProps) {
	const start = useRef<Point>({ x: 0, y: 0 });
	const current = useRef<Point>({ x: 0, y: 0 });
	const sizeRef = useRef<Point>(
		typeof size === 'number'
			? ({ [axis]: size, [otherAxis(axis)]: 0 } as Point)
			: size
	);
	const scaleRef = useRef<number>(scale);
	const axisRef = useRef<Axis>(axis);
	const onResizeEndRef = useRef<undefined | (() => void)>(onResizeEnd);
	const onSizeChangeRef = useRef<undefined | ((newSize: Point) => void)>(
		onSizeChange
	);

	const ref = useRef<HTMLDivElement | null>(null);
	const [listeningToDoc, setListeningToDoc] = useState(false);

	useEffect(() => {
		if (ref.current) {
			const icon = ref.current.querySelector('.resize-icon') as HTMLElement;
			icon.style.setProperty(CSSProperty.x, '0px');
			icon.style.setProperty(CSSProperty.y, '0px');
		}

		if (sizeRef.current) {
			if (typeof size === 'number') {
				sizeRef.current[axis as 'x' | 'y'] = size;
			} else {
				sizeRef.current.x = size.x;
				sizeRef.current.y = size.y;
			}
		}
	}, [size]);

	useEffect(() => {
		onResizeEndRef.current = onResizeEnd;
	}, [onResizeEnd]);

	useEffect(() => {
		onSizeChangeRef.current = onSizeChange;
	}, [onSizeChange]);

	useEffect(() => {
		scaleRef.current = scale;
	}, [scale]);

	useEffect(() => {
		axisRef.current = axis;
	}, [axis]);

	const onDocumentMouseMove = useCallback(function onDocumentMouseMove(
		e: MouseEvent
	) {
		const inputs: Record<Direction, number> = { x: e.pageX, y: e.pageY };

		const xDiff = (inputs.x - start.current.x) / scaleRef.current;
		const yDiff = (inputs.y - start.current.y) / scaleRef.current;

		const icon = ref.current!.querySelector('.resize-icon') as HTMLElement;

		switch (axisRef.current) {
			case 'x':
				icon.style.setProperty(CSSProperty.x, `${xDiff}px`);
				break;
			case 'y':
				icon.style.setProperty(CSSProperty.y, `${yDiff}px`);
				break;
			case 'xy':
				icon.style.setProperty(CSSProperty.x, `${xDiff}px`);
				icon.style.setProperty(CSSProperty.y, `${yDiff}px`);
				break;
			case 'x-or-y':
				if (Math.abs(xDiff) > Math.abs(yDiff)) {
					icon.style.setProperty(CSSProperty.x, `${xDiff}px`);
				} else {
					icon.style.setProperty(CSSProperty.y, `${yDiff}px`);
				}
				break;
		}

		const incrementX = typeof increment === 'number' ? increment : increment.x;
		const incrementY = typeof increment === 'number' ? increment : increment.y;

		const xFloorCeil = xDiff < 0 ? Math.ceil : Math.floor;
		const xDelta = xFloorCeil(xDiff / incrementX);
		const yFloorCeil = yDiff < 0 ? Math.ceil : Math.floor;
		const yDelta = yFloorCeil(yDiff / incrementY);

		if (axisRef.current === 'x' && xDelta !== 0) {
			onSizeChangeRef.current!({
				x: sizeRef.current.x + xDelta,
				y: sizeRef.current.y,
			});
			start.current.x = inputs.x;
		}

		if (axisRef.current === 'y' && yDelta !== 0) {
			onSizeChangeRef.current!({
				x: sizeRef.current.x,
				y: sizeRef.current.y + yDelta,
			});
			start.current.y = inputs.y;
		}

		if (axisRef.current === 'xy' && (xDelta !== 0 || yDelta !== 0)) {
			onSizeChangeRef.current!({
				x: sizeRef.current.x + xDelta,
				y: sizeRef.current.y + yDelta,
			});

			if (xDelta !== 0) {
				start.current.x = inputs.x;
			}

			if (yDelta !== 0) {
				start.current.y = inputs.y;
			}
		}

		if (axisRef.current === 'x-or-y' && (xDelta !== 0 || yDelta !== 0)) {
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				onSizeChangeRef.current!({
					x: sizeRef.current.x + xDelta,
					y: sizeRef.current.y,
				});
				start.current.x = inputs.x;
			} else {
				onSizeChangeRef.current!({
					x: sizeRef.current.x,
					y: sizeRef.current.y + yDelta,
				});
				start.current.y = inputs.y;
			}
		}

		current.current.x = inputs.x;
		current.current.y = inputs.y;
	},
	[]);

	const onDocumentMouseUp = useCallback(
		function onDocumentMouseUp() {
			document.removeEventListener('mousemove', onDocumentMouseMove);
			document.removeEventListener('mouseup', onDocumentMouseUp);
			document.removeEventListener('mouseleave', onDocumentMouseUp);
			setListeningToDoc(false);
			onResizeEndRef.current?.();

			const icon = ref.current!.querySelector('.resize-icon') as HTMLElement;
			icon.style.setProperty(CSSProperty.x, '0px');
			icon.style.setProperty(CSSProperty.y, '0px');
		},

		[]
	);

	const Icon = icons[axis];
	return (
		<div
			ref={ref}
			style={style}
			className={clsx(className, 'w-1.5 h-1.5 z-10')}
			onMouseDown={(e) => {
				if (ref.current && !listeningToDoc) {
					e.stopPropagation();
					e.preventDefault();

					start.current.x = e.pageX;
					start.current.y = e.pageY;

					document.addEventListener('mousemove', onDocumentMouseMove);
					document.addEventListener('mouseup', onDocumentMouseUp);
					document.addEventListener('mouseleave', onDocumentMouseUp);

					setListeningToDoc(true);
					onResizeStart?.();
				}
			}}
		>
			<Icon className="resize-icon absolute w-full h-full bg-blue-700 rounded-full cursor-move" />
		</div>
	);
}

export { Resizer };
export type { PublicResizerProps };
