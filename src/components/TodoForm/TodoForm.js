import { useEffect, useRef } from "react";
import style from "./TodoForm.module.css";

const TodoForm = ({ edit }) => {
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <form className={style.form}>
      <h3>{edit ? "Edit Todo" : "Add New Todo"}</h3>
      <input type="text" name="title" placeholder="Title..." ref={titleRef} />
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
