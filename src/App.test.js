import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("App component handles loading and data states as expected", async () => {
  render(<App />);

  // Check if the "Fetch Movies" button is rendered
  const fetchMoviesButton = screen.getByText("Fetch Movies");
  expect(fetchMoviesButton).toBeInTheDocument();

  // Mock the fetch function to return a resolved Promise with dummy data
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      results: [
        {
          episode_id: 1,
          title: "A New Hope",
          release_date: "1977-05-25",
          opening_crawl: "A long time ago in a galaxy far, far away...",
        },
      ],
    }),
  });

  // Simulate a click on the "Fetch Movies" button
  fireEvent.click(fetchMoviesButton);

  // Check if loading message is displayed
  const loadingMessage = screen.getByText("Loading...");
  expect(loadingMessage).toBeInTheDocument();

  // Wait for the async operation to complete
  await waitFor(() => {
    // Check if the MoviesList component is rendered with the fetched movie
    const movieTitleElement = screen.getByText("A New Hope");
    expect(movieTitleElement).toBeInTheDocument();
  });

  // Check if loading message is not displayed after fetching movies
  expect(loadingMessage).not.toBeInTheDocument();

  // Restore the original fetch function
  global.fetch.mockRestore();
});
