import { combineReducers } from "redux";
import STATE from "../Constants/State";
/**
 * Reducer responsible for all the home actions (trip booking, tracking, etc)
 * Centralized file.
 */

const INIT_STATE = STATE;

const HomeReducer = (state = INIT_STATE, action) => {
  //Predefined variables
  let newState = state;
  let tmpVar = null;

  try {
    switch (action.type) {
      case "UPDATE_SUCCESSFULL_LOGIN_DETAILS":
        //?Optimized
        if (
          action.payload !== undefined &&
          action.payload !== null &&
          action.payload.isSuspended === false &&
          action.payload.admin_fp !== undefined &&
          action.payload.admin_fp !== null
        ) {
          newState.loginData.admin_data = action.payload;
          newState.loginData.isLoggedIn = true;

          return { ...state, ...newState };
        } //No change
        else {
          newState.loginData.admin_data = null;
          newState.loginData.isLoggedIn = false;
          return { ...state, ...newState };
        }

      default:
        return state;
    }
  } catch (error) {
    console.log(error);
    //!Force log out
    newState.loginData.isLoggedIn = false;
    newState.loginData.admin_data = null;
    //...
    window.location.href = "/";
    //..
    return { ...state, ...newState };
  }
};

export default combineReducers({
  App: HomeReducer,
});
