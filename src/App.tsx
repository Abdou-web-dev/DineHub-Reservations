import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./App.scss";
import { RootState } from "./app/store";
import { InfoText } from "./components/info/InfoText";
import { CustomersSection } from "./components/sections/CustomersSection";
import { ReservationsSection } from "./components/sections/ReservationsSection";
// import { Customer } from "./feature/";
import { addReservation } from "./feature/reservationSlice";
import { Customer } from "./types/Types";

function App() {
  const dispatch = useDispatch();

  const [reservationNameInput, setReservationNameInput] = useState("");

  const reservations: string[] = useSelector(
    (state: RootState) => state.reservationsReducer.reservations
  );
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customerReducer.customers
  );
  // console.log(reservations, customers);
  const [showInfoText, setShowInfoText] = useState(false);
  const handleAddReservations = () => {
    dispatch(addReservation(reservationNameInput));
    setReservationNameInput("");
  };

  // By moving the StrictMode wrapper into your App.tsx file, you are applying it only to your own components and not affecting any third-party libraries that might be causing the findDOMNode warning. This way, you can continue to benefit from the debugging checks of StrictMode for your own code while avoiding unnecessary warnings from external code.

  return (
    <React.StrictMode>
      <div className="App reserv-restau-app-container">
        {/* <Header>MAYSSAM</Header> make this title later */}
        <div
          className={
            customers.length
              ? "info-text-if_customers_not_empty info-text"
              : "info-text"
          }
        >
          <InfoText {...{ reservationNameInput, showInfoText }} />
        </div>
        <div className="reservations-customer-container">
          <div className="reservation-container">
            <ReservationsSection
              {...{
                reservations,
                reservationNameInput,
                setReservationNameInput,
                handleAddReservations,
                setShowInfoText,
              }}
            />
          </div>
          <div className="customer-food-container">
            <div className="">
              <CustomersSection {...{ customers }} />
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default App;
