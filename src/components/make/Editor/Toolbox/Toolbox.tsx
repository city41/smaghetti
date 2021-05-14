import React, { ElementType, memo } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { FaBomb } from 'react-icons/fa';
import { MdGridOn, MdPanTool } from 'react-icons/md';
import { GiArrowCursor } from 'react-icons/gi';
import { RiPencilFill, RiPaintFill, RiEraserFill } from 'react-icons/ri';
import { ImUndo2, ImRedo2 } from 'react-icons/im';

import { MouseMode } from '../../editorSlice';
import { PlainIconButton } from '../../../PlainIconButton';
import { isMac } from '../../../../util/isMac';

import { Zoom } from './Zoom';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { PlayButton } from '../PlayButton';
import { SaveButton } from '../SaveButton';
import { DownloadButton } from '../DownloadButton';

const icons: Record<MouseMode, ElementType> = {
	select: GiArrowCursor,
	draw: RiPencilFill,
	fill: RiPaintFill,
	erase: RiEraserFill,
	pan: MdPanTool,
};

type PublicToolboxProps = {
	className?: string;
	isPlaying: boolean;
	onPlayClick: () => void;
};

type InternalToolboxProps = {
	currentPaletteEntry?: EntityType;
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
	showGrid,
	onToggleGrid,
	onEraseLevel,
	isPlaying,
	onPlayClick,
}: InternalToolboxProps & PublicToolboxProps) {
	useHotkeys('g', () => onToggleGrid());
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
			<PlainIconButton
				key={mm.hotkey}
				size="large"
				icon={icons[mm.mode]}
				toggled={mm.mode === mouseMode}
				disabled={
					isPlaying ||
					(mm.mode === 'fill' &&
						currentPaletteEntry &&
						entityMap[currentPaletteEntry].editorType === 'entity')
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
				'bg-gray-700 flex flex-row flex-wrap items-center space-x-12 px-2 py-2'
			)}
		>
			<div className="flex flex-row items-center space-x-2 bg-yellow-600 -my-2 py-2 -ml-2 px-2">
				<PlayButton isPlaying={isPlaying} onClick={onPlayClick} />
				<SaveButton disabled={isPlaying} />
				<DownloadButton disabled={isPlaying} />
			</div>

			<div className="flex flex-row items-center space-x-2">{buttons}</div>

			<Zoom
				disabled={isPlaying}
				onScaleDecreased={onScaleDecreased}
				onScaleIncreased={onScaleIncreased}
				canIncreaseScale={canIncreaseScale}
				canDecreaseScale={canDecreaseScale}
			/>

			<PlainIconButton
				label="toggle grid (r)"
				size="large"
				icon={MdGridOn}
				toggled={showGrid}
				disabled={isPlaying}
				onClick={() => onToggleGrid()}
			/>

			<div className="flex-1 text-center text-sm text-gray-300">
				press <span className="font-bold text-base">?</span> for keyboard
				shortcuts
			</div>

			<div className="flex flex-row items-center space-x-2">
				<PlainIconButton
					label={`undo (${isMac ? 'cmnd' : 'ctrl'}-z)`}
					icon={ImUndo2}
					onClick={() => onUndo()}
					disabled={!canUndo || isPlaying}
				/>
				<PlainIconButton
					label={`redo (${isMac ? 'cmnd' : 'ctrl'}-shift-z)`}
					icon={ImRedo2}
					onClick={() => onRedo()}
					disabled={!canRedo || isPlaying}
				/>
			</div>

			<PlainIconButton
				disabled={isPlaying}
				label="erase entire level"
				icon={FaBomb}
				onClick={() => onEraseLevel()}
			/>
		</div>
	);
});

export { Toolbox };
export type { PublicToolboxProps };
