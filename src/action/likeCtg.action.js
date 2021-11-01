import axios from "axios"
import settings from "src/_mocks_/settings"

export const GET_POSTS_BY_CTG = "GET_POSTS_BY_CTG"
const initialState = []

const set = new settings().init()


export const getPostsByCtg = (param)=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=articleLikeCtg`, param)
        .then(res=>dispatch({type: GET_POSTS_BY_CTG, payload: res.data}))
        .catch(err=>console.log(err))
    }
}