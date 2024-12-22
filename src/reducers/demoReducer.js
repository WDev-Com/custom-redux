import { CHANGE_DEMO_THEME, ADD_DEMO } from "../action/actionConstant";

const Initial_State = {
  isThemeDark: false,
  list: [],
};

const demoReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case CHANGE_DEMO_THEME:
      return { ...state, isThemeDark: !state.isThemeDark };
    case ADD_DEMO:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
};

export default demoReducer;
