import React from 'react';
import { Provider } from 'react-redux';

import { LevelsPage } from '../components/levels/LevelsPage';
import { store } from '../store';

function NextLevelsPage() {
	return (
		<Provider store={store}>
			<LevelsPage />
		</Provider>
	);
}

export default NextLevelsPage;
