import React, { memo } from 'react';
import clsx from 'clsx';

type LevelSizeMeterProps = {
	className?: string;
	byteSize: number;
	ranges: readonly [number, number, number];
};

const LevelSizeMeter = memo(function LevelSizeMeter({
	className,
	byteSize,
	ranges,
}: LevelSizeMeterProps) {
	const max = ranges[ranges.length - 1];

	const byteRange = ranges.findIndex((r) => r > byteSize) ?? 2;

	const rangeEls = ranges.map((r, i) => {
		const prevRange = ranges[i - 1] ?? 0;
		const rWidth = r - prevRange;

		return (
			<div
				key={r}
				className={clsx('h-full', {
					'border-r border-gray-200': i < ranges.length - 1,
				})}
				style={{ width: `${Math.min(rWidth / max, 1) * 100}%` }}
			/>
		);
	});

	return (
		<div className={clsx(className, 'flex flex-row gap-x-1 text-xs h-4')}>
			<div>
				{byteSize} / {ranges[0]}
			</div>
			<a
				className="text-blue-300 hover:underline"
				href="/tips#level-size-meter"
				target="_blank"
				rel="noreferer nofollower"
			>
				?
			</a>
			<div className="relative flex-1 h-full">
				<div className="absolute top-0 left-0 h-full w-full">
					<div
						className={clsx('h-full', {
							'bg-green-500': byteRange === 0,
							'bg-yellow-500': byteRange === 1,
							'bg-red-500': byteRange === 2,
							'bg-red-600': byteRange === -1,
						})}
						style={{ width: `${Math.min(byteSize / max, 1) * 100}%` }}
					/>
				</div>
				<div className="absolute top-0 left-0 w-full h-full flex flex-row border border-gray-200">
					{rangeEls}
				</div>
			</div>
		</div>
	);
});

export { LevelSizeMeter };
