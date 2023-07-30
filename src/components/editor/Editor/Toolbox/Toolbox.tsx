import React, { ElementType, memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { MouseMode } from '../../editorSlice';
import { PlainIconButton } from '../../../PlainIconButton';
import { isMac } from '../../../../util/isMac';

import { Zoom } from './Zoom';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { PlayButton } from '../PlayButton';
import { SaveButton } from '../SaveButton';
import { DownloadButton } from '../DownloadButton';

import {
	IconUndo,
	IconRedo,
	IconPencil,
	IconEraser,
	IconPaintBucket,
	IconPan,
	IconGrid,
	IconArrow,
	IconBomb,
} from '../../../../icons';

import styles from './Toolbox.module.css';

const icons: Record<MouseMode, ElementType> = {
	select: IconArrow,
	draw: IconPencil,
	fill: IconPaintBucket,
	erase: IconEraser,
	pan: IconPan,
};

type PublicToolboxProps = {
	className?: string;
	disabled: boolean;
	disableSaving: boolean;
	isPlaying: boolean;
	onPlayClick: () => void;
};

type InternalToolboxProps = {
	currentPaletteEntry?: EntityType;
	mouseMode: MouseMode;
	onMouseModeChanged: (mouseMode: MouseMode) => void;
	onCenterPlayerInViewport: () => void;
	onShowEntireRoom: () => void;
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
	onCenterPlayerInViewport,
	onShowEntireRoom,
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
	disabled,
	disableSaving,
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
					disabled ||
					(mm.mode === 'fill' &&
						currentPaletteEntry &&
						entityMap[currentPaletteEntry].editorType !== 'cell')
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
			<div className="w-32 flex flex-row items-center space-x-2 bg-yellow-600 -my-2 py-2 -ml-2 px-2">
				<PlayButton
					disabled={disabled && !isPlaying}
					isPlaying={isPlaying}
					onClick={onPlayClick}
				/>
				<SaveButton disabled={disabled} disabledExplicitly={disableSaving} />
				<DownloadButton disabled={disabled} />
			</div>

			<div className="flex flex-row items-center space-x-2">{buttons}</div>

			<Zoom
				disabled={disabled}
				onCenterPlayerInViewport={onCenterPlayerInViewport}
				onShowEntireRoom={onShowEntireRoom}
				onScaleDecreased={onScaleDecreased}
				onScaleIncreased={onScaleIncreased}
				canIncreaseScale={canIncreaseScale}
				canDecreaseScale={canDecreaseScale}
			/>

			<PlainIconButton
				label="toggle grid (g)"
				size="large"
				icon={IconGrid}
				toggled={showGrid}
				disabled={disabled}
				onClick={() => onToggleGrid()}
			/>

			<div className="hidden lg:block flex-1 text-center text-sm text-gray-300">
				press <span className="font-bold text-base">?</span> for keyboard
				shortcuts{' '}
				<a
					className="inline-block ml-2 bg-blue-500 text-white font-bold px-1 py-0.5 hover:bg-blue-500 rounded"
					href="/tips"
					target="_blank"
				>
					more tips
				</a>
			</div>

			<div className="flex flex-row items-center space-x-2">
				<PlainIconButton
					label={`undo (${isMac ? 'cmnd' : 'ctrl'}-z)`}
					icon={IconUndo}
					onClick={() => onUndo()}
					// still allow undo in manage mode
					disabled={!canUndo || isPlaying}
				/>
				<PlainIconButton
					label={`redo (${isMac ? 'cmnd' : 'ctrl'}-shift-z)`}
					icon={IconRedo}
					onClick={() => onRedo()}
					// still allow redo in manage mode
					disabled={!canRedo || isPlaying}
				/>
			</div>

			<PlainIconButton
				disabled={disabled}
				label="erase entire level"
				icon={IconBomb}
				onClick={() => onEraseLevel()}
			/>
			<Link href="/" passHref legacyBehavior>
				<a className={styles.homeLink} />
			</Link>
		</div>
	);
});

export { Toolbox };
export type { PublicToolboxProps };
