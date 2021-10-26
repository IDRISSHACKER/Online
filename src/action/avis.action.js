import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const SET_AVI = "SET_AVI"
 export const GET_AVIS = "GET_AVIS"
 export const UPDATE_AVI = "UPDATE_AVI"

 const set = new settings().init()

 export const setAvi = (data)=>{
     return (dispatch)=>{
        axios.post(set.APP_URL + '?page=setAvi', data)
        .then(res=>dispatch({ type: SET_AVI, payload: res.data }))
        .catch(err=>console.log(err))
     }
 }

 export const getAvis = (post_id)=>{
     const data = new FormData()
     data.append("post_id", post_id);
    return (dispatch)=>{
        axios.post(set.APP_URL + '?page=getAvis', data)
        .then(res=>dispatch({type: GET_AVIS, payload: res.data}))
        .catch(err=>console.log(err))
    }
 }

 export const updateAvi = (data)=>{
    return (dispatch)=>{
       axios.post(set.APP_URL + '?page=updateAvi', data)
       .then(res=>dispatch({ type: UPDATE_AVI, payload: res.data }))
       .catch(err=>console.log(err))
    }
}
