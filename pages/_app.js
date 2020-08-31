import App from 'next/app'
import React from 'react'

import withRematch from '../share/withRematch'
import { Provider } from 'react-redux'

class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {};
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps({ ctx });
        }
    
        return { pageProps };
    }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRematch(MyApp)
