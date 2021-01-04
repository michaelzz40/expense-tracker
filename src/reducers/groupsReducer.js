import {
  GET_ALL_GROUPS,
  CREATE_GROUP,
  GROUP_LOADING,
  GROUP_SUCCESSFUL,
  GROUP_FAILED,
  GET_GROUP_BY_ID,
  GROUP_RESET
} from "../actions/types";

const initialState = {
  groups: [],
  groupLoading: false,
  groupFailedMessage: "",
  group: []
};

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      return {
        ...state,
        group: [],
        groups: action.payload
      };
    case GET_GROUP_BY_ID: {
      return {
        ...state,
        group: action.payload
      };
    }
    case CREATE_GROUP: {
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };
    }
    case GROUP_LOADING: {
      return {
        ...state,
        groupLoading: true
      };
    }
    case GROUP_SUCCESSFUL: {
      return {
        ...state,
        groupLoading: false
      };
    }
    case GROUP_FAILED: {
      return {
        ...state,
        groupLoading: false,
        groupFailedMessage: action.payload
      };
    }
    case GROUP_RESET: {
      return {
        ...state,
        groups: [],
        groupLoading: false,
        groupFailedMessage: null,
        group: []
      };
    }

    default:
      return {
        ...state
      };
  }
};
