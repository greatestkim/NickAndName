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
    { id: 0, isChecked: false, label: "발급" },
    { id: 1, isChecked: true, label: "안함" },
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
    { id: 0, isChecked: true, label: "원함" },
    { id: 1, isChecked: false, label: "원하지 않음" },
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
    //랜덤 이미지 넣기, 앨범에서 가져오기, 카메라로 찍기 보기 주고
    //랜덤 이미지면 랜덤 이미지 보여주고
    //만약 사진 접근 허용 되어 있으면 바로 앨범으로 이동
    //접근 허용 안되어있으면 접근 여부 모달

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
    console.log("##save", signature);
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
      setBirthdayError("필수 항목임");
      return;
    } else if (
      !isIntegerFunc(birthDayYearValue) ||
      !isIntegerFunc(birthDayMonthValue) ||
      !isIntegerFunc(birthDayValue)
    ) {
      setBirthdayError("정수 입력 부탁");
    } else if (yearVal < 1900 || yearVal > moment().year()) {
      setBirthdayError("1900 ~ 현재 년도까지만 입력 가능");
    } else if (monthVal < 1 || monthVal > 12) {
      setBirthdayError("1 ~ 12 월까지만 입력 가능");
    } else if (dayVal < 1 || dayVal > endOfMonth) {
      setBirthdayError(`1 ~ ${endOfMonth} 일까지만 입력 가능`);
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
      setBirthdayError("1900.01.01 ~ 현재 날짜까지만 입력 가능");
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
      console.log("##1", signRef.current);
      setSign(_signature);
      setScrollEnabled(true);
    }
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setSign("");
    console.log("##2");
    setScrollEnabled(true);
    console.log("##clear success!");
  };

  useEffect(() => {
    console.log("##signature", typeof signature, signature);
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
              title="ID card 발급 하시겠습니까?"
              items={idCardItems}
              pressCallBack={handleIdCardCheckBox}
            />

            {needIdCard ? (
              <FlexBox
                style={{ width: "90%", marginBottom: 10 }}
                justify="space-between"
                align="flex-start"
              >
                <CustomText>{"사진"}</CustomText>
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
              title="소속"
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
              <FlexBox style={{ flex: 3 }}>
                <CustomText>{"생일"}</CustomText>
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
                    placeholder="1997(년)"
                    placeholderTextColor={colorStyle.backgroundColor}
                    style={{ outline: "none", minWidth: "37%" }}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                  />
                  <StyledTextInput
                    onChangeText={setBirthDayMonthValue}
                    value={birthDayMonthValue}
                    maxWidth="30%"
                    placeholder="3(월)"
                    placeholderTextColor={colorStyle.backgroundColor}
                    style={{ outline: "none", minWidth: "30%" }}
                    cursorColor={colorStyle.darkGray}
                    selectionColor={colorStyle.darkGray}
                  />
                  <StyledTextInput
                    onChangeText={setBirthDayValue}
                    value={birthDayValue}
                    maxWidth="30%"
                    placeholder="24(일)"
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
              title="성씨"
              changeCallback={setLastNameText}
              textValue={lastNameText}
            />

            <CheckBox
              title="미들 네임을 원하십니까?"
              items={middleNameItems}
              pressCallBack={handleMiddleNameCheckBox}
            />
          </CenterContainer>

          <GridViewContainer>
            <GridView
              isRequired={true}
              title="분위기"
              items={vibeItems}
              pressCallBack={handleSelectVibe}
            />
          </GridViewContainer>

          <CenterContainer>
            <InputBox
              title="자랑거리"
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
                <CustomText>{"싸인"}</CustomText>
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
                      borderTopWidth: 2,
                      borderTopColor: colorStyle.black,
                      borderLeftWidth: 2,
                      borderLeftColor: colorStyle.black,
                      borderBottomWidth: 2,
                      borderBottomColor: colorStyle.white,
                      borderRightWidth: 2,
                      borderRightColor: colorStyle.white,
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
              msg="필수 항목 확인 부탁"
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
                    descriptionText={"싸인해 주세요"}
                    imageType="image/jpg"
                  />
                  <FlexBox>
                    <TouchableWithoutFeedback onPress={handleClear}>
                      <StyledBtn>
                        <CustomText>초기화</CustomText>
                      </StyledBtn>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={handleOK}>
                      <StyledBtn>
                        <CustomText>확인</CustomText>
                      </StyledBtn>
                    </TouchableWithoutFeedback>
                  </FlexBox>
                  {scrollEnabled && (
                    <DisabledContainer>
                      <TouchableWithoutFeedback
                        onPress={() => setScrollEnabled(false)}
                      >
                        <StyledBtn>
                          <CustomText>싸인 하기</CustomText>
                        </StyledBtn>
                      </TouchableWithoutFeedback>
                      <CustomText style={{ opacity: 0 }}>empty box</CustomText>
                    </DisabledContainer>
                  )}
                </FlexBox>
              }
              title="싸인해 주세요."
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
