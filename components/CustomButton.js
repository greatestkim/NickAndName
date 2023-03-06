import React from "react";
import { TouchableHighlight } from "react-native";
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
  background-color: ${colorStyle.backgroundColor};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  width: 100%;
`;

export const CustomButton = ({ text, pressCallback }) => {
  return (
    <TouchableHighlight onPress={pressCallback}>
      <StyledBox>
        <CustomText>{text}</CustomText>
      </StyledBox>
    </TouchableHighlight>
  );
};
