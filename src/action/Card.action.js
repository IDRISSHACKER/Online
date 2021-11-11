import axios from "axios"
import settings from "src/_mocks_/settings"
export const GET_CARD       = "GET_CARD"
 
 const set = new settings().init()

export const getCard = (user_id)=>{
    const data = new FormData()
    data.append("user_id", user_id)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=getCard/`, data)
        .then(res=> dispatch({type: GET_CARD, payload: res.data}))
        .catch(err=>console.log(err))
    };
}

