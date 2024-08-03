import { PRODUCT_ATTRIBUTE_TYPES } from "utils/constants";

/*
 Expected API shapes
*/
export interface IProducAttributeApiData {
  id: string;
  type: string;
  value: string | number;
  label: string;
  selectable: boolean;
}

export interface IProductApiData {
  id: string;
  ["product-label"]: string;
  ["product-id"]: string;
  attributes: IProducAttributeApiData[];
  price: number;
}

export interface IProductsListApiData {
  products: IProductApiData[];
}

export type TProducAttributeType = keyof typeof PRODUCT_ATTRIBUTE_TYPES;

/*
 App shapes
*/
export interface IProducAttribute {
  id: string;
  type: TProducAttributeType;
  value: string | number;
  label: string;
  selectable: boolean;
}

export interface IProduct {
  id: string;
  label: string;
  productId: string;
  attributes: IProducAttribute[];
  price: number;
  imageSrc: string;
  description: string;
}

export type TProductOptions = {
  [key in TProducAttributeType]?: {
    selectable: boolean;
    options: IProducAttribute[];
  };
};

export interface IUseProductStore {
  products: IProduct[];
  selectedOptions: IProducAttribute[];
  setProducts: (products: IProduct[]) => void;
  setSelectedOptions: (selectedOptions: IProducAttribute[]) => void;
}
