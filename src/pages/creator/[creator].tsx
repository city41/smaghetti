import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { CreatorLevelsPage } from '../../components/levels/CreatorLevelsPage';
import { store } from '../../store';

function NextCreatorLevelsPage() {
	const router = useRouter();

	const { creator } = router.query;

	return (
		<Provider store={store}>
			<CreatorLevelsPage creator={creator as string} />
		</Provider>
	);
}

export default NextCreatorLevelsPage;
