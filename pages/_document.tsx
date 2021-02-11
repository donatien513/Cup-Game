import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class CupGameDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kalam" />
        </Head>
        <body style={{ padding: 0, margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CupGameDocument
