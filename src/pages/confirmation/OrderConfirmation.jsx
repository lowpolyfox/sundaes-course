import axios from "axios";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http:localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }

  const handleNewOrder = () => {
    resetOrder();
    setOrderPhase("entry");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <h2>Your order number is: {orderNumber}</h2>
        <p style={{ fontSize: "0.75em" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <button onClick={handleNewOrder}>Create new order</button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
