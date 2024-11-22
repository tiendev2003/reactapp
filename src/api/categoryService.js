import axios from "axios";
import {baseUrl} from "./config";

export async function createCategory(token,name,description,type){
    const localToken = localStorage.getItem('token');
    return await axios.post(`${baseUrl}/categories`,{
        "name":name,
        "description":description,
        "type":type
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function getCategory(token){
    const localToken = localStorage.getItem('token');
    return await axios.get(`${baseUrl}/categories`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}