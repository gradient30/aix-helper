import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import { ProtectedRoute } from "@/components/ProtectedRoute";

const useAuthMock = vi.fn();
const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => useAuthMock(),
}));

function AuthLocation() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}${location.hash}`}</div>;
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useAuthMock.mockReset();
  });

  it("redirects recovery hash requests to auth reset mode", () => {
    useAuthMock.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/#access_token=abc&type=recovery"]} future={routerFuture}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><div>private</div></ProtectedRoute>} />
          <Route path="/auth" element={<AuthLocation />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("location").textContent).toBe("/auth?mode=reset#access_token=abc&type=recovery");
  });

  it("redirects normal unauthenticated requests to auth", () => {
    useAuthMock.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/providers"]} future={routerFuture}>
        <Routes>
          <Route path="/providers" element={<ProtectedRoute><div>private</div></ProtectedRoute>} />
          <Route path="/auth" element={<AuthLocation />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("location").textContent).toBe("/auth");
  });

  it("renders children when user is authenticated", () => {
    useAuthMock.mockReturnValue({ user: { id: "u1" }, loading: false });

    render(
      <MemoryRouter initialEntries={["/providers"]} future={routerFuture}>
        <Routes>
          <Route path="/providers" element={<ProtectedRoute><div>private</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("private")).toBeInTheDocument();
  });
});
