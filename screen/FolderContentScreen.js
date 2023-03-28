import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import bin from "../assets/images/icons/bin_empty.png";
import { CustomButton, CustomModal, CustomText, FlexBox } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default function FolderContentScreen({ navigation, route }) {
  const [windowVisible, setWindowVisible] = useState(false);

  useEffect(() => {
    console.log("##windowVisible", windowVisible);
  }, [windowVisible]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height + 80,
        }}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
      >
        <FlexBox style={{ width: "100%", marginTop: 20 }} direction="column">
          <Image
            source={{ uri: route.params.content }}
            style={{ width: "90%", height: Dimensions.get("window").height }}
            resizeMode="contain"
          />
        </FlexBox>
        <FlexBox style={{ width: "100%", height: 34 }} justify="flex-end">
          <TouchableHighlight
            onPress={() => {
              setWindowVisible(true);
            }}
          >
            <Image
              source={bin}
              style={{
                width: 24,
                height: 24,
                margin: 15,
              }}
            />
          </TouchableHighlight>
        </FlexBox>
      </ScrollView>
      {windowVisible && (
        <CustomModal
          modalVisible={windowVisible}
          setModalVisible={setWindowVisible}
          msg={
            <>
              <FlexBox
                direction="column"
                justify="center"
                style={{ padding: 10 }}
              >
                <CustomText>{`정말 ${
                  route.params.index + 1
                }번째 이름을 삭제하시겠습니까?`}</CustomText>
                <FlexBox style={{ marginTop: 10 }}>
                  <CustomButton
                    text="취소"
                    pressCallback={() => {
                      setWindowVisible(false);
                    }}
                  />
                  <FlexBox style={{ width: 20, height: "100%" }} />
                  <CustomButton
                    text="확인"
                    pressCallback={() => {
                      console.log("##deleete");
                      setWindowVisible(false);
                    }}
                  />
                </FlexBox>
              </FlexBox>
            </>
          }
          title="삭제"
        />
      )}
    </SafeAreaView>
  );
}
