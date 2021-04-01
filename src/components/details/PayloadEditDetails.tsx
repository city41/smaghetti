import React from 'react';

import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';
import { PayloadButton } from './PayloadButton';
import { ClearButton } from './ClearButton';
import { ObjectType, SpriteType } from '../../entities/entityMap';

type PayloadEditDetailsProps = Pick<
	DetailsEditProps,
	'onEntitySettingsChange'
> & {
	payloads: Array<ObjectType | SpriteType>;
	canClear: boolean;
};

function PayloadEditDetails({
	payloads,
	canClear,
	onEntitySettingsChange,
}: PayloadEditDetailsProps) {
	return (
		<VerticalEditDetails>
			{payloads.map((payload) => {
				return (
					<PayloadButton
						key={payload}
						payload={payload as SpriteType | ObjectType}
						onEntitySettingsChange={onEntitySettingsChange}
					/>
				);
			})}
			{canClear && (
				<ClearButton
					property="payload"
					onEntitySettingsChange={onEntitySettingsChange}
				/>
			)}
		</VerticalEditDetails>
	);
}

export { PayloadEditDetails };
