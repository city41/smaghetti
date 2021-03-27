import React from 'react';
import { Provider } from 'react-redux';

import { TilesPage } from '../../components/tiles/TilesPage';
import { store } from '../../store';

function NextTilesPage() {
	return (
		<Provider store={store}>
			<TilesPage />
		</Provider>
	);
}

export default NextTilesPage;
