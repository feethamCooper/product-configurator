import { FC, useEffect } from "react";
import useProduct from "hooks/useProduct";
import ProductOptions from "components/ProductOptions";
import ProductSummary from "components/ProductSummary";
import Spinner from "components/SVGs/Spinner";
import { HARDCOVER_NOTEBOOK_PRODUCT_ID } from "utils/constants";

import "./ProductDetail.scss";

const ProductDetail: FC = () => {
  const { products, getProducts, selectedProduct } = useProduct();

  useEffect(() => {
    if (!products.length) getProducts(HARDCOVER_NOTEBOOK_PRODUCT_ID);
  }, [getProducts, products, selectedProduct, selectedProduct]);

  return (
    <article className="product-detail">
      {selectedProduct ? (
        <>
          <h1 className="product-detail__title">{selectedProduct.label}</h1>
          <div className="product-detail__inner">
            <div className="product-detail__image-container">
              <img
                className="product-detail__image"
                src={selectedProduct.imageSrc}
                alt={`Product: ${selectedProduct.label}`}
              />
            </div>
            <div className="product-detail__content">
              <p className="product-detail__description">
                {selectedProduct.description}
              </p>
              <ProductOptions />
              <ProductSummary selectedProduct={selectedProduct} />
            </div>
          </div>
        </>
      ) : (
        <Spinner className="product-detail__spinner" />
      )}
    </article>
  );
};

export default ProductDetail;
