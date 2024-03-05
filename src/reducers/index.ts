import { combineReducers } from "redux";
import dialogReducer from "./dialogReducer";

/**
 * Main Reducer
 */

const rootReducer = combineReducers({
    dialogReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;