import { render, screen, fireEvent } from "@testing-library/react";
import TestSummary from "./TestSummary";

describe("TestSummary Component", () => {
  it("renders the collapsible bar", () => {
    render(<TestSummary />);
    const barTitle = screen.getByText(/Filter Reports/i);
    expect(barTitle).toBeInTheDocument();
  });

  it("opens and closes the modal", () => {
    render(<TestSummary />);

    // Simulate opening the modal
    const barTitle = screen.getByText(/Filter Reports/i);
    fireEvent.click(barTitle); // Simulate clicking the collapsible bar to trigger the modal
    const modal = screen.getByRole("dialog"); // Ensure the modal is now in the document
    expect(modal).toBeInTheDocument();

    // Simulate closing the modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); // Modal should not be present
  });
});
