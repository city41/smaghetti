import React from 'react';
import { Provider } from 'react-redux';
import { StatsPage } from '../components/stats/StatsPage';
import { store } from '../store';

function NextStatsPage() {
	return (
		<Provider store={store}>
			<StatsPage />
		</Provider>
	);
}

export default NextStatsPage;
