import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { LevelTreeObject } from '../../types';
import { RiFocus3Line } from 'react-icons/ri';

type ObjectProps = {
	className?: string;
	levelObject: LevelTreeObject;
	onExcludeChange: () => void;
	onFocus: () => void;
	focused?: boolean;
};

function LevelObject({
	className,
	levelObject,
	onExcludeChange,
	onFocus,
	focused,
}: ObjectProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused && ref.current) {
			ref.current?.scrollIntoView({ block: 'center' });
		}
	}, [focused]);

	return (
		<div
			ref={ref}
			className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col', {
				'border-2 border-white': focused,
			})}
		>
			<div className="flex flex-row items-center space-x-2">
				<div className={clsx('bg-blue-400 w-4 h-4')} />
				<div
					className={clsx('w-60 bg-gray-200 text-gray-900 grid', {
						'grid-cols-4': levelObject.bank === 0,
						'grid-cols-6': levelObject.bank > 0,
					})}
				>
					{levelObject.rawBytes.map((b, i) => (
						<div key={i} className="border border-black">
							<div>0x{b.toString(16)}</div>
							<div>
								{/*{objectRawBytesDesc[i as keyof typeof objectRawBytesDesc]}*/}
							</div>
						</div>
					))}
				</div>
				<label>
					exclude
					<input
						type="checkbox"
						checked={levelObject.exclude}
						onChange={onExcludeChange}
					/>
					<button onClick={onFocus}>
						<RiFocus3Line />
					</button>
				</label>
				{/*<Copy rawBytes={object.rawBytes} />*/}
			</div>
			{/*<Notes*/}
			{/*	className="m-2 w-80"*/}
			{/*	bank={object.bank}*/}
			{/*	id={object.id}*/}
			{/*	type="object"*/}
			{/*/>*/}
		</div>
	);
}

export { LevelObject };
