import React from 'react';
import { Warning } from '../../Warning';

function NoscriptWarning() {
	return (
		<noscript>
			<Warning>The Smaghetti editor requires JavaScript</Warning>
		</noscript>
	);
}

export { NoscriptWarning };
