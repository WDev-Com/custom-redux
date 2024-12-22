import { ADD_WORKOUT, CHANGE_THEME } from "../action/actionConstant";

const Initial_State = {
  isThemeDark: false,
  list: [],
};

const workoutReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, isThemeDark: !state.isThemeDark };
    case ADD_WORKOUT:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
};

export default workoutReducer;
