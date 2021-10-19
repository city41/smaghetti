import { Speed } from './PlatformSpeedButton';

export type Width = 3 | 4;

export const speedToValue: Record<Speed, number> = {
	slow: 0x10,
	fast: 0x1d,
};

export const speedToRangeAdjustment: Record<Speed, number> = {
	slow: 1,
	fast: 0.75,
};

export function getNearestSpeed(rawSpeed: number): Speed {
	if (rawSpeed < (speedToValue.slow + speedToValue.fast) / 2) {
		return 'slow';
	} else {
		return 'fast';
	}
}
