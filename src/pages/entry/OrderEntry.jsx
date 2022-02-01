import Options from "./Options";
import { useOrderDetails } from "./../../contexts/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const handlePlaceOrder = () => {
    setOrderPhase("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={handlePlaceOrder}>Order sundae!</button>
    </div>
  );
};

export default OrderEntry;
