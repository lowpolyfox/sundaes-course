import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import "./App.css";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
