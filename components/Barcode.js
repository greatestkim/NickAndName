import React, { useLayoutEffect, useState } from "react";
import { colorStyle } from "../lib/data/styleData";
import { FlexBox } from "./FlexBox";

export const Barcode = ({ length, width, n }) => {
  const [barcodeArr, setBarcodeArr] = useState([]);
  useLayoutEffect(() => {
    if (length > 0) {
      let tmpLeng = length;
      let tmpArr = [];
      for (let i = 0; i < length; i++) {
        if (tmpLeng > 0) {
          const randomNum = Math.floor(Math.random() * n) + 1;
          tmpArr.push(randomNum);
          tmpLeng -= randomNum;
        } else break;
      }
      setBarcodeArr(tmpArr);
    }
  }, [length]);

  return (
    <FlexBox direction="column">
      {barcodeArr.map((bar, idx) => {
        return (
          <FlexBox
            key={"barcode" + bar + ", " + idx}
            style={{
              width: width - 5,
              backgroundColor: idx % 2 === 0 ? "transparent" : colorStyle.black,
              height: bar,
            }}
          />
        );
      })}
    </FlexBox>
  );
};
