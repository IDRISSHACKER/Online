import axios from "axios"
import settings from "src/_mocks_/settings"


 export const ADD_SLIDE    = "ADD_SLIDE"
 export const GET_SLIDE    = "GET_SLIDE"
 export const REMOVE_SLIDE = "REMOVE_SLIDE"
 export const UPDATE_SLIDE = "UPDATE_SLIDE"
 
 const set = new settings().init()


 export const updateSlide = (data)=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=`+"updateSlide/", data)
        .then(res=> dispatch({type: UPDATE_SLIDE, payload: res.data}))
        .catch(err=>console.log(err))
    };
}

export const addSlide = (data)=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=`+"setSlide/", data)
        .then(res=> dispatch({type: ADD_SLIDE, payload: res.data}))
        .catch(err=>console.log(err))
    };
}

export const removeSlide = (data)=>{
    let fData = new FormData()
    fData.append("id", data)
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=`+"removeSlide/", fData)
        .then(res=> dispatch({type: REMOVE_SLIDE, payload: res.data}))
        .catch(err=>console.log(err))
    };
}

export const getSlide = ()=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=`+"sliders/")
        .then(res=>dispatch({type:GET_SLIDE, payload: res.data}))
        .catch(err=>console.log(err))
    }
}