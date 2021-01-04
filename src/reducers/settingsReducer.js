import { LIGHT_MODE, DARK_MODE } from "../actions/types";

const initialState = {
  mode: true
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIGHT_MODE:
      return {
        mode: true
      };
    case DARK_MODE:
      return {
        mode: false
      };
    default:
      return {
        ...state
      };
  }
};
