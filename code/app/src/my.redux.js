export function createStore(reducer) {
  let currentState = {};
  let currentLiesteners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentLiesteners.push(listener);
  }

  function dispatch(action) {
    currentState = reducer(currentState,action);
    currentLiesteners.forEach(v=>v())
    return action;
  }

  //命中初始状态
  dispatch({type:'@zhang/ZHANG-REDUX'});

  return {getState,subscribe,dispatch}
}
