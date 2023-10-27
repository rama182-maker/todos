import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

import { saveLocal } from "./TodoActionTypes";

const TodoContainer = createContext();
const TodoContainerDispatcher = createContext();

const Context = ({ children }) => {
  const initialState = {
    todos: [],
  };
  const reducer = (state, action) => {
    return addTodosHandler(state, action);
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) dispatch(saveLocal(todos));
  }, []);

  return (
    <TodoContainer.Provider value={state}>
      <TodoContainerDispatcher.Provider value={dispatch}>
        {children}
      </TodoContainerDispatcher.Provider>
    </TodoContainer.Provider>
  );
};

export default Context;

export const useTodos = () => useContext(TodoContainer);
export const useTodosAction = () => useContext(TodoContainerDispatcher);

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
