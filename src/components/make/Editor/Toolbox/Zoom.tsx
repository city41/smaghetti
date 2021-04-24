import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

import { TiZoomIn, TiZoomOut } from 'react-icons/ti';

import { PlainIconButton } from '../../../PlainIconButton';

type ZoomProps = {
	className?: string;
	disabled?: boolean;
	onScaleIncreased: () => void;
	onScaleDecreased: () => void;
	canIncreaseScale: boolean;
	canDecreaseScale: boolean;
};

const Zoom: FunctionComponent<ZoomProps> = ({
	className,
	disabled,
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
		<div className={clsx(className, 'flex flex-row items-center space-x-1')}>
			<PlainIconButton
				size="large"
				label="zoom out (-)"
				icon={TiZoomOut}
				style={{ fontSize: 32 }}
				onClick={() => onScaleDecreased()}
				disabled={!canDecreaseScale || disabled}
			/>
			<PlainIconButton
				size="large"
				label="zoom in (+)"
				icon={TiZoomIn}
				style={{ fontSize: 32 }}
				onClick={() => onScaleIncreased()}
				disabled={!canIncreaseScale || disabled}
			/>
		</div>
	);
};

export { Zoom };
export type { ZoomProps };
