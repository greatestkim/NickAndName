import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import BarcodeImg from "./assets/images/icons/barcode.png";
import IdCardMain from "./screen/IdCardScreen.js";
import Main from "./screen/MainScreen.js";
import NewNameMain from "./screen/NewNameScreen.js";
// import ToDoMain from "./screen/ToDoListMainScreen.js";
import { useFonts } from "expo-font";
import { NativeModules, Platform, SafeAreaView } from "react-native";
import { CustomText } from "./components";
import { colorStyle } from "./lib/data/styleData";
import ReceiptMain from "./screen/ReceiptScreen.js";
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colorStyle.windowBackColor,
  },
  background: BarcodeImg,
};

export default function App() {
  const { StatusBarManager } = NativeModules;
  const [fontsLoaded] = useFonts({
    Galmuri: require("./assets/fonts/Galmuri.ttf"),
    GalmuriBold: require("./assets/fonts/GalmuriBold.ttf"),
    BarcodeFonts: require("./assets/fonts/LibreBarcodeEAN13Text-Regular.ttf"),
  });
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useLayoutEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  useEffect(() => {
    console.log("##fontsLoaded", fontsLoaded);
  }, [fontsLoaded]);

  if (!fontsLoaded)
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS == "ios" ? 0 : statusBarHeight,
          backgroundColor: colorStyle.windowBackColor,
        }}
      >
        <CustomText>not loaded yet</CustomText>
      </SafeAreaView>
    );
  else if (fontsLoaded)
    return (
      <>
        <NavigationContainer theme={MyTheme}>
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
              name="IdCardMain"
              component={IdCardMain}
              options={{
                headerBackTitleVisible: false,
                headerTitle: (props) => (
                  <CustomText color={colorStyle.white} {...props} />
                ),
                headerStyle: {
                  backgroundColor: colorStyle.headerColor,
                  height: 40,
                },
              }}
            />

            {/* <Stack.Screen
            name="AppMain"
            component={AppMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ToDoList"
            component={ToDoMain}
            options={{
              title: "To Do List",
            }}
          />*/}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}
