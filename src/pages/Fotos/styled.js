import styled from "styled-components";
import * as colors from "../../config/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    width: 180px;
    height: 180px;
    display: flex;
    background-color: #eee;
    border: 1px solid ${colors.detailsColor};
    border-radius: 50%;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px auto;

    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
    }
  }

  input {
    display: none;
  }
`;
