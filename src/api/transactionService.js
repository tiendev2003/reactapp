import axios from "axios";
import {baseUrl} from "./config";

export async function createTransaction(token,amount,description,paymentType,dateTime,categoryId,accountId){
    console.log("heer")
    console.log(dateTime)
    const localToken = localStorage.getItem('token');
    return await axios.post(`${baseUrl}/transactions`,{
        "amount":amount,
        "description":description,
        "paymentType":paymentType,
        "dateTime":dateTime,
        "categoryId":categoryId,
        "accountId":accountId,
        "budgetId":accountId,
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function updateTransaction(token,amount,description,paymentType,dateTime,categoryId,accountId,transactionId){
    const localToken = localStorage.getItem('token');
    return await axios.put(`${baseUrl}/transactions?transactionId=${transactionId}`,{
        "amount":amount,
        "description":description,
        "paymentType":paymentType,
        "dateTime":dateTime,
        "categoryId":categoryId,
        "accountId":accountId,
        "budgetId":accountId,
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function getTransaction(token){
    const localToken = localStorage.getItem('token');
    return await axios.get(`${baseUrl}/transactions`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function deleteTransaction(token,transactionId){
    const localToken = localStorage.getItem('token');
    return await axios.delete(`${baseUrl}/transactions?transactionId=${transactionId}`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}