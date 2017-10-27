const ADD = 'add';
const REDUCE = 'reduce';

// reducer
export function counter(state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'reduce':
      return state-1;
    default:
      return 10
  }
};

//提交action，reducer就会执行

// action creator
export function add() {
  return {type:ADD};
};
export function reduce() {
  return {type:REDUCE};
};

export function addAsync() {
  return dispatch=>{
    setTimeout(
      ()=>{
        dispatch(add())
      },2000)
  }
}
