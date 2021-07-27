import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logError } from '../reporting/logError';

function NextSignoutPage() {
	const router = useRouter();

	useEffect(() => {
		function doSignOut() {
			localStorage.removeItem('supabase.auth.token');
			router.replace('/editor');
		}

		doSignOut();
		logError({
			context: 'non-admin test in prod',
			message: 'foo',
		});
	}, [router]);

	return <div>signing you out, one moment...</div>;
}

export default NextSignoutPage;
