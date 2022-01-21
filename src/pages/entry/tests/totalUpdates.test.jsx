import { render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

describe("update subtotals when parameters change", () => {
  test("update scoop subtotal when scoops change", async () => {
    render(<Options optionType='scoops' />);

    // make sure subtotal starts at 0
    const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
  });

  // tick another box, assert subtotal (make sure both are handled)
  // untick one box, check subtotal
  test("update topping subtotal when toppings change", async () => {
    render(<Options optionType='toppings' />);

    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    // default topping subtotal
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // tick one box, assert subtotal
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesInput).not.toBeChecked();
    userEvent.click(cherriesInput);
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    const hotFudgeInput = await screen.findByRole("checkbox", { name: "Hot fudge" });
    expect(hotFudgeInput).not.toBeChecked();
    userEvent.click(hotFudgeInput);
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    userEvent.click(cherriesInput);
    expect(cherriesInput).not.toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });
});
