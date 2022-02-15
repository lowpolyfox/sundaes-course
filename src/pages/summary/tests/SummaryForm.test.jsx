import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

// LEARNING: The test component must be rendered IN EVERY test, not on top of describe statements
// userEvents simulate user actions in a more realistic way than fireEvent
// when something does not have a particular role, we use getByText()
describe("Summary form has correct functionality", () => {
  test("button and checkbox initial conditions", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const placeOrderButton = screen.getByRole("button", {
      name: /confirm order/i,
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
      name: /confirm order/i,
    });

    userEvent.click(termsCheckbox);
    expect(placeOrderButton).toBeEnabled();

    userEvent.click(termsCheckbox);
    expect(placeOrderButton).toBeDisabled();
  });
});

describe("terms and conditions popover functionality", () => {
  test("popover is hidden by default", () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(/no ice cream will be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
  });

  test("popover appears upon mouseover of checkbox label, then dissapears after mouse unhovers", async () => {
    render(<SummaryForm />);

    const termsCheckbox = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsCheckbox);

    // getByText throws and error if there is no match, but it is a good practice
    // to still write the assertion below for test readability.
    const popover = screen.getByText(/no ice cream will be delivered/i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsCheckbox);
    // queryByText returns null. It is useful for checking if an element exists,
    // which the next assertion will make sure of.

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will be delivered/i)
    );
    // waitForElementToBeRemoved already contains an assertion, we have to remove this
    //expect(nullPopoverAfterInit).not.toBeInTheDocument();
  });
});
