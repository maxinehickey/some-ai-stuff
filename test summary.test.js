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
    const handleTestSummary = jest.fn();
    fireEvent.click(screen.getByText(/Filter Reports/i));
    expect(handleTestSummary).toHaveBeenCalledTimes(1);

    // Simulate closing the modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
