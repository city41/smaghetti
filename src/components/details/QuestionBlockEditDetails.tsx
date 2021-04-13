import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/QuestionBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function QuestionBlockEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(payloadToObjectId) as EntityType[]}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { QuestionBlockEditDetails };
