import { GET_AVIS, SET_AVI, UPDATE_AVI } from "src/action/avis.action"

const initialState = []

export default function aviReducer(state = initialState, action){
    switch(action.type){
        case SET_AVI:
            return state
        case GET_AVIS:
            return action.payload
        case UPDATE_AVI:
            return state
        default:
            return state
    }
}