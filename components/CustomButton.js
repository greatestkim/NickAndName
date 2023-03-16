import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const StyledBox = styled(FlexBox)`
  border-width: 2px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};
  border-top-color: ${colorStyle.white};
  border-left-color: ${colorStyle.white};
  background-color: ${(props) =>
    props.disabled ? colorStyle.darkGray : colorStyle.backgroundColor};
  opacity: ${(props) => (props.disabled ? 0.35 : 1)};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  width: 100%;
`;

export const CustomButton = ({ text, pressCallback, disabled, ...rest }) => {
  return (
    <Pressable onPress={pressCallback} disabled={disabled}>
      <StyledBox style={{ ...rest.style }} disabled={disabled}>
        <CustomText color={disabled ? colorStyle.white : colorStyle.black}>
          {text}
        </CustomText>
      </StyledBox>
    </Pressable>
  );
};
