import { useMemo } from "react";
import { create } from "zustand";
import { getProductByProductId } from "api/moo";
import {
  IProducAttribute,
  IProduct,
  TProductOptions,
  IUseProductStore,
} from "types";
import { debounce, onError } from "utils";

const useProductStore = create<IUseProductStore>((set) => ({
  products: [],
  selectedOptions: [],
  allOptions: undefined,
  setAllOptions: (allOptions) => set({ allOptions }),
  setSelectedOptions: (selectedOptions) => set({ selectedOptions }),
  setProducts: (products) => set({ products }),
}));

const useProduct = () => {
  const products = useProductStore((state) => state.products);
  const selectedOptions = useProductStore((state) => state.selectedOptions);
  const allOptions = useProductStore((state) => state.allOptions);
  const setAllOptions = useProductStore((state) => state.setAllOptions);
  const setSelectedOptions = useProductStore(
    (state) => state.setSelectedOptions
  );

  const setProducts = useProductStore((state) => state.setProducts);

  const getProducts = async (productId: string) => {
    if (!products.length) {
      const products = await getProductByProductId(productId);
      setProducts(products);
      getAllOptions(products);
    }
  };

  const debounceGetProducts = debounce(getProducts, 1000);

  const getAllOptions = (products: IProduct[]) => {
    if (!products.length) {
      onError("useProduct - getAllOptions - no products avaible");
      return;
    }

    const allOptions: TProductOptions = {};

    products.forEach((product) => {
      product.attributes.forEach((attribute) => {
        const addAttributeTypeGrouping = !(attribute.type in allOptions);
        if (addAttributeTypeGrouping) {
          allOptions[attribute.type] = {
            selectable: false,
            options: [],
          };
        }

        const addAttributeTypeToGroup = !allOptions[
          attribute.type
        ]?.options.find(
          (allProductOptionsAttribute: IProducAttribute) =>
            allProductOptionsAttribute.value === attribute.value
        );
        if (addAttributeTypeToGroup) {
          allOptions[attribute.type]!.options.push(attribute);
        }

        if (attribute.selectable && !allOptions[attribute.type]!.selectable) {
          allOptions[attribute.type]!.selectable = true;
        }
      });
    });
    setAllOptions(allOptions);
  };

  const selectedProduct: IProduct | undefined = useMemo(() => {
    if (!selectedOptions.length) return products[0];
    const matchingProduct = products.find((product) => {
      return product.attributes.every((option) => {
        const selectedOption = selectedOptions.find(
          (selectedOption) => selectedOption.id === option.id
        );
        if (!selectedOption) return true;
        return selectedOption?.value === option.value;
      });
    });

    if (matchingProduct) return matchingProduct;

    onError("useProduct - selectedProduct - No matching product found!");
    return products[0];
  }, [products, selectedOptions]);

  return {
    allOptions,
    selectedOptions,
    products,
    selectedProduct,
    getProducts: debounceGetProducts,
    setSelectedOptions,
  };
};

export default useProduct;
