import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import commentReducer from './commentSlice';
import storage from 'redux-persist/lib/storage';
//-------------------------------import persist redux-------------
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


//---------------------------persistConfig---------------------------
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
//----------------------------combineReducers-----------------------------
const rootReducer = combineReducers({user: userReducer, video: videoReducer, comment: commentReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);
//--------------------------------------------------------------------
export const store = configureStore({
  reducer: persistedReducer, 

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

})

export const persistor = persistStore(store);