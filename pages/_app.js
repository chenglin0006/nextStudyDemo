import { Provider } from 'react-redux'
import { useStore } from '../store'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps&&pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
