import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';

import {
	loadLevel,
	loadFromLocalStorage,
	saveToLocalStorage,
} from '../editorSlice';

import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { CanvasOffsetContainer } from './CanvasOffsetContainer';
import { LevelResizer } from './LevelResizer';
import { LevelPlayer } from './LevelPlayer';
import { Toolbox } from './Toolbox';
import { PlayButton } from './PlayButton';
import { SaveButton } from './SaveButton';
// import { KeyboardHelpModal } from './components/keyboardHelpModal';
import { Warning } from '../../Warning';
import { useFirstRender } from '../../../hooks/useFirstRender';
import { EarlyPreviewStarburst } from '../../EarlyPreviewStarburst';
// import { LoadLevelError } from './components/LoadLevelError';
import { MetadataMenu } from './MetadataMenu';
import { PageMenu } from '../../PageMenu';

import styles from './Editor.module.css';
import { IconButtonGroup } from '../../IconButton/IconButtonGroup';

// const LazyTour = Loadable({
// 	loader: () => import('../coming-soon/components/tour'),
// 	loading: () => null,
// });

type EditorProps = {
	noScript?: boolean;
	resizeMode: boolean;
};

// const Chrome = styled.div`
// 	/* used throughout the children for consistency */
// 	--color-text: var(--color-black);
// 	--item-spacing: 24px;
// 	--short-edge-spacing: 16px;
// 	--long-edge-spacing: 32px;
// 	--chrome-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
// 	--item-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
// 	--chrome-background-color: rgba(60, 120, 80, 0.35);
// 	--chrome-backdrop-filter: blur(16px);
// 	--chrome-edge-radius: 16px;
// 	--chrome-border: 8px solid white;
//
// 	pointer-events: none;
//
// 	position: fixed;
// 	z-index: 2;
//
// 	top: 0;
// 	left: 0;
//
// 	width: 100%;
// 	height: 100%;
//
// 	display: grid;
// 	grid-template-columns: min-content 1fr min-content;
// 	grid-template-rows: min-content 1fr 60px;
//
// 	& .toolbox {
// 		grid-column: 2;
// 		grid-row: 1;
// 	}
//
// 	& .muteButton {
// 		grid-column: 3;
// 		grid-row: 1;
// 		padding: 16px;
// 	}
//
// 	& .playButtonContainer,
// 	& .shareButtonContainer {
// 		display: flex;
//
// 		align-items: center;
// 		justify-content: center;
// 		background-color: rgba(0, 0, 0, 0.5);
//
// 		z-index: 5;
// 		pointer-events: all;
// 		box-shadow: var(--chrome-box-shadow);
//
// 		height: 52px;
//
// 		cursor: pointer;
// 	}
//
// 	& .playButtonContainer {
// 		grid-column: 1;
// 		grid-row: 1;
// 		border-right: var(--chrome-border);
// 		border-bottom: var(--chrome-border);
// 		border-bottom-right-radius: var(--chrome-edge-radius);
// 		transition: all 0.2s ease-out;
//
// 		width: 52px;
// 	}
//
// 	& .shareButtonContainer {
// 		grid-column: 3;
// 		grid-row: 1;
// 		border-left: var(--chrome-border);
// 		border-bottom: var(--chrome-border);
// 		border-bottom-left-radius: var(--chrome-edge-radius);
//
// 		width: 90px;
// 	}
//
// 	& .paletteContainer {
// 		grid-column: 1;
// 		grid-row: 2;
//
// 		pointer-events: all;
//
// 		align-self: center;
// 	}
//
// 	& .bottomTray {
// 		grid-column: 1 / -1;
// 		grid-row: 3;
// 		width: 100%;
//
// 		pointer-events: none;
// 		justify-self: center;
//
// 		display: flex;
// 		flex-direction: row;
// 		align-items: center;
// 		justify-content: flex-end;
// 	}
//
// 	& .playerContainer {
// 		grid-column: 2 / -1;
// 		grid-row: 2 / -1;
// 	}
//
// 	& .player {
// 		position: relative;
//
// 		border: 16px solid var(--color-chrome-shadow);
// 		border-bottom: 32px solid var(--color-chrome-shadow);
//
// 		/* TODO: this is a nasty hard code */
// 		width: calc(1080px + 32px);
// 		height: calc(720px + 48px);
// 	}
//
// 	& .instructions {
// 		position: absolute;
// 		z-index: 10;
//
// 		left: 16px;
// 		bottom: -24px;
// 		width: 100%;
//
// 		text-align: center;
// 		font-size: 14px;
// 		color: rgba(255, 255, 255, 0.5);
// 	}
//
// 	& .undoRedo {
// 		grid-column: 1;
// 		grid-row: 3;
// 		align-self: flex-end;
// 		justify-self: center;
// 		padding-bottom: 16px;
// 	}
// `;
//
// // HACK: this is to jam the play button into the modal so
// // mouse users can get back to editing.
// // TODO: fix this
// const PlayButtonContainerForPlayer = styled.div`
// 	--chrome-border: 8px solid white;
// 	--chrome-edge-radius: 16px;
//
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	z-index: 10;
//
// 	height: 52px;
// 	width: 52px;
//
// 	border-right: var(--chrome-border);
// 	border-bottom: var(--chrome-border);
// 	border-bottom-right-radius: var(--chrome-edge-radius);
// 	transition: all 0.2s ease-out;
// `;
//

function getQueryVariable(variable: string): string | undefined {
	const query = window.location.search.substring(1);
	const vars = query.split('&');

	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]).toLowerCase() === variable.toLowerCase()) {
			return decodeURIComponent(pair[1]);
		}
	}

	return undefined;
}

function Editor({ noScript, resizeMode }: EditorProps) {
	const [showTour, setShowTour] = useState(false);
	const [isPlaying, setPlaying] = useState(false);
	const [playerAtStart, setPlayerAtStart] = useState(false);
	const [showKeyboardHelpModal, setShowKeyboardHelpModal] = useState(false);
	const dispatch = useDispatch();

	const firstRender = useFirstRender();

	useEffect(() => {
		const levelId = getQueryVariable('levelId');

		if (levelId) {
			dispatch(loadLevel(levelId));
			window.history.replaceState({}, 'make', '/make');
		} else {
			dispatch(loadFromLocalStorage());
		}

		if (process.env.NODE_ENV !== 'production') {
			const debugPlay = getQueryVariable('debugPlay');
			if (debugPlay) {
				window.history.replaceState({}, 'make', '/make');
				setPlayerAtStart(true);
				setPlaying(true);
				setTimeout(() => {
					document.querySelector('canvas')?.focus();
				}, 1000);
			}
		}
	}, []);

	useEffect(() => {
		function dispatchSaveLevelToLocalStorage() {
			dispatch(saveToLocalStorage());
		}

		window.addEventListener('beforeunload', dispatchSaveLevelToLocalStorage);

		return () => {
			window.removeEventListener(
				'beforeunload',
				dispatchSaveLevelToLocalStorage
			);

			// still want to save it, as user is probably navigating within the app
			dispatchSaveLevelToLocalStorage();
		};
	}, []);

	useHotkeys(
		'/,shift+/',
		() => {
			if (!isPlaying) {
				setShowKeyboardHelpModal((s) => !s);
			}
		},
		[isPlaying]
	);

	useHotkeys(
		'p',
		() => {
			if (!showKeyboardHelpModal) {
				setPlayerAtStart(false);
				setPlaying((p) => !p);
			}
		},
		[showKeyboardHelpModal]
	);

	useHotkeys(
		'shift+p',
		() => {
			if (!showKeyboardHelpModal) {
				setPlayerAtStart(true);
				setPlaying((p) => !p);
			}
		},
		[showKeyboardHelpModal]
	);

	useHotkeys(
		'q',
		() => {
			if (isPlaying) {
				setPlaying((p) => !p);
			} else {
				fetch('/api/pck').then(() => {
					window.location.href = '/make?debugPlay=true';
				});
			}
		},
		[isPlaying]
	);

	useEffect(() => {
		let originalOverflow = '';

		if (typeof document !== 'undefined' && document.documentElement) {
			originalOverflow = document.documentElement.style.overflow;
			document.documentElement.style.overflow = 'hidden';
		}

		return () => {
			if (typeof document !== 'undefined' && document.documentElement) {
				document.documentElement.style.overflow = originalOverflow;
			}
		};
	}, []);

	const playingClassName = clsx({ isPlaying });

	return (
		<>
			{/*<KeyboardHelpModal*/}
			{/*	isOpen={showKeyboardHelpModal}*/}
			{/*	onRequestClose={() => setShowKeyboardHelpModal(false)}*/}
			{/*/>*/}
			<div className="hidden sm:block select-none w-full h-full">
				{noScript && (
					<Warning>
						<div>
							<h1>Please enable JavaScript</h1>
							<p>The level creator needs JavaScript to function</p>
						</div>
					</Warning>
				)}
				{!firstRender && (
					<div className="fixed top-0 left-0 w-full h-full">
						<LevelPlayer
							className="border border-black"
							isPlaying={isPlaying}
							checkeredBackground
						>
							<div>
								<PlayButton
									isPlaying={isPlaying}
									onClick={() => setPlaying((p) => !p)}
								/>
							</div>
						</LevelPlayer>
						<CanvasOffsetContainer>
							<Canvas />
							{resizeMode && <LevelResizer />}
						</CanvasOffsetContainer>
					</div>
				)}
				<div
					className={clsx(
						styles.chrome,
						'fixed z-10 top-0 left-0 w-full h-full grid pointer-events-none'
					)}
				>
					<div className={styles.playButtonContainer}>
						<IconButtonGroup>
							<PlayButton
								isPlaying={isPlaying}
								onClick={() => setPlaying(!isPlaying)}
							/>
							<SaveButton />
						</IconButtonGroup>
					</div>
					<div
						className={clsx(styles.pullOut, styles.pullUp, 'toolbox', {
							[styles.pulled]: isPlaying,
						})}
					>
						<Toolbox className="ml-8" />
					</div>
					<div
						className={clsx(
							styles.pullOut,
							styles.pullLeft,
							styles.paletteContainer,
							{ [styles.pulled]: isPlaying || resizeMode }
						)}
					>
						<Palette />
					</div>
					<div
						className={clsx(
							styles.pullOut,
							styles.pullDown,
							styles.bottomTray,
							{ [styles.pulled]: isPlaying }
						)}
					>
						<MetadataMenu />
						<div className="flex flex-row">
							<EarlyPreviewStarburst
								className="fixed z-10 bottom-2 -left-4 pointer-events-auto"
								mode="editor"
							/>
							<PageMenu anchor="bottom-right" className="pointer-events-auto" />
						</div>
					</div>
				</div>
			</div>
			{/*<LoadLevelError />*/}
		</>
	);
}

export { Editor };
export type { EditorProps };
