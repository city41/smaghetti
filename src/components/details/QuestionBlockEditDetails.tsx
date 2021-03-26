import React from 'react';

import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';
import { PayloadButton } from './PayloadButton';

function QuestionBlockEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<VerticalEditDetails>
			<PayloadButton
				payload="Mushroom"
				onEntitySettingsChange={onEntitySettingsChange}
			/>
			<PayloadButton
				payload="Coin"
				onEntitySettingsChange={onEntitySettingsChange}
			/>
		</VerticalEditDetails>
	);
}

export { QuestionBlockEditDetails };
