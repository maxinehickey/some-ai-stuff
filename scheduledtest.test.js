import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ScheduledTests from "./ScheduledTests";

describe("ScheduledTests Component", () => {
  // Mock the `fetch` API
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              name: "Test A",
              project: "Project Alpha",
              id: 1,
              status: "Completed",
              terminationReason: "N/A",
              startDate: "2025-01-01T10:00:00Z",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers correctly", async () => {
    render(<ScheduledTests />);

    const headers = ["Test Name", "Project Name", "ID", "Status", "Reason", "Date"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("fetches and displays data correctly", async () => {
    render(<ScheduledTests />);

    // Wait for the data to load
    const testName = await screen.findByText("Test A");
    const projectName = screen.getByText("Project Alpha");
    const status = screen.getByText("Completed");
    const terminationReason = screen.getByText("N/A");

    expect(testName).toBeInTheDocument();
    expect(projectName).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(terminationReason).toBeInTheDocument();
  });

  test("highlights row on hover", async () => {
    render(<ScheduledTests handleTestSummary={() => {}} />);

    const row = await screen.findByText("Test A").closest("tr");
    fireEvent.mouseEnter(row);

    expect(row).toHaveStyle("background-color: lightgray");

    fireEvent.mouseLeave(row);

    expect(row).toHaveStyle("background-color: white");
  });

  test("calls handleTestSummary when a row is clicked", async () => {
    const handleTestSummary = jest.fn();
    render(<ScheduledTests handleTestSummary={handleTestSummary} />);

    const row = await screen.findByText("Test A").closest("tr");
    fireEvent.click(row);

    expect(handleTestSummary).toHaveBeenCalledWith(0, {
      name: "Test A",
      project: "Project Alpha",
      id: 1,
      status: "Completed",
      terminationReason: "N/A",
      startDate: "2025-01-01T10:00:00Z",
    });
  });

  test("handles fetch errors gracefully", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("Fetch error"));

    render(<ScheduledTests />);
    const error = screen.queryByText("Error fetching data:");
    expect(error).not.toBeInTheDocument(); // Confirm no UI crash
  });
});
