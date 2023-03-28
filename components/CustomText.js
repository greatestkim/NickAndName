import React from "react";
import { Text } from "react-native";

export const CustomText = ({
  children,
  fontSize,
  fontWeight,
  color,
  numberOfLines,
  ellipsizeMode,
  textAlign,
  ...rest
}) => {
  return (
    <Text
      style={{
        fontFamily:
          fontWeight === "bold" || fontWeight === "Bold" || fontWeight === "600"
            ? "GalmuriBold"
            : "Galmuri",
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
        ...rest.style,
      }}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};
