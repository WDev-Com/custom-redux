import createStore from "./createStore";

const initialState = {
  isThemeDark: false,
  list: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      state.isThemeDark = !state.isThemeDark;
      break;

    case "list":
      state.list = [...state.list, action.payload];
      // console.log(state);
      break;

    default:
      return state;
  }
};

const store = createStore(initialState, reducer);

export default store;
