import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import {
  CustomButton,
  CustomText,
  FlexBox,
  InputBox,
  WindowBox,
} from "../components";
import { colorStyle } from "../lib/data/styleData";
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

const BorderLine = styled(FlexBox).attrs({})`
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

  const menuArr = [
    {
      id: 0,
      name: "Programs",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Programs",
          icon: "do-not-touch",
        },
      ],
      icon: "folder-open",
    },
    {
      id: 1,
      name: "Find",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Find",
          icon: "do-not-touch",
        },
      ],
      icon: "find-in-page",
    },
    {
      id: 2,
      name: "New",
      child: [
        {
          id: 0,
          name: "Name",
          icon: "drive-file-rename-outline",
          nav: "NewNameMain",
          parents: "New",
        },
        {
          id: 1,
          name: "ID Card",
          icon: "badge",
          parents: "New",
          nav: "setInputWindowVisible",
        },
      ],
      icon: "fiber-new",
    },
    {
      id: 3,
      name: "App Info",
      child: null,
      nav: "AppInfoMain",
      icon: "info-outline",
    },
    {
      id: 4,
      name: "Settings",
      child: [
        {
          id: 0,
          name: "ready to open",
          parents: "Settings",
          icon: "do-not-touch",
        },
      ],
      icon: "settings",
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
    };
  }, []);

  useEffect(() => {
    if (!isShowMenu) setIsShowChildMenu("");
  }, [isShowMenu]);

  useEffect(() => {
    if (windowDelete) setWindowVisible(false);
  }, [windowDelete]);

  useEffect(() => {
    if (inputWindowDelete) setInputWindowVisible(false);
  }, [inputWindowDelete]);

  useEffect(() => {
    if (inputWindowVisible) setInputWindowDelete(false);
  }, [inputWindowVisible]);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (isShowMenu) setIsShowMenu(false);
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
                    <FlexBox direction="column" justify="center">
                      <InputBox
                        title="이름"
                        changeCallback={setNameText}
                        textValue={nameText}
                      />
                      <CustomButton
                        text="done"
                        pressCallback={() => {
                          setInputWindowDelete(true);
                          setNameText("");
                          navigation.navigate("IdCardMain");
                        }}
                      />
                    </FlexBox>
                  </>
                }
                title="입력해주세요."
              />
            </FlexBox>
          ) : (
            <></>
          )}

          {windowVisible ? (
            <WindowBox
              windowVisible={windowVisible}
              setWindowVisible={setWindowVisible}
              setWindowDelete={setWindowDelete}
              msg={
                <>
                  <CustomText>{"새 이름을 원할 경우"}</CustomText>
                  <CustomText fontWeight="Bold">
                    {"Start > New > Name"}
                  </CustomText>
                  <CustomText>{""}</CustomText>
                  <CustomText>{"새 신분증을 원할 경우"}</CustomText>
                  <CustomText fontWeight="Bold">
                    {"Start > New > ID Card"}
                  </CustomText>
                </>
              }
              title="반가워요!"
            />
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
                <MaterialCommunityIcons
                  name="microsoft-windows-classic"
                  size={24}
                  color="black"
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
                  <MaterialCommunityIcons
                    name="hand-back-right-outline"
                    size={24}
                    color="black"
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
                  <FontAwesome name="keyboard-o" size={24} color="black" />
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
                            setNameText("");
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
                            <MaterialIcons
                              name={menuItem.icon}
                              size={24}
                              color={
                                menuItem.name === isShowChildMenu
                                  ? colorStyle.white
                                  : colorStyle.black
                              }
                              style={{ marginRight: 5 }}
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
                              {isShowChildMenu === menuItem.child[0].parents ? (
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
                                                setNameText("");
                                                navigation.navigate(
                                                  childItem.nav
                                                );
                                              }
                                            }}
                                          >
                                            <ChildMenuItem>
                                              <MaterialIcons
                                                name={childItem.icon}
                                                size={24}
                                                color="black"
                                                style={{
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
                                            <MaterialIcons
                                              name={childItem.icon}
                                              size={24}
                                              color="black"
                                              style={{
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
    </SafeAreaView>
  );
}
