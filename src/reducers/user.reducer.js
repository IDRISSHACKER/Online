import { GET_USER, GET_USERS, REMOVE_USER } from "src/action/user.action"


const initialState = []
const initialState2 = []

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload
        default:
            return state
    }
}

export function usersReducer(state = initialState2, action){
    switch(action.type){
        case GET_USERS:
            return action.payload
        case REMOVE_USER:
            return action.payload
        default:
            return state
    }
}