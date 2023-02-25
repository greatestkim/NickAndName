import { Octicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";
const styles = StyleSheet.create({
  ulStyle: {
    margin: 0,
    padding: 0,

    marginLeft: 5,
    outline: "none",
    width: "70%",
    listStyle: "none",
  },
  borderStyle: {
    borderWidth: 2,
    borderRightColor: colorStyle.white,
    borderBottomColor: colorStyle.white,
    borderTopColor: colorStyle.black,
    borderLeftColor: colorStyle.black,
    backgroundColor: colorStyle.white,
    minHeight: 17,
  },
  liStyle: {
    borderWidth: 2,
    borderRightColor: colorStyle.white,
    borderBottomColor: colorStyle.white,
    borderTopColor: colorStyle.black,
    borderLeftColor: colorStyle.black,
    borderRightWidth: 0,
    backgroundColor: colorStyle.white,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 10,
    outline: "none",
    width: "100%",
  },
  defaultLiStyle: {
    borderWidth: 2,
    borderRightColor: colorStyle.white,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopColor: colorStyle.black,
    borderLeftColor: colorStyle.black,
    backgroundColor: colorStyle.white,
    outline: "none",
    paddingLeft: 5,

    marginRight: 5,
  },
  downTriangleStyle: {
    borderWidth: 2,
    borderRightColor: colorStyle.black,
    borderTopColor: colorStyle.white,
    borderLeftColor: colorStyle.white,
    backgroundColor: colorStyle.backgroundColor,
    // outline: "none",
    marginLeft: 5,
    width: 24,
  },
});

const StyledScrollView = styled(ScrollView)`
  width: calc(100% - 5px);
  height: 150px;
`;

export const DateSelectBox = ({
  type,
  value,
  isOpen,
  pressCallBack,
  setValue,
}) => {
  const ScrollRef = useRef();
  const [items, setItems] = useState([]);
  const onClickEvent = useCallback(
    (e) => {
      e.stopPropagation();
      pressCallBack && pressCallBack(e);
    },
    [pressCallBack]
  );

  useLayoutEffect(() => {
    setItems(() => {
      let temp = [];
      if (type === "year") {
        let endYear = 1900;
        let currentYear = moment().year();
        for (let i = currentYear; i >= endYear; i--) {
          temp.push(String(i));
        }
      } else if (type === "month") {
        let startMonth = 1;
        let endMonth = 12;
        for (let i = startMonth; i <= endMonth; i++) {
          if (i < 10) temp.push("0" + String(i));
          else temp.push(String(i));
        }
      } else {
        let startDay = 1;
        let endDay = 31;
        for (let i = startDay; i <= endDay; i++) {
          if (i < 10) temp.push("0" + String(i));
          else temp.push(String(i));
        }
      }
      return temp;
    });

    ScrollRef.current?.scrollTo({
      y: 100,
      //animated: true,
    });
  }, []);

  return (
    <>
      <FlexBox
        direction="column"
        align="flex-start"
        style={{ position: "relative" }}
      >
        <FlexBox key={"default li" + type} style={styles.defaultLiStyle}>
          <FlexBox style={{ minWidth: `${type === "year" ? 40 : 25}` }}>
            <CustomText color={colorStyle.backgroundColor}>{value}</CustomText>
          </FlexBox>

          <FlexBox
            style={styles.downTriangleStyle}
            onClick={onClickEvent}
            justify="center"
          >
            <Octicons name="triangle-down" size={24} color="black" />
          </FlexBox>
        </FlexBox>
        {isOpen ? (
          <StyledScrollView
            ref={ScrollRef}
            key={"scrollview" + type}
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: 23 }}
          >
            {items.map((item, idx) => {
              let isSame = item === value;

              return (
                <FlexBox
                  key={idx + item}
                  value={item}
                  style={styles.liStyle}
                  onClick={(e) => {
                    setValue(item);
                    onClickEvent(e);
                  }}
                >
                  <CustomText
                    color={isSame ? colorStyle.headerColor : colorStyle.black}
                    fontWeight={isSame ? "bold" : "regular"}
                  >
                    {item}
                  </CustomText>
                </FlexBox>
              );
            })}
          </StyledScrollView>
        ) : (
          <></>
        )}
      </FlexBox>
    </>
  );
};
