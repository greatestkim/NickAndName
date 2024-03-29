import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useLayoutEffect, useState } from "react";
import { NativeModules, Platform, SafeAreaView } from "react-native";
import { RecoilRoot } from "recoil";
import { CustomText, DeleteBtnInHeader, FlexBox } from "./components";
import { colorStyle } from "./lib/data/styleData";
import AppInfoMain from "./screen/AppInfoScreen.js";
import FolderContent from "./screen/FolderContentScreen.js";
import IdCardMain from "./screen/IdCardScreen.js";
import Main from "./screen/MainScreen.js";
import NewNameMain from "./screen/NewNameScreen.js";
import ReceiptMain from "./screen/ReceiptScreen.js";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colorStyle.windowBackColor,
  },
};

export default function App() {
  const { StatusBarManager } = NativeModules;
  const [fontsLoaded] = useFonts({
    Galmuri: require("./assets/fonts/Galmuri.ttf"),
    GalmuriBold: require("./assets/fonts/GalmuriBold.ttf"),
    BarcodeFonts: require("./assets/fonts/free3of9.ttf"),
  });
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useLayoutEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  if (!fontsLoaded)
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS == "ios" ? 0 : statusBarHeight,
          backgroundColor: colorStyle.windowBackColor,
          height: "100%",
        }}
      >
        <FlexBox style={{ width: "100%" }} justify="center">
          <CustomText>not loaded yet</CustomText>
        </FlexBox>
      </SafeAreaView>
    );
  else if (fontsLoaded)
    return (
      <NavigationContainer theme={MyTheme}>
        <RecoilRoot>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colorStyle.headerColor,
              },
              headerTintColor: colorStyle.white,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="AppMain"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewNameMain"
              component={NewNameMain}
              options={{
                headerBackTitleVisible: false,
                headerTitle: (props) => (
                  <CustomText color={colorStyle.white} {...props}>
                    New Name
                  </CustomText>
                ),
                headerStyle: {
                  backgroundColor: colorStyle.headerColor,
                  height: 40,
                },
              }}
            />
            <Stack.Screen
              name="NameInReceipt"
              component={ReceiptMain}
              options={{
                headerBackTitleVisible: false,
                headerTitle: (props) => (
                  <CustomText color={colorStyle.white} {...props}>
                    Receipt
                  </CustomText>
                ),
                headerStyle: {
                  backgroundColor: colorStyle.headerColor,
                  height: 40,
                },
              }}
            />
            <Stack.Screen
              name="IdCardMain"
              component={IdCardMain}
              options={{
                headerBackTitleVisible: false,
                headerTitle: (props) => (
                  <CustomText color={colorStyle.white} {...props}>
                    ID Card
                  </CustomText>
                ),
                headerStyle: {
                  backgroundColor: colorStyle.headerColor,
                  height: 40,
                },
              }}
            />

            <Stack.Screen
              name="FolderContent"
              component={FolderContent}
              options={({ navigation, route }) => ({
                title: route.params.name,
                headerBackTitleVisible: false,
                headerTitle: (props) => {
                  return (
                    <CustomText color={colorStyle.white} {...props}>
                      {route.params.name}
                    </CustomText>
                  );
                },
                headerStyle: {
                  backgroundColor: colorStyle.headerColor,
                  height: 40,
                },
                headerRight: () => {
                  return (
                    <DeleteBtnInHeader route={route} navigation={navigation} />
                  );
                },
              })}
            />

            <Stack.Screen
              name="AppInfoMain"
              component={AppInfoMain}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </RecoilRoot>
      </NavigationContainer>
    );
}
