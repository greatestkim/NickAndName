import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import checked from "../assets/images/icons/checked.png";
import unchecked from "../assets/images/icons/unchecked.png";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const CheckBox = ({ title, items, pressCallBack, isRequired }) => {
  return (
    <FlexBox
      style={{ marginBottom: 10 }}
      justify="space-between"
      align="flex-start"
      direction="column"
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
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {items.map((item) => {
          return (
            <TouchableWithoutFeedback
              onPress={(e) => {
                pressCallBack(e, item.id);
              }}
              key={item.label}
            >
              <FlexBox
                style={{ marginRight: 5 }}
                align="center"
                justify="center"
              >
                {item.isChecked ? (
                  <Image
                    source={checked}
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: -1,
                      marginRight: 5,
                    }}
                  />
                ) : (
                  <Image
                    source={unchecked}
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: -1,
                      marginRight: 5,
                    }}
                  />
                )}

                <CustomText>{item.label}</CustomText>
              </FlexBox>
            </TouchableWithoutFeedback>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};
