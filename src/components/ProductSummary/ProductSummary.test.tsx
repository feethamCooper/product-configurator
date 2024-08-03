import { screen, render } from "@testing-library/react";
import { IProduct } from "types";
import ProductSummary from ".";

const selectedProduct: IProduct = {
  id: "2",
  label: "Hardcover Notebook",
  productId: "hardcover-notebook",
  attributes: [
    {
      id: "cc1",
      type: "COVER_COLOUR",
      value: "red",
      label: "Sunset",
      selectable: true,
    },
    {
      id: "pt1",
      type: "PAPER_TYPE",
      value: "lined",
      label: "Lined",
      selectable: true,
    },
    {
      id: "pc1",
      type: "PAGE_COUNT",
      value: 176,
      label: "176",
      selectable: false,
    },
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  price: 15,
  imageSrc: "product-shot.jpeg",
};

describe("ProductSummary component", () => {
  test("renders correct number of records", async () => {
    render(<ProductSummary selectedProduct={selectedProduct} />);
    const numberOfRows = (await screen.findAllByTestId("product-summary__row"))
      .length;
    expect(numberOfRows).toBe(4);
  });
});
