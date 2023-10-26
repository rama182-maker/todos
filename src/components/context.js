import { createContext, useContext, useState } from "react";

const TodoContainer = createContext();
const TodoContainerDispatcher = createContext();

const Context = ({ children }) => {
  const [todos, setTodos] = useState([]);

  return (
    <TodoContainer.Provider value={todos}>
      <TodoContainerDispatcher.Provider value={setTodos}>
        {children}
      </TodoContainerDispatcher.Provider>
    </TodoContainer.Provider>
  );
};

export default Context;

export const useTodos = () => useContext(TodoContainer);
export const useTodosAction = () => {
  const setTodos = useContext(TodoContainerDispatcher);
  const todos = useTodos();

  const addTodosHandler = (value) => {
    const newTodo = {
      text: value,
      id: new Date().getTime(),
      isComplete: false,
    };
    setTodos([...todos, newTodo]);
  };
  const completedHandler = (id) => {
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    const selectTodo = { ...todos[index] };
    selectTodo.isComplete = !selectTodo.isComplete;
    const cloneTodo = [...todos];
    cloneTodo[index] = selectTodo;
    setTodos(cloneTodo);
  };
  return { addTodosHandler, completedHandler };
};
