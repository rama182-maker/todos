import "./App.css";
import Search from "./components/Search/Search";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";

function App() {
  return (
    <main className="main">
      <AddTodo />
      <Search />
      <TodoList />
    </main>
  );
}

export default App;
