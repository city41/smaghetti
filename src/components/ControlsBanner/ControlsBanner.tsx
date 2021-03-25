import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaGamepad, FaKeyboard } from 'react-icons/fa';
import { ControlsHelpModal } from './ControlsHelpModal';
import { FirefoxWarning } from './FirefoxWarning';

type ControlsBannerProps = {
	className?: string;
};

function ControlsBanner({ className }: ControlsBannerProps) {
	const [showHelp, setShowHelp] = useState(false);
	const [showFirefoxWarning, setShowFirefoxWarning] = useState(false);

	useEffect(() => {
		setShowFirefoxWarning(
			navigator.userAgent.toLowerCase().indexOf('firefox') > -1
		);
	}, []);

	return (
		<>
			{showHelp && (
				<ControlsHelpModal
					isOpen={showHelp}
					onRequestClose={() => setShowHelp(false)}
				/>
			)}
			<div
				className={clsx(
					className,
					'flex flex-row items-center justify-center space-x-2 p-2 bg-gray-700 text-white'
				)}
			>
				<div>use</div>
				<FaGamepad className="text-2xl" />
				<div>or</div>
				<FaKeyboard className="text-xl" />
				<a
					className="text-blue-300 underline"
					onClick={() => setShowHelp((h) => !h)}
				>
					help
				</a>
			</div>
			{showFirefoxWarning && <FirefoxWarning />}
		</>
	);
}

export { ControlsBanner };
