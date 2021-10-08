import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';

import { loadLevel, loadBlankLevel, saveToLocalStorage } from '../editorSlice';

import { Palette } from './Palette';
import { Layers } from './Layers';
import { Canvas } from './Canvas';
import { CanvasOffsetContainer } from './CanvasOffsetContainer';
import { ManageLevel } from './ManageLevel';
import { LevelPlayer } from './LevelPlayer';
import { Toolbox } from './Toolbox';
import { Footer } from './Footer';
import { KeyboardHelpModal } from './KeyboardHelpModal';
import { Warning } from '../../Warning';
import { MetadataMenu } from './MetadataMenu';
import { PageMenu } from '../../PageMenu';
import { LevelChooserModal } from './LevelChooserModal';
import { useFirstRender } from '../../../hooks/useFirstRender';

import styles from './Editor.module.css';
import { LoadingBar } from '../../LoadingBar';
import { EarlyStarburst } from '../../EarlyStarburst';
import { ProblemList } from './ProblemList';

type EditorProps = {
	publishedLevelToLoad?: string;
	areFilesReady?: boolean;
	noScript?: boolean;
	mode: 'editing' | 'managing-rooms';
	loadLevelState:
		| 'dormant'
		| 'loading'
		| 'success'
		| 'missing'
		| 'error'
		| 'legacy';
	levelName?: string;
	creatorName?: string;
};

function toFreshEditor() {
	window.location.replace('/editor');
}

function Editor({
	noScript,
	mode,
	loadLevelState,
	areFilesReady,
	publishedLevelToLoad,
	levelName,
	creatorName,
}: EditorProps) {
	const router = useRouter();
	const [isChoosingLevel, setIsChoosingLevel] = useState(false);
	const [isPlaying, setPlaying] = useState(false);
	const [showKeyboardHelpModal, setShowKeyboardHelpModal] = useState(false);
	const [showProblems, setShowProblems] = useState(false);

	const dispatch = useDispatch();

	const firstRender = useFirstRender();

	useEffect(() => {
		setIsChoosingLevel(!!areFilesReady && !publishedLevelToLoad);
	}, [areFilesReady, publishedLevelToLoad]);

	useEffect(() => {
		if (!publishedLevelToLoad) {
			dispatch(loadBlankLevel());
		} else {
			dispatch(loadLevel(publishedLevelToLoad));
		}
	}, [publishedLevelToLoad]);

	useEffect(() => {
		function dispatchSaveLevelToLocalStorage() {
			if (!publishedLevelToLoad) {
				dispatch(saveToLocalStorage());
			}
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
	}, [publishedLevelToLoad]);

	useHotkeys('?', () => setShowKeyboardHelpModal(true), []);

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
				setPlaying((p) => !p);
			}
		},
		[showKeyboardHelpModal]
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

	function handleLevelsClick() {
		if (router.pathname !== '/editor' && router.pathname !== '/editor/') {
			router.push('/editor');
		} else {
			setIsChoosingLevel(true);
		}
	}

	return (
		<>
			<LevelChooserModal
				isOpen={isChoosingLevel}
				onRequestClose={() => setIsChoosingLevel(false)}
			/>
			<KeyboardHelpModal
				isOpen={showKeyboardHelpModal}
				onRequestClose={() => setShowKeyboardHelpModal(false)}
			/>
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
						/>
						<CanvasOffsetContainer>
							{mode !== 'managing-rooms' && <Canvas />}
							{mode === 'managing-rooms' && <ManageLevel />}
						</CanvasOffsetContainer>
					</div>
				)}
				<div
					className={clsx(
						styles.chrome,
						'fixed z-10 top-0 left-0 w-full h-full grid pointer-events-none'
					)}
				>
					<div className="flex flex-col pointer-events-auto shadow-lg col-span-2">
						<div className="flex flex-row">
							<Toolbox
								className="flex-1"
								disabled={isPlaying || mode === 'managing-rooms'}
								disableSaving={!!publishedLevelToLoad}
								isPlaying={isPlaying}
								onPlayClick={() => setPlaying((p) => !p)}
							/>
						</div>
						<div
							className="grid"
							style={{ gridTemplateColumns: '1fr max-content max-content' }}
						>
							<Palette disabled={isPlaying || mode === 'managing-rooms'} />
							<Layers disabled={isPlaying || mode === 'managing-rooms'} />
							<div className="grid grid-rows-3 items-stretch">
								<MetadataMenu className="row-span-2" disabled={isPlaying} />
								<PageMenu onLevelsClicked={handleLevelsClick} />
							</div>
						</div>
						{publishedLevelToLoad &&
							typeof levelName === 'string' &&
							typeof creatorName === 'string' && (
								<div className="bg-yellow-100 text-yellow-800 p-1 pl-4 text-sm">
									You&apos;re checking out{' '}
									<span className="underline font-bold">{levelName}</span> by{' '}
									<span className="underline font-bold">{creatorName}</span>{' '}
									<a className="text-blue-600" href="/editor">
										click here to make your own level
									</a>
								</div>
							)}
					</div>
					{showProblems && (
						<ProblemList
							className="pointer-events-auto w-60"
							style={{ gridColumn: '1', gridRow: '2', maxWidth: '33vw' }}
							onClose={() => setShowProblems(false)}
						/>
					)}
					{!isPlaying && (
						<Footer
							style={{ gridColumn: '1 / -1', gridRow: '3' }}
							className="w-full pointer-events-auto"
							onProblemClick={() => {
								setShowProblems((sw) => !sw);
							}}
						/>
					)}
				</div>
				<div
					className={clsx('fixed right-0 top-40 pointer-events-auto z-10', {
						hidden: isPlaying,
					})}
				>
					<EarlyStarburst />
				</div>
			</div>
			{loadLevelState === 'loading' && (
				<>
					<div className="fixed top-0 left-0 w-screen h-screen opacity-75 bg-gray-700 z-10" />
					<div className="fixed top-1/3 left-1/3 w-1/3 grid place-items-center z-10">
						<div>Loading level data ...</div>
						<LoadingBar className="w-48" percent={100} />
					</div>
				</>
			)}
			{['missing', 'error', 'legacy'].includes(loadLevelState) && (
				<>
					<div className="fixed top-0 left-0 w-screen h-screen opacity-75 bg-gray-700 z-10" />
					<div className="fixed top-1/3 left-1/3 w-1/3 grid place-items-center z-10 p-4 bg-red-200 text-black space-y-4">
						<h1 className="text-xl font-bold">Failed to load the level</h1>
						<p>
							It may have been deleted, unpublished, or is too old and no longer
							works.
						</p>
						<p className="font-bold">
							try refreshing the browser, might have just been a network error
						</p>
						<a
							className="block mt-4 text-blue-700 cursor-pointer"
							onClick={() => {
								toFreshEditor();
							}}
						>
							start a fresh level instead
						</a>
					</div>
				</>
			)}
		</>
	);
}

export { Editor };
export type { EditorProps };
