import { combineReducers } from "redux";
import postsReducer from "./posts.reducer"
import ctgReducer from "./category.reducer"

export default combineReducers({
    postsReducer,
    ctgReducer
})