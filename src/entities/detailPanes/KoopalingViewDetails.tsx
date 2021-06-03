import React from 'react';
import clsx from 'clsx';
import { GiBootStomp } from 'react-icons/gi';

type KoopalingViewDetailsProps = {
	className?: string;
	stompCount: number;
	fireballCount: number;
};

function KoopalingViewDetails({
	className,
	stompCount,
	fireballCount,
}: KoopalingViewDetailsProps) {
	return (
		<div
			className={clsx(
				className,
				'flex flex-row items-center justify-around bg-black absolute left-0 bottom-0 w-full'
			)}
			style={{ fontSize: 2.5 }}
		>
			<div className="grid grid-cols-2 items-center justify-items-center w-full">
				<div
					className="FireBar-bg bg-cover"
					style={{ width: 3, height: 6, margin: '-1px 0' }}
				/>
				<div className="justify-self-start">{fireballCount}</div>
			</div>
			<div className="grid grid-cols-2 items-center justify-items-center w-full">
				<GiBootStomp className="w-1 h-1" />
				<div className="justify-self-start">{stompCount}</div>
			</div>
		</div>
	);
}

export { KoopalingViewDetails };
