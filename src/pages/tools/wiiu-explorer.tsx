import React from 'react';
import { Provider } from 'react-redux';

import { WiiUExplorerPage } from '../../components/wiiu-explorer/WiiUExplorerPage';
import { store } from '../../store';

function NextWiiUExplorerPage() {
	return (
		<Provider store={store}>
			<WiiUExplorerPage />
		</Provider>
	);
}

export default NextWiiUExplorerPage;
