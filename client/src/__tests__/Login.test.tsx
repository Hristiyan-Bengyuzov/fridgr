import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import Login from "../components/auth/Login/Login";

const mockAxios = new MockAdapter(axios);

describe("Login Component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("renders login form correctly", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText("Log into your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("validates form input and submits login request", async () => {
    const mockLoginResponse = {
      jwtToken: "fakeToken",
      expiration: new Date().toISOString(),
      refreshToken: "fakeRefreshToken",
    };

    mockAxios
      .onPost(`${import.meta.env.VITE_API_URL}/api/Authentication/login`)
      .reply(200, mockLoginResponse);

    const authContextValue = {
      user: null,
      authTokens: null,
      login: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Login />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(authContextValue.login).toHaveBeenCalledWith(mockLoginResponse);
    });
  });

  it("shows validation errors", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(
      await screen.findByText("Please input your username!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please input your password!")
    ).toBeInTheDocument();
  });
});
