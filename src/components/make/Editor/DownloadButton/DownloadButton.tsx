import React, { memo } from 'react';
import { MdFileDownload } from 'react-icons/md';

import { IconButton } from '../../../IconButton';

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
		<IconButton
			className={className}
			anchor="top"
			label="download this level"
			onClick={onClick}
			icon={MdFileDownload}
			alternate
		/>
	);
});

export { DownloadButton };
export type { PublicDownloadButtonProps };
