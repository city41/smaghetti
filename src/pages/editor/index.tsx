import React from 'react';
import { Provider } from 'react-redux';

import { MakePage } from '../../components/editor/MakePage';
import { store } from '../../store';

function NextMakePage() {
	return (
		<Provider store={store}>
			<MakePage />
		</Provider>
	);
}

export default NextMakePage;
