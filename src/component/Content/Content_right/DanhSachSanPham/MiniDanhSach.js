import React, { useState, useEffect, useId } from "react";
import LayoutImg from "./LayoutImg";

export default function MiniDanhSach({
  colums,
  rows,
  isNotFirst,
  prop,
  call,
  getDataDanhSach,
}) {
  const [startCol, endCol] = colums;
  const [startRow, endRow] = rows;
  const [list, setList] = useState({});
  const id = useId();

  let info;
  if (call) {
    info = call;
  }

  useEffect(() => {
    if (call) {
      setList({ ...list, call });
    }
    // fetch(urlApi)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     console.log(data.danhSach)
    //     setData(data.danhSach);
    //   });
  }, []);

  // console.log(list && list)

  const styleImg = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };

  const getData = (data, check) => {
    if (check) {
      getDataDanhSach(data, check);
    }
  };

  // console.log(`MiniDanhSach re-render`);

  return (
    <div
      style={{
        gridArea: `${startRow}/${startCol}/${endRow}/${endCol}`,
        backgroundColor: "rgb(245,245,250)",
        display: "grid",
        gridTemplateColumns: isNotFirst
          ? "repeat(6, 1fr)"
          : "370px repeat(4, 1fr)",
        gridTemplateRows: "369px",
        gridColumnGap: "9px",
        width: "100%",
        height: "100%",
      }}
      key={prop}
    >
      {info &&
        info.danhSach.map((item) => {
          return (
            <div
              key={item.prop}
              style={{
                gridArea: `${item.gridArea}`,
                borderRadius: "8px",
                margin: info.danhSach.firstList ? "-3px 0 3px 0" : "3px 0",
              }}
            >
              {item.main && (
                <img src={require(`${item.hinhAnh}`)} style={styleImg} alt="" />
              )}
              {item.main || (
                <LayoutImg
                  size={item.gridArea}
                  id={item.id}
                  data={item}
                  getDataMini={getData}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}
