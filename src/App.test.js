import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App component fetches movies on app load and", () => {
  test("renders loading text while fetching movies", async () => {
    render(<App />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders movies when movies are fetched successfully", async () => {
    // Mock the fetch function to return some dummy movies
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({ results: [{ episode_id: 1, title: "Movie 1" }] }),
      ok: true,
    });

    render(<App />);
    const movieElement = await screen.findByText(/Movie 1/i);
    expect(movieElement).toBeInTheDocument();
  });

  test("renders error message when there's an error fetching movies", async () => {
    // Mock the fetch function to simulate an error
    jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Test error"));

    render(<App />);
    const errorMessageElement = await screen.findByText(/Test error/i);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
