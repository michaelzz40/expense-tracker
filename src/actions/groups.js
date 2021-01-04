import axios from "axios";
import {
  GET_ALL_GROUPS,
  CREATE_GROUP,
  GROUP_LOADING,
  GROUP_SUCCESSFUL,
  GROUP_FAILED,
  GET_GROUP_BY_ID,
  GET_EXPENSE_DATA,
  GROUP_DELETE,
  GROUP_RESET
} from "../actions/types";

export const getAllGroups = () => async dispatch => {
  try {
    dispatch({ type: GROUP_RESET });
    dispatch({ type: GROUP_LOADING });
    const response = await axios.get(
      "https://group-api-final.herokuapp.com/api/groups"
    );
    dispatch({ type: GET_ALL_GROUPS, payload: response.data });
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({ type: GROUP_FAILED, payload: "Error Fetching Group Data" });
  }
};

export const createGroup = companyName => async dispatch => {
  const company = {
    companyName
  };
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.post(
      "https://group-api-final.herokuapp.com/api/groups",
      company,
      {
        "Content-Type": "application/json"
      }
    );

    dispatch({ type: CREATE_GROUP, payload: response.data });
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({ type: GROUP_FAILED, payload: "Error Creating New Group" });
  }
};

export const getGroupbyId = id => async dispatch => {
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.get(
      `https://group-api-final.herokuapp.com/api/groups/${id}`
    );
    dispatch({ type: GET_GROUP_BY_ID, payload: response.data });
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({
      type: GROUP_FAILED,
      payload: "You are not Authorized for accessing this group"
    });
  }
};

export const addNewMember = (member, groupId) => async dispatch => {
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.post(
      `https://josaphat.herokuapp.com/api/add_member?email=${member}&groupId=${groupId}`
    );
    console.log(response);
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({
      type: GROUP_FAILED,
      payload: "Unable to add member"
    });
  }
};

export const addExpense = (
  amount,
  groupId,
  userId,
  description
) => async dispatch => {
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.post(
      `https://josaphat.herokuapp.com/api/add_expense?amount=${amount}&groupId=${groupId}&userId=${userId}&description=${description}`
    );
    console.log(response);
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({
      type: GROUP_FAILED,
      payload: "Unable to add Expense"
    });
  }
};

export const getGroupExpenses = groupId => async dispatch => {
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.get(
      `https://group-api-final.herokuapp.com/api/groups/expenses/${groupId}`
    );
    dispatch({ type: GET_EXPENSE_DATA, payload: response.data });
    dispatch({ type: GROUP_SUCCESSFUL });
  } catch (error) {
    dispatch({
      type: GROUP_FAILED,
      payload: "Unable to load Expense"
    });
  }
};

export const removeGroup = (groupId, history) => async dispatch => {
  try {
    dispatch({ type: GROUP_LOADING });
    const response = await axios.delete(
      `https://group-api-final.herokuapp.com/api/groups/${groupId}`
    );

    dispatch({ type: GROUP_DELETE });
    dispatch({ type: GROUP_SUCCESSFUL });
    history.push("/group");
  } catch (error) {
    dispatch({
      type: GROUP_FAILED,
      payload: "Unable to delete Expense"
    });
  }
};
