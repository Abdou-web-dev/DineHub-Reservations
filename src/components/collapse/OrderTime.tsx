import { CaretRightOutlined } from "@ant-design/icons";
import "animate.css";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import type { CSSProperties } from "react";
import { TimeTable } from "../tables/TimeTable";
import "./collapse_styles.scss";

// npm install @ant-design/icons --save

export const OrderTimeTable = ({}: // selectedTime,
// setSelectedTime,
// meridiumType,
// setMeridiumType,
{
  // selectedTime: string;
  // setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  // meridiumType: string;
  // setMeridiumType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { token } = theme.useToken();
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: "Select a time",
      children: (
        <div className="animate__zoomIn animate__animated animate__delay-1.5s">
          <TimeTable
          // {...{
          //   selectedTime,
          //   setSelectedTime,
          //   meridiumType,
          //   setMeridiumType,
          // }}
          ></TimeTable>
        </div>
      ),
      style: panelStyle,
    },
  ];
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <>
      <div className={"order-time-collapse-container"}>
        <Collapse
          // accordion
          className="order-time-collapse animate__animated animate__fadeIn animate__delay-1.5s"
          bordered={false}
          // defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </div>
    </>
  );
};

/* const [orderTime, setOrderTime] = useState<string>("");
        <Input
          className={"order-date-input"}
          value={orderTime}
          onChange={(e) => {
            setOrderTime(e.target.value);
          }}
          type="time"
          status={""}
          placeholder={"Select a time"}
          allowClear
        /> */
