import axios from "axios";
import {baseUrl} from "./config";

export async function createBudget(token,categoryId,amount){
    const localToken = localStorage.getItem('token');
    return await axios.post(`${baseUrl}/budgets`,{
        categoryId:categoryId,
        amount:amount
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}


export async function updateBudget(token,budgetId,categoryId,amount){
    const localToken = localStorage.getItem('token');
    return await axios.put(`${baseUrl}/budgets/${budgetId}`,{
        categoryId:categoryId,
        amount:amount
    },{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function deleteBudget(token,budgetId){
    const localToken = localStorage.getItem('token');
    return await axios.delete(`${baseUrl}/budgets/${budgetId}`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}

export async function getBudget(token){
    const localToken = localStorage.getItem('token');
    return await axios.get(`${baseUrl}/budgets`,{
        headers: { Authorization: `Bearer ${localToken}` }
    })
}