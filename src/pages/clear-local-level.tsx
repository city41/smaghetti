import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LOCALSTORAGE_KEY } from '../components/editor/editorSlice';

function NextClearLocalLevel() {
	const router = useRouter();

	useEffect(() => {
		function doClearLocalLevel() {
			localStorage.removeItem(LOCALSTORAGE_KEY);
			router.replace('/editor');
		}

		doClearLocalLevel();
	}, [router]);

	return <div>Deleting your local level, one sec...</div>;
}

export default NextClearLocalLevel;
