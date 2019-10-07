export default function reducer (state={}, action) {
  switch (action.type) {
    case 'DETAILS':
      return action.payload;
    case 'RESET':
      return {};
    default:
      return state;
  }
}

export const showDetails = item => {
  return {type: 'DETAILS', payload:item};
};

export const hideDetails = id => {
  return {type: 'RESET'};
};

