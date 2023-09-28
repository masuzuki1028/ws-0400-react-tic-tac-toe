import React, { useState } from "react";
import "./index.css";

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

export const App = () => {
  const [games, setGames] = useState(new Array(9).fill("")); //要素9で空のリスト作成
  const [drawCount, setdrawCount] = useState(1); //初期値を1に設定
  const [circleTurn, setcircleTurn] = useState(true); //初期値をtrueにセット
  // const [displayTurn, setDisplayTurn] = useState("◯"); //初期値を◯にセット
  const [displayStatus, setdisplayStatus] = useState(STATUS.stating); //初期値をstartingにセット

  const onClickButton = (index) => {
    if (games[index] !== "") {
      return;
    } //gameのインデックスが空ではない場合returnで抜ける
    if (displayStatus === STATUS.win) {
      return;
    } // STATUSがwinの場合ゲームが完了しているので後続処理をスキップする
    const newGames = [...games]; //配列gamesの情報をスプレッド構文コピー
    newGames[index] = circleTurn ? "◯" : "×"; //circleTurnがtrueなら◯ falseなら✗にセット
    setcircleTurn(!circleTurn); //circleTurnをtrue→false/ false→ trueにセットして、今回と異なる判定になるように変更
    setGames(newGames); //gamesを更新
    // const nextTurn = circleTurn ? "◯" : "×";
    // setDisplayTurn(nextTurn);

    for (let i = 0; i < WINING_PATTERNS.length; i++) {
      const first = newGames[WINING_PATTERNS[i][0]];
      const second = newGames[WINING_PATTERNS[i][1]];
      const third = newGames[WINING_PATTERNS[i][2]];

      if (
        first &&
        first === second &&
        first === third // A/B A/Cがイコールであれば。Aが空の場合もあるため後続処理で判定
      ) {
        if (first !== "") {
          // setDisplayTurn(`${circleTurn === true ? "◯" : "×"}の勝ち`);
          setdisplayStatus(STATUS.win);
          return;
        }
      }
    }
    setdrawCount(drawCount + 1);
    if (drawCount === 9) {
      setdisplayStatus(STATUS.draw);
      return;
    }
  };

  const onClickReset = () => {
    setGames(new Array(9).fill("")); //games初期化
    setcircleTurn(true); //circleTurn初期化
    // setDisplayTurn("◯"); //displayTurn初期化
    setdrawCount(1); //setdrawCount初期値に設定
    setdisplayStatus(STATUS.stating);
  };

  return (
    // react fragmentの短縮技法<></>
    <>
      <div className="l-container">
        <main>
          <div className="header">
            <p>TIC TAC TOE</p>
          </div>
          <div className="turn">
            <div className={`turn-item ${circleTurn ? "active" : ""}`}>○</div>
            <div className={`turn-item ${circleTurn ? "" : "active"}`}>☓</div>
          </div>
          <div className="table">
            {games.map((board, index) => {
              return (
                <button
                  key={index}
                  className="squares"
                  onClick={() => {
                    onClickButton(index);
                  }}
                >
                  {board}
                </button>
              );
            })}
          </div>
          <div className="footer">
            <div className="state">
              <p>{displayStatus}</p>
            </div>
            <button className="reset" onClick={onClickReset}>
              RESTART
            </button>
          </div>
        </main>
      </div>
    </>
  );
};
