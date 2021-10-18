import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_CTG = "GET_CTG"
 export const SET_CTG = "SET_CTG"
 
 const set = new settings().init()

 export const getCtg = ()=>{
     return (dispatch)=>{
         return axios.post(`${set.APP_URL}?page=categories/`)
         .then(res=> dispatch({type: GET_CTG, payload: res.data}))
         .catch(err=>console.log(err))
     };
 }

 export const setCtg = (data)=>{
     return(dispatch)=>{
         return axios.post(set.APP_URL+'?page=setCategory',data)
         .then(res=>dispatch({type: SET_CTG, payload: res.data}))
         .catch(err=>console.log(err))
     }
 }

