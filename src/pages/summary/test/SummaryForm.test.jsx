import { fireEvent, render, screen } from "@testing-library/react";

import SummaryForm from "./../SummaryForm";

// LEARNING: The test component must be rendered IN EVERY test, not test suite (defined by describe)
describe("Summary form has correct functionality", () => {
  test("button and checkbox initial conditions", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const placeOrderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    expect(termsCheckbox).not.toBeChecked();
    expect(placeOrderButton).toBeDisabled();
  });

  test("checkbox disables and enables button", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const placeOrderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    fireEvent.click(termsCheckbox);
    expect(placeOrderButton).toBeEnabled();

    fireEvent.click(termsCheckbox);
    expect(placeOrderButton).toBeDisabled();
  });
});
