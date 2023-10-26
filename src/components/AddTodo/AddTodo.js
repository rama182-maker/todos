import { useState } from "react";
import TodoAdd from "../TodoAdd/TodoAdd";

const AddTodo = () => {
  const [addTodoFormVisible, setAddTodoFormVisible] = useState(false);

  const openAddTodoForm = () => {
    setAddTodoFormVisible(true);
  };

  return (
    <section className="container">
      <button onClick={openAddTodoForm}>Add Todo</button>

      {addTodoFormVisible && (
        <section>
          <TodoAdd setAddTodoFormVisible={setAddTodoFormVisible} />
        </section>
      )}
    </section>
  );
};

export default AddTodo;
