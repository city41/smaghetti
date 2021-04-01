import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/MusicBlock';
import { ObjectType, SpriteType } from '../../entities/entityMap';
import { PayloadEditDetails } from './PayloadEditDetails';

function MusicBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
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

export { MusicBlockEditDetails };
