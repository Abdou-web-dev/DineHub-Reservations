import { Button, Input } from "antd";
import minus_icon from "../../assets/img/minus_icon.svg";
import plus_icon from "../../assets/img/plus_icon.svg";
import "./counter_styles.scss";

export const GuestsCounter = ({
  guests,
  setGuests,
}: {
  guests: number | string;
  setGuests: React.Dispatch<React.SetStateAction<string | number>>;
}) => {
  //   const dispatch = useDispatch();

  // const [guests, setGuests] = useState<number | string>(0);
  // console.log(guestsNumber, guests, "line 14");
  return (
    <>
      <div className="guests-counter-container">
        <div className="guests-counter-inner">
          <p className="how-many">
            How many guests <br /> will arrive in total ?
          </p>

          <div className={"guests-input--and-btns-wrapper"}>
            <div className={"guests-antd-input-wrapper"}>
              <Input
                className={"guests-antd-input"}
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                }}
                type="number"
                status={""}
                //   placeholder={"0"}
                allowClear
                //   style={{ height: "40px", borderRadius: "0.625rem" }}
              />
            </div>

            <div className="plus-minus-btns">
              <Button
                className="minus-btn"
                disabled={guests === 1}
                onClick={() => setGuests(Number(guests) - 1)}
                icon={
                  <>
                    <img width={`30px`} src={minus_icon} alt="" />
                  </>
                }
              ></Button>
              <Button
                className="plus-btn"
                onClick={() => setGuests(Number(guests) + 1)}
                icon={
                  <>
                    <img width={`30px`} src={plus_icon} alt="" />
                  </>
                }
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
