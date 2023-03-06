import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { CustomText, FlexBox, WindowBox } from "../components";
import { colorStyle } from "../lib/data/styleData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    height: "100%",
    paddingTop: 40,
  },
});

export default function AppInfoScreen({ navigation }) {
  const [windowDelete, setWindowDelete] = useState(false);

  useEffect(() => {
    if (windowDelete) navigation.navigate("AppMain");
  }, [windowDelete]);
  return (
    <SafeAreaView style={styles.container}>
      <WindowBox
        windowVisible="none"
        setWindowDelete={setWindowDelete}
        msg={
          <>
            <CustomText>
              안녕 여러분! 저는 이 앱의 개발자입니다. 지금부터 저의
              애플리케이션에 대한 소개를 할까 합니다. '이름 짓기'라는 주제로
              앱을 만들게 된 건, 다들 겪는 시간 낭비를 줄이기 위해서였습니다. 한
              번 쯤은 게임 닉네임을 뭘로 할지 고민하지 않으셨나요? 간지 작살나는
              닉네임을 짓고 싶은 마음은 굴뚝같지만 생각이 나지 않아 골치
              아프셨을 겁니다.
            </CustomText>
            <CustomText></CustomText>
            <CustomText>구구절절...</CustomText>
            <CustomText></CustomText>
            <CustomText>
              아무튼 그래서 간지 작살 닉네임도 만들고, 멋쟁이 신분증도 만들고
              싶어 이렇게 앱을 만들게 되었습니다. 잠깐이나마 즐거우셨으면
              좋겠네요. 감사합니다!
            </CustomText>

            <FlexBox style={{ padding: 10, width: "100%" }} justify="flex-end">
              <TouchableWithoutFeedback onPress={() => {}}>
                <FlexBox>
                  <CustomText fontSize={10} style={{ marginRight: 5 }}>
                    {"개발자 커피 사주기 >"}
                  </CustomText>
                  <Feather name="coffee" size={30} color={colorStyle.black} />
                </FlexBox>
              </TouchableWithoutFeedback>
            </FlexBox>
          </>
        }
        title="information"
      />
    </SafeAreaView>
  );
}
