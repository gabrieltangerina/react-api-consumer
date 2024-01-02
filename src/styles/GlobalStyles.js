import styled, { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
    background-color: ${colors.primaryColorDark};
  }

  html, body, #root{
    height: 100%;
  }

  button{
    cursor: pointer;
    background-color: ${colors.detailsColor};
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    transition: all .2s;

    &:hover{
      filter: brightness(80%);
    }

  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }
`;

export const Container = styled.section`
  max-width: 460px;
  background: ${colors.primaryColor};
  margin: 30px auto;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
`;
