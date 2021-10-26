import { GET_AVIS, SET_AVI } from "src/action/avis.action"

const initialState = []

export default function aviReducer(state = initialState, action){
    switch(action.type){
        case SET_AVI:
            return state
        case GET_AVIS:
            return action.payload
        default:
            return state
    }
}