import { ADD_POST, GET_POSTS, REMOVE_POST, UPDATE_POST } from "src/action/posts.action";

const initialState = []

export default function postsReducer(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return action.payload
        case ADD_POST:
            return action.payload
        case UPDATE_POST:
            return action.payload
        case REMOVE_POST:
            return action.payload
        default:
            return state
    }
}