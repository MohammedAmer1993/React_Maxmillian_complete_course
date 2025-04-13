const redux = require("redux");

function reducer(state = { count: 0 }, action) {
  if (action.type === "INC") {
    return { count: state.count + 1 };
  }
  if (action.type === "DEC") {
    return { count: state.count - 1 };
  }
  return state;
}

const store = redux.createStore(reducer);

function subscriber() {
  const state = store.getState();
  console.log(state.count);
}

store.subscribe(subscriber);

store.dispatch({ type: "INC" });
