import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./App.scss";
import { RootState } from "./app/store";
import { InfoText } from "./components/info/InfoText";
import { CustomersSection } from "./components/sections/CustomersSection";
import { ReservationsSection } from "./components/sections/ReservationsSection";
import { Customer } from "./feature/customerSlice";
import { addReservation } from "./feature/reservationSlice";

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

  return (
    <div className="App reserv-restau-app-container">
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
  );
}

export default App;
