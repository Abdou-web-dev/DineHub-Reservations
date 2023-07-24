import { Button, Card } from "antd";
import address from "../../assets/img/address.svg";
import come_back from "../../assets/img/back-arrow.svg";
import date from "../../assets/img/date.svg";
import invites from "../../assets/img/invites.png";
import time from "../../assets/img/time.svg";
import "./modal_styles.scss";

export const FoodInfosModalContent = ({
  location,
  guests,
  orderDate,
  selectedTime,
  meridiumType,
  setShowChoosenFood,
  setShowChoosenFoodInfos,
}: {
  location: {
    value: string;
    label: string;
  };
  guests: number | string;
  orderDate: string;
  selectedTime: string;
  meridiumType: string;
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function isAntePostMeridium(): string {
    let word = "";
    if (meridiumType === `AM`) {
      word = "AM";
    } else {
      word = "PM";
    }
    return word;
  }

  return (
    <>
      <div className="order-modal-content-container">
        <Button
          onClick={() => {
            setShowChoosenFood(false);
            setShowChoosenFoodInfos(false);
          }}
          icon={
            <>
              <img width={`40px`} src={come_back} alt="" />
            </>
          }
        ></Button>
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
            <span className="guests">{guests}</span>
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
            <span className="location">{location?.label}</span>
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
            <span className="date">{orderDate}</span>
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
            <span className="time">{selectedTime}</span>
            <span>{isAntePostMeridium()}</span>
          </Card>
        </div>
      </div>
    </>
  );
};
