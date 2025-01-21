import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestManagementPage from "./TestManagementPage";

jest.mock("../../api-service/portalApiservice", () => ({
  fetchTestConfig: jest.fn(() => Promise.resolve({
    project: "Test Project",
    application_name: "Test App",
    scenario_name: "Test Scenario",
    test_type: "Smoke Test",
    test_duration: "10 minutes",
    user_count: 100,
  })),
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
    expect(await screen.findByDisplayValue("Test Project")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test App")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Scenario")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Smoke Test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10 minutes")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
  });

  test("calls the handleExecuteTest function when the button is clicked", () => {
    const handleExecuteTestMock = jest.fn();
    render(<TestManagementPage />);

    const executeButton = screen.getByRole("button", { name: "Execute Test" });
    fireEvent.click(executeButton);

    expect(handleExecuteTestMock).toHaveBeenCalled();
  });
});
