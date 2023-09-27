import React, { useState } from 'react';
import './index.css'

export const App = () => {
  const [games, setGames] = useState(new Array(9).fill('')); //要素9で空のリスト作成
  const [drawCount, setdrawCount] = useState(1); //初期値を1に設定
  const [gameTurn, setGameTurn ] = useState(true) //初期値をtrueにセット
  const [displayTurn, setDisplayTurn ] = useState("◯") //初期値を◯にセット

  const wining_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const status = {
    stating: 'starting...',
    win: 'win!!',
    draw: 'draw'
  }
  const [displayStatus, setDisplayStatus ] = useState(status['stating']) //初期値を◯にセット

  const onClickButton = (index) => {
    if (games[index] !== "") return //gameのインデックスが空ではない場合returnで抜ける
    const newGames = [...games] //配列gamesの情報をスプレッド構文コピー
    newGames[index] = (gameTurn === true ? '◯':'×') //gameTurnがtrueなら◯ falseなら✗にセット
    setGameTurn(!gameTurn) //gameTurnをtrue→false/ false→ trueにセットして、今回と異なる判定になるように変更
    setGames(newGames) //gamesを更新
    if (gameTurn === true) {
      setDisplayTurn("×");
    } else {
      setDisplayTurn("◯");
    }

    for (let i = 0; i < wining_patterns.length; i++) {
        const first = newGames[wining_patterns[i][0]]
        const second = newGames[wining_patterns[i][1]]
        const third = newGames[wining_patterns[i][2]]

        if (
          first && first === second && first === third // A/B A/Cがイコールであれば。Aが空の場合もあるため後続処理で判定
        ) {
          if (first !== "") { 
            setDisplayTurn(`${gameTurn === true ? '◯':'×'}の勝ち`);
            return;
          }
        }  
      }
      setdrawCount(drawCount + 1)
      if (drawCount === 9) {
        setDisplayStatus(status['draw']);
        return;
      }
  }


  const onClickReset = () => {
    setGames(new Array(9).fill('')) //games初期化
    setGameTurn(true) //gameTurn初期化
    setDisplayTurn("◯") //displayTurn初期化
    setdrawCount(1) //setdrawCount初期値に設定
  }

  return (
    // react fragmentの短縮技法<></>
    <>
    <div className="l-container">
    <main>
      <div className='header'>
        <p>TIC TAC TOE</p>
      </div>
      <div className='turn'>
          <p>{displayTurn}</p>
      </div>
      <div className='table'>
        {games.map((board,index) => {
          return (
            <button key={index} className="squares" onClick={() => {
              onClickButton(index);
            }}>{board}</button>
          )
        })}
      </div>
      <div className="footer">
        <div className='state'>
            <p>{displayStatus}</p>
        </div>
        <button className="reset" onClick={onClickReset}>RESTART</button>
      </div>
      </main>
    </div>
    </>
  )
}
