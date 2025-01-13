import { render } from "@testing-library/react";

import NavigationUi from "./navigation-ui";

describe("NavigationUi", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<NavigationUi />);
    expect(baseElement).toBeTruthy();
  });
});
