import { useTodos, useTodosAction } from "../Context";
import { completedTodo, deleteTodo } from "../TodoActionTypes";
import style from "./TodoList.module.css";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const dispatch = useTodosAction();
  const { todoList, searchValue } = useTodos();

  const onCopy = async (e, value) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value.title);
      alert(`Title - [${value.title}] copied to clipboard`);
    } catch (error) {
      console.error("Failed to Copy Title to clipboard", error);
    }
  };

  const reversedTodoList = todoList.slice().reverse();

  return (
    <section className={`container ${style.todoList}`}>
      {todoList.length === 0 ? (
        <>
          <div>
            <h2>Todos</h2>
          </div>
          <h2 className={style.empty}>
            {searchValue ? "No Todos Found" : "(Empty) Add Todos"}
          </h2>
        </>
      ) : (
        <>
          <div>
            <h2>Todos - {todoList.length}</h2>
          </div>
          <div className={style.scrollableContainer}>
            <div className={style.todoListContainer}>
              {reversedTodoList.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onComplete={(e) => dispatch(completedTodo(e, todo))}
                    onDelete={(e) => dispatch(deleteTodo(e, todo))}
                    onCopy={(e) => onCopy(e, todo)}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TodoList;
