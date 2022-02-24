import Options from "./Options";
import { useOrderDetails } from "./../../contexts/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const orderDisabled = orderDetails.totals.scoops === "$0.00";

  const handlePlaceOrder = () => {
    setOrderPhase("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={handlePlaceOrder} disabled={orderDisabled}>
        Order sundae!
      </button>
    </div>
  );
};

export default OrderEntry;
