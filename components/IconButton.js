import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { colorStyle } from "../lib/data/styleData";
import { FlexBox } from "./FlexBox";

export const IconButton = ({ icon, pressCallBack, size, type, color }) => {
  const onClickEvent = useCallback(
    (e) => {
      e.stopPropagation();
      pressCallBack && pressCallBack(e);
    },
    [pressCallBack]
  );
  return (
    <TouchableOpacity onPress={onClickEvent}>
      {type === "string" ? (
        <FlexBox
          style={{
            background: `${color}`,
            borderRadius: 5,
            padding: 5,
            minWidth: 20,
          }}
        >
          <Text style={{ color: `${colorStyle.white}` }}>{icon}</Text>
        </FlexBox>
      ) : (
        <Image
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          source={icon}
        />
      )}
    </TouchableOpacity>
  );
};
