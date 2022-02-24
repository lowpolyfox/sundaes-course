import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./../App";

describe("full customer flow tests", () => {
  test("golden path: user creates order with all options", async () => {
    render(<App />);

    // add scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    const chocolateInput = screen.getByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");

    // we don't have to await for this element. we awaited the
    // scoop element and both come from the same axios request
    const cherriesInput = screen.getByRole("checkbox", {
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

    // the display of these elements depends on the previous tests
    const scoopsHeading = screen.getByRole("heading", {
      name: "Scoops: $6.00",
      level: 2,
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", {
      name: "Toppings: $1.50",
      level: 2,
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

    // confirmation page tests
    const orderLoadingLabel = screen.getByText(/loading/i);
    expect(orderLoadingLabel).toBeInTheDocument();

    const confirmationPageTitle = await screen.findByRole("heading", {
      name: /thank you/i,
      level: 1,
    });
    expect(confirmationPageTitle).toBeInTheDocument();

    // a 'queryBy' query is useful for asserting that an element is not present
    const notLoadingLabel = screen.queryByText(/loading/i);
    expect(notLoadingLabel).not.toBeInTheDocument();

    // orderNumber is returned by our order mock service worker handler
    const orderNumber = screen.getByText("Your order number is: ", {
      exact: false,
    });
    expect(orderNumber).toHaveTextContent("3643253");

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole("button", {
      name: /create new order/i,
    });
    userEvent.click(newOrderButton);

    // check that scoops and toppings have been reset on new order entry page
    const newScoopsTotal = screen.getByText("Scoops total: $0.00");
    expect(newScoopsTotal).toBeInTheDocument();
    const newToppingsTotal = screen.getByText("Toppings total: $0.00");
    expect(newToppingsTotal).toBeInTheDocument();

    // we await the new controls rendered by our response to avoid 'act()' error
    await screen.findByRole("spinbutton", { name: "Vanilla" });
    await screen.findByRole("spinbutton", { name: "Chocolate" });
  });

  test("toppings header is not rendered if no toppings are added", async () => {
    render(<App />);

    // add scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");

    const placeOrderButton = screen.getByRole("button", {
      name: /order sundae!/i,
    });
    userEvent.click(placeOrderButton);

    const scoopsHeading = screen.getByRole("heading", {
      name: "Scoops: $6.00",
      level: 2,
    });
    expect(scoopsHeading).toBeInTheDocument();

    const optionalToppingsHeading = screen.queryByText("Toppings: $0.00");
    expect(optionalToppingsHeading).not.toBeInTheDocument();
  });
});
