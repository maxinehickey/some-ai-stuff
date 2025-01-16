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

// Mock the fetch for handleExecuteTest
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ status: "Success" }),
  })
);

describe("TestManagementPage Component", () => {
  test("renders correctly with initial state", async () => {
    render(<TestManagementPage />);

    // Check for the static text
    expect(screen.getByText("Test Information")).toBeInTheDocument();
    expect(screen.getByText("Disclaimer: Please verify the above test configuration details.")).toBeInTheDocument();
    expect(screen.getByText("To update the test configuration details please navigate to")).toBeInTheDocument();

    // Check for disabled inputs with placeholder text before API resolves
    expect(screen.getByDisplayValue("Project")).toBeDisabled();
    expect(screen.getByDisplayValue("Application Name")).toBeDisabled();
    expect(screen.getByDisplayValue("Scenario Name")).toBeDisabled();
    expect(screen.getByDisplayValue("Test Type")).toBeDisabled();
    expect(screen.getByDisplayValue("Test Duration")).toBeDisabled();
    expect(screen.getByDisplayValue("User Count")).toBeDisabled();
  });

  test("loads and displays test configuration data", async () => {
    render(<TestManagementPage />);

    // Wait for the data to load and verify updated inputs
    const projectInput = await screen.findByDisplayValue("Sample Project");
    const applicationInput = screen.getByDisplayValue("Sample Application");
    const scenarioInput = screen.getByDisplayValue("Sample Scenario");
    const testTypeInput = screen.getByDisplayValue("Smoke Test");
    const testDurationInput = screen.getByDisplayValue("5 mins");
    const userCountInput = screen.getByDisplayValue("100");

    expect(projectInput).toBeInTheDocument();
    expect(applicationInput).toBeInTheDocument();
    expect(scenarioInput).toBeInTheDocument();
    expect(testTypeInput).toBeInTheDocument();
    expect(testDurationInput).toBeInTheDocument();
    expect(userCountInput).toBeInTheDocument();
  });

  test("triggers test execution on button click", async () => {
    render(<TestManagementPage />);

    // Wait for API to load data
    await screen.findByDisplayValue("Sample Project");

    const executeButton = screen.getByDisplayValue("Execute Test");

    // Simulate button click
    fireEvent.click(executeButton);

    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/ptaf-self-service/push-to-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  });

  test("handles API call failure gracefully", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error("Network Error")));

    render(<TestManagementPage />);

    // Wait for API to load
    const executeButton = await screen.findByDisplayValue("Execute Test");

    // Simulate button click
    fireEvent.click(executeButton);

    // Check for console.error (you may mock it for more specific testing)
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
