export const ADD_TODO = "ADD_TODO";
export const addTodo = (value) => {
  return { type: ADD_TODO, payload: value };
};

export const DELETE_TODO = "DELETE_TODO";
export const deleteTodo = (event, value) => {
  return { type: DELETE_TODO, payload: value, event };
};

export const COMPLETED_TODO = "COMPLETED_TODO";
export const completedTodo = (event, value) => {
  return { type: COMPLETED_TODO, payload: value, event };
};

export const SEARCH = "SEARCH";
export const searchTodo = (value) => {
  return { type: SEARCH, payload: value };
};

export const UPDATE_TODOLIST = "UPDATE_TODOLIST";
export const updateTodoList = (value) => {
  return { type: UPDATE_TODOLIST, payload: value };
};

export const SAVE_LOCAL = "SAVE_LOCAL";
export const saveLocal = (todos) => {
  return { type: SAVE_LOCAL, todos };
};
