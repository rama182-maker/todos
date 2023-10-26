import style from "./Todo.module.css";
import { BiCopyAlt, BiTrash } from "react-icons/bi";

const Todo = ({ todo, onCopy }) => {
  return (
    <div className={style.todo}>
      <div className={style.body}>
        <div className={style.titleBox}>
          <h4 className={`${style.title}`}>{todo.title}</h4>
        </div>
        <div className={style.btnContainer}>
          <BiCopyAlt className={`icons ${style.btn}`} onClick={onCopy} />
          <BiTrash className={`icons ${style.btn}`} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
