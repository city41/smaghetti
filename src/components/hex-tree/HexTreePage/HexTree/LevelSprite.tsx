import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { LevelTreeSprite } from '../../types';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { RiFocus3Line } from 'react-icons/ri';

type LevelSpriteProps = {
	className?: string;
	levelSprite: LevelTreeSprite;
	onExcludeChange: () => void;
	onFocus: () => void;
	focused?: boolean;
};

function LevelSprite({
	className,
	levelSprite,
	onExcludeChange,
	onFocus,
	focused,
}: LevelSpriteProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused && ref.current) {
			ref.current?.scrollIntoView({ block: 'center' });
		}
	}, [focused]);

	const spriteType =
		levelSprite.bank === 0
			? bank0SpriteIdToEntityType[levelSprite.id]
			: bank1SpriteIdToEntityType[levelSprite.id];

	return (
		<div
			ref={ref}
			className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col', {
				'border-2 border-white': focused,
			})}
		>
			<div className="flex flex-row items-center space-x-2">
				<div className={clsx(`${spriteType}-bg`, 'w-4 h-4')} />
				<div
					className={clsx('w-60 bg-gray-200 text-gray-900 grid', {
						'grid-cols-4': levelSprite.bank === 0,
						'grid-cols-6': levelSprite.bank > 0,
					})}
				>
					{levelSprite.rawBytes.map((b, i) => (
						<div key={i} className="border border-black">
							<div>0x{b.toString(16)}</div>
							<div>
								{/*{spriteRawBytesDesc[i as keyof typeof spriteRawBytesDesc]}*/}
							</div>
						</div>
					))}
				</div>
				<label>
					exclude
					<input
						type="checkbox"
						checked={levelSprite.exclude}
						onChange={onExcludeChange}
					/>
					<button onClick={onFocus}>
						<RiFocus3Line />
					</button>
				</label>
				{/*<Copy rawBytes={levelSprite.rawBytes} />*/}
			</div>
			{/*<Notes*/}
			{/*	className="m-2 w-80"*/}
			{/*	bank={levelSprite.bank}*/}
			{/*	id={levelSprite.id}*/}
			{/*	type="sprite"*/}
			{/*/>*/}
		</div>
	);
}

export { LevelSprite };
