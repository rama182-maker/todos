import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

const ADD_TODO = "ADD_TODO";
export const addTodo = (value) => {
  return { type: ADD_TODO, payload: value };
};

const UPDATE_TODOLIST = "UPDATE_TODOLIST";
export const updateTodoList = (value) => {
  return { type: UPDATE_TODOLIST, payload: value };
};

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
    localStorage.setItem("todos", JSON.stringify(state.todos));
    dispatch(updateTodoList(state.todos));
  }, [dispatch, state.todos]);

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
