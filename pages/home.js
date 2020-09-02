import React, { Component } from 'react'
import { connect } from 'react-redux'

import Num from '../share/components/num'
import { checkServer } from '../share/utils'
import {Button,Spin} from 'antd';
import '../share/less/home.less';

class Home extends Component {
    static async getInitialProps(ctx) {
        const store = ctx.reduxStore
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
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
    const { counter, increment, incrementBy, incrementAsync,addNumAsync,loadingTest } = this.props

    return (
      <Spin spinning={loadingTest}>
        <h1 className='title'>Welcome to Next.js Home page!</h1>

        <div className="stark">Hi stark</div>
        {/* <div className={'title styles.stark'}>Hi stark</div> */}

      <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
        <h1> Counter </h1>
        <h3>The count is {counter}</h3>
        <p>
          <button onClick={increment}>increment</button>
          <button onClick={() => increment(1)}>
            increment (using dispatch function)
          </button>
          <button onClick={incrementBy(5)}>increment by 5</button>
          <button onClick={incrementAsync}>incrementAsync</button>
          <Button type="primary" onClick={addNumAsync}>addNumAsync</Button>
        </p>
        <br />
        <Num userAgent={this.props.userAgent}></Num>
      </Spin>
    )
  }
}

const mapState = state => ({
  counter: state.counter,
  num: state.num.num,
  loadingTest: state.loading.effects.counter.incrementAsync,
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