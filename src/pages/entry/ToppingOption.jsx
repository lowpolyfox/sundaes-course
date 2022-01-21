import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}>
        <Col xs='5' style={{ textAlign: "left" }}>
          <Form.Check type='checkbox' label={name} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
