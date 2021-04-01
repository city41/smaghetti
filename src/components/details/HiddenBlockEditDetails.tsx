import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/HiddenBlock';
import { ObjectType, SpriteType } from '../../entities/entityMap';
import { PayloadEditDetails } from './PayloadEditDetails';

function HiddenBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={
				Object.keys(payloadToObjectId) as Array<ObjectType | SpriteType>
			}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { HiddenBlockEditDetails };
