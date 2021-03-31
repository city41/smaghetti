import React from 'react';
import { Provider } from 'react-redux';

import { HexEditorPage } from '../../components/hex-editor/HexEditorPage';
import { store } from '../../store';

function NextHexEditorPage() {
	return (
		<Provider store={store}>
			<HexEditorPage />
		</Provider>
	);
}

export default NextHexEditorPage;
