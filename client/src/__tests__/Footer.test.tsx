import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

describe("Footer Component", () => {
  it("contains a link to the GitHub repository", () => {
    render(<Footer />);

    const linkElement = screen.getByRole("link", {
      name: /Open source project/i,
    });

    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/Hristiyan-Bengyuzov/fridgr"
    );
  });
});
