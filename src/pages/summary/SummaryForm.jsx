import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);

  const handleTcChange = (e) => {
    setTcChecked(e.target.checked);
  };

  const checkboxLabel = (
    <span>
      I agree to the <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          label={checkboxLabel}
          onChange={handleTcChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Place order
      </Button>
    </Form>
  );
};

export default SummaryForm;
