import { render, screen } from "./../../../test-utils/testing-library-utils";

import Options from "./../Options";

describe("order entry displays correct images for scoops and toppings", () => {
  test("displays correct image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

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
    render(<Options optionType="toppings" />);

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
});
