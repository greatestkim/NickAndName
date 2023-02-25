import React from "react";
import { Text } from "react-native";

export const CustomText = ({
  children,
  fontSize,
  fontWeight,
  color,
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
        // overflowWrap: "break-word",
        // wordWrap: "break-word",
        ...rest.style,
      }}
    >
      {children}
    </Text>
  );
};
