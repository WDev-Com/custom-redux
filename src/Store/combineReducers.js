const combineReducer = (reducerMappings) => {
  const initialState = {};

  Object.keys(reducerMappings).forEach((id) => {
    initialState[id] = undefined;
  });

  const combinedReducer = (state = initialState, action) => {
    let newState = { ...state };
    Object.entries(reducerMappings).forEach(([id, reducer]) => {
      newState[id] = reducer(newState[id], action);
    });
    return newState;
  };

  return combinedReducer;
};

export default combineReducer;
