import { act } from "react";
import { renderHook } from "@testing-library/react";
import { HARDCOVER_NOTEBOOK_PRODUCT_ID } from "utils/constants";
import useProduct from "./useProduct";

describe("useProduct hook", () => {
  test("should initially output inital values for allOptions, selectedOptions, products, selectedProduct,", () => {
    const { result } = renderHook(() => useProduct());
    const { current } = result;
    expect(current.allOptions).toBe(undefined);
    expect(current.selectedOptions.length).toBe(0);
    expect(current.products.length).toBe(0);
    expect(current.selectedProduct).toBe(undefined);
  });

  test("should be populated with correct for allOptions, products, selectedProduct when getProducts is called getProducts", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useProduct());
    await act(() => {
      result.current.getProducts(HARDCOVER_NOTEBOOK_PRODUCT_ID);
      jest.runAllTimers();
    });

    expect(result.current.allOptions).toBeDefined();
    expect(result.current.selectedOptions.length).toBe(0);
    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.selectedProduct).toBeDefined();
  });
});
