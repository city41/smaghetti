import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/Brick';
import { ObjectType, SpriteType } from '../../entities/entityMap';
import { PayloadEditDetails } from './PayloadEditDetails';

function BrickEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={
				Object.keys(payloadToObjectId) as Array<ObjectType | SpriteType>
			}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={true}
		/>
	);
}

export { BrickEditDetails };
