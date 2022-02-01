import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./../App";

test("golden path: customer flow without errors", async () => {
  // render app
  render(<App />);
  // add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  userEvent.clear(vanillaInput);
  userEvent.clear(chocolateInput);

  userEvent.type(vanillaInput, "2");
  userEvent.type(chocolateInput, "1");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesInput);

  // find and click order button
  const placeOrderButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  userEvent.click(placeOrderButton);

  // check summary information based on order
  const summaryTitle = screen.getByRole("heading", { name: /order summary/i });
  expect(summaryTitle).toBeInTheDocument();

  // accept terms and conditions and confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(termsCheckbox);
  expect(confirmOrderButton).toBeEnabled();
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const orderNumber = screen.getByText("Your order number is: ", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("3643253");

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings have been reset
  // do we need to await anything to avoid test errors?
});
