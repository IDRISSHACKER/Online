import { GET_IN_CARD, REMOVE_COMMANDE_IN_CARD, UPDATE_QTT } from "src/action/inCard.action"

const initialState = []

export default function inCardReducer(state = initialState, action){
    switch(action.type){
        case GET_IN_CARD:
            return action.payload
        case REMOVE_COMMANDE_IN_CARD:
            return action.payload
        case UPDATE_QTT:
            return action.payload
        default:
            return state
    }
}