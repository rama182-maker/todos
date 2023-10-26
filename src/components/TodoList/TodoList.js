import style from "./TodoList.module.css";
import Todo from "../Todo/Todo";
import Section from "../../components/Section/Section";
import TodoEdit from "../TodoEdit/TodoEdit";
import { useState } from "react";

// Static Data
const todoList = [
  {
    id: 1,
    title: "first todo",
  },
  {
    id: 2,
    title: "second todo",
  },
  {
    id: 3,
    title: "third todo",
  },
  {
    id: 4,
    title: "fourth todo",
  },
];

const TodoList = () => {
  const [addTodoFormVisible, setAddTodoFormVisible] = useState();
  const [editValue, setEditValue] = useState();

  const onCopy = async (e, value) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value.title);
      alert(`Title - [${value.title}] copied to clipboard`);
    } catch (error) {
      console.error("Failed to Copy Title to clipboard", error);
    }
  };

  return (
    <section className={`container ${style.todoList}`}>
      <div>
        <h2>Todos</h2>
        {addTodoFormVisible && (
          <Section>
            <TodoEdit
              setAddTodoFormVisible={setAddTodoFormVisible}
              value={editValue}
              setValue={setEditValue}
            />
          </Section>
        )}
      </div>
      {todoList.length === 0 ? (
        <h2 className={style.empty}>{"No Todos Found"}</h2>
      ) : (
        todoList.map((todo) => {
          return (
            <Todo todo={todo} key={todo.id} onCopy={(e) => onCopy(e, todo)} />
          );
        })
      )}
    </section>
  );
};

export default TodoList;
