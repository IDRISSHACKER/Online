import { GET_POSTS_BY_CTG } from "src/action/likeCtg.action"

const initialState = []

export default function likeCtgReducer(state = initialState, action){
    switch(action.type){
        case GET_POSTS_BY_CTG:
            return action.payload
        default:
            return state
    }
}