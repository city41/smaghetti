import React from 'react';
import { Provider } from 'react-redux';

import { SaveFilePage } from '../../components/save-file/SaveFilePage';
import { store } from '../../store';

function NextSaveFilePage() {
	return (
		<Provider store={store}>
			<SaveFilePage />
		</Provider>
	);
}

export default NextSaveFilePage;
