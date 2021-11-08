import { GET_CTG, REMOVE_CTG, SET_CTG, UPDATE_CTG } from "src/action/category.action"

const initialState = []

export default function ctgReducer(state = initialState, action){
    switch(action.type){
        case GET_CTG:
            return action.payload
        case SET_CTG:
            return action.payload
        case REMOVE_CTG:
            return action.payload
        case UPDATE_CTG:
            return action.payload
        default:
            return state
    }
}