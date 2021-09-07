import React from 'react';
import { WhatsNewPage } from '../components/whats-new/WhatsNewPage';

export const config = {
	unstable_runtimeJS: false,
};

function NextWhatsNewPage() {
	return <WhatsNewPage />;
}

export default NextWhatsNewPage;
