import { combineReducers } from "redux";
import postsReducer from "./posts.reducer"
import ctgReducer from "./category.reducer"
import aviReducer from "./avis.reducer";
import userReducer from "./user.reducer";
import { usersReducer } from "./user.reducer";
import likeCtgReducer from "./likeCtg.reducer";
import slideReducer from "./slide.reducer";
import mostAvisPostsReducer from "./mostAvisPosts.reducer";
import commandeReducer from "./commande.reducer";
import statSaleReducer from "./stateSale.reducer";
import cardReducer from "./card.reducer";

export default combineReducers({
    postsReducer,
    ctgReducer,
    aviReducer,
    userReducer,
    usersReducer,
    likeCtgReducer,
    slideReducer,
    mostAvisPostsReducer,
    commandeReducer,
    statSaleReducer,
    cardReducer
})