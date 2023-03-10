import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Signature from "react-native-signature-canvas";
import styled from "styled-components/native";
import BlackImg from "../assets/images/BlackImg.jpg";
import BlueImg from "../assets/images/BlueImg.jpg";
import BrownImg from "../assets/images/BrownImg.jpg";
import ExplodingImg from "../assets/images/Exploding.jpg";
import GreenImg from "../assets/images/GreenImg.jpg";
import NiceImg from "../assets/images/Nice.jpg";
import PinkImg from "../assets/images/PinkImg.jpg";
import PurpleImg from "../assets/images/PurpleImg.jpg";
import SayHiImg from "../assets/images/SayHi.jpg";
import SickImg from "../assets/images/Sick.jpg";
import WhiteImg from "../assets/images/WhiteImg.jpg";
import WorkingImg from "../assets/images/Working.jpg";
import YellowImg from "../assets/images/YellowImg.jpg";
import {
  CheckBox,
  CustomModal,
  CustomText,
  FlexBox,
  GridView,
  InputBox,
} from "../components";
import { colorStyle } from "../lib/data/styleData";

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
});

const StyledTextInput = styled(TextInput)`
  font-family: "Galmuri";
  border-width: 2px;
  border-bottom-color: ${colorStyle.white};
  border-right-color: ${colorStyle.white};
  border-top-color: ${colorStyle.black};
  border-left-color: ${colorStyle.black};
  background-color: ${colorStyle.white};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  max-width: ${(props) => props.maxWidth};
  caret-color: ${colorStyle.darkGray};
`;

const StyledBtn = styled(FlexBox).attrs({
  justify: "center",
})`
  font-family: "Galmuri";
  border-width: 2px;
  border-top-color: ${colorStyle.white};
  border-left-color: ${colorStyle.white};
  border-bottom-color: ${colorStyle.darkGray};
  border-right-color: ${colorStyle.darkGray};
  background-color: ${colorStyle.backgroundColor};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 5px;
  padding-left: 5px;
  color: ${colorStyle.black};
  margin-right: 5px;
  margin-top: 5px;
  min-width: ${Dimensions.get("window").width * 0.2}px;
`;

const GridViewContainer = styled(FlexBox)`
  width: 100%;
`;

const CenterContainer = styled(FlexBox).attrs({
  direction: "column",
  align: "flex-start",
})`
  width: 100%;

  padding-left: 20px;
  padding-right: 20px;
`;

const DisabledContainer = styled(FlexBox).attrs({
  justify: "center",
  direction: "column",
})`
  width: 100%;
  height: 100%;
  background-color: rgba(129, 129, 129, 0.2);
  position: absolute;
  top: 0;
  z-index: 50;
`;

export default function NewNameScreen({ navigation }) {
  const { StatusBarManager } = NativeModules;

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [idCardItems, setIdCardItems] = useState([
    { id: 0, isChecked: false, label: "??????" },
    { id: 1, isChecked: true, label: "??????" },
  ]);
  const [needIdCard, setNeedIdCard] = useState(false);

  const randomImgList = [SickImg, SayHiImg, ExplodingImg, NiceImg, WorkingImg];

  const [imgSrc, setImgSrc] = useState("");

  const [clubText, setClubText] = useState("");

  const [birthDayYearValue, setBirthDayYearValue] = useState(
    moment().format("YYYY")
  );
  const [birthDayMonthValue, setBirthDayMonthValue] = useState(
    moment().format("M")
  );
  const [birthDayValue, setBirthDayValue] = useState(moment().format("D"));
  const [birthdayError, setBirthdayError] = useState("");

  const [lastNameText, setLastNameText] = useState("");
  const [middleNameItems, setMiddleNameItems] = useState([
    { id: 0, isChecked: true, label: "??????" },
    { id: 1, isChecked: false, label: "????????? ??????" },
  ]);

  const [vibeItems, setVibeItems] = useState([
    { id: 0, img: PinkImg, isChecked: true, label: "pink" },
    { id: 1, img: BlackImg, isChecked: false, label: "black" },
    { id: 2, img: GreenImg, isChecked: false, label: "green" },
    { id: 3, img: BlueImg, isChecked: false, label: "blue" },
    { id: 4, img: BrownImg, isChecked: false, label: "brown" },
    { id: 5, img: WhiteImg, isChecked: false, label: "white" },
    { id: 6, img: YellowImg, isChecked: false, label: "yellow" },
    { id: 7, img: PurpleImg, isChecked: false, label: "purple" },
  ]);
  const [advantageText, setAdvantageText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [signModalVisible, setSignModalVisible] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [signature, setSign] = useState("");

  const signRef = useRef();

  const handleIdCardCheckBox = (e, idx) => {
    let targetId = idCardItems.findIndex((item) => idx === item.id);
    if (!idCardItems[targetId].isChecked) {
      setIdCardItems((prev) => {
        let temp = [...prev];
        return temp.map((item) => {
          if (item.id === idx) return { ...item, isChecked: true };
          else return { ...item, isChecked: false };
        });
      });
    }
  };

  const handleMiddleNameCheckBox = (e, idx) => {
    let targetId = middleNameItems.findIndex((item) => idx === item.id);
    if (!middleNameItems[targetId].isChecked) {
      setMiddleNameItems((prev) => {
        let temp = [...prev];
        return temp.map((item) => {
          if (item.id === idx) return { ...item, isChecked: true };
          else return { ...item, isChecked: false };
        });
      });
    }
  };

  const handleSelectPhoto = () => {
    //?????? ????????? ??????, ???????????? ????????????, ???????????? ?????? ?????? ??????
    //?????? ???????????? ?????? ????????? ????????????
    //?????? ?????? ?????? ?????? ?????? ????????? ?????? ???????????? ??????
    //?????? ?????? ?????????????????? ?????? ?????? ??????

    //test ver.
    setImgSrc(() => {
      const leng = randomImgList.length;
      const idx = Math.floor(Math.random() * (leng - 0));
      return randomImgList[idx];
    });
  };

  const handleSelectVibe = (e, idx) => {
    let targetId = vibeItems.findIndex((item) => idx === item.id);

    if (!vibeItems[targetId].isChecked) {
      setVibeItems((prev) => {
        let temp = [...prev];
        return temp.map((item) => {
          if (item.id === idx) return { ...item, isChecked: true };
          else return { ...item, isChecked: false };
        });
      });
    }
  };

  const handleSave = () => {
    let _middleName = middleNameItems[0].isChecked;

    let cnt = 0;
    let _vibe = "";
    vibeItems.forEach((item) => {
      if (item.isChecked) {
        _vibe = item.label;
        cnt++;
      }
    });

    if (
      (needIdCard !== false && needIdCard !== true) ||
      cnt === 0 ||
      birthdayError !== "" ||
      signature === ""
    ) {
      setModalVisible(true);
    } else {
      if (needIdCard) {
        navigation.navigate("IdCardMain");
      } else {
        let params = {};
        params = {
          birthday: {
            year: birthDayYearValue,
            month: birthDayMonthValue,
            day: birthDayValue,
          },
          vibe: _vibe,
          middleName: _middleName,
          signature: typeof signature === "string" ? signature : "",
        };

        if (clubText.trim() !== "") params.club = clubText;
        if (lastNameText.trim() !== "") params.lastName = lastNameText;
        if (advantageText.trim() !== "") params.advantage = advantageText;

        navigation.navigate("NameInReceipt", params);
      }
    }
  };

  useEffect(() => {
    setNeedIdCard(() => {
      if (idCardItems[0].isChecked) return true;
      else return false;
    });
  }, [idCardItems]);

  useEffect(() => {
    const yearVal = Number(birthDayYearValue);
    const monthVal = Number(birthDayMonthValue);
    const dayVal = Number(birthDayValue);
    const endOfMonth = Number(
      moment({
        year: yearVal,
        month: monthVal - 1,
      })
        .endOf("month")
        .format("DD")
    );

    const isIntegerFunc = (val) => {
      let result =
        Number.isInteger(Number(val)) &&
        String(Math.floor(Number(val))) === val;

      return result;
    };
    if (
      String(birthDayYearValue).trim() === "" ||
      String(birthDayMonthValue).trim() === "" ||
      String(birthDayValue).trim() === ""
    ) {
      setBirthdayError("?????? ?????????");
      return;
    } else if (
      !isIntegerFunc(birthDayYearValue) ||
      !isIntegerFunc(birthDayMonthValue) ||
      !isIntegerFunc(birthDayValue)
    ) {
      setBirthdayError("?????? ?????? ??????");
    } else if (yearVal < 1900 || yearVal > moment().year()) {
      setBirthdayError("1900 ~ ?????? ??????????????? ?????? ??????");
    } else if (monthVal < 1 || monthVal > 12) {
      setBirthdayError("1 ~ 12 ???????????? ?????? ??????");
    } else if (dayVal < 1 || dayVal > endOfMonth) {
      setBirthdayError(`1 ~ ${endOfMonth} ???????????? ?????? ??????`);
    } else if (
      !moment({
        year: yearVal,
        month: monthVal - 1,
        day: dayVal,
      }).isBefore(moment()) &&
      !moment({
        year: yearVal,
        month: monthVal - 1,
        day: dayVal,
      }).isSame(moment())
    ) {
      setBirthdayError("1900.01.01 ~ ?????? ??????????????? ?????? ??????");
    } else setBirthdayError("");
  }, [birthDayYearValue, birthDayMonthValue, birthDayValue]);

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const handleOK = (signature) => {
    const _signature = signature;
    if (signRef && signRef.current) {
      signRef.current.readSignature();

      setSign(_signature);
      setScrollEnabled(true);
    }
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setSign("");

    setScrollEnabled(true);
  };

  useEffect(() => {
    if (typeof signature === "string" && signature !== "") {
      setSignModalVisible(false);
    }
  }, [signature]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} enabled={true}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            width: "100%",
          }}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          keyboardDismissMode="interactive"
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="always"
          // maintainVisibleContentPosition={{
          //   minIndexForVisible: 0,
          //   autoscrollToTopThreshold: 100,
          // }}
          automaticallyAdjustKeyboardInsets={true}
          scrollEnabled={scrollEnabled}
        >
          <CenterContainer>
            <CheckBox
              isRequired={true}
              title="ID card ?????? ???????????????????"
              items={idCardItems}
              pressCallBack={handleIdCardCheckBox}
            />

            {needIdCard ? (
              <FlexBox
                style={{
                  width: Dimensions.get("window").width * 0.9,
                  marginBottom: 10,
                }}
                justify="space-between"
                align="flex-start"
              >
                <CustomText>{"??????"}</CustomText>
                <TouchableWithoutFeedback onPress={handleSelectPhoto}>
                  <FlexBox align="flex-start">
                    {imgSrc !== "" ? (
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 5,
                        }}
                        source={imgSrc}
                      />
                    ) : (
                      <></>
                    )}

                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color="black"
                    />
                  </FlexBox>
                </TouchableWithoutFeedback>
              </FlexBox>
            ) : (
              <></>
            )}

            <InputBox
              title="??????"
              changeCallback={setClubText}
              textValue={clubText}
            />

            <FlexBox
              style={{
                marginBottom: 10,
                width: "100%",
              }}
              align="flex-start"
              justify="space-between"
            >
              <FlexBox style={{ flex: 3, paddingTop: 3 }}>
                <CustomText>{"??????"}</CustomText>
                <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
              </FlexBox>

              <FlexBox
                direction="column"
                align="flex-start"
                style={{ flex: 7 }}
              >
                <FlexBox justify="space-between" style={{ width: "100%" }}>
                  <StyledTextInput
                    onChangeText={setBirthDayYearValue}
                    value={birthDayYearValue}
                    maxWidth="37%"
                    placeholder="1997(???)"
                    placeholderTextColor={colorStyle.backgroundColor}
                    style={{ outline: "none", minWidth: "37%" }}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                  />
                  <StyledTextInput
                    onChangeText={setBirthDayMonthValue}
                    value={birthDayMonthValue}
                    maxWidth="30%"
                    placeholder="3(???)"
                    placeholderTextColor={colorStyle.backgroundColor}
                    style={{ outline: "none", minWidth: "30%" }}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                  />
                  <StyledTextInput
                    onChangeText={setBirthDayValue}
                    value={birthDayValue}
                    maxWidth="30%"
                    placeholder="24(???)"
                    placeholderTextColor={colorStyle.backgroundColor}
                    style={{ outline: "none", minWidth: "30%" }}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                  />
                </FlexBox>

                {birthdayError !== "" && (
                  <FlexBox style={{ marginTop: 5 }}>
                    <CustomText color={colorStyle.warningColor}>
                      {birthdayError}
                    </CustomText>
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>

            <InputBox
              title="??????"
              changeCallback={setLastNameText}
              textValue={lastNameText}
            />

            <CheckBox
              title="?????? ????????? ????????????????"
              items={middleNameItems}
              pressCallBack={handleMiddleNameCheckBox}
            />
          </CenterContainer>

          <GridViewContainer>
            <GridView
              isRequired={true}
              title="?????????"
              items={vibeItems}
              pressCallBack={handleSelectVibe}
            />
          </GridViewContainer>

          <CenterContainer>
            <InputBox
              title="????????????"
              changeCallback={setAdvantageText}
              textValue={advantageText}
              multiline={true}
            />

            <FlexBox
              style={{
                marginBottom: 10,
                width: "100%",
              }}
              align="flex-start"
              justify="space-between"
            >
              <FlexBox style={{ flex: 3 }}>
                <CustomText>{"??????"}</CustomText>
                <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
              </FlexBox>
              <FlexBox style={{ flex: 7 }} justify="flex-end">
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSignModalVisible((prev) => !prev);
                  }}
                >
                  <MaterialCommunityIcons
                    name="file-sign"
                    size={24}
                    color="black"
                  />
                </TouchableWithoutFeedback>
              </FlexBox>
            </FlexBox>
            <FlexBox style={{ width: "100%" }} justify="flex-end">
              {signature !== "" && typeof signature === "string" && (
                <FlexBox
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: colorStyle.white,
                  }}
                  direction="column"
                >
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: signature }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </FlexBox>
              )}
            </FlexBox>

            <TouchableWithoutFeedback onPress={handleSave}>
              <FlexBox
                justify="flex-end"
                style={{ marginRight: 20, width: "100%", marginTop: 10 }}
              >
                <Entypo name="arrow-bold-right" size={36} color="black" />
              </FlexBox>
            </TouchableWithoutFeedback>
          </CenterContainer>
          <View style={styles.centeredView}>
            <CustomModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              msg="?????? ?????? ?????? ??????"
              title="Error!"
            />
          </View>

          <View style={styles.centeredView}>
            <CustomModal
              modalVisible={signModalVisible}
              setModalVisible={setSignModalVisible}
              msg={
                <FlexBox
                  direction="column"
                  style={{
                    width: "100%",
                    minHeight: 300,
                  }}
                  align="flex-start"
                >
                  <Signature
                    ref={signRef}
                    onOK={handleOK}
                    autoClear={false}
                    descriptionText={"????????? ?????????"}
                    imageType="image/jpg"
                  />
                  <FlexBox>
                    <TouchableWithoutFeedback onPress={handleClear}>
                      <StyledBtn>
                        <CustomText>?????????</CustomText>
                      </StyledBtn>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={handleOK}>
                      <StyledBtn>
                        <CustomText>??????</CustomText>
                      </StyledBtn>
                    </TouchableWithoutFeedback>
                  </FlexBox>
                  {scrollEnabled && (
                    <DisabledContainer>
                      <TouchableWithoutFeedback
                        onPress={() => setScrollEnabled(false)}
                      >
                        <StyledBtn>
                          <CustomText>?????? ??????</CustomText>
                        </StyledBtn>
                      </TouchableWithoutFeedback>
                      <CustomText style={{ opacity: 0 }}>empty box</CustomText>
                    </DisabledContainer>
                  )}
                </FlexBox>
              }
              title="????????? ?????????."
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
