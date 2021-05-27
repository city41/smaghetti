import React, { useEffect, useState } from 'react';
import {
	LevelChooserModal,
	PublicLevelChooserModalProps,
} from './LevelChooserModal';
import { loadExampleLevel, loadBlankLevel } from '../../editorSlice';
import { dispatch } from '../../../../store';

function ConnectedLevelChooserModal(props: PublicLevelChooserModalProps) {
	const [isOpen, setIsOpen] = useState(props.isOpen);

	useEffect(() => {
		if (props.isOpen) {
			setIsOpen(true);
		}
	}, [props.isOpen]);

	function handleExampleLevelChosen() {
		dispatch(loadExampleLevel());
		setIsOpen(false);
	}

	function handleBlankLevelChosen() {
		dispatch(loadBlankLevel());
		setIsOpen(false);
	}

	return (
		<LevelChooserModal
			{...props}
			isOpen={isOpen}
			onExampleLevelChosen={handleExampleLevelChosen}
			onBlankLevelChosen={handleBlankLevelChosen}
			onLocalStorageLevelChosen={() => setIsOpen(false)}
		/>
	);
}

export { ConnectedLevelChooserModal };
