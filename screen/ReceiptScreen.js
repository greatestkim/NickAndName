import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { Barcode, CustomModal, CustomText, FlexBox } from "../components";
import { needUpdateState } from "../lib/data/atom";
import { colorStyle } from "../lib/data/styleData";
import { makeNameUtil, storageUtil } from "../lib/util";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: colorStyle.backgroundColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorStyle.black,
    borderRadius: 1,
  },
});

const BorderLine = styled(FlexBox)`
  border-color: ${colorStyle.black};
  border-width: 1px;
  border-style: dashed;
  width: ${(props) => `${props.width}px`};
  height: 1px;
  margin-bottom: 10px;
`;

export default function ReceiptScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNameSet, setIsNameSet] = useState(false);
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateState);

  const nameKeyArr = ["first name", "middle name", "last name"];
  const [newName, setNewName] = useState([
    {
      id: 0,
      key: "first name",
      value: false,
    },
    {
      id: 1,
      key: "middle name",
      value: false,
    },
    {
      id: 2,
      key: "last name",
      value: false,
    },
  ]);

  const [totalName, setTotalName] = useState("");

  const [birthday, setBirthday] = useState("");
  const [signature, setSignature] = useState(route.params.signature);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
  const [randomNum, setRandomNum] = useState("");

  const [windowWidth, setWindowWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [titleWidth, setTitleWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);
  const [logoWidth, setLogoWidth] = useState(0);

  const screenShotRef = useRef();

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

    setNewName((prev) => {
      let temp = [...prev];

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
    setRandomNum(generateRandomCode(15, "no."));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setIsNameSet(false);
  };

  useLayoutEffect(() => {
    if (isLoading) {
      getNewName();
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (isNameSet) {
      setIsLoading(false);
    }
  }, [isNameSet]);

  useLayoutEffect(() => {
    if (Array.isArray(newName) && newName.length > 0)
      setTotalName(() => {
        let result = "";
        let reversedArr = newName.reverse();
        reversedArr.forEach((item, idx) => {
          if (item.value) result += item.value;
          if (idx !== newName.length - 1) result += " ";
        });
        return result;
      });
  }, [newName]);

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

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    setModalVisible(true);
  };

  const onShare = async () => {
    const link =
      Platform.OS === "ios"
        ? "https://apps.apple.com/us"
        : "https://play.google.com/store/";
    //todo: my link
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onSave = () => {
    if (
      !permissionStatus.granted ||
      permissionStatus.status === "undetermined"
    ) {
      requestPermission();
    } else {
      onSaveImageAsync();
    }
  };
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(screenShotRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        const msg =
          Platform.OS === "ios"
            ? "사진에 저장이 되었습니다."
            : "갤러리에 저장이 되었습니다.";
        Alert.alert(msg);
        setIsSaveBtnClicked(false);
        const result = await storageUtil.storeData({
          name: totalName,
          content: localUri,
          number: randomNum,
        });
        console.log("##result", result);
        console.log("##needUpdate2", needUpdate);
        if (result === "success") setNeedUpdate(true);
      }
    } catch (e) {
      console.log("##error onSaveImageAsync", e);
    }
  };

  useEffect(() => {
    if (
      isSaveBtnClicked &&
      (permissionStatus.granted || permissionStatus.status === "granted")
    )
      onSaveImageAsync();
  }, [permissionStatus]);

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
            width: windowWidth,
          }}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
        >
          <ViewShot
            ref={screenShotRef}
            options={{
              fileName: "Nick's name Maker",
              format: "jpg",
              quality: 1,
            }}
          >
            <FlexBox
              direction="column"
              style={{
                backgroundColor: colorStyle.backgroundColor,
                paddingTop: 20,
              }}
            >
              {/* header */}
              <FlexBox
                direction="column"
                style={{
                  width: windowWidth - 20,
                  marginBottom: 10,
                }}
              >
                <FlexBox
                  style={{
                    marginBottom: 20,
                    borderRadius: 10,
                    borderWidth: 10,
                    borderColor: colorStyle.black,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    position: "relative",
                  }}
                  onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    setTitleWidth(width);
                    setTitleHeight(height - 20);
                  }}
                >
                  <MaterialCommunityIcons
                    name="slot-machine-outline"
                    size={titleHeight}
                    color="black"
                    style={{
                      opacity: 0.1,
                      position: "absolute",
                      zIndex: -5,
                      left: titleWidth / 2 - titleHeight / 2,
                    }}
                  />
                  <CustomText fontSize={40} fontWeight="bold">
                    Nick's name Maker
                  </CustomText>
                </FlexBox>
                <FlexBox style={{ marginBottom: 10 }}>
                  <CustomText>* * * R E C E I P T * * *</CustomText>
                </FlexBox>
                <FlexBox>
                  <CustomText>{"No." + randomNum}</CustomText>
                </FlexBox>
              </FlexBox>

              <BorderLine width={windowWidth - 20} />

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
                    height: targetHeight,
                  }}
                  justify="center"
                >
                  <Barcode
                    length={targetHeight}
                    width={(windowWidth - 20) * 0.3}
                    n={3}
                  />
                </FlexBox>

                <FlexBox
                  direction="column"
                  style={{
                    width: (windowWidth - 20) * 0.7,
                  }}
                  onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;

                    setTargetHeight(height - 20);
                  }}
                >
                  <FlexBox direction="column" style={{ width: "100%" }}>
                    {Array.isArray(newName) &&
                      newName.map((item) => {
                        if (!item.value) return <></>;
                        return (
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
                                onPress={() => {
                                  copyToClipboard(item.value);
                                }}
                                style={{ marginLeft: 5 }}
                              >
                                <AntDesign
                                  name="copy1"
                                  size={20}
                                  color="black"
                                />
                              </TouchableWithoutFeedback>
                            </FlexBox>

                            <FlexBox justify="flex-end">
                              <CustomText fontWeight="bold">
                                {item.value}
                              </CustomText>
                            </FlexBox>
                          </FlexBox>
                        );
                      })}

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
                        onPress={() => {
                          copyToClipboard(totalName);
                        }}
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
                style={{
                  width: windowWidth - 20,
                  position: "relative",
                }}
                justify="center"
                align="flex-end"
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;
                  setLogoWidth(width);
                  setLogoHeight(height - 20);
                }}
              >
                <FlexBox
                  style={{
                    position: "absolute",
                    top: logoHeight / 4,
                    left: logoWidth / 10,
                    zIndex: -5,
                    opacity: 0.1,
                    width: "80%",
                  }}
                >
                  <CustomText fontSize={30} fontWeight="bold">
                    Nick's name Maker
                  </CustomText>
                </FlexBox>

                <CustomText style={{ marginBottom: 5, marginLeft: 20 }}>
                  signature:{" "}
                </CustomText>
                {signature !== "" && typeof signature === "string" && (
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: signature }}
                    style={styles.image}
                  />
                )}
              </FlexBox>

              <BorderLine width={windowWidth - 20} />

              <FlexBox
                justify="space-between"
                style={{ width: "100%", padding: 40, paddingTop: 10 }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("AppMain");
                  }}
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
                  onPress={onShare}
                  style={{ marginRight: 5 }}
                >
                  <Entypo name="share" size={24} color="black" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => {
                    onSave();
                    setIsSaveBtnClicked(true);
                  }}
                  style={{ marginRight: 5 }}
                >
                  <MaterialIcons name="save-alt" size={24} color="black" />
                </TouchableWithoutFeedback>
              </FlexBox>
            </FlexBox>
          </ViewShot>
          <View style={styles.centeredView}>
            <CustomModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              msg="클립보드에 복사되었습니다."
              title=""
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
