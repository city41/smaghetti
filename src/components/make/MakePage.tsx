import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { Editor } from './Editor';

function MakePage() {
	return (
		<Provider store={store}>
			<Editor />
		</Provider>
	);
}

export { MakePage };
