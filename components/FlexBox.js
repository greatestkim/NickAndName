import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const direction = ({ direction }) => {
  return direction ? `flexDirection: ${direction};` : `flexDirection: row;`;
};

const align = ({ align }) => {
  return align ? `alignItems: ${align};` : `alignItems: center;`;
};
const justify = ({ justify }) =>
  justify ? `justifyContent: ${justify};` : `justifyContent: flex-start;`;
// const wrap = ({ fwrap }) => fwrap && `flex-wrap : wrap`;
// const center = ({ center }) =>
//   center && `align-items: center; justify-content: center;`;

const FlexBoxContainer = styled(View)`
  display: flex;
  position: relative;
  boxsizing: border-box;
  ${direction}
  ${align}
  ${justify}
  ${
    "" /* ${center}
  ${wrap} */
  }
`;

export const FlexBox = React.forwardRef(({ wrap, children, ...rest }, ref) => {
  return (
    <FlexBoxContainer ref={ref} {...rest} fwrap={wrap}>
      {children}
    </FlexBoxContainer>
  );
});
//FlexBox 먼저 선언하고 적어야 먹힘. 순서 중요!
//flexbox 사용시 direction이 column 이면 justify, align 반대로 사용해야함
// FlexBox.defaultProps = {
//   direction: "row",
//   align: "center",
//   justify: "flex-start",
//   // center: false,
//   // wrap: false,
// };

// FlexBox.propTypes = {
//   direction: PropTypes.oneOf(["row", "column"]),
//   align: PropTypes.oneOf([
//     "flex-start",
//     "flex-end",
//     "center",
//     "stretch",
//     "baseline",
//   ]),
//   justify: PropTypes.oneOf([
//     "flex-start",
//     "flex-end",
//     "center",
//     "space-around",
//     "space-between",
//     "space-evenly",
//   ]),
// };
