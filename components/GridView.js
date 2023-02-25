import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colorStyle } from "../lib/data/styleData";
import { CustomText } from "./CustomText";
import { FlexBox } from "./FlexBox";

// const GridContainer = styled(View)`
//     display: grid;
//     gridtemplatecolumns: 1fr 1fr;
//     width: 100%;
//     margintop: 10px;
//     marginbottom: 10px;
// `;

// export const GridView = ({ title, items, pressCallBack, isRequired }) => {
//     return (
//         <FlexBox
//             style={{ width: "90%", marginBottom: 10 }}
//             direction="column"
//             justify="center"
//             align="flex-start"
//         >
//             <FlexBox>
//                 <CustomText>{title}</CustomText>
//                 {isRequired ? <CustomText color={colorStyle.headerColor}>{"*"}</CustomText> : <></>}
//             </FlexBox>
//             <GridContainer>
//                 {items.map((item) => {
//                     return (
//                         <FlexBox
//                             onClick={(e) => {
//                                 pressCallBack(e, item.id);
//                             }}
//                             key={item.label}
//                             style={{ marginBottom: 10 }}
//                         >
//                             {item.isChecked ? (
//                                 <MaterialIcons
//                                     name="radio-button-checked"
//                                     size={24}
//                                     color="black"
//                                 />
//                             ) : (
//                                 <MaterialIcons
//                                     name="radio-button-unchecked"
//                                     size={24}
//                                     color="black"
//                                 />
//                             )}
//                             <FlexBox style={{ width: 5 }}></FlexBox>
//                             <FlexBox
//                                 style={{
//                                     width: 130,
//                                     height: 130,
//                                     borderWidth: 2,
//                                     borderColor: colorStyle.darkGray,
//                                     borderRadius: 10,
//                                 }}
//                             >
//                                 <Image
//                                     style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         borderRadius: 10,
//                                     }}
//                                     source={item.img}
//                                 />
//                             </FlexBox>
//                         </FlexBox>
//                     );
//                 })}
//             </GridContainer>
//         </FlexBox>
//     );
// };

export const GridView = ({ title, items, pressCallBack, isRequired }) => {
  const [rowGap, setRowGap] = useState(10);
  const [columnGap, setColumnGap] = useState(10);

  return (
    <>
      <FlexBox
        style={{ width: "100%", marginBottom: 10 }}
        direction="column"
        justify="center"
        align="center"
      >
        <FlexBox style={{ paddingLeft: 20, width: "100%" }}>
          <CustomText>{title}</CustomText>
          {isRequired ? (
            <CustomText color={colorStyle.headerColor}>{"*"}</CustomText>
          ) : (
            <></>
          )}
        </FlexBox>
        {/* <GridContainer>
                    {items.map((item) => {
                        return (
                            <FlexBox
                                onClick={(e) => {
                                    pressCallBack(e, item.id);
                                }}
                                key={item.label}
                                style={{ marginBottom: 10 }}
                            >
                                {item.isChecked ? (
                                    <MaterialIcons
                                        name="radio-button-checked"
                                        size={24}
                                        color="black"
                                    />
                                ) : (
                                    <MaterialIcons
                                        name="radio-button-unchecked"
                                        size={24}
                                        color="black"
                                    />
                                )}
                                <FlexBox style={{ width: 5 }}></FlexBox>
                                <FlexBox
                                    style={{
                                        width: 130,
                                        height: 130,
                                        borderWidth: 2,
                                        borderColor: colorStyle.darkGray,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 10,
                                        }}
                                        source={item.img}
                                    />
                                </FlexBox>
                            </FlexBox>
                        );
                    })}
                </GridContainer> */}
        <PreviewLayout
          columnGap={columnGap}
          handleColumnGapChange={setColumnGap}
          rowGap={rowGap}
          handleRowGapChange={setRowGap}
        >
          {items.map((item) => {
            return (
              <TouchableWithoutFeedback
                onPress={(e) => {
                  pressCallBack(e, item.id);
                }}
                key={item.label}
              >
                <FlexBox style={{ marginBottom: 10 }}>
                  <FlexBox style={{ width: 5 }}></FlexBox>
                  {item.isChecked ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-unchecked"
                      size={24}
                      color="black"
                    />
                  )}
                  <FlexBox style={{ width: 3 }}></FlexBox>
                  <FlexBox
                    style={{
                      width: 130,
                      height: 130,
                      borderWidth: 2,
                      borderColor: colorStyle.darkGray,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                      source={item.img}
                    />
                  </FlexBox>
                </FlexBox>
              </TouchableWithoutFeedback>
            );
          })}
        </PreviewLayout>
      </FlexBox>
    </>
  );
};

const PreviewLayout = ({
  children,
  handleColumnGapChange,
  handleRowGapChange,
  rowGap,
  columnGap,
}) => (
  <View style={styles.previewContainer}>
    <View style={[styles.container, { rowGap, columnGap }]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  itemsCenter: { alignItems: "center" },
  previewContainer: { flex: 1 },
  container: {
    flex: 1,
    marginTop: 8,
    maxHeight: 600,
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
});

export default GridView;
