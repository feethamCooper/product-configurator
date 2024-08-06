import { FC } from "react";
import { IProduct } from "types";
import { PRODUCT_ATTRIBUTE_TYPES } from "utils/constants";
import "./ProductSummary.scss";

interface IProductSummary {
  selectedProduct: IProduct;
}

const ProductSummary: FC<IProductSummary> = ({ selectedProduct }) => {
  return (
    <div className="product-summary">
      <h4 className="product-summary__title">Summary</h4>
      <table className="product-summary__table">
        <tbody>
          {selectedProduct.attributes.map((options, index) => {
            const { type, label } = options;
            const titile = PRODUCT_ATTRIBUTE_TYPES[type].label;
            return (
              <tr
                key={`ProductSummary-${index}`}
                className="product-summary__row"
                data-testid="product-summary__row"
              >
                <th className="product-summary__th">{titile}</th>
                <td className="product-summary__td">{label}</td>
              </tr>
            );
          })}
          <tr
            className="product-summary__row"
            data-testid="product-summary__row"
          >
            <th className="product-summary__th">Price</th>
            <td className="product-summary__td">
              £{selectedProduct.price.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductSummary;
