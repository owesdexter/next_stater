import React from "react";
import { render, screen } from "../test-utils";
import HomePage from "@pages/index";

describe("HomePage", () => {
  it("should render the heading", () => {
    render(<HomePage />);

    const heading = screen.getByText(
      /Home/i
    );

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument();
  });
});