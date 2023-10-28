import React from "react";
import { render, screen } from "@testing-library/react";
import Todo from "../Todo/Todo";

const sampleTodo = {
  id: Date.now(),
  title: "Sample Todo",
  isComplete: false,
};

test("Todo component should render correctly", () => {
  render(
    <Todo
      todo={sampleTodo}
      onComplete={() => {}}
      onDelete={() => {}}
      onCopy={() => {}}
    />
  );
  // Check if the Todo title is rendered
  const todoTitle = screen.getByText("Sample Todo");
  expect(todoTitle).toBeInTheDocument();
});
