import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

const styles = StyleSheet.create({
    textInputStyle: {
        fontFamily: "Galmuri",
        borderWidth: 2,
        borderBottomColor: colorStyle.white,
        borderRightColor: colorStyle.white,
        borderTopColor: colorStyle.black,
        borderLeftColor: colorStyle.black,
        backgroundColor: colorStyle.white,
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 5,
        paddingLeft: 5,
        outline: "none",
        width: "100%",
    },
    multiline: {
        minHeight: 100,
    },
});

export const InputBox = ({ title, textValue, changeCallback, multiline, focusCallback }) => {
    return (
        <FlexBox
            style={{ width: "100%", marginBottom: 10 }}
            justify="space-between"
            align="flex-start"
        >
            <CustomText style={{ flex: 3 }}>{title}</CustomText>
            <FlexBox style={{ flex: 7 }}>
                <TextInput
                    onChangeText={changeCallback}
                    value={textValue}
                    multiline={multiline}
                    numberOfLines={multiline ? 4 : 1}
                    style={
                        multiline
                            ? [styles.textInputStyle, styles.multiline]
                            : styles.textInputStyle
                    }
                    disableFullscreenUI={true}
                    returnKeyType={"done"}
                    scrollEnabled={true}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                    onFocus={focusCallback}
                />
            </FlexBox>
        </FlexBox>
    );
};
