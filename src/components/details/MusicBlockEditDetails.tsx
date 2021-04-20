import React from 'react';

import { DetailsEditProps } from './index';
import { MusicBlock } from '../../entities/MusicBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function MusicBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(MusicBlock.payloadToObjectId!) as EntityType[]}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={true}
		/>
	);
}

export { MusicBlockEditDetails };
