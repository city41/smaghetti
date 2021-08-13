import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { TiZoomIn, TiZoomOut } from 'react-icons/ti';
import {
	MdPhotoSizeSelectLarge,
	MdPhotoSizeSelectActual,
} from 'react-icons/md';

import { PlainIconButton } from '../../../PlainIconButton';

type ZoomProps = {
	className?: string;
	disabled?: boolean;
	onResetViewport: () => void;
	onShowEntireRoom: () => void;
	onScaleIncreased: () => void;
	onScaleDecreased: () => void;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
};

const Zoom: FunctionComponent<ZoomProps> = ({
	className,
	disabled,
	onResetViewport,
	onShowEntireRoom,
	onScaleIncreased,
	onScaleDecreased,
	canIncreaseScale,
	canDecreaseScale,
}) => {
	useHotkeys(
		'-',
		() => {
			if (!disabled) {
				onScaleDecreased();
			}
		},
		[disabled]
	);
	useHotkeys(
		'=,shift+=',
		() => {
			if (!disabled) {
				onScaleIncreased();
			}
		},
		[disabled]
	);

	return (
		<div
			className={clsx(className, 'flex flex-row items-center space-x-1')}
			style={{ fontSize: 32 }}
		>
			<PlainIconButton
				size="large"
				label="zoom out (-)"
				icon={TiZoomOut}
				onClick={onScaleDecreased}
				disabled={!canDecreaseScale || disabled}
			/>
			<PlainIconButton
				size="large"
				label="zoom in (+)"
				icon={TiZoomIn}
				onClick={onScaleIncreased}
				disabled={!canIncreaseScale || disabled}
			/>
			<PlainIconButton
				size="large"
				label="reset viewport"
				icon={MdPhotoSizeSelectLarge}
				onClick={onResetViewport}
				disabled={disabled}
			/>
			<PlainIconButton
				size="large"
				label="show entire room"
				icon={MdPhotoSizeSelectActual}
				onClick={onShowEntireRoom}
				disabled={disabled}
			/>
		</div>
	);
};

export { Zoom };
export type { ZoomProps };
