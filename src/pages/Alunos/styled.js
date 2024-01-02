import styled from "styled-components";
import * as colors from "../../config/colors";

export const AlunoContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  min-width: 90%;
  background-color: ${colors.detailsColorSlight};

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div + div {
    border-top: 1px solid #cccccc;
  }

  div span {
    margin: 4px;
    padding: 10px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
