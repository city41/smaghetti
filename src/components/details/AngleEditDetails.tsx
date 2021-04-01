import React from 'react';
import { DetailsEditProps } from './index';
import { VerticalEditDetails } from './VerticalEditDetails';
import { AngleSettingButton } from './AngleSettingButton';

function AngleEditDetails({
	settings,
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<VerticalEditDetails>
			<AngleSettingButton
				angle={settings.angle}
				onEntitySettingsChange={onEntitySettingsChange}
			/>
		</VerticalEditDetails>
	);
}

export { AngleEditDetails };
