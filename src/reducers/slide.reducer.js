import { ADD_SLIDE, GET_SLIDE, REMOVE_SLIDE, UPDATE_SLIDE } from "src/action/slider.action"


const initialState = []

export default function slideReducer(state = initialState, action){
    switch(action.type){
        case ADD_SLIDE:
            return action.payload
        case GET_SLIDE:
            return action.payload
        case REMOVE_SLIDE:
            return action.payload
        case UPDATE_SLIDE:
            return action.payload
        default:
            return state
    }
}
