import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const StyledTextInput = styled(TextInput)`
  font-family: "Galmuri";
  border-width: 2px;
  border-bottom-color: ${colorStyle.white};
  border-right-color: ${colorStyle.white};
  border-top-color: ${colorStyle.black};
  border-left-color: ${colorStyle.black};
  background-color: ${colorStyle.white};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  outline: none;
  width: 100%;
  caret-color: ${colorStyle.darkGray};
  ${(props) => props.multiline && `height: 150px;`}
`;

export const InputBox = ({
  title,
  textValue,
  changeCallback,
  multiline,
  isRequired,
  onFocus,
  onBlur,
  placeholder,
  autoFocus,
  inputMode,
}) => {
  return (
    <FlexBox
      style={{ width: "100%", marginBottom: 10 }}
      justify="space-between"
      align="flex-start"
    >
      {/* <CustomText style={{ flex: 3, paddingTop: 3 }}>{title}</CustomText> */}
      <FlexBox style={{ flex: 3, paddingTop: 3 }}>
        <CustomText>{title}</CustomText>
        {isRequired && (
          <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
        )}
      </FlexBox>

      <FlexBox style={{ flex: 7 }}>
        <StyledTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          textAlignVertical={multiline ? "top" : "center"}
          onChangeText={changeCallback}
          value={textValue}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          disableFullscreenUI={true}
          returnKeyType={"done"}
          cursorColor={colorStyle.darkGray}
          selectionColor={colorStyle.darkGray}
          placeholderTextColor={colorStyle.darkGray}
          placeholder={placeholder}
          scrollEnabled={multiline}
          keyboardType={inputMode ? inputMode : "default"}
          autoFocus={autoFocus ? autoFocus : false}
        />
      </FlexBox>
    </FlexBox>
  );
};
