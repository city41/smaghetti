import React from 'react';

import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';
import { PayloadButton } from './PayloadButton';
import { ClearButton } from './ClearButton';
import { EntityType } from '../../entities/entityMap';

type PayloadEditDetailsProps = Pick<
	DetailsEditProps,
	'onEntitySettingsChange'
> & {
	payloads: EntityType[];
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
						payload={payload as EntityType}
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
