import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import styled from "styled-components/native";
import bear from "../assets/images/icons/bear.png";
import camera from "../assets/images/icons/camera_1.png";
import notepad from "../assets/images/icons/file_pencil.png";
import barcode_img from "../assets/images/icons/justify.png";
import noise from "../assets/images/noise.jpg";
import { Barcode, CustomText, FlexBox, WindowBox } from "../components";
import { colorStyle, randomImgList } from "../lib/data/styleData";
import { makeNameUtil } from "../lib/util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    height: "100%",
    backgroundColor: colorStyle.backgroundColor,
  },
});

const CardContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  border: 1px solid ${colorStyle.darkGray};
  border-radius: 15px;
  height: ${(props) => (props.height - 40) * 0.72}px;
  width: ${(props) => props.width - 40}px;
  background-color: ${colorStyle.windowBackColor};
  position: relative;
  clip-path: inset(0 round 10px);
  elevation: 20;
`;

const ControlBar = styled(FlexBox).attrs({
  align: "flex-start",
})`
  min-height: 30px;
  width: 100%;
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-color: ${colorStyle.white};
  padding: 2px;
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const StartBtn = styled(FlexBox).attrs({})`
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-color: ${colorStyle.white};
  border-left-width: 2px;
  border-left-color: ${colorStyle.white};
  border-bottom-width: 2px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-width: 2px;
  border-right-color: ${colorStyle.darkGray};
  padding: 1px;
`;

export default function IdCardScreen({ navigation, route }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [birthday, setBirthday] = useState("");
  const nameKeyArr = ["first name", "middle name", "last name"];
  const [newName, setNewName] = useState(() => {
    if (Object.prototype.hasOwnProperty.call(route.params, "name"))
      return route.params.name;
    else
      return [
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
      ];
  });

  const [totalName, setTotalName] = useState("unknown");
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
  const [fromMain, setFromMain] = useState(false);

  const screenShotRef = useRef();

  useLayoutEffect(() => {
    setWindowWidth(Dimensions.get("window").width);
    setWindowHeight(Dimensions.get("window").height);
  }, []);

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
  };

  useLayoutEffect(() => {
    console.log("##route.params", route.params);
    setBirthday(() => {
      return moment({
        year: Number(route.params.year ? route.params.year : 2023),
        month: Number(route.params.month ? route.params.month : 1) - 1,
        day: Number(route.params.day ? route.params.day : 1),
      }).format("YYYY-MM-DD");
    });
    if (!Object.prototype.hasOwnProperty.call(route.params, "name")) {
      getNewName();
    } else {
      setFromMain(true);
      setTotalName(route.params.name);
    }
  }, [route.params]);

  useLayoutEffect(() => {
    if (Array.isArray(newName) && newName.length > 0 && !fromMain) {
      setTotalName(() => {
        let result = "";
        let reversedArr = newName.reverse();
        reversedArr.forEach((item, idx) => {
          if (item.value) result += item.value;
          if (idx !== newName.length - 1) result += " ";
        });
        return result;
      });
    }
  }, [newName, fromMain]);

  useLayoutEffect(() => {
    if (
      targetWidth !== 0 &&
      targetHeight !== 0 &&
      (totalName !== "unknown" || totalName.trim() !== "")
    )
      setIsLoaded(true);

    console.log("##totalName", totalName);
  }, [totalName, targetWidth, targetHeight]);

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
      <ViewShot
        ref={screenShotRef}
        options={{
          fileName: "Nick's name Maker _ id card",
          format: "jpg",
          quality: 1,
        }}
      >
        <CardContainer
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setTargetHeight(height);
            setTargetWidth(width);
          }}
          style={{
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 15,
            shadowColor: colorStyle.black,
          }}
          width={windowWidth}
          height={windowHeight}
        >
          {isLoaded ? (
            <>
              <FlexBox
                style={{ width: targetWidth, padding: 10 }}
                justify="space-between"
              >
                <WindowBox
                  windowVisible={true}
                  setWindowVisible={() => {}}
                  setWindowDelete={() => {}}
                  msg={
                    <>
                      <FlexBox
                        direction="column"
                        justify="center"
                        style={{ padding: 2 }}
                      >
                        <Image
                          source={
                            Number(route.params.photoIdx) === 0
                              ? randomImgList[Number(route.params.photo)]
                              : { uri: route.params.photo }
                          }
                          style={{
                            width: targetWidth * 0.5,
                            height: targetWidth * 0.5,
                          }}
                        />
                      </FlexBox>
                    </>
                  }
                  title={
                    <>
                      <FlexBox style={{ minHeight: 24 }}>
                        <Image
                          source={camera}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 3,
                            marginLeft: 5,
                          }}
                        />
                        <CustomText color={colorStyle.white}>me.jpg</CustomText>
                      </FlexBox>
                    </>
                  }
                  style={{ width: targetWidth * 0.6, marginTop: -30 }}
                />

                <WindowBox
                  windowVisible={true}
                  setWindowVisible={() => {}}
                  setWindowDelete={() => {}}
                  msg={
                    <>
                      <FlexBox
                        direction="column"
                        justify="center"
                        style={{ backgroundColor: colorStyle.white }}
                      >
                        <Barcode
                          length={(targetHeight - 30) * 0.4}
                          width={targetWidth * 0.3}
                          n={3}
                        />
                      </FlexBox>
                    </>
                  }
                  title={
                    <>
                      <FlexBox style={{ minHeight: 24 }}>
                        <Image
                          source={barcode_img}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 3,
                            marginLeft: 5,
                            transform: [{ rotate: "90deg" }],
                            color: colorStyle.white,
                            backgroundColor: colorStyle.white,
                          }}
                        />
                      </FlexBox>
                    </>
                  }
                  style={{ marginTop: 35, width: targetWidth * 0.3 }}
                />
              </FlexBox>

              <WindowBox
                windowVisible={true}
                setWindowVisible={() => {}}
                setWindowDelete={() => {}}
                msg={
                  <>
                    <FlexBox
                      direction="column"
                      align="flex-start"
                      justify="space-between"
                      style={{
                        padding: 10,
                        backgroundColor: colorStyle.white,
                        width: targetWidth * 0.8,
                        height: (targetHeight - 30) * 0.3,
                      }}
                    >
                      <CustomText>{`name: ${totalName}`}</CustomText>
                      <CustomText>{`birthday: ${birthday}`}</CustomText>
                      <CustomText>{`location: ${
                        route.params.location ? route.params.location : "cosmos"
                      }`}</CustomText>
                      <CustomText>{`issued: ${moment().format(
                        "YYYY-MM-DD"
                      )}`}</CustomText>
                    </FlexBox>
                  </>
                }
                title={
                  <>
                    <FlexBox style={{ minHeight: 24 }}>
                      <Image
                        source={notepad}
                        style={{
                          width: 24,
                          height: 24,
                          marginRight: 3,
                          marginLeft: 5,
                        }}
                      />
                      <CustomText color={colorStyle.white}>me.txt</CustomText>
                    </FlexBox>
                  </>
                }
                style={{
                  marginBottom: 50,
                  width: targetWidth * 0.8,
                  minHeight: (targetHeight - 30) * 0.3,
                }}
              />

              <ControlBar>
                <StartBtn style={{ borderBottomLeftRadius: 10 }}>
                  <Image source={camera} style={{ width: 24, height: 24 }} />
                  <CustomText style={{ paddingLeft: 3 }}>me.jpg</CustomText>
                </StartBtn>

                <StartBtn>
                  <Image source={notepad} style={{ width: 24, height: 24 }} />
                  <CustomText style={{ paddingLeft: 3 }}>me.txt</CustomText>
                </StartBtn>

                <StartBtn>
                  <Image
                    source={barcode_img}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 3,
                      transform: [{ rotate: "90deg" }],
                    }}
                  />
                  <CustomText>barcode</CustomText>
                </StartBtn>
              </ControlBar>

              <Image
                style={{
                  width: targetWidth,
                  height: targetHeight,
                  position: "absolute",
                  top: 0,
                  borderRadius: 15,
                  opacity: 0.1,
                }}
                source={noise}
              />
            </>
          ) : (
            <FlexBox justify="center" style={{ width: "100%", height: "100%" }}>
              <Image source={bear} />
              <CustomText>L o a d i n g . . .</CustomText>
            </FlexBox>
          )}
        </CardContainer>
      </ViewShot>

      <FlexBox
        justify="space-between"
        style={{ width: "100%", padding: 40, paddingTop: 20 }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("AppMain");
          }}
          style={{ marginRight: 5 }}
        >
          <Entypo name="home" size={24} color="black" />
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback
          onPress={handleRefresh}
          style={{ marginRight: 5 }}
        >
          <Feather name="refresh-ccw" size={24} color="black" />
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback onPress={onShare} style={{ marginRight: 5 }}>
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
    </View>
  );
}
