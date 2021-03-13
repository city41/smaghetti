import React, { ElementType, FunctionComponent, memo } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { FaBomb } from 'react-icons/fa';
import { MdGridOn, MdPanTool } from 'react-icons/md';
import { GiArrowCursor, GiResize } from 'react-icons/gi';
import { RiPencilFill, RiPaintFill, RiEraserFill } from 'react-icons/ri';
import { ImUndo2, ImRedo2 } from 'react-icons/im';

import { PaletteEntry, MouseMode } from '../../editorSlice';
import { IconButton } from '../../../IconButton';
import { IconButtonGroup } from '../../../IconButton/IconButtonGroup';
import { isMac } from '../../../../util/isMac';

import { Zoom } from './Zoom';
import { MuteButton } from './MuteButton';

const icons: Record<MouseMode, ElementType> = {
	select: GiArrowCursor,
	draw: RiPencilFill,
	fill: RiPaintFill,
	erase: RiEraserFill,
	pan: MdPanTool,
};

type ToolboxProps = {
	className?: string;
	currentPaletteEntry?: PaletteEntry;
	mouseMode: MouseMode;
	onMouseModeChanged: (mouseMode: MouseMode) => void;
	onScaleDecreased: () => void;
	onScaleIncreased: () => void;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
	onUndo: () => void;
	onRedo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	onToggleResizeMode: () => void;
	resizeMode: boolean;
	onToggleGrid: () => void;
	showGrid: boolean;
	onEraseLevel: () => void;
};

const Toolbox = memo(function Toolbox({
	className,
	currentPaletteEntry,
	mouseMode,
	onMouseModeChanged,
	onScaleDecreased,
	onScaleIncreased,
	canIncreaseScale,
	canDecreaseScale,
	onUndo,
	onRedo,
	canUndo,
	canRedo,
	onToggleResizeMode,
	resizeMode,
	showGrid,
	onToggleGrid,
	onEraseLevel,
}: ToolboxProps) {
	useHotkeys('r', () => onToggleGrid());
	useHotkeys(isMac ? 'command+z' : 'ctrl+z', onUndo);
	useHotkeys(isMac ? 'command+shift+z' : 'ctrl+shift+z', onRedo);

	const buttons = ([
		{ mode: 'select', hotkey: 's' },
		{ mode: 'draw', hotkey: 'd' },
		{ mode: 'fill', hotkey: 'f' },
		{ mode: 'erase', hotkey: 'e' },
		{ mode: 'pan', hotkey: 'h' },
	] as Array<{ mode: MouseMode; hotkey: string }>).map((mm) => {
		useHotkeys(mm.hotkey, () => onMouseModeChanged(mm.mode));

		return (
			<IconButton
				key={mm.hotkey}
				icon={icons[mm.mode]}
				anchor="top"
				toggleable
				toggled={mm.mode === mouseMode}
				disabled={
					resizeMode ||
					(mm.mode === 'fill' && currentPaletteEntry?.brushMode === 'entity')
				}
				onClick={() => onMouseModeChanged(mm.mode)}
				label={`${mm.mode} (${mm.hotkey})`}
			/>
		);
	});

	return (
		<div
			className={clsx(
				className,
				'flex flex-row flex-wrap items-end pointer-events-none'
			)}
		>
			<IconButtonGroup>{buttons}</IconButtonGroup>

			<div style={{ flex: 1 }} />

			<Zoom
				onScaleDecreased={onScaleDecreased}
				onScaleIncreased={onScaleIncreased}
				canIncreaseScale={canIncreaseScale}
				canDecreaseScale={canDecreaseScale}
			/>

			<div style={{ flex: 1 }} />

			<IconButtonGroup>
				<IconButton
					className="resizeModeButton"
					label="resize level"
					anchor="top"
					icon={GiResize}
					toggled={resizeMode}
					toggleable
					onClick={() => onToggleResizeMode()}
				/>
				<IconButton
					label="toggle grid (r)"
					anchor="top"
					icon={MdGridOn}
					toggled={!resizeMode && showGrid}
					toggleable
					disabled={resizeMode}
					onClick={() => onToggleGrid()}
				/>
				<MuteButton />
			</IconButtonGroup>

			<div style={{ width: 'var(--item-spacing)' }} />

			<IconButton
				label="erase entire level"
				anchor="top"
				icon={FaBomb}
				onClick={() => onEraseLevel()}
			/>

			<div style={{ width: 'var(--item-spacing)' }} />

			<IconButtonGroup className="undoRedoButtons">
				<IconButton
					label="undo"
					anchor="top"
					icon={ImUndo2}
					onClick={() => onUndo()}
					disabled={!canUndo}
				/>
				<IconButton
					label="redo"
					anchor="top"
					icon={ImRedo2}
					onClick={() => onRedo()}
					disabled={!canRedo}
				/>
			</IconButtonGroup>
		</div>
	);
});

export { Toolbox };
export type { ToolboxProps };
