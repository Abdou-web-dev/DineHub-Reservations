import { Card } from "antd";
import { useContext } from "react";
import address from "../../assets/img/address.svg";
import date from "../../assets/img/date.svg";
import invites from "../../assets/img/invites.png";
import time from "../../assets/img/time.svg";
import { ComeBackBtn } from "../buttons/ComeBackBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
import "./modal_styles.scss";

export const FoodInfosModalContent = ({
  location,
  guests,
  orderDate,
  // selectedTime,
  // meridiumType,
  setShowChoosenFood,
  setShowChoosenFoodInfos,
}: {
  location: {
    value: string;
    label: string;
  };
  guests: number | string;
  orderDate: string;
  // selectedTime: string;
  // meridiumType: string;
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedTime, meridiumType } = useContext(FoodInfosContext);

  function isAntePostMeridium(): string {
    let word = "";
    if (meridiumType === `AM`) {
      word = "AM";
    } else {
      word = "PM";
    }
    return word;
  }

  // let no_address = location?.label === "";
  let no_address = location?.label === undefined;

  return (
    <>
      <div className="order-modal-content-container">
        <ComeBackBtn {...{ setShowChoosenFood, setShowChoosenFoodInfos }} />
        <div className="four-cards">
          <Card
            className="guests-card"
            extra={
              <>
                <img
                  className="guests_icon"
                  width={`20px`}
                  src={invites}
                  alt=""
                />
              </>
            }
            hoverable
            title={"Number of guests :"}
            bordered={false}
          >
            {guests ? (
              <span className="guests">{guests}</span>
            ) : (
              <span>Not yet choosen</span>
            )}
          </Card>
          <Card
            className="address-card"
            extra={
              <>
                <img
                  className="address_icon"
                  width={`20px`}
                  src={address}
                  alt=""
                />
              </>
            }
            hoverable
            title={"Address :"}
            bordered={false}
          >
            {location?.label === `Select the restaurant's address` ? (
              <span>Not yet choosen</span>
            ) : (
              <span className="location">{location?.label}</span>
            )}
            {no_address ? <span>Not yet choosen</span> : null}
          </Card>
          <Card
            className="date-card"
            extra={
              <>
                <img className="date_icon" width={`20px`} src={date} alt="" />
              </>
            }
            hoverable
            title={"Date of arrival :"}
            bordered={false}
          >
            {orderDate !== "" ? (
              <span className="date">{orderDate}</span>
            ) : (
              <span>Not yet choosen</span>
            )}
          </Card>
          <Card
            className="time-card"
            extra={
              <>
                <img className="time_icon" width={`20px`} src={time} alt="" />
              </>
            }
            hoverable
            title={"Time of arrival :"}
            bordered={false}
          >
            {selectedTime !== "" ? (
              <>
                <span className="time">{selectedTime} : </span>
                <span>&nbsp;{isAntePostMeridium()}</span>
              </>
            ) : (
              <span>Not yet choosen</span>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
