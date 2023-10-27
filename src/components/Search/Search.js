import style from "./Search.module.css";
import { useTodos, useTodosAction } from "../Context";
import { searchTodo } from "../TodoActionTypes";

const Search = () => {
  const { searchValue } = useTodos();
  const dispatch = useTodosAction();
  return (
    <header className={`container ${style.search}`}>
      <div>
        <input
          value={searchValue}
          onChange={(e) => dispatch(searchTodo(e.target.value))}
          type="text"
          placeholder="Search..."
        />
      </div>
    </header>
  );
};

export default Search;
