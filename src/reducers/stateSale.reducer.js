import {GET_STAT_SALE} from "src/action/stat.action"

const initialState = []

export default function statSaleReducer(state = initialState, action){
    switch(action.type){
        case GET_STAT_SALE:
            return action.payload
        default:
            return state
    }
}
