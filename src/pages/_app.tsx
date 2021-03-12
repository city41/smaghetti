import React from 'react';
import '../styles/global.css';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	return <Component {...pageProps} />;
}

export default MyApp;
