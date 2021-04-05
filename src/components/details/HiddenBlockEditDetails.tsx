import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/HiddenBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function HiddenBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(payloadToObjectId) as Array<EntityType>}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { HiddenBlockEditDetails };
