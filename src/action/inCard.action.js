import axios from "axios"
import settings from "src/_mocks_/settings"

export const GET_IN_CARD = "GET_IN_CARD"
export const REMOVE_COMMANDE_IN_CARD = "REMOVE_COMMANDE_IN_CARD"
export const UPDATE_QTT = "UPDATE_QTT"

const set = new settings().init()

export const getInCard = (post_id)=>{
    let fData = new FormData()
    fData.append("post_id", post_id)
    fData.append("user_id", localStorage.getItem("id") ? localStorage.getItem("id") : 0)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=inCard`, fData)
        .then(res=>dispatch({type: GET_IN_CARD, payload: res.data}))
        .catch(err=>console.log(err))
    }
}

export const removeCommande = (post_id)=>{
    let fData = new FormData()
    fData.append("post_id", post_id)
    fData.append("user_id", localStorage.getItem("id") ? localStorage.getItem("id") : 0)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=removeCommande`, fData)
        .then(res=>dispatch({type: REMOVE_COMMANDE_IN_CARD, payload: res.data}))
        .catch(err=>console.log(err))
    }
}

export const updateQtt = (post_id, qtt)=>{
    let fData = new FormData()
    fData.append("post_id", post_id)
    fData.append("qtt", qtt)
    fData.append("user_id", localStorage.getItem("id") ? localStorage.getItem("id") : 0)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=updateQtt`, fData)
        .then(res=>dispatch({type: UPDATE_QTT, payload: res.data}))
        .catch(err=>console.log(err))
    }
}
