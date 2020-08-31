import Link from 'next/link'
import { useDispatch } from 'react-redux'
import useInterval from '../lib/useInterval'
import Counter from '../components/counter'
import Clock from '../components/clock'
import { initializeStore } from '../store'
import fetch from 'isomorphic-unfetch';


async function funAsy() {
  const dispatch = useDispatch()
  const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
  const data = await res.json();
  console.log(data.length, '-----');
  dispatch({
    type: 'DEMO',
    str: data.length
  })
}

export default function IndexPage() {
  const dispatch = useDispatch()

  // Tick the time every second
  useInterval(() => {
    dispatch({
      type: 'TICK',
      light: true,
      lastUpdate: new Date(),
    })
  }, 1000)

  // funAsy();

  return (
    <div>
      Hello World.{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
      <div>
        <Clock></Clock>
      </div>
      <Counter></Counter>
    </div>
  )
}

export async function getServerSideProps() {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  dispatch({
    type: 'TICK',
    light: false,
    lastUpdate: Date.now(),
  })

  const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
  const data = await res.json();
  console.log(data.length, '-----');
  dispatch({
    type: 'DEMO',
    str: data.length+2
  })

  return { props: { initialReduxState: reduxStore.getState() } }
}
