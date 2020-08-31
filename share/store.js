import { init } from '@rematch/core'
import * as models from './models'

export const initializeStore = (initialState = {}) => init({
  models,
  redux: { initialState }
})