import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "../components/Home/Home";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe("Home Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it("renders the component correctly", () => {
    expect(
      screen.getByText(/Browse through our delicous recipes!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Are you tired of staring at your pantry/i)
    ).toBeInTheDocument();
  });

  it("navigates to /recipes when the button is clicked", () => {
    fireEvent.click(screen.getByText(/Start browsing/i));
    expect(mockNavigate).toHaveBeenCalledWith("/recipes");
  });
});
