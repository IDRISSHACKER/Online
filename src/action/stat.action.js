import axios from "axios"
import settings from "src/_mocks_/settings"


 export const GET_STAT_SALE    = "GET_STAT_SALE"
 
 const set = new settings().init()


 export const getStatSale = ()=>{
    return (dispatch)=>{
        return axios.post(`${set.APP_URL}?page=`+"statSale/")
        .then(res=> dispatch({type: GET_STAT_SALE, payload: res.data}))
        .catch(err=>console.log(err))
    };
}
