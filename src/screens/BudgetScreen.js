import Layout from "../components/layout/Layout";
import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetFeature from "../components/budget/BudgetFeature";
import BudgetList from "../components/budget/BudgetList";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget } from "../features/budgetSlice";
import { useEffect } from "react";
import { validateToken } from "../features/userSlice";

export default function BudgetScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    async function fetchData() {
      await dispatch(validateToken(token));
      dispatch(fetchBudget({ token: token }));
    }
    fetchData();
  }, [dispatch, token]);
  const budgetList = useSelector((state) => state.budget.budgetList);
  return (
    <Layout title={"Budgets"} load={budgetList.length > 0}>
      <BudgetHeader />
      <BudgetFeature />
      <BudgetList />
    </Layout>
  );
}
