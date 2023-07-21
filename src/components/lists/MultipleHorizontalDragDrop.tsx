import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
interface RowsType {
  FW: {
    name: string;
    items: never[];
  };
  FW2: {
    name: string;
    items: never[];
  };
  MF: {
    name: string;
    items: never[];
  };
  DF: {
    name: string;
    items: never[];
  };
  GK: {
    name: string;
    items: never[];
  };
  List: {
    name: string;
    items: {
      id: string;
      content: string;
    }[];
  };
}

const playerList = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
];

const rowsFromBackend = {
  FW: {
    name: "FW",
    items: [],
  },
  FW2: {
    name: "FW2",
    items: [],
  },
  MF: {
    name: "MF",
    items: [],
  },
  DF: {
    name: "DF",
    items: [],
  },
  GK: {
    name: "GK",
    items: [],
  },
  List: {
    name: "List",
    items: playerList,
  },
};

const onDragEnd = (result: DropResult, rows: any, setRows: any) => {
  console.log(typeof rows, "here");
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = rows[source.droppableId];
    const destColumn = rows[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = rows[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function MultipleHorizontalDragDrop() {
  const [rows, setRows] = useState(rowsFromBackend);

  const check = () => {
    if (
      rows.GK.items.length +
        rows.DF.items.length +
        rows.MF.items.length +
        rows.FW2.items.length +
        rows.FW.items.length !=
      11
    ) {
      console.log("11명이 아니다");
    }
    // if(rows.GK.items.length == 1) {
    //   console.log('안녕')
    // }
  };
  console.log(rows.GK.items.length);

  return (
    <div>
      <div>
        <button onClick={() => check()}>dd</button>
        <button onClick={() => check()}>dd</button>
        <button onClick={() => check()}>dd</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "60rem",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, rows, setRows)}
        >
          {Object.entries(rows).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                key={columnId}
              >
                <div>
                  <Droppable
                    droppableId={columnId}
                    key={columnId}
                    direction="horizontal"
                    // justifyContent="center"
                    // alignContent="center"
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "white",
                            padding: 4,
                            display: "flex",
                            flexDirection: "row",
                            overflowX: "auto",
                            width: "100vw",
                            justifyContent: "space-around",
                            minHeight: "8rem",
                            alignContent: "center",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 4,
                                        height: "6rem",
                                        minHeight: "6rem",
                                        width: "4rem",
                                        minWidth: "4rem",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        // border: "1px solid black",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default MultipleHorizontalDragDrop;
