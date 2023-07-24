import info from "../../assets/img/info.svg";

export const InfoText = ({
  reservationNameInput,
  showInfoText,
}: {
  reservationNameInput: string;
  showInfoText: boolean;
}) => {
  return (
    <>
      {showInfoText ? (
        <div className="full-name-container">
          <div className="full-name-inner">
            <img width={`30px`} src={info} alt="" />
            <p>You can type your full name to make a reservation !</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
