import React, { useLayoutEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import camera from "../assets/images/icons/camera_1.png";
import notepad from "../assets/images/icons/file_pencil.png";
import barcode_img from "../assets/images/icons/justify.png";
import noise from "../assets/images/noise.jpg";
import wendy from "../assets/images/wendy.jpg";
import { Barcode, CustomText, FlexBox, WindowBox } from "../components";
import { colorStyle } from "../lib/data/styleData";

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
  height: 80%;
  width: 100%;
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
  position: relative;
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
  const [targetHeight, setTargetHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);

  useLayoutEffect(() => {
    setWindowWidth(Dimensions.get("window").width);
  }, []);

  return (
    <View style={styles.container}>
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
      >
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
                <FlexBox direction="column" justify="center">
                  <Image
                    source={wendy}
                    style={{
                      width: targetWidth * 0.5,
                      height: targetHeight * 0.4,
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
            style={{ width: targetWidth * 0.6, marginTop: -15 }}
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
                    length={targetHeight * 0.4}
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
            style={{ marginTop: 30, width: targetWidth * 0.3 }}
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
                style={{
                  padding: 10,
                  backgroundColor: colorStyle.white,
                  width: targetWidth * 0.8,
                  height: targetHeight * 0.3,
                }}
              >
                <CustomText>name: 강 태욱</CustomText>
                <CustomText>email: tkong@yopmail.com</CustomText>
                <CustomText>phone: 010-1111-2222</CustomText>
                <CustomText>insta: @tkong</CustomText>
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
            marginBottom: 10,
            width: targetWidth * 0.8,
            minHeight: targetHeight * 0.3,
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
      </CardContainer>
    </View>
  );
}
