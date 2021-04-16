import React from 'react';

import { DetailsEditProps } from './index';
import { QuestionBlock } from '../../entities/QuestionBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function QuestionBlockEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(QuestionBlock.payloadToObjectId!) as EntityType[]}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { QuestionBlockEditDetails };
