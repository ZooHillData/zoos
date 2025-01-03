import { render } from "@testing-library/react";

import { RouteComponent } from "../../routes/ui-shad/button";

jest.mock("@zoos/ui-shad", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  buttonVariants: jest.fn(() => "mocked-button-variant"),
  cn: jest.fn(() => "mocked-classname"),
}));

jest.mock("lucide-react", () => ({
  HandHeartIcon: () => <svg data-testid="hand-heart-icon" />,
}));

describe("Button", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<RouteComponent />);
    expect(baseElement).toBeTruthy();
  });
});
