import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../Search/Search";

// Mock the useTodos and useTodosAction hooks
jest.mock("../Context", () => ({
  useTodos: () => ({ searchValue: "" }),
  useTodosAction: () => ({
    searchTodo: jest.fn(),
  }),
}));

test("Search component should render correctly", () => {
  render(<Search />);
  // Check if the Search input is rendered
  const searchInput = screen.getByPlaceholderText("Search...");
  expect(searchInput).toBeInTheDocument();
});
