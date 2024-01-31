import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("App component fetches movies on click of Fetch Movies button", async () => {
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

  // Wait for the async operation to complete
  await waitFor(() => {
    // Check if the MoviesList component is rendered with the fetched movie
    const movieTitleElement = screen.getByText("A New Hope");
    expect(movieTitleElement).toBeInTheDocument();
  });

  // Restore the original fetch function
  global.fetch.mockRestore();
});
