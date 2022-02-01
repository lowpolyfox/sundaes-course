import { rest } from "msw";

export const handlers = [
  //handlerType.method('URLToMock', (responseResolverFunction) => {});
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.png" },
        { name: "Vanilla", imagePath: "images/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "images/cherries.png" },
        { name: "M&M's", imagePath: "mnms.png" },
        { name: "Hot fudge", imagePath: "hot-fudge.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 3643253 }));
  }),
];
