import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png?v=2020"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png?v=2020"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png?v=2020"
					/>
					<link rel="manifest" href="/site.webmanifest?v=2020" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg?v=2020"
						color="#5bbad5"
					/>
					<link rel="shortcut icon" href="/favicon.ico?v=2020" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
					<script
						src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
						integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ=="
						crossOrigin="anonymous"
					></script>
					<script type="text/javascript" src="/gbajs/util.js"></script>
					<script type="text/javascript" src="/gbajs/core.js"></script>
					<script type="text/javascript" src="/gbajs/arm.js"></script>
					<script type="text/javascript" src="/gbajs/thumb.js"></script>
					<script type="text/javascript" src="/gbajs/mmu.js"></script>
					<script type="text/javascript" src="/gbajs/io.js"></script>
					<script type="text/javascript" src="/gbajs/audio.js"></script>
					<script type="text/javascript" src="/gbajs/video.js"></script>
					<script
						type="text/javascript"
						src="/gbajs/video/software.js"
					></script>
					<script type="text/javascript" src="/gbajs/irq.js"></script>
					<script type="text/javascript" src="/gbajs/keypad.js"></script>
					<script type="text/javascript" src="/gbajs/sio.js"></script>
					<script type="text/javascript" src="/gbajs/savedata.js"></script>
					<script type="text/javascript" src="/gbajs/gpio.js"></script>
					<script type="text/javascript" src="/gbajs/gba.js"></script>
					<script type="text/javascript" src="/gbajs/xhr.js"></script>
					<script type="text/javascript" src="/gbajs/instance.js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
