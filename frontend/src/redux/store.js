import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './user/userSlice'


//holds all the reducers
const rootReducer = combineReducers({
     user: userSlice
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1

}

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer:
    //{user: userSlice}
    persistedReducer,
middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
})
})


export const persistor= persistStore(store)