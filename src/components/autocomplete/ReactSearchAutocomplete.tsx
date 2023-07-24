import { InputStatus } from "antd/es/_util/statusUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./inputs_styles.scss";

// https://www.npmjs.com/package/turnstone
// Turnstone is a highly customisable, easy-to-use autocomplete search component for React.

export const ReactSearchAutocompleteComponent = ({
  customerFoodInput,
  id,
  setCustomerFoodInput,
}: {
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}) => {
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
  // const [value, setValue] = useState("");

  const onChange = (data: string) => {
    console.log("onChange", data);
    setValue(data);
  };
  //
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "C++",
    },
  ];

  const handleOnSearch = (
    keyword: string,
    results: {
      id: number;
      name: string;
    }[]
  ) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(keyword, results);
  };

  const handleOnHover = (result: { id: number; name: string }) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: { id: number; name: string }) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: { id: number; name: string }) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

  return (
    <>
      <div className="customer-food-add-input-btn-container">
        {/* <AutoComplete
          value={value}
          onChange={onChange}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue_2(text))}
          placeholder="input here"
        /> */}
        <div style={{ width: "100%" }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
        {/* <Input
          className="customer-food-add-input"
          value={customerFoodInput}
          onChange={(e) => {
            setCustomerFoodInput(e.target.value);
            if (customerFoodInput) {
              setInputStatus("");
            }
          }}
          type="text"
          status={inputStatus}
          placeholder={"Type a food item..."}
          allowClear
        />
        <Button
          className={
            customerFoodInput
              ? "customer-food-add-btn user_is_typing"
              : "customer-food-add-btn user_is_not_typing"
          }
          onClick={() => {
            dispatch(
              addFoodToCustomer({
                id,
                food_element: {
                  food_value: customerFoodInput,
                  food_id: randomInteger(1, 5000),
                },
                // food_id: randomInteger(1, 5000),
              })
              // addFoodToCustomer({
              // id,
              // food: customerFoodInput,
              // })
            );
            if (!customerFoodInput) {
              setInputStatus("error");
            }
            setCustomerFoodInput("");
          }}
        >
          <span>Add Food</span>
        </Button> */}
      </div>
    </>
  );
};
