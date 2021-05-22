import React from 'react';
import clsx from 'clsx';
import { RiLockFill, RiLockUnlockFill } from 'react-icons/ri';
import { PlainIconButton } from '../../../PlainIconButton';

type InternalLayersProps = {
	actors: {
		locked: boolean;
	};
	stage: {
		locked: boolean;
	};
	onToggleLayerLock: (layer: 'actors' | 'stage') => void;
};

type PublicLayersProps = {
	className?: string;
	disabled?: boolean;
};

type LayerEntryProps = {
	disabled?: boolean;
	title: string;
	locked: boolean;
	onToggleLayerLock: () => void;
};

function LayerEntry({
	disabled,
	title,
	locked,
	onToggleLayerLock,
}: LayerEntryProps) {
	const LockIcon = locked ? RiLockFill : RiLockUnlockFill;

	return (
		<div
			className="grid items-center justify-items-center py-1"
			style={{ gridTemplateColumns: '3rem 1fr 1fr' }}
		>
			<div className="text-gray-500 text-xs">{title}</div>
			<PlainIconButton
				disabled={disabled}
				className={clsx({ 'bg-red-500 rounded-sm': locked })}
				label={`${locked ? 'unlock' : 'lock'} ${title}`}
				icon={LockIcon}
				onClick={onToggleLayerLock}
			/>
		</div>
	);
}

function Layers({
	className,
	disabled,
	actors,
	stage,
	onToggleLayerLock,
}: InternalLayersProps & PublicLayersProps) {
	return (
		<div
			className={clsx(
				className,
				'w-24 h-full bg-gray-900 p-2 flex flex-col justify-around'
			)}
		>
			<LayerEntry
				title="actors"
				{...actors}
				disabled={disabled}
				onToggleLayerLock={() => onToggleLayerLock('actors')}
			/>
			<LayerEntry
				title="stage"
				{...stage}
				disabled={disabled}
				onToggleLayerLock={() => onToggleLayerLock('stage')}
			/>
		</div>
	);
}

export { Layers };
export type { PublicLayersProps };
