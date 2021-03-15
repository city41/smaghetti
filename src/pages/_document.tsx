import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
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
