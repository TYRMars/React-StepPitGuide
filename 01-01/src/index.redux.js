const ADD = 'add';
const REDUCE = 'reduce';

// reducer
exports.counter = function (state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'reduce':
      return state-1;
    default:
      return 10
  }
};

// action creator
exports.add = function () {
  return {type:ADD};
};
exports.reduce = function () {
  return {type:REDUCE};
};
