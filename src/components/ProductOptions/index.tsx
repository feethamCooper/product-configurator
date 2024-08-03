import { FC } from "react";
import { JSX } from "react/jsx-runtime";
import useProduct from "hooks/useProduct";
import { IProducAttribute, TProducAttributeType } from "types";
import { PRODUCT_ATTRIBUTE_TYPES } from "utils/constants";

import "./ProductOptions.scss";

const ProductOptions: FC = () => {
  const { allOptions, selectedProduct, selectedOptions, setSelectedOptions } =
    useProduct();

  const getSelectedOptionIndexById = (optionId: string) =>
    selectedOptions.findIndex((option) => option.id === optionId);

  const handleSelectedOptions = (option: IProducAttribute) => {
    const selectedOptionIndex = getSelectedOptionIndexById(option.id);
    const selectedOptionsUpdate = [...selectedOptions];

    if (selectedOptionIndex > -1) {
      selectedOptionsUpdate.splice(selectedOptionIndex, 1);
    }
    selectedOptionsUpdate.push(option);

    setSelectedOptions(selectedOptionsUpdate);
  };

  const getOptionConfigFromSelecedProduct = (optionId: string) =>
    selectedProduct?.attributes.find((option) => option.id === optionId);

  const renderOption = (option: IProducAttribute) => {
    const selectedProducOptionConfig = getOptionConfigFromSelecedProduct(
      option.id
    );
    const disabled = selectedProducOptionConfig?.selectable;
    const selected = selectedOptions.find(
      (selectedOption) => selectedOption.value === option.value
    );

    return (
      <li className="product-options__li" key={option.id + option.label}>
        <button
          className={`product-options__button ${
            selected && "product-options__button--active"
          } ${disabled && "product-options__button--disabled"}`}
          disabled={!selectedProducOptionConfig?.selectable}
          onClick={() => handleSelectedOptions(option)}
        >
          {option.label}
        </button>
      </li>
    );
  };

  const renderOptions = () => {
    if (!allOptions) return null;
    const optionsToRender: JSX.Element[] = [];
    Object.keys(allOptions).forEach((key, index) => {
      const typeKey = key as TProducAttributeType;
      const optionGroup = allOptions[typeKey];

      if (!optionGroup || !optionGroup.selectable) return;

      const copy = PRODUCT_ATTRIBUTE_TYPES[typeKey].groupTitle;
      optionsToRender.push(
        <div key={index} className="product-options__grouping">
          <h3 className="product-options__title">{copy}</h3>
          <ul className="product-options__ul">
            {optionGroup.options.map((option) => renderOption(option))}
          </ul>
        </div>
      );
    });
    return optionsToRender;
  };

  return <div className="product-options">{renderOptions()}</div>;
};

export default ProductOptions;
