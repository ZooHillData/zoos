import { render } from "@testing-library/react";

import UiNavigation from "./ui-navigation";

describe("UiNavigation", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
