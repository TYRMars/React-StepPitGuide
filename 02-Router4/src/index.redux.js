const ADD = 'add';
const MINUS = 'minus';

// reducer
export function counter(state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'minus':
      return state-1;
    default:
      return 10
  }
}

//提交action，reducer就会执行

// action creator
export function add() {
  return {type:ADD};
}
export function minus() {
  return {type:MINUS};
}

export function addAsync() {
  return dispatch=>{
    setTimeout(
      ()=>{
        dispatch(add())
      },2000)
  }
}
