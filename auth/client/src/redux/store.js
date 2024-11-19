import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Burada 'userReducer' yerine, default export olduğu için isimlendirme serbesttir. 
// 'userReducer' yerine 'userSlice' ya da başka bir ad verebilirsiniz.
// Örneğin:
import userReducer from './user/userSlice'; // Doğru import bu şekilde olmalı
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer  = combineReducers({user  : userReducer});

const persistConfig = {
    key : 'root',
    version : 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:  persistedReducer  ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
}); 


export const persistor = persistStore(store);
