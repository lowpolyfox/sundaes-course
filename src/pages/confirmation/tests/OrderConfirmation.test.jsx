import { render, screen } from "./../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "./../../../mocks/server";

import OrderConfirmation from "./../OrderConfirmation";

test("shows alert for error when submitting order", async () => {
  // override default msw response from our handler
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toHaveTextContent(
    "An unexpected error ocurred. Please try again later."
  );
});
