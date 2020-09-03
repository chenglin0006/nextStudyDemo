import App from 'next/app'
import React from 'react'
import Head from 'next/head'

import withRematch from '../share/withRematch'
import Layout from '../share/components/layout'
import { Provider } from 'react-redux'
import '../share/less/layout.less';

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore, router } = this.props;
    return (
      <Provider store={reduxStore}>
       <Head>
        <title>NEXT STUDY PAGE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout router={router}>
            <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default withRematch(MyApp)
