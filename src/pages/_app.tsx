import React from 'react';
import '../styles/global.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	return <Component {...pageProps} />;
}

export default MyApp;
