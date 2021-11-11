import { GET_CARD } from "src/action/Card.action"
import { SET_COMMANDE } from "src/action/Commande.action"

const initialState = []

export default function cardReducer(state = initialState, action){
    switch(action.type){
        case GET_CARD:
            return action.payload
        case SET_COMMANDE:
            return action.payload
        default:
            return state
    }
}