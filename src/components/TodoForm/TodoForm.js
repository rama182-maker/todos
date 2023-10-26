import { useEffect, useRef } from "react";
import style from "./TodoForm.module.css";

const TodoForm = ({
  edit,
  setAddTodoFormVisible,
  value,
  setValue,
  onSubmit,
}) => {
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const inputHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "cancel") {
      setAddTodoFormVisible(false);
      return;
    }
    if (!value.title) {
      console.log("Please enter value");

      !value.title && titleRef.current.focus();
      return;
    }
    console.log("updated");
    onSubmit();
    setAddTodoFormVisible(false);
  };

  return (
    <form className={style.form} onSubmit={formHandler}>
      <h3>{edit ? "Edit Todo" : "Add New Todo"}</h3>
      <input
        onChange={inputHandler}
        type="text"
        name="title"
        value={value.title}
        placeholder="Title..."
        ref={titleRef}
      />
      <div className={style.btn}>
        <button className={style.cancel} name="cancel" type="submit">
          Cancel
        </button>
        <button className={style.update} name="update" type="submit">
          {edit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;