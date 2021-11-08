import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_POSTS = "GET_POSTS"
 export const ADD_POST = "ADD_POST"
 export const REMOVE_POST = "REMOVE_POST"
 export const UPDATE_POST = "UPDATE_POST"
 
 const set = new settings().init()

 export const getPosts = ()=>{
     return (dispatch)=>{
         return axios.post(`${set.APP_URL}?page=articles/`)
         .then(res=> dispatch({type: GET_POSTS, payload: res.data}))
         .catch(err=>console.log(err))
     };
 }

 export const removePost = (id)=>{
     const fData = new FormData()
     fData.append("id", id)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=removeArticle/`, fData)
        .then(res=> dispatch({type: REMOVE_POST, payload: res.data}))
        .catch(err=>console.log(err))
    };
}

export const updatePost = (data)=>{
   return (dispatch)=>{
       return axios.post(`${set.APP_URL}?page=updateArticle/`, data)
       .then(res=> dispatch({type: UPDATE_POST, payload: res.data}))
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