import styled from "styled-components";

export const Title = styled.h1`
  color: ${(props) => (props.isRed ? "red" : "blue")};
  small {
    color: #999;
    margin-left: 10px;
  }
`;
