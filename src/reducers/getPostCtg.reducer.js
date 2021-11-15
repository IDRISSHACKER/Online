import { GET_POST_CTG } from "src/action/postCtg.action"

const initialState = []

export default function getPostCtgReducer(state = initialState, action){
    switch(action.type){
        case GET_POST_CTG:
            return action.payload
        default:
            return state
    }
}