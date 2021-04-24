import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';

import { loadFromLocalStorage, saveToLocalStorage } from '../editorSlice';

import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { CanvasOffsetContainer } from './CanvasOffsetContainer';
import { LevelResizer } from './LevelResizer';
import { ManageRooms } from './ManageRooms';
import { LevelPlayer } from './LevelPlayer';
import { Toolbox } from './Toolbox';
import { KeyboardHelpModal } from './KeyboardHelpModal';
import { Warning } from '../../Warning';
import { MetadataMenu } from './MetadataMenu';
import { PageMenu } from '../../PageMenu';
import { useFirstRender } from '../../../hooks/useFirstRender';

import styles from './Editor.module.css';
import { LoadingBar } from '../../LoadingBar';

type EditorProps = {
	noScript?: boolean;
	mode: 'editing' | 'resizing' | 'managing-rooms';
	loadLevelState: 'dormant' | 'loading' | 'success' | 'missing' | 'error';
};

function Editor({ noScript, mode, loadLevelState }: EditorProps) {
	const router = useRouter();
	const [isPlaying, setPlaying] = useState(false);
	const [showKeyboardHelpModal, setShowKeyboardHelpModal] = useState(false);
	const dispatch = useDispatch();

	const firstRender = useFirstRender();

	useEffect(() => {
		dispatch(loadFromLocalStorage());
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

	return (
		<>
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
							{mode === 'resizing' && <LevelResizer />}
							{mode === 'managing-rooms' && <ManageRooms />}
						</CanvasOffsetContainer>
					</div>
				)}
				<div
					className={clsx(
						styles.chrome,
						'fixed z-10 top-0 left-0 w-full h-full grid pointer-events-none'
					)}
				>
					<div className="flex flex-col pointer-events-auto shadow-lg">
						<div className="flex flex-row">
							<Toolbox
								className="flex-1"
								isPlaying={isPlaying}
								onPlayClick={() => setPlaying((p) => !p)}
							/>
						</div>
						<div className="grid grid-cols-12">
							<Palette className="col-span-9" />
							<MetadataMenu className="col-span-3" />
						</div>
					</div>
					<PageMenu className="fixed right-0 bottom-0 pointer-events-auto" />
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
			{loadLevelState === 'missing' && (
				<>
					<div className="fixed top-0 left-0 w-screen h-screen opacity-75 bg-gray-700 z-10" />
					<div className="fixed top-1/3 left-1/3 w-1/3 grid place-items-center z-10 p-4 bg-red-200 text-black">
						<h1 className="text-xl font-bold">Level not found</h1>
						<p>
							It may have been deleted or is owned by someone else. Copying
							other people&apos;s levels is not supported yet.
						</p>
						<a
							className="block mt-4 text-blue-700 cursor-pointer"
							onClick={() => {
								router.replace('/make');
							}}
						>
							start a fresh level instead
						</a>
					</div>
				</>
			)}
			{loadLevelState === 'error' && (
				<>
					<div className="fixed top-0 left-0 w-screen h-screen opacity-75 bg-gray-700 z-10" />
					<div className="fixed top-1/3 left-1/3 w-1/3 grid place-items-center z-10 p-4 bg-red-200 text-black">
						<h1 className="text-xl font-bold">Error loading level</h1>
						<p>
							Something went wrong. Try refreshing the page or{' '}
							<a
								className="text-blue-700 cursor-pointer"
								onClick={() => {
									router.replace('/make');
								}}
							>
								start a fresh level instead
							</a>
						</p>
					</div>
				</>
			)}
		</>
	);
}

export { Editor };
export type { EditorProps };
