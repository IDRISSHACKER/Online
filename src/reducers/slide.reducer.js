import { ADD_SLIDE, GET_SLIDE } from "src/action/slider.action"


const initialState = []

export default function slideReducer(state = initialState, action){
    switch(action.type){
        case ADD_SLIDE:
            return [action.payload, ...state]
        case GET_SLIDE:
            return action.payload
        default:
            return state
    }
}
