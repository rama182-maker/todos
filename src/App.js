import "./App.css";
import Search from "./components/Search/Search";
import TodoList from "./components/TodoList/TodoList";
import Context from "./components/Context";
import AddTodo from "./components/AddTodo/AddTodo";

function App() {
  return (
    <main className="main">
      <Context>
        <AddTodo />
        <Search />
        <TodoList />
      </Context>
    </main>
  );
}

export default App;
