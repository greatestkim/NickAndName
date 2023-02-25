import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

export const CheckBox = ({ title, items, pressCallBack, isRequired }) => {
    return (
        <FlexBox
            style={{ marginBottom: 10 }}
            justify="space-between"
            align="flex-start"
            direction="column"
        >
            <FlexBox>
                <CustomText>{title}</CustomText>
                {isRequired ? <CustomText color={colorStyle.headerColor}>{"*"}</CustomText> : <></>}
            </FlexBox>
            <FlexBox
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                {items.map((item) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={(e) => {
                                pressCallBack(e, item.id);
                            }}
                            key={item.label}
                        >
                            <FlexBox style={{ marginRight: 5 }}>
                                {item.isChecked ? (
                                    <MaterialIcons
                                        name="radio-button-checked"
                                        size={24}
                                        color="black"
                                    />
                                ) : (
                                    <MaterialIcons
                                        name="radio-button-unchecked"
                                        size={24}
                                        color="black"
                                    />
                                )}
                                <FlexBox style={{ width: 5 }}></FlexBox>
                                <CustomText>{item.label}</CustomText>
                            </FlexBox>
                        </TouchableWithoutFeedback>
                    );
                })}
            </FlexBox>
        </FlexBox>
    );
};
