import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthContext } from "../contexts/AuthContext";
import NavLinks from "../components/Navbar/NavLinks";
import { MemoryRouter } from "react-router-dom";

const renderNavLinks = (user: object | null = null, setExpanded = vi.fn()) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user } as any}>
        <NavLinks expanded={true} setExpanded={setExpanded} />
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe("NavLinks Component", () => {
  it("should render navigation links correctly when user is authenticated", () => {
    const user = {
      username: "testuser",
      image: "test-image-url",
    };

    renderNavLinks(user);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Recipes")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should render navigation links correctly when user is not authenticated", () => {
    renderNavLinks();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Recipes")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should call setExpanded with false when a link is clicked", () => {
    const setExpanded = vi.fn();
    renderNavLinks(null, setExpanded);

    fireEvent.click(screen.getByText("Home"));

    expect(setExpanded).toHaveBeenCalledWith(false);
  });
});
