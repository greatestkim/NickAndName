import React, { useEffect, useState } from "react";
import { CheckBox, StyleSheet, Text, TextInput, View } from "react-native";
import DeleteImg from "../assets/images/icons/delete.png";
import EditImg from "../assets/images/icons/edit.png";
import { FlexBox, IconButton } from "../components";

const inputStyles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: "100%",
    },
});

export default function ToDoListMainScreen() {
    const [init, setInit] = useState(false);
    const [todoText, setTodoText] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [curIdx, setCurIdx] = useState(0);
    const [editIdx, setEditIdx] = useState(-1);

    useEffect(() => {
        console.log("##todoList", todoList);
        if (init && editIdx === -1)
            setCurIdx((prevIdx) => {
                let newIdx = prevIdx;
                newIdx++;
                return newIdx;
            });
        else if (editIdx >= 0) setEditIdx(-1);
    }, [todoList]);

    const handleSubmit = () => {
        if (todoText !== "") {
            if (editIdx === -1) {
                setTodoList((prev) => {
                    let newArr = [...prev]; //react는 얕은 복사 필수. prev 그대로 쓰지 말기
                    newArr.push({
                        id: curIdx,
                        text: todoText,
                        completed: false,
                    });
                    return newArr;
                });
            } else if (editIdx >= 0) {
                setTodoList((prev) => {
                    let newArr = [...prev];
                    let targetIdx = newArr.findIndex((item) => item.id === editIdx);
                    let newItem = {
                        ...newArr[targetIdx],
                        text: todoText,
                    };
                    newArr[targetIdx] = newItem;
                    return newArr;
                });
            }
            setTodoText("");
        }
    };

    const handleCheckBox = (id) => {
        setTodoList((prev) => {
            let newArr = [...prev];
            let targetIdx = newArr.findIndex((item) => item.id === id);
            let newItem = {
                ...newArr[targetIdx],
                completed: !newArr[targetIdx].completed,
            };
            newArr[targetIdx] = newItem;

            return newArr;
        });
    };

    const handleDeleteTodo = (id) => {
        setTodoList((prev) => {
            let newArr = [...prev];
            let targetIdx = newArr.findIndex((item) => item.id === id);
            newArr.splice(targetIdx, 1);

            return newArr;
        });
    };

    const handleEditTodo = (id) => {
        setEditIdx(id);
        let targetIdx = todoList.findIndex((item) => item.id === id);
        setTodoText(todoList[targetIdx].text);
    };

    useEffect(() => {
        setInit(true);
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={inputStyles.input}
                onChangeText={setTodoText}
                onBlur={handleSubmit}
                value={todoText}
            />
            <FlexBox style={{ marginTop: 24 }} direction="column">
                {todoList && Array.isArray(todoList) ? (
                    todoList.map((todo, index) => {
                        return (
                            <FlexBox
                                justify="space-between"
                                style={{ width: "100%", marginBottom: 5 }}
                                key={index + todo.text}
                            >
                                <FlexBox justify="flex-start">
                                    <CheckBox
                                        value={todo.completed}
                                        onValueChange={() => handleCheckBox(todo.id)}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            padding: 2,
                                            marginRight: 5,
                                        }}
                                    />
                                    <Text
                                        key={todo.text + index}
                                        style={{
                                            textDecorationLine: `${
                                                todo.completed ? "line-through" : "none"
                                            }`,
                                            // fontSize: 20,
                                        }}
                                    >
                                        {todo.text}
                                    </Text>
                                </FlexBox>
                                <FlexBox style={{ maxHeight: 20 }}>
                                    <IconButton
                                        icon={EditImg}
                                        pressCallBack={() => {
                                            handleEditTodo(todo.id);
                                        }}
                                    />
                                    <IconButton
                                        icon={DeleteImg}
                                        pressCallBack={() => {
                                            handleDeleteTodo(todo.id);
                                        }}
                                        color="red"
                                    />
                                </FlexBox>
                            </FlexBox>
                        );
                    })
                ) : (
                    <></>
                )}
            </FlexBox>
        </View>
    );
}
