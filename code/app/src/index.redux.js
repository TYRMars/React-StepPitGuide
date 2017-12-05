const ADD_NUM = '+'
const REMOVE_NUM = '-'

//reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_NUM:
      return state + 1;
    case REMOVE_NUM:
      return state - 1;
    default:
      return 10;
  }
};

export function addNUM() {
  return {type: ADD_NUM};
}

export function removeNUM() {
  return {type: REMOVE_NUM};
}

export function addAsyncNUM() {
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addNUM())  
    }
    ,2000)
  }
}
