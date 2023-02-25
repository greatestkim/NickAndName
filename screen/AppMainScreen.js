import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ExplodingImg from "../assets/images/Exploding.JPG";
import NiceImg from "../assets/images/Nice.JPG";
import SayHiImg from "../assets/images/SayHi.JPG";
import WorkingImg from "../assets/images/Working.JPG";
import { FlexBox, IconButton } from "../components";

const ImgArr = [NiceImg, ExplodingImg, SayHiImg, WorkingImg];

const btnStyles = StyleSheet.create({
    linkBtn: {
        marginVertical: 10,
        marginHorizontal: 10,
        width: 100,
    },
});

const textStyles = StyleSheet.create({
    baseText: {
        fontWeight: "bold",
    },
    innerText: {
        color: "red",
    },
    title: {
        lineHeight: 36,
        fontWeight: "bold",
        // fontSize: 30,
    },
    subTitle: {
        // fontSize: 15,
        color: "grey",
    },
});

const viewStyles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 0,
    },
    scrollContainer: {
        maxHeight: 100,
        marginTop: 10,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        height: "100%",
    },
});

export default function AppMainScreen({ navigation }) {
    const [currentId, setCurrentId] = useState(0);

    const handlePressIcon = () => {
        setCurrentId((prev) => {
            if (prev === ImgArr.length - 1) return 0;
            else return prev + 1;
        });
    };

    return (
        <View style={styles.container}>
            <FlexBox
                justify="center"
                direction="column"
                style={{ height: "content", marginTop: 50 }}
            >
                <Text>Click Here!</Text>
                <IconButton size={36} icon={ImgArr[currentId]} pressCallBack={handlePressIcon} />

                <StatusBar style="auto" />
            </FlexBox>
            <FlexBox
                style={{
                    marginTop: 30,
                }}
            >
                <Button
                    title="To Do List"
                    onPress={() => {
                        navigation.navigate("ToDoList");
                    }}
                    color="grey"
                ></Button>
            </FlexBox>
            {/* 하단 설명글 */}
            <FlexBox direction="column" align="flex-start" style={{ height: "content" }}>
                <FlexBox>
                    <Image source={NiceImg} style={{ width: 36, height: 36, marginRight: 5 }} />
                    <Text style={textStyles.title}>Hello World!</Text>
                </FlexBox>
                <ScrollView style={viewStyles.scrollContainer}>
                    <Text style={textStyles.subTitle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also
                        the leap into electronic typesetting, remaining essentially unchanged. It
                        was popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </ScrollView>
            </FlexBox>
        </View>
    );
}
