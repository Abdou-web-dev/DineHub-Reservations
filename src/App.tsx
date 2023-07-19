import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import { CustomersSection } from "./components/sections/CustomersSection";
import { ReservationsSection } from "./components/sections/ReservationsSection";
import { Customer } from "./feature/customerSlice";
import { addReservation } from "./feature/reservationSlice";

function App() {
  const dispatch = useDispatch();

  const [reservationNameInput, setReservationNameInput] = useState("");

  const reservations: string[] = useSelector(
    (state: RootState) => state.reservations.value
  );
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customer.value
  );
  const handleAddReservations = () => {
    dispatch(addReservation(reservationNameInput));
    setReservationNameInput("");
  };

  return (
    <div className="App">
      <div className="container">
        <div
          // style={{ border: "1px solid red" }}
          className="reservation-container"
        >
          <ReservationsSection
            {...{
              reservations,
              reservationNameInput,
              setReservationNameInput,
              handleAddReservations,
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
