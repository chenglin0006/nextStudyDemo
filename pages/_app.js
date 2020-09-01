import App from 'next/app'
import React from 'react'

import withRematch from '../share/withRematch'
import Layout from '../share/components/layout'
import { Provider } from 'react-redux'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore, router } = this.props;
    return (
      <Provider store={reduxStore}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
      </Provider>
    )
  }
}

export default withRematch(MyApp)
