import React, { CSSProperties, ReactNode, useRef, memo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

import styles from './LevelPlayer.module.css';
import checkerboardStyles from '../../styles/checkerboard.module.css';
import { GBAPlayer } from './GBAPlayer';
import { createLevelData } from '../../levelData/createLevelData';
import { ControlsBanner } from '../ControlsBanner';
import { PlainIconButton } from '../PlainIconButton';
import { getECoinInfo } from '../../levelData/util';
import { IconCamera } from '../../icons';
import { AudioToggle } from './AudioToggle';

type LevelPlayerProps = {
	className?: string;
	style?: CSSProperties;
	playAs: 'mario' | 'luigi';
	isPlaying: boolean;
	level: LevelToLoadInGBA;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	saveState: Record<string, unknown>;
	onPlayerDied?: () => boolean;
	onLevelCompleted?: () => void;
	checkeredBackground?: boolean;
	editUrl?: string;
	showEarlyPreviewStarburst?: boolean;
};

function BodyPortal({ children }: { children: ReactNode }) {
	return ReactDOM.createPortal(children, document.body);
}

const LevelPlayer = memo(function LevelPlayer({
	isPlaying,
	playAs,
	level,
	biosFile,
	romFile,
	emptySaveFile,
	saveState,
	checkeredBackground,
}: LevelPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const screenshotIndexRef = useRef(1);

	function downloadScreenshot() {
		if (canvasRef.current && isPlaying) {
			const dataUrl = canvasRef.current.toDataURL();
			const link = document.createElement('a');
			link.download = `${level.name}_${screenshotIndexRef.current}.png`;
			link.href = dataUrl;
			link.click();
			screenshotIndexRef.current += 1;
		}
	}

	useHotkeys('t', downloadScreenshot, [level]);

	return (
		<div
			className={clsx(
				styles.root,
				'w-full h-full overflow-hidden grid items-center justify-center',
				{
					hidden: !isPlaying,
					grid: isPlaying,
					[checkerboardStyles.checkerboard]: checkeredBackground,
				}
			)}
		>
			<BodyPortal>
				<div
					className={clsx(
						'fixed top-0 left-0 w-full h-full overflow-hidden grid place-items-center pointer-events-none',
						{
							'z-10': isPlaying,
							hidden: !isPlaying,
						}
					)}
				>
					<GBAPlayer
						biosFile={biosFile}
						romFile={romFile}
						emptySaveFile={emptySaveFile}
						saveState={saveState}
						levelData={createLevelData(level)}
						ecoinInfo={getECoinInfo(level)}
						isPlaying={isPlaying}
						playAs={playAs}
						canvasRef={canvasRef}
					/>
					<div className="fixed left-0 bottom-0 w-full flex flex-row gap-x-4 justify-center items-center pointer-events-auto">
						<AudioToggle key={isPlaying.toString()} />
						<PlainIconButton
							className="bg-green-500"
							icon={IconCamera}
							label="take screenshot (t)"
							onClick={downloadScreenshot}
							size="large"
						/>
						<ControlsBanner />
					</div>
				</div>
			</BodyPortal>
		</div>
	);
});

export { LevelPlayer };
export type { LevelPlayerProps };
