import React from 'react';
import { Provider } from 'react-redux';

import { Levels2Page } from '../components/levels/Levels2Page';
import { store } from '../store';

function NextLevels2Page() {
	return (
		<Provider store={store}>
			<Levels2Page />
		</Provider>
	);
}

export default NextLevels2Page;
