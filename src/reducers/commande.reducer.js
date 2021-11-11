import { GET_COMMANDES, SET_COMMANDE } from "src/action/Commande.action"

const initialState = []

export default function commandeReducer(state = initialState, action){
    switch(action.type){
        case GET_COMMANDES:
            return action.payload
        default:
            return state
    }
}