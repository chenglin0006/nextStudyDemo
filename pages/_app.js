import App from 'next/app'
import React from 'react'

import withRematch from '../share/withRematch'
import Layout from '../share/components/layout'
import { Provider } from 'react-redux'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </Provider>
    )
  }
}

export default withRematch(MyApp)
