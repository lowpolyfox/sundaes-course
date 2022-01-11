// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server.js";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any requests handlers that we may add during our tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// strings and numbers can use the toBe() matcher, but arrays and objects use the toEqual() matcher.
