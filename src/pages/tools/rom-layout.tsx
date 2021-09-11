import React from 'react';
import { Provider } from 'react-redux';

import { RomLayoutPage } from '../../components/rom-layout/RomLayoutPage';
import { store } from '../../store';

function NextRomLayoutPage() {
	return (
		<Provider store={store}>
			<RomLayoutPage />
		</Provider>
	);
}

export default NextRomLayoutPage;
