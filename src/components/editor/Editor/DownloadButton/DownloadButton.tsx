import React, { memo } from 'react';

import { IconDownload } from '../../../../icons';
import { PlainIconButton } from '../../../PlainIconButton';

type PublicDownloadButtonProps = {
	className?: string;
	disabled?: boolean;
};

type InternalDownloadButtonProps = {
	onClick: () => void;
};

const DownloadButton = memo(function DownloadButton({
	className,
	disabled,
	onClick,
}: PublicDownloadButtonProps & InternalDownloadButtonProps) {
	return (
		<PlainIconButton
			className={className}
			size="large"
			label="download this level"
			onClick={onClick}
			icon={IconDownload}
			disabled={disabled}
		/>
	);
});

export { DownloadButton };
export type { PublicDownloadButtonProps };
