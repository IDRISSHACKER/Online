import { combineReducers } from "redux";
import postsReducer from "./posts.reducer"
import ctgReducer from "./category.reducer"
import aviReducer from "./avis.reducer";
import userReducer from "./user.reducer";
import likeCtgReducer from "./likeCtg.reducer";
import slideReducer from "./slide.reducer";
import mostAvisPostsReducer from "./mostAvisPosts.reducer";

export default combineReducers({
    postsReducer,
    ctgReducer,
    aviReducer,
    userReducer,
    likeCtgReducer,
    slideReducer,
    mostAvisPostsReducer
})