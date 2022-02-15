import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./../App";

test("golden path: customer flow without errors", async () => {
  render(<App />);

  // add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  // we don't have to await for this element. we already awaited the
  // vanilla one, and both come from axios requests
  const chocolateInput = screen.getByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
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
  const summaryTitle = screen.getByRole("heading", {
    name: /order summary/i,
    level: 1,
  });
  expect(summaryTitle).toBeInTheDocument();

  // it's good practice to test that our elements display the
  // correct information based on our bussiness logic.
  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
    level: 2,
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    leve: 2,
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["2 Vanilla", "1 Chocolate", "Cherries"]);

  // accept terms and conditions and confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmOrderButton).toBeEnabled();
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const orderLoading = screen.getByText(/loading/i);
  expect(orderLoading).toBeInTheDocument();

  const confirmationPageTitle = await screen.findByRole("heading", {
    name: /thank you/i,
    level: 1,
  });
  // queryBy* is used when we expect that the element is NOT
  // on the document
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
  expect(confirmationPageTitle).toBeInTheDocument();

  // order number equals our mock service worker handler response
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
  const newScoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(newScoopsTotal).toBeInTheDocument();
  const newToppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(newToppingsTotal).toBeInTheDocument();

  // wait for items to render to avoid '...wrapped in act(...)' error
  // after tests ends and we return to Order Entry page.
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("spinbutton", { name: "Chocolate" });
});
