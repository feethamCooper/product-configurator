import fakeApiFech from "fakeAPI";
import { tryAndCatch, onError } from "utils";
import { IProduct, IProductsListApiData } from "types";
import { PRODUCT_IMAGE_PATH, PRODUCT_ATTRIBUTE_TYPES } from "utils/constants";

export const getProductByProductId = async (
  productId: string
): Promise<IProduct[]> => {
  return tryAndCatch(async () => {
    const response = await fakeApiFech();

    if (response.status !== 200) {
      return onError("getProductByProductId - incorrect response code");
    }

    const data: IProductsListApiData = JSON.parse(response.body);

    if (!data?.products) return [];

    const attributeTypes: {
      [key: string]: keyof typeof PRODUCT_ATTRIBUTE_TYPES;
    } = {};

    for (const [key, value] of Object.entries(PRODUCT_ATTRIBUTE_TYPES)) {
      attributeTypes[value.key] = key as keyof typeof PRODUCT_ATTRIBUTE_TYPES;
    }

    const products: IProduct[] = data.products.map((product) => {
      const {
        id,
        "product-label": label,
        "product-id": productId,
        attributes: apiProductsAttributes,
        price,
      } = product;

      const attributes = apiProductsAttributes.map((productAttributes) => {
        const { id, type, value, label, selectable } = productAttributes;

        return {
          id,
          type: attributeTypes[type],
          value,
          label,
          selectable,
        };
      });

      return {
        id,
        label,
        productId: productId,
        attributes,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price,
        imageSrc: PRODUCT_IMAGE_PATH,
      };
    });

    return products;
  }, `Error - getProductByProductId - ${productId}`);
};
