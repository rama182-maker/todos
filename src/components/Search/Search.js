import style from "./Search.module.css";
const Search = () => {
  const searchValue = "search";
  return (
    <header className={`container ${style.search}`}>
      <div>
        <input value={searchValue} type="text" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Search;
