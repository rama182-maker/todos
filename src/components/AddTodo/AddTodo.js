import { useState } from "react";
import { useTodos } from "../Context";
import TodoAdd from "../TodoAdd/TodoAdd";

const AddTodo = () => {
  const { searchValue } = useTodos();
  const [addTodoFormVisible, setAddTodoFormVisible] = useState(false);

  const openAddTodoForm = () => {
    setAddTodoFormVisible(true);
  };

  return (
    <section className="container">
      {!searchValue && (
        <>
          <button onClick={openAddTodoForm}>Add Todo</button>

          {addTodoFormVisible && (
            <section>
              <TodoAdd setAddTodoFormVisible={setAddTodoFormVisible} />
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default AddTodo;
