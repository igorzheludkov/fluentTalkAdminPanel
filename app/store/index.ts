import apiSlice from '@/store/api/apiSlice'
import { configureStore } from '@reduxjs/toolkit'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [apiSlice.reducerPath]
  // whitelist: ['apiSlice.authSlice', 'apiSlice.userDataApi']
}

const persistedReducer = persistCombineReducers(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

const persistor = persistStore(store)

export { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
