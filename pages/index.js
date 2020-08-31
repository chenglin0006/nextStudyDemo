import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../share/components/header'
import Num from '../share/components/num'
import { checkServer } from '../share/utils'
import styles from "./styles.styl"

class Home extends Component {
    static async getInitialProps(ctx) {
        const store = ctx.reduxStore
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
        console.log(userAgent,'-----')
        if (checkServer()) {
          await store.dispatch.num.addNumAsync(2)
        }
        const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
        const data = await res.json();
        console.log(data.length,'====')
        return { userAgent }
    }

  render () {
    const { counter, increment, incrementBy, incrementAsync,addNumAsync } = this.props

    return (
      <div>
        <Header />
        <h1 className='title'>Welcome to Next.js Home page!</h1>

        <div className={styles.stark}>Hi stark</div>
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
          <button onClick={addNumAsync}>addNumAsync</button>
        </p>
        <br />
        <Num userAgent={this.props.userAgent}></Num>
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
