import { render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "./../Options";

test("displays correct image for each scoop option from server", async () => {
  render(<Options optionType='scoops' />);

  // anytime you are waiting for something to appear asynchronously on the page,
  // you must use await findBy*
  // ex: modals, popovers, server calls...

  // the name value in an image element is the alt text
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  const altTexts = scoopImages.map((image) => image.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays correct images for each topping option from server", async () => {
  render(<Options optionType='toppings' />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((image) => image.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&M's topping",
    "Hot fudge topping",
  ]);
});

test("scoops subtotal does not change if input is invalid", async () => {
  render(<Options optionType='scoops' />);

  const scoopInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "-2");

  const scoopSubtotal = screen.getByText("Scoops total: ", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("Scoops total: $0.00");
});
