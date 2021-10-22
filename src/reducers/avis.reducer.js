import { SET_AVI } from "src/action/avis.action"

const initialState = {}

export default function aviReducer(state = initialState, action){
    switch(action.type){
        case SET_AVI:
            return [action.payload, ...state]
        default:
            return state
    }
}