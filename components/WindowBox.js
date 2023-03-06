import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const styles = StyleSheet.create({
  closeBtn: {
    minWidth: 20,
    backgroundColor: colorStyle.backgroundColor,
    borderWidth: 2,
    borderRightColor: colorStyle.darkGray,
    borderBottomColor: colorStyle.darkGray,
    borderTopWidth: 0,
    borderLeftColor: colorStyle.white,
    borderRightWidth: 0,
  },
});

const ModalContainer = styled(FlexBox)`
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-width: 1px;
  border-right-color: ${colorStyle.darkGray};
  background-color: ${colorStyle.backgroundColor};
  shadow-color: ${colorStyle.black};
  box-shadow: 0 2px ${colorStyle.black};
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const WindowBox = ({
  windowVisible,
  setWindowVisible,
  msg,
  title,
  setWindowDelete,

  ...rest
}) => {
  return (
    <ModalContainer direction="column">
      <FlexBox
        style={{
          backgroundColor: colorStyle.headerColor,
          width: "100%",
          paddingLeft: 10,
          borderTopWidth: 1,
          borderTopColor: colorStyle.white,
          borderLeftWidth: 1,
          borderLeftColor: colorStyle.white,
          borderBottomWidth: 1,
          borderBottomColor: colorStyle.darkGray,
          borderRightWidth: 1,
          borderRightColor: colorStyle.darkGray,
        }}
        justify="space-between"
      >
        <CustomText color="#dfffff">{title}</CustomText>
        <FlexBox>
          {windowVisible !== "none" && (
            <FlexBox style={styles.closeBtn} justify="center">
              <Pressable onPress={() => setWindowVisible(!windowVisible)}>
                <MaterialCommunityIcons name="minus" size={24} color="black" />
              </Pressable>
            </FlexBox>
          )}

          <FlexBox style={styles.closeBtn} justify="center">
            <Pressable onPress={() => setWindowDelete(true)}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ minHeight: 100, padding: 10 }} direction="column">
        {typeof msg === "string" ? <CustomText>{msg}</CustomText> : <>{msg}</>}
      </FlexBox>
    </ModalContainer>
  );
};
