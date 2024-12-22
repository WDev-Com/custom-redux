import combineReducers from "./combineReducers";
import workoutReducer from "../reducers/workoutReducer";
import demoReducer from "../reducers/demoReducer";
const rootReducer = combineReducers({
  workoutReducer: workoutReducer,
  demoReducer: demoReducer,
});

export default rootReducer;
