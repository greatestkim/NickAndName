import React from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: colorStyle.darkGray,
    borderRightWidth: 1,
    borderRightColor: colorStyle.darkGray,
    backgroundColor: colorStyle.backgroundColor,
    shadowColor: colorStyle.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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

export const CustomModal = ({ modalVisible, setModalVisible, msg, title }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible((prev) => !prev);
      }}
    >
      <View style={styles.centeredView}>
        <FlexBox style={styles.modalView} direction="column">
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
            {typeof title === "string" ? (
              <CustomText color={colorStyle.white}>{title}</CustomText>
            ) : (
              <>{title}</>
            )}

            <FlexBox style={styles.closeBtn} justify="center">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <CustomText>X</CustomText>
              </Pressable>
            </FlexBox>
          </FlexBox>

          <FlexBox
            style={{ minHeight: 100, padding: 10 }}
            direction="column"
            justify="center"
          >
            {typeof msg === "string" ? (
              <CustomText>{msg}</CustomText>
            ) : (
              <FlexBox>{msg}</FlexBox>
            )}
          </FlexBox>
        </FlexBox>
      </View>
    </Modal>
  );
};
