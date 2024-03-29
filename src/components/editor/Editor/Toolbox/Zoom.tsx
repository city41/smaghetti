import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { PlainIconButton } from '../../../PlainIconButton';
import {
	IconPhoto,
	IconHumanTarget,
	IconZoomIn,
	IconZoomOut,
} from '../../../../icons';

type ZoomProps = {
	className?: string;
	disabled?: boolean;
	onCenterPlayerInViewport: () => void;
	onShowEntireRoom: () => void;
	onScaleIncreased: () => void;
	onScaleDecreased: () => void;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
};

const Zoom: FunctionComponent<ZoomProps> = ({
	className,
	disabled,
	onCenterPlayerInViewport,
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
				icon={IconZoomOut}
				onClick={onScaleDecreased}
				disabled={!canDecreaseScale || disabled}
			/>
			<PlainIconButton
				size="large"
				label="zoom in (+)"
				icon={IconZoomIn}
				onClick={onScaleIncreased}
				disabled={!canIncreaseScale || disabled}
			/>
			<PlainIconButton
				size="large"
				label="center player in viewport"
				icon={IconHumanTarget}
				onClick={onCenterPlayerInViewport}
				disabled={disabled}
			/>
			<PlainIconButton
				size="large"
				label="show entire room"
				icon={IconPhoto}
				onClick={onShowEntireRoom}
				disabled={disabled}
			/>
		</div>
	);
};

export { Zoom };
export type { ZoomProps };
