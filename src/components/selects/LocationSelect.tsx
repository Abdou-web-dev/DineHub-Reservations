import { useDispatch } from "react-redux";
import Select, { SingleValue } from "react-select";
import { restaurant_locations } from "../../assets/staticData/restaurant_locations.js";
import { addLocationToCustomer } from "../../feature/customerSlice";
import { ClearIndicator } from "../indicators/ClearIndicator";
import "./select_styles.scss";

// Todo : add a map above the customer's order, so that when a user chooses a location from the select dropdown,
//he will see a red circle placed above this location

export const LocationSelect = ({
  restauLocation,
  id,
  location,
  setLocation,
}: {
  restauLocation: string | undefined;
  id: string;
  location: {
    value: string;
    label: string;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
}) => {
  const dispatch = useDispatch();
  // const [location, setLocation] = useState({
  //   value: "",
  //   label: "Select the restaurant's address",
  // });

  function handleLocationChange(
    newValue: SingleValue<{ value: string; label: string }> | any
  ): void {
    // console.log(newValue, "newValue");
    dispatch(addLocationToCustomer({ location: location?.label, id: id }));
    setLocation(newValue);
    console.log(location, restauLocation);
  }

  return (
    <>
      <div className="location-select-container">
        <div className="location-select-wrapper">
          <Select
            className="location-select"
            value={location}
            onChange={handleLocationChange}
            options={restaurant_locations}
            placeholder="Select restaurant's location..."
            components={{ ClearIndicator }}
            defaultMenuIsOpen={false}
            isClearable={true}
            isSearchable={true}
            noOptionsMessage={() => "No location found"}
            classNamePrefix="select" // this prop is important, without it no class would have select prefix, so all select__menu subclasses wont be visible
            // menuIsOpen={true}
            // isLoading={selectedCountry ? false : searchValue ? false : true}
            // inputValue={searchValue}
            // onInputChange={(e) => setsearchValue(e)}
            // filterOption
            // loadingMessage
            // defaultValue={countries[100].label ? countries[99] : null} //Iceland
            // options={colourOptions}
            // isDisabled={isDisabled}
            // isRtl={isRtl}
            // onMenuScrollToBottom={() => message.info("Select a country", 1)} //not working
            // styles={{
            //   control: (baseStyles, state) => ({
            //     ...baseStyles,
            //     borderColor: state.isFocused ? "grey" : "red",
            //     // color:baseStyles.
            //     // backgroundColor: "red",
            //     backgroundColor: !state.menuIsOpen ? "grey" : "yellow",
            //   }),
            // }}
          />
        </div>
        {/* {location.label} */}
        {/* <br /> */}
        {/* {restauLocation && restauLocation} */}
      </div>
    </>
  );
};
