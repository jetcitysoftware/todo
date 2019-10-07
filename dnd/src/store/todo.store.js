import uuid from 'uuid/v4';

const items = [
  {_id:1, complete:false, due:'9/12/2010', assignee:'John', text: 'This is item 1'},
  {_id:2, complete:false, due:'9/13/2010', assignee:'Cathy', text: 'This is item 2'},
  {_id:3, complete:false, due:'9/14/2010', assignee:'John', text: 'This is item 3'},
];
const initialState = { todoList: items };

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case 'add':
      return { ...state, todoList: [...state.todoList, action.payload] };
    case 'delete':
      return {...state, todoList: state.todoList.filter( item => item._id !== action.payload )};
    case 'toggle':
      return { ...state, todoList: state.todoList.map( (item) => item._id === action.payload ? {...item, complete: !item.complete} : item ) };
    default:
      return state;
  }
}

// Action Creators
export const addItem = (data) => {
  data._id = uuid();
  data.complete = false;
  return {type: 'add', payload:data};
};

export const deleteItem = (id) => {
  return {type:'delete', payload:id};
}

export const toggleComplete = (id) => {
  return {type: 'toggle', payload:id};
};
