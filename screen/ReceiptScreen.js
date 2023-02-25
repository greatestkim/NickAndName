import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    useWindowDimensions,
    View,
} from "react-native";

import { CustomText, FlexBox } from "../components";
import { colorStyle } from "../lib/data/styleData";
import { makeNameUtil } from "../lib/util";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        height: "100%",
        width: "100%",
        backgroundColor: colorStyle.backgroundColor,
    },
});

export default function ReceiptScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const nameKeyArr = ["first name", "middle name", "last name"];
    const [nameDefaultArr, setNameDefaultArr] = useState(nameKeyArr);
    const [nameArr, setNameArr] = useState([]);
    const [totalName, setTotalName] = useState("");
    const [isNameSet, setIsNameSet] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [borderLine, setBorderLine] = useState("");
    const [birthday, setBirthday] = useState("");

    const CURSOR_SIDE_SIZE = 20;
    const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

    const touch = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const dimensions = useWindowDimensions();

    const getNewName = () => {
        const lastNameParams = Object.prototype.hasOwnProperty.call(route.params, "lastName")
            ? route.params.lastName
            : false;

        const resultName = makeNameUtil.makeNameFuncMain(
            lastNameParams,
            route.params.middleName,
            route.params.vibe
        );

        setNameArr(() => {
            let temp = [...nameDefaultArr];
            console.log("##temp", temp);
            let resultArr = temp.map((item, idx) => {
                let newKey = nameKeyArr[idx].replace(" name", "");
                return {
                    ...item,
                    value: resultName[newKey],
                };
            });
            return [...resultArr];
        });

        setIsNameSet(true);
    };

    const getNewName2 = () => {
        console.log("##newArr", typeof nameArr, nameArr);
        return "hamin";
    };

    useLayoutEffect(() => {
        setNameDefaultArr((prev) => {
            let temp = [...nameKeyArr];
            return temp.map((item, idx) => {
                return {
                    id: idx,
                    key: item,
                    value: "",
                };
            });
        });
        setWindowWidth(Dimensions.get("window").width);
        setBirthday(() => {
            const newDate = {
                ...route.params.birthday,
                month: Number(route.params.birthday.month) - 1,
            };
            const birthday = moment(newDate);
            const days = moment().diff(birthday, "days");
            return days;
        });
    }, []);

    useLayoutEffect(() => {
        if (windowWidth > 0) {
            let str = "";
            for (let i = 0; i < (windowWidth - 80) / 8; i++) {
                str += "-";
            }
            setBorderLine(str);
        }
    }, [windowWidth]);

    useLayoutEffect(() => {
        console.log("##nameDefaultArr", nameDefaultArr);
        if (typeof nameDefaultArr[0] !== "string") {
            setIsInit(true);
        }
    }, [nameDefaultArr]);

    useLayoutEffect(() => {
        if (isInit) getNewName();
    }, [isInit]);

    const handleRefresh = () => {
        setIsLoading(true);
    };

    useLayoutEffect(() => {
        if (isNameSet) {
            setIsLoading(false);
        } else if (!isNameSet && isInit) getNewName();
    }, [isNameSet]);

    useLayoutEffect(() => {
        if (isLoading) {
            setIsNameSet(false);
        }
    }, [isLoading]);

    useLayoutEffect(() => {
        console.log("##nameArr", nameArr);
        if (Array.isArray(nameArr) && nameArr.length > 0)
            setTotalName(() => {
                let result = "";
                let reversedArr = nameArr.reverse();
                reversedArr.forEach((item, idx) => {
                    result += item.value;
                    if (idx !== nameArr.length - 1) result += " ";
                });
                return result;
            });
    }, [nameArr]);

    useLayoutEffect(() => {
        console.log("##totalName", totalName);
    }, [totalName]);

    const generateRandomCode = () => {
        let str = "";
        for (let i = 0; i < 15; i++) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <FlexBox justify="center" style={{ width: "100%", height: "100%" }}>
                    <ActivityIndicator size="large" color={colorStyle.headerColor} />
                </FlexBox>
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: 20,
                        width: "100%",
                    }}
                    directionalLockEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                >
                    <FlexBox direction="column" style={{ width: "100%" }}>
                        <FlexBox
                            style={{
                                width: "100%",
                                paddingTop: 10,
                                paddingRight: 10,
                                paddingLeft: 10,
                            }}
                            direction="column"
                        >
                            <CustomText
                                fontSize={40}
                                style={{ marginBottom: 30 }}
                                fontWeight="bold"
                            >
                                RECEIPT
                            </CustomText>
                            <FlexBox
                                direction="column"
                                style={{ width: "100%", padding: 10 }}
                                align="flex-start"
                            >
                                <CustomText>Address: 202 Present St., Imagine</CustomText>
                                <CustomText style={{ marginBottom: 10 }}>
                                    Tel: 0042-4559-8809
                                </CustomText>
                                <FlexBox justify="flex-end" style={{ width: "100%" }}>
                                    <TouchableHighlight
                                        onPress={handleRefresh}
                                        style={{ marginRight: 5 }}
                                    >
                                        <Feather name="refresh-ccw" size={24} color="black" />
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => {}}
                                        style={{ marginRight: 5 }}
                                    >
                                        <Entypo name="share" size={24} color="black" />
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => {}}
                                        style={{ marginRight: 5 }}
                                    >
                                        <MaterialIcons name="save-alt" size={24} color="black" />
                                    </TouchableHighlight>
                                </FlexBox>
                            </FlexBox>
                            <CustomText>
                                {typeof borderLine === "string"
                                    ? borderLine
                                    : "-------------------------------?"}
                            </CustomText>
                            <CustomText>{"No." + generateRandomCode()}</CustomText>
                            <CustomText>
                                {typeof borderLine === "string"
                                    ? borderLine
                                    : "-------------------------------?"}
                            </CustomText>
                        </FlexBox>

                        <FlexBox
                            direction="column"
                            style={{
                                padding: 10,
                            }}
                        >
                            <FlexBox direction="column" style={{ padding: 0 }}>
                                {Array.isArray(nameArr) &&
                                    nameArr.map((item) => (
                                        <FlexBox
                                            style={{
                                                width: Dimensions.get("window").width - 40,
                                                padding: 10,
                                            }}
                                            key={item.key + " " + item.value}
                                            justify="space-between"
                                        >
                                            <CustomText>{item.key}</CustomText>

                                            <CustomText>{item.value}</CustomText>
                                        </FlexBox>
                                    ))}

                                <FlexBox
                                    style={{
                                        width: Dimensions.get("window").width - 40,
                                        padding: 10,
                                    }}
                                    justify="space-between"
                                >
                                    <CustomText>태어난 지</CustomText>

                                    <CustomText>{`+${birthday}`}</CustomText>
                                </FlexBox>
                            </FlexBox>

                            <CustomText>
                                {typeof borderLine === "string"
                                    ? borderLine
                                    : "-------------------------------?"}
                            </CustomText>

                            <FlexBox
                                align="flex-start"
                                style={{
                                    width: "100%",
                                    padding: 10,
                                }}
                                direction="column"
                            >
                                <CustomText fontWeight="bold">total</CustomText>
                                <FlexBox style={{ width: "100%" }} justify="flex-end">
                                    <CustomText fontWeight="bold">{totalName}</CustomText>
                                    <TouchableHighlight
                                        onPress={() => {}}
                                        style={{ marginLeft: 5 }}
                                    >
                                        <AntDesign name="copy1" size={24} color="black" />
                                    </TouchableHighlight>
                                </FlexBox>
                                <FlexBox
                                    style={{
                                        overflow: "hidden",
                                        marginTop: 10,
                                        width: "100%",
                                    }}
                                    justify="center"
                                >
                                    {/* <Text style={{ fontFamily: "BarcodeFonts", fontSize: 100 }}>
                  {"889900044877671232"}
                </Text> */}
                                    <Text style={{ fontFamily: "BarcodeFonts", fontSize: 100 }}>
                                        {"RECEIPTSPACEFORSOMEONE"}
                                    </Text>
                                </FlexBox>
                            </FlexBox>
                        </FlexBox>

                        <FlexBox
                            direction="column"
                            style={{
                                width: "100%",
                                paddingTop: 5,
                                paddingBottom: 10,
                                paddingRight: 10,
                                paddingLeft: 10,
                            }}
                        >
                            <CustomText>
                                {typeof borderLine === "string"
                                    ? borderLine
                                    : "-------------------------------?"}
                            </CustomText>
                            <CustomText style={{ marginBottom: 15 }} fontWeight="bold">
                                The day you have new identity
                            </CustomText>
                            <CustomText>
                                {typeof moment().format("YYYY-MM-DD") === "string"
                                    ? moment().format("YYYY-MM-DD")
                                    : ""}
                            </CustomText>
                        </FlexBox>
                    </FlexBox>
                </ScrollView>
            )}
        </View>
    );
}
