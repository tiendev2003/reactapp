import axios from "axios";
import { baseUrl } from "./config";

export async function createDebt(data) {
  const localToken = localStorage.getItem("token");
  return await axios.post(`${baseUrl}/debts`, data, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}

export async function updateDebt(  data) {
  const localToken = localStorage.getItem("token");
  return await axios.put(`${baseUrl}/debts`, data, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}

export async function deleteDebt(id) {
  const localToken = localStorage.getItem("token");
  return await axios.delete(`${baseUrl}/debts`, {
    headers: { Authorization: `Bearer ${localToken}` },
    params: { debtId: id },
  });
}

export async function getDebt(token) {
  const localToken = localStorage.getItem("token");
  return await axios.get(`${baseUrl}/debts`, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}
