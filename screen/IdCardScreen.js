import React from "react";
import { StyleSheet, View } from "react-native";
// import navImg from "../assets/images/icons/navi_next.png";
import { CustomText } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // flexBasis: "column",
    padding: 20,
    height: "100%",
  },
});

export default function IdCardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomText>id card page</CustomText>
    </View>
  );
}
