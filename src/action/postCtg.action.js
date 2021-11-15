import axios from "axios"
import settings from "src/_mocks_/settings"

export const GET_POST_CTG = "GET_POST_CTG"
const initialState = []

const set = new settings().init()


export const getPostCtg = (param)=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=getPostCtg`, param)
        .then(res=>dispatch({type: GET_POST_CTG, payload: res.data}))
        .catch(err=>console.log(err))
    }
}