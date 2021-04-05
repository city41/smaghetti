import React from 'react';
import { DetailsEditProps } from './index';
import { EntityType } from '../../entities/entityMap';

type PayloadButtonProps = {
	payload: EntityType;
	onEntitySettingsChange: DetailsEditProps['onEntitySettingsChange'];
};

function PayloadButton({
	payload,
	onEntitySettingsChange,
}: PayloadButtonProps) {
	return (
		<button
			className={`${payload}-bg w-2 h-2 bg-yellow-800 hover:bg-yellow-200 xbg-cover rounded-sm bg-center bg-no-repeat`}
			style={{
				backgroundSize: '0.4rem',
			}}
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onEntitySettingsChange({ payload });
			}}
		/>
	);
}

export { PayloadButton };
