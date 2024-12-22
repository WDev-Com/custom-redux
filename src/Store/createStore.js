const createStore = (initialState, reducer) => {
  const state = initialState;
  const subcribers = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action) => {
    reducer(state, action);
    subcribers.forEach((callBack) => {
      callBack();
    });
  };

  const subcribe = (callBack) => {
    subcribers.push(callBack);
    return () => {
      const index = subcribers.indexOf(callBack);
      if (index > -1) subcribers.splice(index, 1);
    };
  };

  return {
    getState,
    dispatch,
    subcribe,
  };
};

export default createStore;

/*
What is subscribe?
subscribe allows components (or other parts of your application) to register callback functions that should execute 
whenever the store's state changes. It acts as a listener mechanism to react to state updates.

In your code:

A component subscribes to the store using store.subscribe.
The subscribers array holds all the registered callback functions.
Whenever the dispatch function is called, it:
Executes the reducer to update the state.
Iterates over all the subscribers and invokes their callbacks.
How Does It Work in the Architecture?
State Management:

The store holds the central application state.
dispatch modifies the state using the reducer.
Subscribers are notified of state changes, ensuring the application remains consistent.
Separation of Concerns:

Components don't directly manage the state.
They subscribe to the store and react to changes, improving modularity.
Reactivity:

When the state changes, all subscribers get notified. In your case:
jsx
Copy code
const unsubcribe = store.subscribe(() => {
  setSelected(store.getState().isThemeDark);
});
This updates the local state (selected) of the WorkList component whenever the store's isThemeDark property changes.
Encapsulation:

The state logic (reducer, dispatch, subscribe) is encapsulated in the store. Components interact with 
the store via defined methods (getState, dispatch, subscribe).
Unsubscription:

subscribe returns a cleanup function to remove the callback from subscribers when it is no longer needed, preventing memory leaks.
Benefits to the Architecture
Centralized State Management: The store acts as a single source of truth, making the state predictable and easier to debug.

Scalability: Multiple components can independently subscribe to the store without knowing about each other.

Loose Coupling: Components remain loosely coupled with the store. They don't need to know how the state is updated; they just react to changes.

Dynamic Reactivity: Any part of the application (components, middleware, etc.) can react dynamically to state changes by subscribing to the store.

Example Flow in Your Code
A user toggles the theme using the ToggleButton.
The dispatch function is called with the CHANGE_THEME action.
The reducer modifies the isThemeDark property of the state.
The dispatch function invokes all subscriber callbacks, including:
jsx
Copy code
setSelected(store.getState().isThemeDark);
This updates the selected state in the component.
The UI re-renders to reflect the updated state.
Potential Improvements
Immutability:

Your reducer directly mutates the state. Instead, return a new state object:
js
Copy code
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, isThemeDark: !state.isThemeDark };
    case ADD_WORKOUT:
      return { ...state, list: [...state.list, action.payload] };
    default:
      return state;
  }
};
Error Handling:

Ensure dispatch validates actions before processing.
Integration with Frameworks:

This custom implementation resembles Redux. Consider using Redux or similar libraries for advanced features like middleware,
 dev tools, and community support.
By using subscribe, you achieve a robust and reactive state management system that decouples state handling from UI rendering.
 This pattern is especially valuable in medium to large-scale applications.
*/
