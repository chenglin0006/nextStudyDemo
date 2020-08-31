import Link from 'next/link'
import Counter from '../components/counter'

export default function IndexPage() {
  return (
    <div>
      Hello World.{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/fetchdemo">
        <a>fetchdemo</a>
      </Link>
      <Counter></Counter>
    </div>
  )
}
