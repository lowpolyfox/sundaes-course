import {
  render,
  screen,
  waitFor,
} from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "./../../../mocks/server";
import OrderEntry from "./../OrderEntry";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

test("place order button is disabled if no scoops were added", async () => {
  render(<OrderEntry />);

  const placeOrderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(placeOrderButton).toBeDisabled();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1");
  expect(placeOrderButton).toBeEnabled();

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "0");
  expect(placeOrderButton).toBeDisabled();
});
