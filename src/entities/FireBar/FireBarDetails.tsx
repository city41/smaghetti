import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';
import {
	IconLongArrowRight,
	IconArrowHorizontal,
	IconClockwiseRotation,
	IconCounterClockwiseRotation,
} from '../../icons';

type Rotation = 'clockwise' | 'counter-clockwise';
type Pivot = 'center' | 'end';
type FireballCount = 4 | 6 | 7 | 9 | 11 | 13 | 17;
type FireBarSettings = {
	rotation: Rotation;
	pivot: Pivot;
	count: FireballCount;
};

type FireBarDetailsProps = {
	settings: FireBarSettings;
	onSettingsChange: (newSettings: FireBarSettings) => void;
	children: ReactNode;
};

const PADDING = 1;

const paramTree: Record<
	Rotation,
	Record<Pivot, Partial<Record<FireballCount, number>>>
> = {
	clockwise: {
		center: {
			7: 0,
			11: 4,
			13: 8,
			17: 0xc,
		},
		end: {
			4: 2,
			6: 6,
			7: 0xa,
			9: 0xe,
		},
	},
	'counter-clockwise': {
		center: {
			7: 1,
			11: 5,
			13: 9,
			17: 0xd,
		},
		end: {
			4: 3,
			6: 7,
			7: 0xb,
			9: 0xf,
		},
	},
};

function NumberButton({
	current,
	disabled,
	onClick,
	children,
}: {
	current: boolean;
	disabled: boolean;
	onClick: () => void;
	children: number;
}) {
	return (
		<button
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}}
			disabled={disabled}
			style={{ fontSize: 3, minWidth: 4, height: 4 }}
			className={clsx('grid place-items-center', {
				'hover:bg-gray-600': !disabled,
				'bg-green-500': current && !disabled,
				'text-gray-500': disabled,
			})}
		>
			{children}
		</button>
	);
}

function isValidFireballCount(
	count: FireballCount,
	settings: FireBarSettings
): boolean {
	return (
		typeof paramTree[settings.rotation][settings.pivot][count] === 'number'
	);
}

function getValidCount(settings: FireBarSettings): FireballCount {
	if (
		typeof paramTree[settings.rotation][settings.pivot][settings.count] ===
		'number'
	) {
		return settings.count;
	}

	const values = Object.keys(paramTree[settings.rotation][settings.pivot]);

	return Number(values[0]) as FireballCount;
}

const ALL_FIREBALL_COUNTS: FireballCount[] = [4, 6, 7, 9, 11, 13, 17];
function FireBarDetails({
	settings,
	onSettingsChange,
	children,
}: FireBarDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		width: TILE_SIZE + 2 * PADDING,
		minHeight: TILE_SIZE + 2 * PADDING,
		padding: PADDING,
	};

	function handleCountChange(v: number) {
		onSettingsChange({
			...settings,
			count: v as FireballCount,
		});
	}

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div
				className={clsx(
					'flex flex-col mt-0.5 space-y-0.5 items-center justify-items-stretch'
				)}
			>
				<div className="grid grid-cols-2 w-full items-center justify-items-center">
					<button
						className={clsx({
							'bg-green-500': settings.rotation === 'clockwise',
						})}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const newSettings = {
								...settings,
								rotation: 'clockwise',
							} as const;
							onSettingsChange({
								...newSettings,
								count: getValidCount(newSettings),
							});
						}}
					>
						<IconClockwiseRotation className="w-1 h-1" />
					</button>
					<button
						className={clsx({
							'bg-green-500': settings.rotation === 'counter-clockwise',
						})}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const newSettings = {
								...settings,
								rotation: 'counter-clockwise',
							} as const;
							onSettingsChange({
								...newSettings,
								count: getValidCount(newSettings),
							});
						}}
					>
						<IconCounterClockwiseRotation className="w-1 h-1" />
					</button>
				</div>
				<div className="grid grid-cols-2 w-full items-center justify-items-center">
					<button
						className={clsx({
							'bg-green-500': settings.pivot === 'center',
						})}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const newSettings = { ...settings, pivot: 'center' } as const;
							onSettingsChange({
								...newSettings,
								count: getValidCount(newSettings),
							});
						}}
					>
						<IconArrowHorizontal className="w-1 h-1" />
					</button>
					<button
						className={clsx({
							'bg-green-500': settings.pivot === 'end',
						})}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const newSettings = { ...settings, pivot: 'end' } as const;
							onSettingsChange({
								...newSettings,
								count: getValidCount(newSettings),
							});
						}}
					>
						<IconLongArrowRight className="w-1 h-1" />
					</button>
				</div>
				<div className="flex flex-row flex-wrap items-center justify-around">
					{ALL_FIREBALL_COUNTS.map((v) => {
						return (
							<NumberButton
								key={v}
								current={settings.count === v}
								disabled={!isValidFireballCount(v, settings)}
								onClick={() => handleCountChange(v)}
							>
								{v}
							</NumberButton>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export { FireBarDetails, paramTree };
export type { Rotation, Pivot, FireballCount, FireBarSettings };
