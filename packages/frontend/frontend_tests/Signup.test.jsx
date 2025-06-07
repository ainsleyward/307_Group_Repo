import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import "@testing-library/jest-dom";

describe("Signup form", () => {
  function renderForm() {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
    );
  }

  // Test successful form submission
  test("fills and submits the form with valid data", () => {
    renderForm();

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Joe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Jonas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "joejonas@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
  });

  // Test missing required fields
  test("displays error if required fields are missing", () => {
    renderForm();

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  // Test mismatched passwords
  test("displays error if passwords do not match", () => {
    renderForm();

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
