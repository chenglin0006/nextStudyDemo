import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkServer } from '../share/utils'
import '../share/less/index.less';

class Home extends Component {
    static async getInitialProps(ctx) {
        const store = ctx.reduxStore
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
        console.log(userAgent,'-----')
        if (checkServer()) {
          await store.dispatch.num.addNumAsync()
        }
        return { userAgent }
    }

    componentDidMount(){
      console.log('did mount')
    }

    componentWillReceiveProps(){
      console.log('props change')
    }

  render () {
    return (
      <div>
        <h1 className='title'>Welcome to Next.js Home page!</h1>
      </div>
    )
  }
}

const mapState = state => ({
  counter: state.counter,
  num: state.num.num
})

const mapDispatch = ({ counter: { increment, incrementAsync }, num:{addNumAsync} }) => ({
  increment: () => increment(1),
  incrementBy: amount => () => increment(amount),
  incrementAsync: () => incrementAsync(1),
  addNumAsync: amount => addNumAsync(3)
})

export default connect(
  mapState,
  mapDispatch
)(Home)
