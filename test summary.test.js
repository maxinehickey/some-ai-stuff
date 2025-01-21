import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestManagementPage from "./TestManagementPage";

// Mock the API service
jest.mock("../../api-service/portalApiService", () => ({
  fetchTestConfig: jest.fn(() =>
    Promise.resolve({
      project: "Sample Project",
      application_name: "Sample Application",
      scenario_name: "Sample Scenario",
      test_type: "Smoke Test",
      test_duration: "5 mins",
      user_count: 100,
    })
  ),
}));

// Mock the fetch function for the "Execute Test" button
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ status: "success" }),
  })
);

describe("TestManagementPage Component", () => {
  it("renders the component with default test configuration", async () => {
    render(<TestManagementPage />);

    // Assert that the headings and labels are displayed
    expect(screen.getByText("Test Information")).toBeInTheDocument();
    expect(screen.getByText("Project Name:")).toBeInTheDocument();
    expect(screen.getByText("Application Name:")).toBeInTheDocument();
    expect(screen.getByText("Scenario Name:")).toBeInTheDocument();
    expect(screen.getByText("Test type:")).toBeInTheDocument();

    // Assert default values are rendered
    expect(await screen.findByDisplayValue("Sample Project")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample Application")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample Scenario")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Smoke Test")).toBeInTheDocument();
  });

  it("executes the test when the Execute Test button is clicked", async () => {
    render(<TestManagementPage />);

    // Find the Execute Test button and click it
    const executeTestButton = screen.getByValue("Execute Test");
    fireEvent.click(executeTestButton);

    // Ensure the fetch call was made
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/ptaf-self-service/push-to-repo",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
    );
  });
});
