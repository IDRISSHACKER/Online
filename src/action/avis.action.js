import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const SET_AVI = "SET_AVI"
 
 const set = new settings().init()

 export const setAvi = (data)=>{
     return (dispatch)=>{
         try {
             const res = axios.post(set.APP_URL + '?page=setAvi', data)
             return dispatch({ type: SET_AVI, payload: res.data })
         } catch (err) {
             return console.log(err)
         }
     }
 }

