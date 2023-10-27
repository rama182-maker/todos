export const ADD_TODO = "ADD_TODO";
export const addTodo = (value) => {
  return { type: ADD_TODO, payload: value };
};

export const SAVE_LOCAL = "SAVE_LOCAL";
export const saveLocal = (todos) => {
  return { type: SAVE_LOCAL, todos };
};
