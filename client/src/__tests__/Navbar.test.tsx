import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Navbar from "../components/Navbar/Navbar";

vi.mock("../components/Navbar/NavToggler", () => ({
  default: (props: any) => (
    <button {...props} data-testid="nav-toggler">
      NavToggler
    </button>
  ),
}));

vi.mock("../components/Navbar/NavLinks", () => ({
  default: (props: any) => (
    <div {...props} data-testid="nav-links">
      NavLinks
    </div>
  ),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("should render the logo image", () => {
    const logo = screen.getByAltText("brand");
    expect(logo).toBeInTheDocument();
  });

  it("should render the mocked NavToggler component", () => {
    const navToggler = screen.getByTestId("nav-toggler");
    expect(navToggler).toBeInTheDocument();
  });

  it("should render the mocked NavLinks component", () => {
    const navLinks = screen.getByTestId("nav-links");
    expect(navLinks).toBeInTheDocument();
  });

  it("should add the sticky class when scrolled down", () => {
    window.scrollY = 30;
    fireEvent.scroll(window, { target: { scrollY: 30 } });
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("sticky");
  });

  it("should not have the sticky class when scrolled to the top", () => {
    window.scrollY = 0;
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    const navbar = screen.getByTestId("navbar");
    expect(navbar).not.toHaveClass("sticky");
  });
});
