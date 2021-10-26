import { ADD_POST, GET_POSTS } from "src/action/posts.action";

const initialState = []

export default function postsReducer(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return action.payload
        case ADD_POST:
            return [action.payload, ...state]
        default:
            return state
    }
}