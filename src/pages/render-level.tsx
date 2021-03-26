import React from 'react';
import { Provider } from 'react-redux';

import { RenderLevelPage } from '../components/render-level/RenderLevelPage';
import { store } from '../store';

function NextRenderLevelPage() {
	return (
		<Provider store={store}>
			<RenderLevelPage />
		</Provider>
	);
}

export default NextRenderLevelPage;
