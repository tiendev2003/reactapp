import React from 'react'
import Layout from "../components/layout/Layout";
import DebtHeader from "../components/debts/DebtHeader";
import DebtFeature from "../components/debts/DebtFeature";
import DebtList from "../components/debts/DebtList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { validateToken } from "../features/userSlice";
import { fetchDebt } from "../features/debtSlice";

export default function DebtScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    async function fetchData() {
      await dispatch(validateToken(token));
      dispatch(fetchDebt({ token: token }));
    }
    fetchData();
  }, [dispatch, token]);
  const debtList = useSelector((state) => state.debt.debtList);
  return (
    <Layout title={"Debts"} load={debtList.length > 0}>
      <DebtHeader />
      <DebtFeature />
      <DebtList />
    </Layout>
  );
}