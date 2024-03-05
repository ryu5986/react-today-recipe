import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

/**
 * store 설정
 */

export const store = configureStore({
    reducer: rootReducer
});