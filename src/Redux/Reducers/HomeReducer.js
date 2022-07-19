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
          newState.loginData = action.payload;

          return { ...state, ...newState };
        } //No change
        else {
          newState.loginData = false;
          return { ...state, ...newState };
        }

      default:
        return state;
    }
  } catch (error) {
    console.log(error);
    //!Force log out
    newState.loginData = false;
    //...
    window.location.href = "/";
    //..
    return { ...state, ...newState };
  }
};

export default combineReducers({
  App: HomeReducer,
});
