import { ADD_WORKOUT, CHANGE_THEME } from "../action/actionConstant";
import createStore from "./createStore";
import rootReducer from "./rootReducer";
/*
Moving this logic to seprate folder
For maintaining the multiple reducer for maintanable code
const initialState = {
  isThemeDark: false,
  list: [],
};
*/

/**
 * By  returning the updated state making the reducer pure

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, isThemeDark: !state.isThemeDark };
    case ADD_WORKOUT:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
}; */

const store = createStore(rootReducer);

export default store;
