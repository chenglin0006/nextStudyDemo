import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useSelector, useDispatch } from 'react-redux'

  class Demo extends React.Component {
      render() {
        const useCounter = () => {
            const count = useSelector((state) => state.count)
            const dispatch = useDispatch()
            const increment = () =>
                dispatch({
                type: 'INCREMENT',
                })
            const decrement = () =>
                dispatch({
                type: 'DECREMENT',
                })
            const reset = () =>
                dispatch({
                type: 'RESET',
                })
            return { count, increment, decrement, reset }
        }
        const { count, increment, decrement, reset } = useCounter()
        return (
          <div>
            <h1>
              Count: <span>{count}</span>
            </h1>
          </div>
        )
      }
  }
  export default Demo