import React from 'react';
import { MdClear } from 'react-icons/md';
import { DetailsEditProps } from './index';

type ClearButtonProps = {
	property: string;
	onEntitySettingsChange: DetailsEditProps['onEntitySettingsChange'];
};

function ClearButton({ property, onEntitySettingsChange }: ClearButtonProps) {
	return (
		<button
			className="w-2 h-2 bg-yellow-800 hover:bg-yellow-200 rounded-sm grid place-items-center"
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onEntitySettingsChange({ [property]: undefined });
			}}
		>
			<MdClear style={{ fontSize: '0.4rem' }} />
		</button>
	);
}

export { ClearButton };
