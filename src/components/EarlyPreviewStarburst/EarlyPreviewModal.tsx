import React from 'react';
import { Modal } from '../Modal';
import { InternalLink } from '../InternalLink';

type EarlyPreviewModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
	mode: 'editor' | 'player';
};

function EditorHeadsUp() {
	return (
		<>
			<li>There are bugs!</li>
			<li>
				There aren&apos;t too many items, enemies, etc yet. Check the{' '}
				<InternalLink to="/roadmap">roadmap</InternalLink> to see where things
				are at
			</li>
			<li>
				You can share your level with friends by clicking the share button in
				the far upper right
			</li>
			<li>
				But ... since we are actively developing the game, we can&apos;t promise
				your level will work forever
			</li>
		</>
	);
}

function PlayerHeadsUp() {
	return (
		<>
			<li>There are bugs!</li>
			<li>
				You can edit this level by clicking the link down in the lower right
			</li>
			<li>
				You can use your keyboard or a gamepad. The ability to remap the
				controls is coming.
			</li>
		</>
	);
}

function EarlyPreviewModal({
	isOpen,
	onRequestClose,
	mode,
}: EarlyPreviewModalProps) {
	const HeadsUp = mode === 'editor' ? EditorHeadsUp : PlayerHeadsUp;
	return (
		<Modal
			isOpen={isOpen}
			title="Thanks for trying out Jump.Club!"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl">
				<p className="text-center">
					We are just getting started and the editor has a <i>looooong</i> ways
					to go.
				</p>
				<h2>Heads up...</h2>
				<ul className="p-x 4 my-4 space-y-2">
					<HeadsUp />
				</ul>
				<div className="text-center font-bold">
					Check out the <InternalLink to="/about">about page</InternalLink>, or
					the <InternalLink to="/faq">FAQ</InternalLink>, for more details
				</div>
			</div>
		</Modal>
	);
}

export { EarlyPreviewModal };
