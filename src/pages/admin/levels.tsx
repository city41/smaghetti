import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

import { LevelsPage } from '../../components/admin/levels/LevelsPage';

export default function NextLevelsPage() {
	return (
		<Provider store={store}>
			<LevelsPage />
		</Provider>
	);
}
