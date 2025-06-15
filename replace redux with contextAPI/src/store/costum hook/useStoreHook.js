import { useState, useEffect } from "react";
let globalState = {};
let listeners = [];
let actions = {};

export default function useStore(shouldListin = true) {
  const setState = useState(globalState)[1];
  function dispatch(actionIdentifier, payload) {
    const state = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...state };
    for (const listner of listeners) {
      listner(globalState);
    }
  }
  useEffect(() => {
    if (shouldListin) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListin) {
        listeners.filter((setter) => setter !== setState);
      }
    };
  }, [setState, shouldListin]);
  return [globalState, dispatch];
}

export function initalizeStore(initState, initActions) {
  if (initActions) {
    actions = { ...actions, ...initActions };
  }
  globalState = { ...globalState, ...initState };
}
