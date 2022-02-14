import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("entry");

  // default to order entry
  let StepComponent = OrderEntry;

  switch (orderPhase) {
    case "entry":
      StepComponent = OrderEntry;
      break;
    case "review":
      StepComponent = OrderSummary;
      break;
    case "confirmation":
      StepComponent = OrderConfirmation;
      break;
    default:
    // do nothing, default case has already been handled
  }
  return (
    <OrderDetailsProvider>
      <Container>
        <StepComponent setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
