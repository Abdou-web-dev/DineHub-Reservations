import { AutoComplete } from "antd";
import { useState } from "react";
import "./inputs_styles.scss";

export const AntdAutoComplete = ({
  customerFoodInput,
  id,
  setCustomerFoodInput,
}: {
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[] | any>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const getPanelValue_2 = (searchText: string) =>
    !searchText
      ? []
      : [
          { value: "fish", disabled: true },
          { value: "meat" },
          { value: "milk" },
          { value: "pizza" },
          { value: "tortilla" },
          { value: "hamburger" },
          { value: "tajine" },
          { value: "cheeseburger" },
          { value: "ice cream" },
          { value: "tacos" },
          { value: "kabab" },
        ];
  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    console.log("onChange", data);
    setValue(data);
  };

  return (
    <>
      <div className="customer-food-add-input-btn-container">
        <AutoComplete
          value={value}
          onChange={onChange}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue_2(text))}
          placeholder="input here"
        />
      </div>
    </>
  );
};
