import { MOST_AVIS_POSTS } from "src/action/mostAvisPosts.action"

const initialState = []

export default function mostAvisPostsReducer(state = initialState, action){
    switch(action.type){
        case MOST_AVIS_POSTS:
            return action.payload
        default:
            return state
    }
}