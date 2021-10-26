import { GET_CTG, SET_CTG } from "src/action/category.action"

const initialState = []

export default function ctgReducer(state = initialState, action){
    switch(action.type){
        case GET_CTG:
            return action.payload
        case SET_CTG:
            return [action.payload, ...state]
        default:
            return state
    }
}