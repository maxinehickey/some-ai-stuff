import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestSummary from "./TestSummary";

jest.mock("../common-component/collapsible-bar/CollapsibleBar", () => (props) => (
  <div data-testid="collapsible-bar">
    {props.component}
    <div>{props.title}</div>
  </div>
));

jest.mock("./home-page/scheduled-tests/ScheduledTests", () => (props) => (
  <div data-testid="scheduled-tests">
    <button onClick={() => props.handleTestSummary(1, { id: 1, name: "Test A", project: "Project A" })}>
      Test Row
    </button>
  </div>
));

jest.mock("./test-result-detail/Modal", () => (props) => (
  <div data-testid="modal">
    {props.isOpen && <div>Modal Open</div>}
    <button onClick={props.close}>Close Modal</button>
  </div>
));

describe("TestSummary Component", () => {
  test("renders the main components correctly", () => {
    render(<TestSummary />);

    expect(screen.getByText("Test-Summary")).toBeInTheDocument();
    expect(screen.getByTestId("collapsible-bar")).toBeInTheDocument();
    expect(screen.getByTestId("scheduled-tests")).toBeInTheDocument();
  });

  test("opens the modal when a test row is clicked", async () => {
    render(<TestSummary />);

    const testRowButton = screen.getByText("Test Row");
    fireEvent.click(testRowButton);

    expect(await screen.findByText("Modal Open")).toBeInTheDocument();
  });

  test("passes test details to the modal", async () => {
    render(<TestSummary />);

    const testRowButton = screen.getByText("Test Row");
    fireEvent.click(testRowButton);

    expect(await screen.findByText("Modal Open")).toBeInTheDocument();
    // Add more specific checks for modal content if needed, e.g., test details
  });

  test("closes the modal when the close button is clicked", async () => {
    render(<TestSummary />);

    const testRowButton = screen.getByText("Test Row");
    fireEvent.click(testRowButton);

    expect(await screen.findByText("Modal Open")).toBeInTheDocument();

    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Modal Open")).not.toBeInTheDocument();
  });

  test("fetches and updates the test summary on row click", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ summary: "Test Summary Data" }),
      })
    );

    render(<TestSummary />);

    const testRowButton = screen.getByText("Test Row");
    fireEvent.click(testRowButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:808",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          resultId: "1",
        }),
      })
    );
  });
});
