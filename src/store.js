import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/userService";
import accountSlice from "./features/accountSlice";
import budgetSlice from "./features/budgetSlice";
import categorySlice from "./features/categorySlice";
import goalSlice from "./features/goalSlice";
import logoutReducer from './features/logoutSlice';
import transactionSlice from "./features/transactionSlice";
import { userSlice } from "./features/userSlice";
import debtSlice from "./features/debtSlice";
const persistConfig = {
    key: "paymint",
    storage,
    blacklist: ["logout"],
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    account: accountSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
    budget: budgetSlice.reducer,
    goal:goalSlice.reducer,
    debt:debtSlice.reducer,
    logout: logoutReducer.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig,
    (state, action) => {
        if (action.type === "logout/logout") {
            state = rootReducer(undefined, action);
        }
        return rootReducer(state, action);
    });

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    }
)

const persistor = persistStore(store);

export { persistor, store };
