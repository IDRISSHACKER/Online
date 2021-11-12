import { GET_CARD } from "src/action/Card.action"
import { SET_COMMANDE } from "src/action/Commande.action"
import { REMOVE_COMMANDE_IN_CARD, UPDATE_QTT } from "src/action/inCard.action"

const initialState = []

export default function cardReducer(state = initialState, action){
    switch(action.type){
        case GET_CARD:
            return action.payload
        case SET_COMMANDE:
            return action.payload
        case REMOVE_COMMANDE_IN_CARD:
            return action.payload
        case UPDATE_QTT:
            return action.payload
        default:
            return state
    }
}