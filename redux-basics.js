const redux = require("redux");
const createStore = redux.createStore;

// Initial state

// Reducer/store needs to be initialized with an initial state.
const initialState = {
  counter: 0
};

// Reducer

// Store needs to be initialize with a reducer.  There is only one reducer per store.
// Multiple reducers need to be combined into one before to be associated with a store.
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  // Reducer needs to always return the state, whether changed or not.
  return state;
};

// Store

// Create new redux store
const store = createStore(rootReducer);
console.log("Initial state: ", store.getState());

// Subscription - subscribe to store

// Subscription gets automatic notification when the store is updated after an action get to a reducer.
// Subscriptions are triggered on store dispatch calls.
store.subscribe(() => {
  console.log("Subscription: ", store.getState());
});

// Dispatching Action

// Action is dispatched by the store.dispatch function that takes an action object that has a "type" property
// which is just a unique identifier.  The convention is to use an all-uppercase string for "type".
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "DO_NOTHING" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
