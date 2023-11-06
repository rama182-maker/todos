import { useState, useEffect } from "react";
import { useTodos, useTodosAction } from "../Context";
import TodoAdd from "../TodoAdd/TodoAdd";
import styles from "./AddTodo.module.css";
import { categoryTodo } from "../TodoActionTypes";

const AddTodo = () => {
  const { searchValue } = useTodos();
  const [addTodoFormVisible, setAddTodoFormVisible] = useState(false);
  const dispatch = useTodosAction();
  const [selectedCategory, setSelectedCategory] = useState("");

  const openAddTodoForm = () => {
    setAddTodoFormVisible(true);
  };

  const showCategoryTodos = (category) => {
    setSelectedCategory(category);
    dispatch(categoryTodo(category));
  };

  useEffect(() => {
    if (searchValue === "") {
      setSelectedCategory("");
    }
  }, [searchValue]);

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

          <div className={styles.categories}>
            <button
              onClick={() => showCategoryTodos("")}
              style={{
                backgroundColor: selectedCategory === "" ? "#ffb05f" : "white",
              }}
            >
              All Todos
            </button>
            <button
              onClick={() => showCategoryTodos("work")}
              style={{
                backgroundColor:
                  selectedCategory === "work" ? "#6DD8E0" : "white",
              }}
            >
              Work
            </button>
            <button
              onClick={() => showCategoryTodos("home")}
              style={{
                backgroundColor:
                  selectedCategory === "home" ? "#feff5f" : "white",
              }}
            >
              Home
            </button>
            <button
              onClick={() => showCategoryTodos("hobby")}
              style={{
                backgroundColor:
                  selectedCategory === "hobby" ? "#e79aff" : "white",
              }}
            >
              Hobby
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AddTodo;
