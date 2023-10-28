import { createContext, useContext, useEffect, useReducer } from "react";
import {
  ADD_TODO,
  DELETE_TODO,
  COMPLETED_TODO,
  SEARCH,
  UPDATE_TODOLIST,
  SAVE_LOCAL,
  updateTodoList,
  saveLocal,
} from "./TodoActionTypes";
const TodoContainerContext = createContext();
const TodoContainerContextDispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodosHandler(state, action);
    case DELETE_TODO:
      return deleteHandler(state, action);
    case COMPLETED_TODO:
      return completedHandler(state, action);
    case SEARCH:
      return searchHandler(state, action);
    case UPDATE_TODOLIST:
      return { ...state, todoList: action.payload };
    case SAVE_LOCAL:
      return { ...state, todos: action.todos };
    default:
      return state;
  }
};

const Context = ({ children }) => {
  const initialState = {
    searchValue: "",
    todos: [],
    todoList: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) dispatch(saveLocal(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
    dispatch(updateTodoList(state.todos));
  }, [dispatch, state.todos]);

  return (
    <TodoContainerContext.Provider value={state}>
      <TodoContainerContextDispatcher.Provider value={dispatch}>
        {children}
      </TodoContainerContextDispatcher.Provider>
    </TodoContainerContext.Provider>
  );
};

export default Context;

export const useTodos = () => useContext(TodoContainerContext);
export const useTodosAction = () => useContext(TodoContainerContextDispatcher);

const searchHandler = (state, action) => {
  const filtered = state.todos.filter((item) => {
    return item.title.toLowerCase().includes(action.payload.toLowerCase());
  });
  return { ...state, searchValue: action.payload, todoList: filtered };
};

const addTodosHandler = (state, action) => {
  const newTodo = {
    title: action.payload.title,
    id: new Date().getTime(),
    isComplete: false,
  };
  return {
    ...state,
    todos: [...state.todos, newTodo],
  };
};

const completedHandler = (state, action) => {
  action.event.stopPropagation();
  const index = state.todos.findIndex((item) => {
    return item.id === action.payload.id;
  });
  const selectTodo = { ...state.todos[index] };
  selectTodo.isComplete = !selectTodo.isComplete;
  const cloneTodo = [...state.todos];
  cloneTodo[index] = selectTodo;
  return { ...state, todos: cloneTodo };
};

const deleteHandler = (state, action) => {
  action.event.stopPropagation();
  const deletedTodo = state.todos.filter(
    (item) => item.id !== action.payload.id
  );
  return { ...state, todos: deletedTodo };
};
