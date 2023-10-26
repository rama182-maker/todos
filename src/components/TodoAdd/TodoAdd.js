import TodoForm from "../../components/TodoForm/TodoForm";
import { useState } from "react";

const TodoAdd = ({ setAddTodoFormVisible }) => {
  const [value, setValue] = useState({ title: "" });

  return (
    <section className="container">
      <TodoForm
        setAddTodoFormVisible={setAddTodoFormVisible}
        value={value}
        setValue={setValue}
      />
    </section>
  );
};

export default TodoAdd;
