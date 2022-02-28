import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [valid, setValid] = useState(true);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    const valueIsValid = value >= 0 && value <= 10 && Number.isInteger(value);

    setValid(valueIsValid);

    if (valueIsValid) updateItemCount(name, value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />

      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}>
        <Form.Label column xs='6' style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: "left" }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!valid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
