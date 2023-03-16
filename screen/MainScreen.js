import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import bear from "../assets/images/icons/bear.png";
import file_pencil from "../assets/images/icons/file_pencil.png";
import find from "../assets/images/icons/find_file.png";
import folder from "../assets/images/icons/folder_32.png";
import hand from "../assets/images/icons/hand.png";
import help from "../assets/images/icons/help.png";
import keyboard from "../assets/images/icons/keyboard.png";
import newImg from "../assets/images/icons/new.png";
import no_permission from "../assets/images/icons/no_permission.png";
import programs from "../assets/images/icons/programs.png";
import settings from "../assets/images/icons/settings.png";
import window_logo from "../assets/images/icons/window_logo.png";
import {
  BottomSheet,
  CustomButton,
  CustomText,
  FlexBox,
  InputBox,
  WindowBox,
} from "../components";
import { colorStyle, randomImgList } from "../lib/data/styleData";
import nameList from "../lib/nameCollection.json";
import tmpNameList from "../lib/tmpCollection.json";

const MainContainer = styled(FlexBox).attrs({
  direction: "column",
  justify: "space-between",
})`
  height: 100%;
  width: 100%;
  position: relative;
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
  position: relative;
  z-index: 42;
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

export const BorderLine = styled(FlexBox).attrs({})`
  background: ${colorStyle.backgroundColor};
  border-top-width: 1px;
  border-top-color: ${colorStyle.white};
  border-left-width: 1px;
  border-left-color: ${colorStyle.white};
  border-bottom-width: 1px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-width: 1px;
  border-right-color: ${colorStyle.darkGray};
  width: 99%;
`;

const ParentsMenuContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-color: ${colorStyle.white};
  border-left-width: 2px;
  border-left-color: ${colorStyle.white};
  border-bottom-width: 2px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-width: 2px;
  border-right-color: ${colorStyle.darkGray};
  position: absolute;
  top: -254px;
`;

const ChildMenuContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  background: ${colorStyle.backgroundColor};
  border-top-width: 2px;
  border-top-color: ${colorStyle.white};
  border-left-width: 2px;
  border-left-color: ${colorStyle.white};
  border-bottom-width: 2px;
  border-bottom-color: ${colorStyle.darkGray};
  border-right-width: 2px;
  border-right-color: ${colorStyle.darkGray};
  position: absolute;
  top: 0;
  left: ${Dimensions.get("window").width * 0.5}px;
  z-index: 15;
  min-width: ${Dimensions.get("window").width * 0.4}px;
`;

const ParentsMenuItem = styled(FlexBox).attrs({
  justify: "space-between",
})`
  background: ${(props) => props.backColor};
  width: ${Dimensions.get("window").width * 0.5}px;
  min-height: 50px;
  margin: 0;
  padding-left: 5px;
`;

const ChildMenuItem = styled(FlexBox).attrs({
  justify: "flex-start",
})`
  background: ${colorStyle.backgroundColor};
  width: ${Dimensions.get("window").width * 0.4}px;
  min-height: 40px;
  position: relative;
  z-index: 15;
  padding-right: 5px;
`;

export default function MainScreen({ navigation }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowChildMenu, setIsShowChildMenu] = useState("");
  const [windowVisible, setWindowVisible] = useState(true);
  const [windowDelete, setWindowDelete] = useState(false);
  const [inputWindowVisible, setInputWindowVisible] = useState(false);
  const [inputWindowDelete, setInputWindowDelete] = useState(true);
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [birthdayText, setBirthdayText] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [inputFocused, setInputtFocused] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();
  const [isPhotoBtnClicked, setIsPhotoBtnClicked] = useState(false);
  const [btsVisible, setBtsVisible] = useState(false);
  const photoSelArr = ["기본 사진 선택", "사진 라이브러리에서 선택"];
  const [imgManageIdx, setImgManageIdx] = useState(0);

  const pageArr = [
    {
      id: 0,
      title: "이름",
      placeholder: "예)구은재",
      value: nameText,
      setFunc: setNameText,
      inputMode: "default",
      buttonType: "next",
    },
    {
      id: 1,
      title: "지역",
      placeholder: "예)동해",
      value: locationText,
      setFunc: setLocationText,
      inputMode: "default",
      buttonType: "next",
    },
    {
      id: 2,
      title: "생일",
      placeholder: "예)19970324",
      value: birthdayText,
      setFunc: setBirthdayText,
      inputMode: "numeric",
      buttonType: "next",
    },
    {
      id: 3,
      title: "사진",
      value: photoSrc,
      setFunc: setPhotoSrc,
      buttonType: "done",
    },
  ];

  const menuArr = [
    {
      id: 0,
      name: "Programs",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Programs",
          icon: no_permission,
        },
      ],
      icon: programs,
    },
    {
      id: 1,
      name: "Find",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Find",
          icon: no_permission,
        },
      ],
      icon: find,
    },
    {
      id: 2,
      name: "New",
      child: [
        {
          id: 0,
          name: "Name",
          icon: file_pencil,
          nav: "NewNameMain",
          parents: "New",
        },
        {
          id: 1,
          name: "ID Card",
          icon: bear,
          parents: "New",
          nav: "setInputWindowVisible",
        },
      ],
      icon: newImg,
    },
    {
      id: 3,
      name: "App Info",
      child: null,
      nav: "AppInfoMain",
      icon: help,
    },
    {
      id: 4,
      name: "Settings",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Settings",
          icon: no_permission,
        },
      ],
      icon: settings,
    },
  ];

  const nameFunc = () => {
    const propertyArr = [
      "purple",
      "yellow",
      "white",
      "brown",
      "blue",
      "green",
      "black",
      "pink",
    ];
    let rotateCnt = 0;
    let totalCnt = 0;

    for (rotateCnt = 0; totalCnt < tmpNameList.length; rotateCnt++) {
      propertyArr.forEach((prop) => {
        let cnt = 0;
        let isFull = false;
        for (totalCnt; totalCnt < tmpNameList.length; totalCnt++) {
          if (tmpNameList.length === totalCnt) {
            isFull = true;
            break;
          }
          if (cnt >= 3) break;
          else {
            nameList.firstName[prop].push(tmpNameList[totalCnt]);
            cnt++;
            totalCnt++;
          }
        }
        if (isFull) return;
      });
      if (tmpNameList.length <= totalCnt) {
        break;
      }
    }
  };
  useEffect(() => {
    //nameFunc();
    return () => {
      setIsShowMenu(false);
      setInputWindowDelete(true);
      setNameText("");
      setLocationText("");
      setBirthdayText("");
      setPhotoSrc("");
    };
  }, []);

  useEffect(() => {
    if (!isShowMenu) setIsShowChildMenu("");
  }, [isShowMenu]);

  useEffect(() => {
    if (windowDelete) setWindowVisible(false);
  }, [windowDelete]);

  useEffect(() => {
    if (inputWindowDelete) {
      setPageIdx(0);
      setInputWindowVisible(false);
      setNameText("");
      setLocationText("");
      setBirthdayText("");
      setPhotoSrc("");
    }
  }, [inputWindowDelete]);

  useEffect(() => {
    let isValidBirth = moment(birthdayText, "YYYYMMDD", true).isValid();

    if (
      (pageIdx === 0 && nameText.trim() === "") ||
      (pageIdx === 1 && locationText.trim() === "") ||
      (pageIdx === 2 && (birthdayText.trim() === "" || !isValidBirth)) ||
      (pageIdx === 3 && photoSrc === "")
    )
      setNextDisabled(true);
    else setNextDisabled(false);

    if (!isValidBirth)
      setBirthdayError("생년월일을 8자리 정수 형식으로 입력해주세요.");
    else setBirthdayError("");
  }, [pageIdx, locationText, nameText, birthdayText, photoSrc]);

  useEffect(() => {
    if (inputWindowVisible) setInputWindowDelete(false);
  }, [inputWindowVisible]);

  useEffect(() => {
    if (
      isPhotoBtnClicked &&
      (permissionStatus.granted || permissionStatus.status === "granted")
    )
      setBtsVisible(true);
  }, [permissionStatus]);

  const handleSelectPhoto = () => {
    if (
      !permissionStatus.granted ||
      permissionStatus.status === "undetermined"
    ) {
      setIsPhotoBtnClicked(true);
      requestPermission();
    } else {
      setBtsVisible(true);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoSrc(result.assets[0].uri);
      setBtsVisible(false);
    }
  };

  const handleBts = (idx) => {
    setImgManageIdx(idx);
    if (idx === 0) {
      setPhotoSrc(() => {
        const leng = randomImgList.length;
        const idx = Math.floor(Math.random() * (leng - 0));
        return idx;
      });
      setBtsVisible(false);
    } else if (idx === 1) pickImage();
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <KeyboardAvoidingView behavior="height">
        <TouchableWithoutFeedback
          onPress={() => {
            if (isShowMenu) setIsShowMenu(false);
            if (inputFocused) Keyboard.dismiss();
          }}
        >
          <MainContainer>
            <FlexBox style={{ minHeight: 50 }}>
              <CustomText
                fontSize={20}
                fontWeight="Bold"
                color={colorStyle.backgroundColor}
              >
                Nick's name Maker
              </CustomText>
            </FlexBox>
            <FlexBox
              direction="column"
              align="flex-start"
              style={{
                position: "absolute",
                zIndex: 40,
                top: 60,
                left: 0,
                width: "100%",
                height: "100%",
                padding: 20,
              }}
            >
              <TouchableHighlight onPress={() => {}}>
                <FlexBox
                  direction="column"
                  style={{ marginBottom: 10, marginLeft: 10 }}
                >
                  <Image
                    source={folder}
                    style={{
                      width: 32,
                      height: 32,
                      marginBottom: 2,
                    }}
                  />
                  <CustomText
                    color={colorStyle.white}
                    style={{
                      textOverflow: "ellipsis",
                      width: 80,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    연 가은dmdmdmdmdmdmdmdmdmdmddmdmddmdmddmdmdm
                  </CustomText>
                </FlexBox>
              </TouchableHighlight>
            </FlexBox>

            {inputWindowVisible ? (
              <FlexBox
                style={{
                  position: "absolute",
                  zIndex: 50,
                  top: Dimensions.get("window").height * 0.3,
                  left: 55,
                  width: "100%",
                }}
              >
                <WindowBox
                  windowVisible={inputWindowVisible}
                  setWindowVisible={setInputWindowVisible}
                  setWindowDelete={setInputWindowDelete}
                  msg={
                    <>
                      <FlexBox
                        direction="column"
                        justify="center"
                        style={{ padding: 10 }}
                      >
                        {pageArr.map((pageItem, idx) => {
                          if (pageIdx === pageItem.id)
                            return (
                              <Fragment key={idx + ". " + pageItem.title}>
                                {pageItem.id < 3 && (
                                  <InputBox
                                    title={pageItem.title}
                                    changeCallback={pageItem.setFunc}
                                    textValue={pageItem.value}
                                    placeholder={pageItem.placeholder}
                                    inputMode={pageItem.inputMode}
                                    onFocus={(e) => {
                                      setInputtFocused(true);
                                    }}
                                    onBlur={(e) => {
                                      setInputtFocused(false);
                                    }}
                                    autoFocus={true}
                                  />
                                )}
                                {pageItem.id === 2 && birthdayError !== "" && (
                                  <FlexBox style={{ padding: 5 }}>
                                    <CustomText color={colorStyle.warningColor}>
                                      {birthdayError}
                                    </CustomText>
                                  </FlexBox>
                                )}
                                {pageItem.id === 3 && (
                                  <FlexBox
                                    style={{ width: "100%", marginBottom: 20 }}
                                  >
                                    <TouchableWithoutFeedback
                                      onPress={handleSelectPhoto}
                                    >
                                      <FlexBox style={{ padding: 20 }}>
                                        <MaterialIcons
                                          name="photo-camera"
                                          size={24}
                                          color="black"
                                        />
                                      </FlexBox>
                                    </TouchableWithoutFeedback>
                                    {photoSrc !== "" ? (
                                      <Image
                                        style={{
                                          width: 100,
                                          height: 100,
                                          marginRight: 5,
                                        }}
                                        source={
                                          imgManageIdx === 0
                                            ? randomImgList[photoSrc]
                                            : { uri: photoSrc }
                                        }
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </FlexBox>
                                )}
                                <FlexBox>
                                  {pageItem.id !== 0 && (
                                    <>
                                      <CustomButton
                                        text="prev"
                                        pressCallback={() => {
                                          setPageIdx(idx - 1);
                                        }}
                                      />
                                      <FlexBox
                                        style={{ width: 100, height: 10 }}
                                      ></FlexBox>
                                    </>
                                  )}
                                  <CustomButton
                                    text={pageItem.buttonType}
                                    pressCallback={() => {
                                      if (pageItem.buttonType === "done") {
                                        navigation.navigate("IdCardMain", {
                                          name: nameText,
                                          photoIdx: imgManageIdx,
                                          photo: photoSrc,
                                          location: locationText,
                                          birthday: birthdayText,
                                        });
                                        setInputWindowDelete(true);
                                      } else setPageIdx(idx + 1);
                                    }}
                                    disabled={nextDisabled}
                                  />
                                </FlexBox>
                              </Fragment>
                            );
                        })}
                      </FlexBox>
                    </>
                  }
                  title={
                    <>
                      <FlexBox style={{ minHeight: 24 }}>
                        <Image
                          source={keyboard}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 3,
                            marginLeft: 10,
                          }}
                        />
                        <CustomText color={colorStyle.white}>
                          입력해주세요.
                        </CustomText>
                      </FlexBox>
                    </>
                  }
                />
              </FlexBox>
            ) : (
              <></>
            )}

            {windowVisible ? (
              <FlexBox
                style={{
                  position: "absolute",
                  zIndex: 49,
                  top: Dimensions.get("window").height * 0.4,
                  left: Dimensions.get("window").width * 0.1,
                  width: "100%",
                }}
              >
                <WindowBox
                  windowVisible={windowVisible}
                  setWindowVisible={setWindowVisible}
                  setWindowDelete={setWindowDelete}
                  msg={
                    <FlexBox style={{ padding: 10 }} direction="column">
                      <CustomText>{"새 이름을 원할 경우"}</CustomText>
                      <CustomText fontWeight="Bold">
                        {"Start > New > Name"}
                      </CustomText>
                      <CustomText>{""}</CustomText>
                      <CustomText>{"새 신분증을 원할 경우"}</CustomText>
                      <CustomText fontWeight="Bold">
                        {"Start > New > ID Card"}
                      </CustomText>
                    </FlexBox>
                  }
                  title={
                    <>
                      <FlexBox style={{ minHeight: 24 }}>
                        <Image
                          source={hand}
                          style={{ width: 24, height: 24, marginRight: 3 }}
                        />
                        <CustomText color={colorStyle.white}>
                          반가워요!
                        </CustomText>
                      </FlexBox>
                    </>
                  }
                />
              </FlexBox>
            ) : (
              <></>
            )}
            <ControlBar>
              <TouchableHighlight
                onPress={() => {
                  setIsShowMenu((prev) => !prev);
                }}
              >
                <StartBtn>
                  <Image
                    source={window_logo}
                    style={{ width: 24, height: 24, marginRight: 3 }}
                  />
                  <CustomText>Start</CustomText>
                </StartBtn>
              </TouchableHighlight>

              {!windowDelete ? (
                <TouchableHighlight
                  onPress={() => {
                    setWindowVisible((prev) => !prev);
                  }}
                  style={{ marginLeft: 5 }}
                >
                  <StartBtn>
                    <Image
                      source={hand}
                      style={{ width: 24, height: 24, marginRight: 3 }}
                    />
                    <CustomText style={{ paddingLeft: 3 }}>
                      {"반가워요!"}
                    </CustomText>
                  </StartBtn>
                </TouchableHighlight>
              ) : (
                <></>
              )}

              {!inputWindowDelete ? (
                <TouchableHighlight
                  onPress={() => {
                    setInputWindowVisible((prev) => !prev);
                  }}
                  style={{ marginLeft: 5 }}
                >
                  <StartBtn>
                    <Image
                      source={keyboard}
                      style={{ width: 24, height: 24, marginRight: 3 }}
                    />
                    <CustomText style={{ paddingLeft: 3 }}>
                      {"입력해..."}
                    </CustomText>
                  </StartBtn>
                </TouchableHighlight>
              ) : (
                <></>
              )}

              {isShowMenu ? (
                <ParentsMenuContainer>
                  {menuArr.map((menuItem) => {
                    return (
                      <Fragment key={menuItem.id + menuItem.name}>
                        {menuItem.name === "New" ? <BorderLine /> : <></>}
                        <TouchableHighlight
                          onPress={() => {
                            if (menuItem.nav) {
                              setIsShowMenu(false);
                              setInputWindowDelete(true);

                              navigation.navigate(menuItem.nav);
                            } else if (menuItem.child)
                              setIsShowChildMenu(menuItem.name);
                          }}
                        >
                          <ParentsMenuItem
                            key={menuItem.id + menuItem.name}
                            backColor={
                              menuItem.name === isShowChildMenu
                                ? colorStyle.headerColor
                                : colorStyle.backgroundColor
                            }
                          >
                            <FlexBox>
                              <Image
                                source={menuItem.icon}
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 5,
                                }}
                              />
                              <CustomText
                                color={
                                  menuItem.name === isShowChildMenu
                                    ? colorStyle.white
                                    : colorStyle.black
                                }
                              >
                                {menuItem.name}
                              </CustomText>
                            </FlexBox>

                            {menuItem.child ? (
                              <>
                                <MaterialIcons
                                  name="arrow-right"
                                  size={24}
                                  color={
                                    menuItem.name === isShowChildMenu
                                      ? colorStyle.white
                                      : colorStyle.black
                                  }
                                  style={{ marginRight: 7 }}
                                />
                                {isShowChildMenu ===
                                menuItem.child[0].parents ? (
                                  <ChildMenuContainer>
                                    {menuItem.child.map((childItem, idx) => {
                                      return (
                                        <Fragment
                                          key={childItem.id + childItem.name}
                                        >
                                          {Object.prototype.hasOwnProperty.call(
                                            childItem,
                                            "nav"
                                          ) ? (
                                            <TouchableHighlight
                                              onPress={() => {
                                                setIsShowMenu(false);
                                                if (
                                                  childItem.nav ===
                                                  "setInputWindowVisible"
                                                )
                                                  setInputWindowVisible(true);
                                                else {
                                                  setInputWindowDelete(true);

                                                  navigation.navigate(
                                                    childItem.nav
                                                  );
                                                }
                                              }}
                                            >
                                              <ChildMenuItem>
                                                <Image
                                                  source={childItem.icon}
                                                  style={{
                                                    width: 24,
                                                    height: 24,
                                                    marginRight: 7,
                                                  }}
                                                />
                                                <CustomText>
                                                  {childItem.name}
                                                </CustomText>
                                              </ChildMenuItem>
                                            </TouchableHighlight>
                                          ) : (
                                            <ChildMenuItem>
                                              <Image
                                                source={childItem.icon}
                                                style={{
                                                  width: 24,
                                                  height: 24,
                                                  marginRight: 7,
                                                }}
                                              />
                                              <CustomText>
                                                {childItem.name}
                                              </CustomText>
                                            </ChildMenuItem>
                                          )}

                                          {idx !== menuItem.child.length - 1 ? (
                                            <BorderLine />
                                          ) : (
                                            <></>
                                          )}
                                        </Fragment>
                                      );
                                    })}
                                  </ChildMenuContainer>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </ParentsMenuItem>
                        </TouchableHighlight>

                        {menuItem.name === "New" ? <BorderLine /> : <></>}
                      </Fragment>
                    );
                  })}
                </ParentsMenuContainer>
              ) : (
                <></>
              )}
            </ControlBar>
          </MainContainer>
        </TouchableWithoutFeedback>
        <BottomSheet
          btsVisible={btsVisible}
          setBtsVisible={setBtsVisible}
          header="사진 옵션 선택"
          body={
            <FlexBox direction="column" style={{ width: "100%" }}>
              {photoSelArr.map((item, idx) => {
                return (
                  <Fragment key={item + " " + idx}>
                    <TouchableHighlight
                      activeOpacity={0.2}
                      onPress={() => {
                        handleBts(idx);
                      }}
                    >
                      <FlexBox
                        style={{
                          minHeight: 50,
                          paddingLeft: 5,
                          width: "100%",
                        }}
                      >
                        <CustomText>{item}</CustomText>
                      </FlexBox>
                    </TouchableHighlight>

                    {idx === 0 ? <BorderLine /> : <></>}
                  </Fragment>
                );
              })}
            </FlexBox>
          }
        ></BottomSheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
