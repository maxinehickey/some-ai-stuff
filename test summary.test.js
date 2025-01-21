import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TestManagementPage from "./TestManagementPage";
import { fetchTestConfigs } from "../../api-service/portalApiservice";

jest.mock("../../api-service/portalApiservice", () => ({
  fetchTestConfigs: jest.fn(() =>
    Promise.resolve({
      project: "Test Project",
      application_name: "Test App",
      scenario_name: "Test Scenario",
      test_type: "Smoke Test",
      test_duration: "10 minutes",
      user_count: 100,
    })
  ),
}));

describe("TestManagementPage Component", () => {
  
  test("renders test configuration fields with default values", async () => {
    render(<TestManagementPage />);

    // Check that the placeholder/default values are displayed
    expect(screen.getByLabelText("Project Name:").value).toBe("Project");
    expect(screen.getByLabelText("Application Name:").value).toBe("Application Name");
    expect(screen.getByLabelText("Scenario Name:").value).toBe("Scenario Name");
    expect(screen.getByLabelText("Test Type:").value).toBe("Test Type");
    expect(screen.getByLabelText("Test Duration:").value).toBe("Test Duration");
    expect(screen.getByLabelText("User Count:").value).toBe("User Count");
  });

  test("updates test configuration fields with fetched values", async () => {
    render(<TestManagementPage />);

    // Wait for the test configuration to be fetched and updated
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Project")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test App")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Scenario")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Smoke Test")).toBeInTheDocument();
      expect(screen.getByDisplayValue("10 minutes")).toBeInTheDocument();
      expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    });
  });

  test("calls the handleExecuteTest function when the button is clicked", () => {
    const handleExecuteTestMock = jest.fn();
    render(<TestManagementPage handleExecuteTest={handleExecuteTestMock} />);

    const executeButton = screen.getByRole("button", { name: "Execute Test" });
    fireEvent.click(executeButton);

    expect(handleExecuteTestMock).toHaveBeenCalled();
  });

  test("handles API fetch errors gracefully", async () => {
    // Mock the API fetch to reject with an error
    fetchTestConfigs.mockRejectedValueOnce(new Error("Failed to load"));

    render(<TestManagementPage />);

    // Wait for the error message or indicator to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to load test configurations/i)).toBeInTheDocument();
    });
  });

  test("displays loading indicator while fetching data", async () => {
    // Mock the API fetch with a delay
    fetchTestConfigs.mockReturnValueOnce(
      new Promise(resolve => setTimeout(() => resolve({
        project: "Test Project",
        application_name: "Test App",
        scenario_name: "Test Scenario",
        test_type: "Smoke Test",
        test_duration: "10 minutes",
        user_count: 100,
      }), 1000))
    );

    render(<TestManagementPage />);

    // Check for a loading indicator before the data is fetched
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // After the delay, the data should appear
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Project")).toBeInTheDocument();
    });
  });

});
