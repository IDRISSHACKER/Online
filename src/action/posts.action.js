import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_POSTS = "GET_POSTS"
 export const ADD_POST = "ADD_POST"
 
 const set = new settings().init()

 export const getPosts = ()=>{
     return (dispatch)=>{
         return axios.post(`${set.APP_URL}?page=articles/`)
         .then(res=> dispatch({type: GET_POSTS, payload: res.data}))
         .catch(err=>console.log(err))
     };
 }



 export const addPost = (data)=>{
    return (dispatch)=>{
        const api = axios.create({
            baseURL: `${set.APP_URL}?page=setArticle`
        })
        return api.post("/", data)
        .then(res=> dispatch({type: ADD_POST, payload: res.data}))
        .catch(err=>console.log(err))
    };
}