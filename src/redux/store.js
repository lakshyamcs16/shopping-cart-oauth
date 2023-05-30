import { configureStore, combineReducers } from "@reduxjs/toolkit"
import cartReducer from "../features/cart/cartSlice"
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: []
})

export const persistor = persistStore(store)
