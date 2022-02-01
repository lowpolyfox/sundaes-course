const OrderConfirmation = ({ setOrderPhase }) => {
  const handleNewOrder = () => {
    setOrderPhase("entry");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you</h1>
      <h2>Your order number is: null</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <button onClick={handleNewOrder}>Create new order</button>
    </div>
  );
};

export default OrderConfirmation;
