import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  let scoopItems = [];
  let toppingItems = [];

  let scoopsList = null;
  for (const [key, value] of orderDetails.scoops.entries()) {
    scoopItems.push(`${value} ${key}`);
  }

  scoopsList = scoopItems.map((item) => (
    <li key={item}>{item}</li>
  ));


  let toppingsRender = null;
  if (orderDetails.toppings.size > 0) {
    for (const item of orderDetails.toppings.keys()) {
      toppingItems.push(item);
    }

    toppingsRender = (
      <>
        <h2>
          Toppings: <span>{orderDetails.totals.toppings}</span>
        </h2>
        {toppingItems && (
          <ul>
            {toppingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>
        {scoopsList}
      </ul>

      {toppingsRender}

      <h3>Total: {orderDetails.totals.grandTotal}</h3>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
};

export default OrderSummary;
