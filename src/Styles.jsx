import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledHeader = styled.div`
  text-align: center;
  font-size: 30px;
`;

export const StyledTurn = styled.div`
  display: flex;
  padding: 8px 16px;
`;

export const StyledSquares = styled.button`
  font-size: 30px;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid black;
`;

export const StyledReset = styled.button`
  display: inline-block;
  border: 2px solid black;
  border-radius: 4px;
  transition: all 0.5 ease;
  font-weight: bold;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

export const StyledFotter = styled.div`
  text-align: center;
`;

export const StyledTable = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 0px;
  grid-template-columns: 50px 50px 50px; /*縦３つ*/
  grid-template-rows: 50px 50px 50px; /*横３つ*/
`;

export const StyledActive = styled`
  border-bottom: 4px solid black;
`;

export const StyledTurnItem = styled.div`
  padding: 8px;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  /* activeがtrueの場合だけ、boarder-bottomを定義する*/
  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid black;
    `}
`;
