import { notifications } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  createDebt,
  deleteDebt,
  getDebt,
  updateDebt,
} from "../api/debtService";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

export const addDebt = createAsyncThunk("debt/addDebt", async (body) => {
  return createDebt(body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
});

export const editDebt = createAsyncThunk("debt/editDebt", async (body) => {
  console.log("body",body)
  return updateDebt(body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
});

export const removeDebt = createAsyncThunk("debt/removeDebt", async (body) => {
  return deleteDebt(body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
});

export const fetchDebt = createAsyncThunk("debt/fetchDebt", async (body) => {
  return getDebt(body.token)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
});

const debtSlice = createSlice({
  name: "debt",
  initialState: {
    displayDebtForm: false,
    addDebtInProcess: false,
    addDebtEditInProcess: false,
    fetchDebtInProcess: false,
    debtList: [],
  },
  reducers: {
    showDebtForm: (state) => {
      state.displayDebtForm = true;
    },
    closeDebtForm: (state) => {
      state.displayDebtForm = false;
    },
  },
  extraReducers: {
    [addDebt.pending]: (state) => {
      state.addDebtInProcess = true;
      console.log("Debt Add pending");
    },
    [addDebt.fulfilled]: (state, action) => {
      state.addDebtInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Debt Created");
        notifications.show({
          title: "Debt Created",
          message: "Your debt created successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.displayDebtForm = false;
    },
    [addDebt.rejected]: (state) => {
      state.addDebtInProcess = false;
      console.log("Debt Create failed");
      alert("Debt Create failed, Try again");
    },
    [editDebt.pending]: (state) => {
      state.addDebtEditInProcess = true;
      console.log("Debt Edit pending");
    },
    [editDebt.fulfilled]: (state, action) => {
      state.addDebtEditInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Debt Updated");
        notifications.show({
          title: "Debt Updated",
          message: "Your debt updated successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    [editDebt.rejected]: (state) => {
      state.addDebtEditInProcess = false;
      console.log("Debt update failed");
      alert("Debt update failed, Try again");
    },
    [removeDebt.pending]: (state) => {
      console.log("Debt Remove pending");
    },
    [removeDebt.fulfilled]: (state, action) => {
      if (action.payload?.message === "success") {
        console.log("Debt Removed");
        notifications.show({
          title: "Debt Removed",
          message: "Your debt removed successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    [removeDebt.rejected]: (state) => {
      console.log("Debt remove failed");
      alert("Debt remove failed, Try again");
    },
    [fetchDebt.pending]: (state) => {
      state.fetchDebtInProcess = true;
      console.log("Debt fetch pending");
    },
    [fetchDebt.fulfilled]: (state, action) => {
      state.debtList = action.payload.map((debt) => ({
        debtId: debt.debtId,
        amount: debt.amount,
        dueDate: debt.dueDate,
        moneyFrom: debt.moneyFrom,
        status: debt.status,
        user: debt.user,
      }));
      console.log("Debt fetched");
      console.log(state.debtList);
    },
    [fetchDebt.rejected]: (state) => {
      state.fetchDebtInProcess = false;
      console.log("Debt fetch failed");
    },
  },
});

export const { showDebtForm, closeDebtForm } = debtSlice.actions;

export default debtSlice;
