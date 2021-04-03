import React, { FunctionComponent } from 'react';

import { Modal } from '../../../Modal';
import { KeyboardKey } from '../../../KeyboardKey';
import { isMac } from '../../../../util/isMac';

type KeyboardHelpModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
};

// const List = styled.dl`
// 	margin: 0;
//
// 	display: grid;
// 	grid-template-columns: 1fr 1fr;
// 	row-gap: 16px;
//
// 	& dt {
// 		grid-column: 1;
// 		justify-self: center;
// 	}
//
// 	& dd {
// 		grid-column: 2;
// 	}
// `;
//
// const Spacer = styled.div`
// 	grid-column: 1 / -1;
// 	height: 1px;
// 	border-bottom: 1px solid white;
// 	margin: 8px;
// `;

function Spacer() {
	return <div className="col-span-2 border-b border-gray-500 m-2 w-full" />;
}

const KeyboardHelpModal: FunctionComponent<KeyboardHelpModalProps> = ({
	isOpen,
	onRequestClose,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			title="Keyboard Shortcuts (press ? to close)"
		>
			<dl className="grid grid-cols-2 items-center justify-items-center space-y-3">
				<dt>
					<span className="px-2">hold</span>
					<KeyboardKey>spacebar</KeyboardKey>
				</dt>
				<dd>Pan</dd>
				<dt>
					<KeyboardKey>p</KeyboardKey>
				</dt>
				<dd>Toggle play mode</dd>
				<Spacer />
				<dt>
					<KeyboardKey>s</KeyboardKey>
				</dt>
				<dd>Select mode</dd>
				<dt>
					<KeyboardKey>d</KeyboardKey>
				</dt>
				<dd>Draw mode</dd>
				<dt>
					<KeyboardKey>f</KeyboardKey>
				</dt>
				<dd>Fill mode</dd>
				<dt>
					<KeyboardKey>e</KeyboardKey>
				</dt>
				<dd>Erase mode</dd>
				<dt>
					<KeyboardKey>h</KeyboardKey>
				</dt>
				<dd>Pan mode</dd>
				<Spacer />
				<dt>
					<KeyboardKey>-</KeyboardKey>
				</dt>
				<dd>Zoom out</dd>
				<dt>
					<KeyboardKey>+</KeyboardKey>
				</dt>
				<dd>Zoom in</dd>
				<Spacer />
				<dt>
					<KeyboardKey>g</KeyboardKey>
				</dt>
				<dd>Toggle grid</dd>
				<Spacer />
				<dt>
					<KeyboardKey>1</KeyboardKey>
					<span className="px-2">through</span>
					<KeyboardKey>9</KeyboardKey>
				</dt>
				<dd>Choose palette item</dd>
				<Spacer />
				<dt>
					<KeyboardKey>{isMac ? 'cmnd' : 'ctrl'}</KeyboardKey>
					<span className="px-2">+</span>
					<KeyboardKey>z</KeyboardKey>
				</dt>
				<dd>Undo</dd>
				<dt>
					<KeyboardKey>{isMac ? 'cmnd' : 'ctrl'}</KeyboardKey>
					<span className="px-2">+</span>
					<KeyboardKey>shift</KeyboardKey>
					<span className="px-2">+</span>
					<KeyboardKey>z</KeyboardKey>
				</dt>
				<dd>Redo</dd>
			</dl>
		</Modal>
	);
};

export { KeyboardHelpModal };
