import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
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
    backgroundColor: colorStyle.white,
    paddingTop: 3,
    paddingLeft: 5,
    outline: "none",
    width: "100%",
    zIndex: 5,
  },
});

export const SelectBox = ({
  title,
  items,
  value,
  isOpen,
  pressCallBack,
  setValue,
  isRequired,
}) => {
  const onClickEvent = useCallback(
    (e) => {
      e.stopPropagation();
      pressCallBack && pressCallBack(e);
    },
    [pressCallBack]
  );
  return (
    <FlexBox
      style={{ width: "90%", marginBottom: 10 }}
      justify="space-between"
      align="flex-start"
    >
      <FlexBox>
        <CustomText>{title}</CustomText>
        {isRequired ? (
          <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
        ) : (
          <></>
        )}
      </FlexBox>

      <FlexBox
        style={[styles.ulStyle]}
        onClick={onClickEvent}
        direction="column"
        align="flex-start"
      >
        <FlexBox key={"default li"} style={styles.liStyle}>
          <CustomText color={colorStyle.backgroundColor}>
            {value ? value : "none"}
          </CustomText>
        </FlexBox>
        {isOpen ? (
          items.map((item, idx) => {
            return (
              <FlexBox
                key={idx + item.value}
                value={item.value}
                style={styles.liStyle}
                onClick={() => {
                  setValue(item.label);
                }}
                justify="space-between"
              >
                <CustomText>{item.label}</CustomText>
                {item.label === value ? (
                  <Ionicons name="checkmark-circle" size={24} color="black" />
                ) : (
                  <></>
                )}
              </FlexBox>
            );
          })
        ) : (
          <></>
        )}
      </FlexBox>
    </FlexBox>
  );
};
