import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage"; // Custom storage setup
import userReducer from "./auth/userSlice"; // User reducer

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const reducers = combineReducers({
  user: userReducer,
});

// Persisted reducer setup
const persistedReducers = persistReducer(
  {
    key: "root",
    storage, // Custom storage (localStorage or noopStorage)
    whitelist: ["user"], // Persist only the user state
  },
  reducers
);

// Configure the store
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore serializable check for persistence actions
      },
    }).concat(sagaMiddleware), // Add saga middleware to the store
});

// Export persistor for redux-persist
export const persistor = persistStore(store);

// Export the store for usage in the app
export default store;
