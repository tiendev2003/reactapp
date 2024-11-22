import axios from "axios";
import { baseUrl } from "./config";

export async function createAccount(token,name,currentBalance,paymentTypes){
    const localToken = localStorage.getItem('token');
    return await axios.post(`${baseUrl}/accounts`,{
        "name":name,
        "currentBalance":currentBalance,
        "paymentTypes":paymentTypes
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function updateAccount(token,body){
    console.log("account/updateAccount",body)
    const localToken = localStorage.getItem('token');
    return await axios.put(`${baseUrl}/accounts?accountId=${body.accountId}`,{
        "name":body.name,
        "currentBalance":body.currentBalance,
        "paymentTypes":body.paymentTypes
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function deleteAccount(token,accountId){
    const localToken = localStorage.getItem('token');
    return await axios.delete(`${baseUrl}/accounts?accountId=${accountId}`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function getAccount(token){
    const localToken = localStorage.getItem('token');
    return await axios.get(`${baseUrl}/accounts`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}