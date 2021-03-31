import React from 'react';
import { Provider } from 'react-redux';

import { SaveStatesPage } from '../../components/save-states/SaveStatesPage';
import { store } from '../../store';

function NextSaveStatesPage() {
	return (
		<Provider store={store}>
			<SaveStatesPage />
		</Provider>
	);
}

export default NextSaveStatesPage;
