import React from 'react';
import { Provider } from 'react-redux';

import { HexTreePage } from '../../components/hex-tree/HexTreePage';
import { store } from '../../store';

function NextHexTreePage() {
	return (
		<Provider store={store}>
			<HexTreePage />
		</Provider>
	);
}

export default NextHexTreePage;
