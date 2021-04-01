import React from 'react';
import { AiOutlineRotateLeft } from 'react-icons/ai';

type AngleSettingButtonProps = {
	angle: number | undefined;
	rotateAmount?: number;
	onEntitySettingsChange: (settings: EntitySettings) => void;
};

function AngleSettingButton({
	angle,
	// TODO: this is a strange default, but it is what works best with tailwinds rotate classes
	rotateAmount = 270,
	onEntitySettingsChange,
}: AngleSettingButtonProps) {
	return (
		<button
			className="w-2 h-2 bg-yellow-800 hover:bg-yellow-200 xbg-cover rounded-sm bg-center bg-no-repeat"
			aria-label="rotate"
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();

				const newAngle = ((angle ?? 0) + rotateAmount) % 360;
				onEntitySettingsChange({ angle: newAngle });
			}}
		>
			<AiOutlineRotateLeft className="w-2 h-2" title="Rotate by 45 degrees" />
		</button>
	);
}

export { AngleSettingButton };
