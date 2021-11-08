import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_CTG = "GET_CTG"
 export const SET_CTG = "SET_CTG"
 export const REMOVE_CTG = "REMOVE_CTG"
 export const UPDATE_CTG = "UPDATE_CTG"
 
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

 export const updateCtg = (data)=>{
    return(dispatch)=>{
        return axios.post(set.APP_URL+'?page=updateCategory',data)
        .then(res=>dispatch({type: UPDATE_CTG, payload: res.data}))
        .catch(err=>console.log(err))
    }
}

 export const removeCtg = (idCtg)=>{
     const fData = new FormData()
     fData.append("id", idCtg)
     return(dispatch)=>{
         return axios.post(set.APP_URL+'?page=removeCtg', fData)
         .then(res=>dispatch({type:REMOVE_CTG, payload: res.data}))
         .catch(err=>console.log(err))
     }
 }

