import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_USER = "GET_USER"
 export const GET_USERS = "GET_USERS"
 
 const set = new settings().init()

 export const getUser = (id = localStorage.getItem("id"))=>{
     const form = new FormData()
     form.append("id", id)
     return (dispatch)=>{
        return axios.post(set.APP_URL+'?page=user',form)
         .then(res=>dispatch({ type: GET_USER, payload: res.data }))
         .catch(err=>console.log(err))
     }
 }

 export const getUsers = ()=>{
    return (dispatch)=>{
       return axios.post(set.APP_URL+'?page=users')
        .then(res=>dispatch({ type: GET_USERS, payload: res.data }))
        .catch(err=>console.log(err))
    }
}

