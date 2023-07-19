// npm install @ant-design/icons --save
import { Button, Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import "./tables_styles.scss";

export const TimeTable = ({}: {}) => {
  interface DataType {
    key: string;
    am_value: string;
    pm_value: string;
  }

  const [selectedTime, setSelectedTime] = useState("");
  const [meridiumType, setMeridiumType] = useState("");

  const columns: ColumnsType<DataType> = [
    {
      title: "AM",
      dataIndex: "am_value",
      key: "am_value",
      render: (text, key) => (
        <Button
          onClick={() => {
            setSelectedTime(text);
            // console.log(key);
            setMeridiumType("AM");
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "PM",
      dataIndex: "pm_value",
      key: "pm_value",
      render: (text) => (
        <Button
          onClick={() => {
            setSelectedTime(text);
            setMeridiumType("PM");
          }}
        >
          {text}
        </Button>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      am_value: "01",
      pm_value: "01",
    },
    {
      key: "2",
      am_value: "02",
      pm_value: "02",
    },
    {
      key: "3",
      am_value: "03",
      pm_value: "03",
    },
    {
      key: "4",
      am_value: "04",
      pm_value: "04",
    },
    {
      key: "5",
      am_value: "05",
      pm_value: "05",
    },
    {
      key: "6",
      am_value: "06",
      pm_value: "06",
    },
    {
      key: "7",
      am_value: "07",
      pm_value: "07",
    },
    {
      key: "8",
      am_value: "08",
      pm_value: "08",
    },
    {
      key: "9",
      am_value: "09",
      pm_value: "09",
    },
    {
      key: "10",
      am_value: "10",
      pm_value: "10",
    },
    {
      key: "11",
      am_value: "11",
      pm_value: "11",
    },
    {
      key: "12",
      am_value: "12",
      pm_value: "12",
    },
  ];
  return (
    <>
      <div className={"order-time-container"}>
        <div className="times-table">
          <Table pagination={false} columns={columns} dataSource={data}></Table>
        </div>
        <div className="selected-time">
          {selectedTime ? (
            <Card title={selectedTime} bordered={false}>
              <span className="meridium">
                {meridiumType === `AM` ? `AM` : `PM`}
              </span>
            </Card>
          ) : null}
          {/* <span className="time">{selectedTime}</span>
          <span className="meridium">
            {meridiumType === `AM` ? `AM` : `PM`}
          </span> */}
        </div>
      </div>
    </>
  );
};
