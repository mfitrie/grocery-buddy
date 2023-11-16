import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './message'
import groceryReducer from './grocery'

export const store = configureStore({
  reducer: {
    message: messageReducer,
    grocery: groceryReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch