import React, { memo } from 'react';
import { MdFileDownload } from 'react-icons/md';

import { PlainIconButton } from '../../../PlainIconButton';

type PublicDownloadButtonProps = {
	className?: string;
};

type InternalDownloadButtonProps = {
	onClick: () => void;
};

const DownloadButton = memo(function DownloadButton({
	className,
	onClick,
}: PublicDownloadButtonProps & InternalDownloadButtonProps) {
	return (
		<PlainIconButton
			className={className}
			size="large"
			label="download this level"
			onClick={onClick}
			icon={MdFileDownload}
		/>
	);
});

export { DownloadButton };
export type { PublicDownloadButtonProps };
