import React, { useState } from "react";
import {
  StyledHeader,
  StyledTurn,
  StyledReset,
  StyledFotter,
  StyledTable,
  StyledContainer,
  StyledSquares,
  StyledTurnItem,
} from "./Styles";

const WINING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const STATUS = {
  stating: "starting...",
  win: "win!!",
  draw: "draw",
};

function checkWinner(newcells) {
  return WINING_PATTERNS.some((pattern) => {
    const [first, second, third] = pattern.map((index) => newcells[index]);
    return first && first === second && first === third;
  });
}

export const App = () => {
  const [cells, setCells] = useState(new Array(9).fill("")); //要素9で空のリスト作成
  const [drawCount, setDrawCount] = useState(1); //初期値を1に設定
  const [circleTurn, setCircleTurn] = useState(true); //初期値をtrueにセット
  const [displayStatus, setDisplayStatus] = useState(STATUS.stating); //初期値をstartingにセット

  const onClickButton = (index) => {
    if (cells[index]) {
      return;
    } //gameのインデックスが空ではない場合returnで抜ける
    if (displayStatus === STATUS.win) {
      return;
    } // STATUSがwinの場合ゲームが完了しているので後続処理をスキップする
    const newcells = [...cells]; //配列cellsの情報をスプレッド構文コピー
    newcells[index] = circleTurn ? "◯" : "×"; //circleTurnがtrueなら◯ falseなら✗にセット
    setCircleTurn(!circleTurn); //circleTurnをtrue→false/ false→ trueにセットして、今回と異なる判定になるように変更
    setCells(newcells); //cellsを更新

    const isWinner = checkWinner(newcells);
    if (isWinner) {
      setDisplayStatus(STATUS.win);
      return;
    }

    setDrawCount(drawCount + 1);
    if (drawCount === 9) {
      setDisplayStatus(STATUS.draw);
      return;
    }
  };

  const onClickReset = () => {
    setCells(new Array(9).fill("")); //cells初期化
    setCircleTurn(true); //circleTurn初期化
    setDrawCount(1); //setdrawCount初期値に設定
    setDisplayStatus(STATUS.stating);
  };

  return (
    <StyledContainer>
      <main>
        <StyledHeader>
          <p>TIC TAC TOE</p>
        </StyledHeader>
        <StyledTurn>
          <StyledTurnItem active={circleTurn}>○</StyledTurnItem>{" "}
          <StyledTurnItem active={!circleTurn}>☓</StyledTurnItem>{" "}
        </StyledTurn>
        <StyledTable>
          {cells.map((board, index) => {
            return (
              <StyledSquares
                key={index}
                onClick={() => {
                  onClickButton(index);
                }}
              >
                {board}
              </StyledSquares>
            );
          })}
        </StyledTable>
        <StyledFotter>
          <div>
            <p>{displayStatus}</p>
          </div>
          <StyledReset onClick={onClickReset}>RESTART</StyledReset>
        </StyledFotter>
      </main>
    </StyledContainer>
  );
};
