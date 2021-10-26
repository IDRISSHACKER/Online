import { combineReducers } from "redux";
import postsReducer from "./posts.reducer"
import ctgReducer from "./category.reducer"
import aviReducer from "./avis.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
    postsReducer,
    ctgReducer,
    aviReducer,
    userReducer
})