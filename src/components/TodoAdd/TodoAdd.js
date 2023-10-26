import TodoForm from "../../components/TodoForm/TodoForm";
import { addTodo, useTodosAction } from "../Context";
import { useState } from "react";

const TodoAdd = ({ setAddTodoFormVisible }) => {
  const dispatch = useTodosAction();

  const [value, setValue] = useState({ title: "" });

  const onSubmit = () => {
    dispatch(addTodo(value));
    setValue({ title: "" });
  };

  return (
    <section className="container">
      <TodoForm
        setAddTodoFormVisible={setAddTodoFormVisible}
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default TodoAdd;
