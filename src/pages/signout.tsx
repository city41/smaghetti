import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function NextSignoutPage() {
	const router = useRouter();

	useEffect(() => {
		function doSignOut() {
			localStorage.removeItem('supabase.auth.token');
			router.replace('/editor');
		}

		doSignOut();
	}, [router]);

	return <div>signing you out, one moment...</div>;
}

export default NextSignoutPage;
