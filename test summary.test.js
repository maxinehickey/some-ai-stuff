import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestManagementPage from "./TestManagementPage";

describe("TestManagementPage Component", () => {

  test("renders test configuration fields with default values", () => {
    render(<TestManagementPage />);

    // Check that the placeholder/default values are displayed
    expect(screen.getByLabelText("Project Name:").value).toBe("Project");
    expect(screen.getByLabelText("Application Name:").value).toBe("Application Name");
    expect(screen.getByLabelText("Scenario Name:").value).toBe("Scenario Name");
    expect(screen.getByLabelText("Test Type:").value).toBe("Test Type");
    expect(screen.getByLabelText("Test Duration:").value).toBe("Test Duration");
    expect(screen.getByLabelText("User Count:").value).toBe("User Count");
  });

  test("calls the handleExecuteTest function when the button is clicked", () => {
    const handleExecuteTestMock = jest.fn();
    render(<TestManagementPage handleExecuteTest={handleExecuteTestMock} />);

    const executeButton = screen.getByRole("button", { name: "Execute Test" });
    fireEvent.click(executeButton);

    expect(handleExecuteTestMock).toHaveBeenCalled();
  });

  test("updates test configuration fields with passed props", () => {
    const testProps = {
      project: "Updated Project",
      application_name: "Updated App",
      scenario_name: "Updated Scenario",
      test_type: "Load Test",
      test_duration: "20 minutes",
      user_count: 200,
    };

    render(<TestManagementPage {...testProps} />);

    // Check that the fields reflect the passed props
    expect(screen.getByLabelText("Project Name:").value).toBe("Updated Project");
    expect(screen.getByLabelText("Application Name:").value).toBe("Updated App");
    expect(screen.getByLabelText("Scenario Name:").value).toBe("Updated Scenario");
    expect(screen.getByLabelText("Test Type:").value).toBe("Load Test");
    expect(screen.getByLabelText("Test Duration:").value).toBe("20 minutes");
    expect(screen
