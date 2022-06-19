import React from 'react';
import { Provider } from 'react-redux';

import { WiiURomLayoutPage } from '../../components/rom-layout/RomLayoutPage';
import { store } from '../../store';

function NextWiiURomLayoutPage() {
	return (
		<Provider store={store}>
			<WiiURomLayoutPage />
		</Provider>
	);
}

export default NextWiiURomLayoutPage;
