import { configureStore } from '@reduxjs/toolkit'

import pageReducer from './reducers/page'
import gameReducer from './reducers/game'

const store = configureStore({
  reducer: {
    page: pageReducer,
    game: gameReducer,
  }
})

export default store;