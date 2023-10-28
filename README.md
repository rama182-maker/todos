# Simple Todo Application

A simple Todo React Application.

Live Application on vercel :

Features :

- Allow users to add todos in todo list.
- Allow users to search todos from the todo list.
- Allow users to strikeout a todo to indicate it as complete.
- Allow users to copy todo to clipboard.
- Allow users to delete a todo from todo list.

## Components

- Context - component providiong the context to all the other components to consume the states and corresponding actions.
- AddTodo - component to add a new todo having TodoForm component.
- Search - component to search a todo.
- TodoList - component where all todods get added to.
- Todo - component of actual todo where timestamp, copy, delete functioanlites are rendered.

```javascript
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
```

### 1. Context Component

- Creating the context for storing the initial states and actions based on which states changes.

```javascript
const TodoContainerContext = createContext();
const TodoContainerContextDispatcher = createContext();

const Context = ({ children }) => {
  const initialState = {
    searchValue: "",
    todos: [],
    todoList: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) dispatch(saveLocal(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
    dispatch(updateTodoList(state.todos));
  }, [dispatch, state.todos]);

  return (
    <TodoContainerContext.Provider value={state}>
      <TodoContainerContextDispatcher.Provider value={dispatch}>
        {children}
      </TodoContainerContextDispatcher.Provider>
    </TodoContainerContext.Provider>
  );
};

export default Context;

export const useTodos = () => useContext(TodoContainerContext);
export const useTodosAction = () => useContext(TodoContainerContextDispatcher);
```

- Creating reducer function responsible for specifying how the state should be updated in response to various actions.

- To make changes to the state, we dispatch actions using the dispatch function obtained from useReducer.

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodosHandler(state, action);
    case DELETE_TODO:
      return deleteHandler(state, action);
    case COMPLETED_TODO:
      return completedHandler(state, action);
    case SEARCH:
      return searchHandler(state, action);
    case UPDATE_TODOLIST:
      return { ...state, todoList: action.payload };
    case SAVE_LOCAL:
      return { ...state, todos: action.todos };
    default:
      return state;
  }
};
```

- Created add, search, delete, make complete todo functions consumed by other components using dispatch.

```javascript
const addTodosHandler = (state, action) => {
  const newTodo = {
    title: action.payload.title,
    id: new Date().getTime(),
    isComplete: false,
  };
  return {
    ...state,
    todos: [...state.todos, newTodo],
  };
};

const searchHandler = (state, action) => {
  const filtered = state.todos.filter((item) => {
    return item.title.toLowerCase().includes(action.payload.toLowerCase());
  });
  return { ...state, searchValue: action.payload, todoList: filtered };
};

const deleteHandler = (state, action) => {
  action.event.stopPropagation();
  const deletedTodo = state.todos.filter(
    (item) => item.id !== action.payload.id
  );
  return { ...state, todos: deletedTodo };
};

const completedHandler = (state, action) => {
  action.event.stopPropagation();
  const index = state.todos.findIndex((item) => {
    return item.id === action.payload.id;
  });
  const selectTodo = { ...state.todos[index] };
  selectTodo.isComplete = !selectTodo.isComplete;
  const cloneTodo = [...state.todos];
  cloneTodo[index] = selectTodo;
  return { ...state, todos: cloneTodo };
};
```

### 2. Add Todo Component

- Show the Todo Form when there is no search value and Add Todo button is fired.

```javascript
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
```

### 3. TodoForm Component

- Form having todo title input, Cancel, Add buttons & handling the form submit.

```javascript
const TodoForm = ({ setAddTodoFormVisible, value, setValue, onSubmit }) => {
  return (
    <form className={style.form} onSubmit={formHandler}>
      <h3>Add New Todo</h3>
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
        <button className={style.add} name="add" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
```

### 4. Search Component

A input field consuming the searchValue from context and performing the search action when the dispatch of searchHandler is fired.

```javascript
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
```

### 5. TodoList Component

- We consume the state, dispacth actions form the Context, here the we consume todoList, searchValue. Conditional rendering is done based on the length of todoList and searchValue that we consumed.
- Copy todo function is created to get fired up on the click.

```javascript
const TodoList = () => {
  const dispatch = useTodosAction();
  const { todoList, searchValue } = useTodos();

  const onCopy = async (e, value) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value.title);
      alert(`Title - [${value.title}] copied to clipboard`);
    } catch (error) {
      console.error("Failed to Copy Title to clipboard", error);
    }
  };

  // Latest first
  const reversedTodoList = todoList.slice().reverse();

  return (
    <section className={`container ${style.todoList}`}>
      {todoList.length === 0 ? (
        <>
          <div>
            <h2>Todos</h2>
          </div>
          <h2 className={style.empty}>
            {searchValue ? "No Todos Found" : "(Empty) Add Todos"}
          </h2>
        </>
      ) : (
        <>
          <div>
            <h2>Todos - {todoList.length}</h2>
          </div>
          <div className={style.scrollableContainer}>
            <div className={style.todoListContainer}>
              {reversedTodoList.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onComplete={(e) => dispatch(completedTodo(e, todo))}
                    onDelete={(e) => dispatch(deleteTodo(e, todo))}
                    onCopy={(e) => onCopy(e, todo)}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TodoList;
```

### 6. Todo Component

- Consumed states/actions are passed to Todo component to use here and dispatch performs actions based on the make todo complete, delete.
- Timestamp is formatted from the id (new Date().getTime()) that we set in the context at the creation of a new todo.

```javascript
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
```

## Adding Tests

Added some basic tests for the components using jest.

- Mocking the functions, states using jest.
- expect().toBeInTheDocument() - expecting some field to be present in the document after rendering.
- expect().toBeNull(); - expecting some field not to be present in the document after rendering.
- fireEvent - To fireup a event and expecting the value to be present/not present in the document.
