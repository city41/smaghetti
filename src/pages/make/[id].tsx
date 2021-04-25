import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import { MakePage } from '../../components/make/MakePage';
import { store } from '../../store';

function NextMakeIdPage() {
	const router = useRouter();

	let { id } = router.query;

	// hack to let this get posted on romhacking, so stupid
	if (typeof id === 'string' && id.endsWith('.html')) {
		id = undefined;
		router.replace('/make');
		return null;
	}

	return (
		<Provider store={store}>
			<MakePage id={id as string | undefined} />
		</Provider>
	);
}

export default NextMakeIdPage;
