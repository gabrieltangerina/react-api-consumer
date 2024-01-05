import styled from "styled-components";
import * as colors from "../../config/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  input {
    font-size: 1.2rem;
    padding: 5px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;

    /* & -> representa o elemento que ele está dentro, ou seja, o input */
    &:focus {
      border: 1px solid ${colors.detailsColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  margin: 0 auto 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 20px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }

  a {
    color: ${colors.detailsColor};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
  }
`;
