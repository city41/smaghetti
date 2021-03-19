import React from 'react';
import { Provider } from 'react-redux';

import { PalettesPage } from '../components/palettes/PalettesPage';
import { store } from '../store';

function NextPalettesPage() {
	return (
		<Provider store={store}>
			<PalettesPage />
		</Provider>
	);
}

export default NextPalettesPage;
