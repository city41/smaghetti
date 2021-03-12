import React from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />
}

export default MyApp
