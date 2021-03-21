import React from 'react';

import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';

function OptionButton({
	payload,
	onEntitySettingsChange,
}: {
	payload: 'Mushroom' | 'Coin';
	onEntitySettingsChange: DetailsEditProps['onEntitySettingsChange'];
}) {
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

function QuestionBlockEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<VerticalEditDetails>
			<OptionButton
				payload="Mushroom"
				onEntitySettingsChange={onEntitySettingsChange}
			/>
			<OptionButton
				payload="Coin"
				onEntitySettingsChange={onEntitySettingsChange}
			/>
		</VerticalEditDetails>
	);
}

export { QuestionBlockEditDetails };
