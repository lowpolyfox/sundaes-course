import React, { useState } from "react";
import { Button, Form, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);

  const handleTcChange = (e) => {
    setTcChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase("confirmation");
  };

  const popover = (
    <Popover id='terms-popover'>
      <Popover.Body>No ice cream will be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to the{" "}
      <OverlayTrigger placement='bottom' overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='terms-and-conditions'>
          <Form.Check
            type='checkbox'
            label={checkboxLabel}
            onChange={handleTcChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit' disabled={!tcChecked}>
          Confirm Order
        </Button>
      </Form>
    </>
  );
};

export default SummaryForm;
