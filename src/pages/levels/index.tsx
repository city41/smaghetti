import { useEffect } from 'react';
import { useRouter } from 'next/router';

function NextLevels2IndexPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/levels/all/newest');
	}, []);

	return null;
}

export default NextLevels2IndexPage;
