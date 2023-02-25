import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const TextButton = ({
  pressCallBack,
  color,
  backgroundColor,
  children,
  fontWeight,
  ...rest
}) => {
  const onClickEvent = useCallback(
    (e) => {
      e.stopPropagation();
      pressCallBack && pressCallBack(e);
    },
    [pressCallBack]
  );

  return (
    <>
      {children ? (
        <TouchableOpacity onPress={onClickEvent}>
          <FlexBox
            style={{
              background: `${backgroundColor}`,
              padding: 5,
              margin: 2,
            }}
            {...rest}
          >
            <CustomText color={color} fontWeight={fontWeight}>
              {children}
            </CustomText>
          </FlexBox>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};
