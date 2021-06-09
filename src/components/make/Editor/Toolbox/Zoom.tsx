import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { TiZoomIn, TiZoomOut } from 'react-icons/ti';
import { MdTerrain } from 'react-icons/md';

import { PlainIconButton } from '../../../PlainIconButton';

type ZoomProps = {
	className?: string;
	disabled?: boolean;
	onResetViewport: () => void;
	onScaleIncreased: () => void;
	onScaleDecreased: () => void;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
};

const Zoom: FunctionComponent<ZoomProps> = ({
	className,
	disabled,
	onResetViewport,
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
				icon={MdTerrain}
				onClick={onResetViewport}
				disabled={!canIncreaseScale || disabled}
			/>
		</div>
	);
};

export { Zoom };
export type { ZoomProps };
