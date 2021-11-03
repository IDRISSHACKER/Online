import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const MOST_AVIS_POSTS = "MOST_AVIS_POSTS"
 
 const set = new settings().init()

 export const mostAvisPost = ()=>{
     return (dispatch)=>{
         return axios.post(`${set.APP_URL}?page=mostNote/`)
         .then(res=> dispatch({type: MOST_AVIS_POSTS, payload: res.data}))
         .catch(err=>console.log(err))
     };
 }