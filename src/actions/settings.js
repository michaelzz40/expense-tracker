import { DARK_MODE, LIGHT_MODE } from "./types";

export const changeTheme = theme => dispatch => {
  if (theme === "dark") {
    dispatch({ type: DARK_MODE });
  } else if (theme === "light") {
    dispatch({ type: LIGHT_MODE });
  }
};
