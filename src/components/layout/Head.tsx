import NextHead from 'next/head';
import React from 'react';
import fallbackImg from './fallback_openGraph.png';

type HeadProps = {
	title: string;
	metaDescription: string;
	metaImg?: string;
};

function getPageTitle(incomingTitle: string): string {
	if (incomingTitle.toLowerCase().includes('smaghetti')) {
		return incomingTitle;
	} else {
		return `${incomingTitle} | Smaghetti`;
	}
}

function getAbsoluteUrl(url: string): string {
	if (url.startsWith('http')) {
		return url;
	}

	if (url.startsWith('/')) {
		url = url.substring(1);
	}

	const domain = process.env.NEXT_PUBLIC_DOMAIN;

	return `https://${domain}/${url}`;
}

function Head({ title, metaDescription, metaImg }: HeadProps) {
	metaDescription =
		metaDescription || 'A level editor for Super Mario Advance 4';
	const finalMetaImg = `${getAbsoluteUrl(
		metaImg ?? fallbackImg.src
	)}?t=${title.substring(0, 10)}`;

	return (
		<NextHead>
			<title>{getPageTitle(title)}</title>

			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={metaDescription} />

			{/* Twitter */}
			<meta name="twitter:creator" content="smaghetti.com" />
			<meta name="twitter:site" content="smaghetti.com" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:image" content={finalMetaImg} />

			{/* open graph, Twitter also uses some of these */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={finalMetaImg} />
		</NextHead>
	);
}

export { Head };
