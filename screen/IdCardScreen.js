import React, { useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Barcode, FlexBox } from "../components";
import { colorStyle } from "../lib/data/styleData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
});

const CardContainer = styled(FlexBox).attrs({})`
  border: 1px solid ${colorStyle.backgroundColor};
  border-radius: 15px;
  height: 80%;
  width: 100%;
  background-color: ${colorStyle.backgroundColor};
  clip-path: inset(0 round 10px);
`;

export default function IdCardScreen({ navigation, route }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(Dimensions.get("window").width);
  }, []);

  return (
    <View style={styles.container}>
      <CardContainer
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTargetHeight(height - 20);
        }}
      >
        <FlexBox
          style={{
            width: (windowWidth - 42) * 0.23,
            height: "100%",
          }}
        >
          <Barcode length={targetHeight} width={(windowWidth - 42) * 0.23} />
        </FlexBox>
        <FlexBox
          style={{
            width: (windowWidth - 42) * 0.77,
            height: "100%",
          }}
        ></FlexBox>
      </CardContainer>
    </View>
  );
}
