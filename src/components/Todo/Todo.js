import style from "./Todo.module.css";
import { BiCopyAlt, BiTrash } from "react-icons/bi";
import { useState } from "react";

const Todo = ({ todo, onComplete, onDelete, onCopy }) => {
  const [show, setShow] = useState(false);
  const clickHandler = (e) => {
    onComplete(e);
    setShow(false);
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className={`${style.todo} ${todo.isComplete && style.todoCompleted}`}>
      <div className={style.body}>
        <div>
          <div className={style.titleBox} onClick={clickHandler}>
            <h4
              className={`${style.title} ${todo.isComplete && style.completed}`}
            >
              {todo.title}
            </h4>
          </div>
          <h6 className={style.createdTime}>
            Created : {formatTimestamp(todo.id)}
          </h6>
        </div>
        <div className={style.completeBox} onClick={() => setShow(!show)}></div>
        <div className={style.btnContainer}>
          <BiCopyAlt className={`icons ${style.btn}`} onClick={onCopy} />
          <BiTrash className={`icons ${style.btn}`} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
