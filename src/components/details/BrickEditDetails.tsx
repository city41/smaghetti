import React from 'react';

import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';
import { PayloadButton } from './PayloadButton';
import { ClearButton } from './ClearButton';
import { payloadToObjectId } from '../../entities/Brick';
import { ObjectType, SpriteType } from '../../entities/entityMap';

function BrickEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<VerticalEditDetails>
			{Object.keys(payloadToObjectId).map((payload) => {
				return (
					<PayloadButton
						key={payload}
						payload={payload as SpriteType | ObjectType}
						onEntitySettingsChange={onEntitySettingsChange}
					/>
				);
			})}
			<ClearButton
				property="payload"
				onEntitySettingsChange={onEntitySettingsChange}
			/>
		</VerticalEditDetails>
	);
}

export { BrickEditDetails };
