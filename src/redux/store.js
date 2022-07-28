import { configureStore } from '@reduxjs/toolkit'

import pageReducer from './reducers/page'

const store = configureStore({
  reducer: {
    page: pageReducer,
  }
})

export default store;