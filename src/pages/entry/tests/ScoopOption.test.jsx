import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "./../ScoopOption";

test("component shows error state if input value is invalid", () => {
  // invalid values are: negative and decimal numbers, and any number above 10
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  const inputElement = screen.getByRole("spinbutton");
  expect(inputElement).not.toHaveClass("is-invalid");

  userEvent.clear(inputElement);
  userEvent.type(inputElement, "-2");
  expect(inputElement).toHaveClass("is-invalid");

  userEvent.clear(inputElement);
  userEvent.type(inputElement, "1.5");
  expect(inputElement).toHaveClass("is-invalid");

  userEvent.clear(inputElement);
  userEvent.type(inputElement, "11");
  expect(inputElement).toHaveClass("is-invalid");

  userEvent.clear(inputElement);
  userEvent.type(inputElement, "3");
  expect(inputElement).not.toHaveClass("is-invalid");
});
