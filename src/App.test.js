import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("App component renders error message when request fails", async () => {
  render(<App />);

  // Check if the "Fetch Movies" button is rendered
  const fetchMoviesButton = screen.getByText("Fetch Movies");
  expect(fetchMoviesButton).toBeInTheDocument();

  // Mock the fetch function to return a rejected Promise with an error message
  global.fetch = jest.fn().mockRejectedValue(new Error("Test error"));

  // Simulate a click on the "Fetch Movies" button
  fireEvent.click(fetchMoviesButton);

  // Check if error message is displayed
  const errorMessage = await screen.findByText("Test error");
  expect(errorMessage).toBeInTheDocument();

  // Check if loading message is not displayed after encountering an error
  const loadingMessage = screen.queryByText("Loading...");
  expect(loadingMessage).not.toBeInTheDocument();

  // Restore the original fetch function
  global.fetch.mockRestore();
});
