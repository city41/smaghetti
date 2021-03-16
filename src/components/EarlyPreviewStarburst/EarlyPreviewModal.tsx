import React from 'react';
import { Modal } from '../Modal';
import { InternalLink } from '../InternalLink';

type EarlyPreviewModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
	mode: 'editor' | 'player';
};

// function EditorHeadsUp() {
// 	return (
// 		<>
// 			<li>There are bugs!</li>
// 			<li>
// 				There aren&apos;t too many items, enemies, etc yet. Check the{' '}
// 				<InternalLink to="/roadmap">roadmap</InternalLink> to see where things
// 				are at
// 			</li>
// 			<li>
// 				You can share your level with friends by clicking the share button in
// 				the far upper right
// 			</li>
// 			<li>
// 				But ... since we are actively developing the game, we can&apos;t promise
// 				your level will work forever
// 			</li>
// 		</>
// 	);
// }
//
// function PlayerHeadsUp() {
// 	return (
// 		<>
// 			<li>There are bugs!</li>
// 			<li>
// 				You can edit this level by clicking the link down in the lower right
// 			</li>
// 			<li>
// 				You can use your keyboard or a gamepad. The ability to remap the
// 				controls is coming.
// 			</li>
// 		</>
// 	);
// }

function EarlyPreviewModal({
	isOpen,
	onRequestClose,
	mode,
}: EarlyPreviewModalProps) {
	// const HeadsUp = mode === 'editor' ? EditorHeadsUp : PlayerHeadsUp;
	return (
		<Modal
			isOpen={isOpen}
			title="Thanks for trying out Smaghetti!"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl">
				<p>
					Smaghetti is just getting started and has a long ways to go. But
					ultimately it will be a very good level editor for Super Mario Advance
					4, including the ability upload levels and share them with other
					people. Stay tuned!
				</p>
			</div>
		</Modal>
	);
}

export { EarlyPreviewModal };
