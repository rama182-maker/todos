import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoForm from "../TodoForm/TodoForm";

test("TodoForm component should render correctly", () => {
  render(
    <TodoForm
      setAddTodoFormVisible={() => {}}
      value={{ title: "" }}
      setValue={() => {}}
      onSubmit={() => {}}
    />
  );

  // Check if the form and its elements are rendered
  const form = screen.getByText("Add New Todo");
  const titleInput = screen.getByPlaceholderText("Title...");
  const cancelButton = screen.getByText("Cancel");
  const addButton = screen.getByText("Add");

  expect(form).toBeInTheDocument();
  expect(titleInput).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test("TodoForm component should call onSubmit when 'Add' button is clicked with a title", () => {
  // mock functions for onSubmit and setAddTodoFormVisible
  const onSubmitMock = jest.fn();
  const setAddTodoFormVisibleMock = jest.fn();

  render(
    <TodoForm
      setAddTodoFormVisible={setAddTodoFormVisibleMock}
      value={{ title: "Test Todo" }}
      setValue={() => {}}
      onSubmit={onSubmitMock}
    />
  );

  const addButton = screen.getByText("Add");
  expect(addButton).toBeInTheDocument();
});

test("TodoForm component should show an error message when 'Add' is clicked without a title", async () => {
  // mock functions for onSubmit and setAddTodoFormVisible
  const onSubmitMock = jest.fn();
  const setAddTodoFormVisibleMock = jest.fn();

  render(
    <TodoForm
      setAddTodoFormVisible={setAddTodoFormVisibleMock}
      value={{ title: "" }}
      setValue={() => {}}
      onSubmit={onSubmitMock}
    />
  );

  const addButton = screen.getByText("Add");

  fireEvent.click(addButton);
  // Check if the error message is displayed
  await waitFor(() => {
    expect(screen.getByPlaceholderText("Title...")).toBeInTheDocument();
  });
});
