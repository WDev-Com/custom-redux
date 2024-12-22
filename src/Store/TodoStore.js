import { ADD_WORKOUT, CHANGE_THEME } from "./actionConstant";
import createStore from "./createStore";

const initialState = {
  isThemeDark: false,
  list: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      state.isThemeDark = !state.isThemeDark;
      break;

    case ADD_WORKOUT:
      state.list = [...state.list, action.payload];
      break;

    default:
      return state;
  }
};

const store = createStore(initialState, reducer);

export default store;
