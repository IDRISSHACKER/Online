import axios from "axios"
import settings from "src/_mocks_/settings"

 
 export const GET_COMMANDES = "GET_COMMANDES"
 export const SET_COMMANDE  = "SET_COMMANDE"
 
 const set = new settings().init()

 export const getCommandes = ()=>{
     return (dispatch)=>{
         return axios.post(`${set.APP_URL}?page=getCommandes/`)
         .then(res=> dispatch({type: GET_COMMANDES, payload: res.data}))
         .catch(err=>console.log(err))
     };
 }

 export const setCommande = (data)=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=setCommande/`, data)
        .then(res=> dispatch({type: SET_COMMANDE, payload: res.data}))
        .catch(err=>console.log(err))
    };
}


