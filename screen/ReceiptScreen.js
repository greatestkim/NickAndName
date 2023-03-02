import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { CustomText, FlexBox } from "../components";
import { colorStyle } from "../lib/data/styleData";
import { makeNameUtil } from "../lib/util";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: colorStyle.backgroundColor,
  },
});

const BorderLine = styled(FlexBox)`
  border-color: ${colorStyle.black};
  border-width: 1;
  border-style: dashed;
  width: ${(props) => props.width};
  height: 1;
  margin-bottom: 10;
`;

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
  const [borderLine2nd, setBorderLine2nd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [signature, setSignature] = useState(route.params.signature);

  const [targetHeight, setTargetHeight] = useState(0);

  const getNewName = () => {
    const lastNameParams = Object.prototype.hasOwnProperty.call(
      route.params,
      "lastName"
    )
      ? route.params.lastName
      : false;

    const resultName = makeNameUtil.makeNameFuncMain(
      lastNameParams,
      route.params.middleName,
      route.params.vibe
    );

    setNameArr(() => {
      let temp = [...nameDefaultArr];

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
    console.log("##route.params", route.params);
  }, []);

  useLayoutEffect(() => {
    if (windowWidth > 0) {
      let str = "";
      let str2nd = "";

      for (let i = 0; i < (windowWidth - 20) / 9; i++) {
        str += "-";
        if (i < ((windowWidth - 20) / 9) * 0.7) str2nd += "-";
      }
      setBorderLine(str);
      setBorderLine2nd(str2nd);
    }
  }, [windowWidth]);

  useLayoutEffect(() => {
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

  const generateRandomCode = (n, type) => {
    let str = "";
    if (type === "no.")
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
    else if (type === "barcode")
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
    //here
    return str;
  };

  useEffect(() => {
    console.log("##targetHeight", targetHeight);
  }, [targetHeight]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FlexBox
          justify="center"
          style={{ width: windowWidth, height: "100%" }}
        >
          <ActivityIndicator size="large" color={colorStyle.headerColor} />
        </FlexBox>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            width: windowWidth,
          }}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
        >
          <FlexBox direction="column">
            {/* header */}
            <FlexBox
              direction="column"
              style={{
                width: windowWidth - 20,
                marginBottom: 10,
              }}
            >
              <FlexBox style={{ marginBottom: 10 }}>
                <CustomText>* * * R E C E I P T * * *</CustomText>
              </FlexBox>
              <FlexBox>
                <CustomText>{"No." + generateRandomCode(15, "no.")}</CustomText>
              </FlexBox>
            </FlexBox>

            <BorderLine width={windowWidth - 20} />

            <CustomText
              fontSize={(windowWidth - 20) * 0.3}
              style={{
                width: targetHeight,
                height: (windowWidth - 20) * 0.3,
                lineHeight: (windowWidth - 20) * 0.3,
                overflow: "hidden",
                letterSpacing: -40,
                backgroundColor: "pink",
                textDecoration: "underline",
              }}
            >
              RECEIPTFORYOU!
            </CustomText>

            {/* body */}
            <FlexBox
              style={{
                width: windowWidth - 20,
                marginBottom: 10,
              }}
            >
              <FlexBox
                style={{
                  width: (windowWidth - 20) * 0.3,
                  height: "100%",
                  backgroundColor: "white",
                }}
                justify="center"
              >
                {/* <Text
                  style={{
                    fontFamily: "BarcodeFonts",
                    fontSize: (windowWidth - 20) * 0.3 - 5,
                    transform: [{ rotate: "90deg" }],
                    width: targetHeight,
                    height: (windowWidth - 20) * 0.3,
                    overflow: "hidden",
                  }}
                >
                  RECEIPTSPACEFORSOMEONE8895742365123543211Tttlakjdk
                </Text> */}
                <CustomText
                  fontSize={(windowWidth - 20) * 0.4}
                  style={{
                    transform: [{ rotate: "90deg" }],
                    width: targetHeight,
                    height: (windowWidth - 20) * 0.3,
                    lineHeight: (windowWidth - 20) * 0.3,
                    overflow: "hidden",
                    letterSpacing: -50,
                    backgroundColor: "pink",
                    textDecoration: "underline",
                  }}
                >
                  RECEIPTFORYOU!
                </CustomText>
              </FlexBox>

              <FlexBox
                direction="column"
                style={{
                  width: (windowWidth - 20) * 0.7,
                }}
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;
                  console.log("##x, y, width, height", x, y, width, height);
                  setTargetHeight(height - 20);
                }}
              >
                <FlexBox direction="column" style={{ width: "100%" }}>
                  {Array.isArray(nameArr) &&
                    nameArr.map((item) => (
                      <FlexBox
                        style={{
                          padding: 5,

                          width: "100%",
                        }}
                        key={item.key + " " + item.value}
                        direction="column"
                        align="flex-start"
                      >
                        <FlexBox
                          justify="space-between"
                          style={{
                            marginBottom: 5,

                            width: "100%",
                          }}
                        >
                          <CustomText fontSize={15}>{item.key}</CustomText>
                          <TouchableWithoutFeedback
                            onPress={() => {}}
                            style={{ marginLeft: 5 }}
                          >
                            <AntDesign name="copy1" size={20} color="black" />
                          </TouchableWithoutFeedback>
                        </FlexBox>

                        <FlexBox justify="flex-end">
                          <CustomText fontWeight="bold">
                            {item.value}
                          </CustomText>
                        </FlexBox>
                      </FlexBox>
                    ))}

                  <FlexBox
                    style={{
                      padding: 10,

                      width: "100%",
                    }}
                    direction="column"
                    align="flex-start"
                  >
                    <FlexBox
                      justify="space-between"
                      style={{ marginBottom: 5 }}
                    >
                      <CustomText fontSize={15}>태어난 지</CustomText>
                    </FlexBox>

                    <FlexBox justify="flex-end">
                      <CustomText fontWeight="bold">
                        {`+${birthday}`}
                      </CustomText>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>

                <BorderLine width={(windowWidth - 20) * 0.7} />

                <FlexBox
                  style={{
                    padding: 10,
                    width: "100%",
                  }}
                  direction="column"
                  align="flex-start"
                >
                  <FlexBox
                    justify="space-between"
                    style={{ marginBottom: 10, width: "100%" }}
                  >
                    <CustomText fontSize={15}>total</CustomText>
                    <TouchableWithoutFeedback
                      onPress={() => {}}
                      style={{ marginLeft: 5 }}
                    >
                      <AntDesign name="copy1" size={24} color="black" />
                    </TouchableWithoutFeedback>
                  </FlexBox>

                  <FlexBox justify="flex-end">
                    <CustomText fontWeight="bold">{totalName}</CustomText>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </FlexBox>

            <BorderLine width={windowWidth - 20} />

            {/* footer     */}
            <FlexBox
              direction="column"
              style={{
                width: windowWidth - 20,
              }}
            >
              {/* {signature !== "" && typeof signature === "string" && (
                <FlexBox
                  style={{
                    width: windowWidth - 80,
                    height: 250,
                    marginTop: 10,
                  }}
                  direction="column"
                  justify="center"
                >
                  <FlexBox
                    style={{
                      width: windowWidth - 80,
                      height: 15,
                      borderTopWidth: 1,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopColor: colorStyle.black,
                      borderBottomColor: colorStyle.black,
                      borderRightColor: colorStyle.black,
                    }}
                  ></FlexBox>
                  <ImageContainer>
                    <Image
                      resizeMode={"contain"}
                      source={{ uri: signature }}
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />
                  </ImageContainer>

                  <FlexBox
                    style={{
                      width: windowWidth - 80,
                      height: 15,
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomColor: colorStyle.black,
                      borderBottomColor: colorStyle.black,
                      borderRightColor: colorStyle.black,
                    }}
                  ></FlexBox>
                </FlexBox>
              )} */}
              {signature !== "" && typeof signature === "string" && (
                <Image
                  resizeMode={"contain"}
                  source={{ uri: signature }}
                  style={{
                    width: 200,
                    height: 200,
                    borderWidth: 1,
                    borderColor: colorStyle.black,
                    marginBottom: 10,
                  }}
                />
              )}
            </FlexBox>

            <BorderLine width={windowWidth - 20} />

            <FlexBox
              justify="space-between"
              style={{ width: "100%", padding: 40, paddingTop: 0 }}
            >
              <TouchableWithoutFeedback
                onPress={() => {}}
                style={{ marginRight: 5 }}
              >
                <Entypo name="home" size={24} color="black" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={handleRefresh}
                style={{ marginRight: 5 }}
              >
                <Feather name="refresh-ccw" size={24} color="black" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {}}
                style={{ marginRight: 5 }}
              >
                <Entypo name="share" size={24} color="black" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {}}
                style={{ marginRight: 5 }}
              >
                <MaterialIcons name="save-alt" size={24} color="black" />
              </TouchableWithoutFeedback>
            </FlexBox>

            {/* <FlexBox
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
                        width: windowWidth - 40,
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

              {signature !== "" && typeof signature === "string" && (
                <FlexBox
                  style={{
                    width: Dimensions.get("window").width - 80,
                    height: 250,
                    marginTop: 10,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderTopColor: colorStyle.black,
                    borderBottomColor: colorStyle.black,
                  }}
                  direction="column"
                  justify="center"
                >
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: signature }}
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: colorStyle.white,
                    }}
                  />
                </FlexBox>
              )}
            </FlexBox> */}
          </FlexBox>
        </ScrollView>
      )}
    </View>
  );
}
