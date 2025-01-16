import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestSummary from "./TestSummary";

jest.mock("../common-component/collapsible-bar/CollapsibleBar", () => (props) => (
  <div>{props.title}</div>
));

jest.mock("./home-page/scheduled-tests/ScheduledTests", () => (props) => (
  <div data-testid="scheduled-tests">Scheduled Tests</div>
));

describe("TestSummary Component", () => {
  test("renders CollapsibleBar with the correct title", () => {
    render(<TestSummary />);
    expect(screen.getByText("Filter Reports")).toBeInTheDocument();
  });

  test("renders ScheduledTests inside CollapsibleBar", () => {
    render(<TestSummary />);
    expect(screen.getByTestId("scheduled-tests")).toBeInTheDocument();
  });
});
