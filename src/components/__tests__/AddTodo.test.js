import { render, screen } from "@testing-library/react";
import AddTodo from "../AddTodo/AddTodo";

jest.mock("../Context", () => ({
  useTodos: () => ({ searchValue: "" }),
}));

test("AddTodo component should render correctly", () => {
  render(<AddTodo />);
  // "Add Todo" button is initially visible
  const addTodoButton = screen.getByText("Add Todo");
  expect(addTodoButton).toBeInTheDocument();
});

test("TodoAdd component should be hidden by default", () => {
  render(<AddTodo />);
  // Component is initially not visible
  const todoAddComponent = screen.queryByTestId("todo-add-component");
  expect(todoAddComponent).toBeNull();
});
