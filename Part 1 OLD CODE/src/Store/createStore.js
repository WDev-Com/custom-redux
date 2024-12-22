const createStore = (initialState, reducer) => {
  const state = initialState;
  const subcribers = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action) => {
    reducer(state, action);
    // subcribers.forEach((callBack) => {
    //   callBack();
    // });
  };

  const subcribe = (callBack) => {
    subcribers.push(callBack);
    // return () => {
    //   const index = subcribers.indexOf(callBack);
    //   if (index > -1) subcribers.splice(index, 1);
    // };
  };

  return {
    getState,
    dispatch,
    subcribe,
  };
};

export default createStore;
