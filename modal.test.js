import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

jest.mock("react-icons/md", () => ({
  MdDownloadForOffline: () => <button data-testid="download-icon">Download</button>,
  MdClose: () => <button data-testid="close-icon">Close</button>,
}));

describe("Modal Component", () => {
  const mockClose = jest.fn();
  const mockData = {
    totalRequestCountSuccess: 100,
    totalRequestCountFailure: 5,
  };
  const mockTestDetails = { resultid: 1, project: "TestProject", name: "TestName" };

  test("does not render when isOpen is false", () => {
    render(<Modal isOpen={false} close={mockClose} data={mockData} testDetails={mockTestDetails} />);
    expect(screen.queryByText("Success Requests")).not.toBeInTheDocument();
  });

  test("renders correctly when isOpen is true", () => {
    render(<Modal isOpen={true} close={mockClose} data={mockData} testDetails={mockTestDetails} />);
    expect(screen.getByText("Success Requests")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  test("calls close function when close button is clicked", () => {
    render(<Modal isOpen={true} close={mockClose} data={mockData} testDetails={mockTestDetails} />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });
});
