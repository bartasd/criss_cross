import { useEffect, useState } from "react";
import style from "./Board.module.css";
import { Button } from "./Button";

export function Board() {
  const [usersTurn, setTurn] = useState(true);

  const [componentStates, setComponentStates] = useState(Array(9).fill(false));

  const [winner, setWinner] = useState(false);

  function validateGame(states) {
    let side = null;
    for (let x = 0; x < 3; x++) {
      // vertical check
      if (
        states[x][0] &&
        states[x + 3][0] &&
        states[x + 6][0] &&
        states[x][1] === states[x + 3][1] &&
        states[x][1] === states[x + 6][1]
      ) {
        side = states[x][1] ? "PLAYER" : "COMPUTER";
        return side;
      }
      // horizontal check
      if (
        states[3 * x][0] &&
        states[3 * x + 1][0] &&
        states[3 * x + 2][0] &&
        states[3 * x][1] === states[3 * x + 1][1] &&
        states[3 * x][1] === states[3 * x + 2][1]
      ) {
        side = states[3 * x][1] ? "PLAYER" : "COMPUTER";
        return side;
      }
    }
    // descending diagonal check
    if (
      states[0][0] &&
      states[4][0] &&
      states[8][0] &&
      states[0][1] === states[4][1] &&
      states[0][1] === states[8][1]
    ) {
      side = states[0][1] ? "PLAYER" : "COMPUTER";
      return side;
    }
    // ascending diagonal check
    if (
      states[2][0] &&
      states[4][0] &&
      states[6][0] &&
      states[2][1] === states[4][1] &&
      states[2][1] === states[6][1]
    ) {
      side = states[2][1] ? "PLAYER" : "COMPUTER";
      return side;
    }
    if (states.every((state) => state[0] === true)) return "NOBODY";
    else {
      return false;
    }
  }

  function playComputer() {
    setComponentStates((prevSt) => {
      console.log(prevSt);
      const statesForPc = [...prevSt];
      const emptyFields = statesForPc.filter((field) => field === false).length;
      const randomItemIdx = Math.floor(Math.random() * (emptyFields - 1) + 1);
      let flag = -1;
      let randomIdxInArray = null;
      while (flag !== randomItemIdx) {
        randomIdxInArray = statesForPc.indexOf(false, ++flag);
      }
      statesForPc[randomIdxInArray] = [true, usersTurn];
      setWinner(validateGame(statesForPc));
      return statesForPc;
    });
    setTurn(!usersTurn);
  }

  useEffect(() => {
    if (usersTurn === false && winner === false) playComputer();
  }, [usersTurn]);

  function isActive(value) {
    setComponentStates((prevSt) => {
      const newStates = [...prevSt];
      newStates[value - 1] = [true, usersTurn];
      setWinner(validateGame(newStates));
      return newStates;
    });
    setTurn(!usersTurn);
  }

  let stiliukas = "";
  let stiliukas2 = "";
  if (winner !== false) {
    stiliukas2 = style.m;
    if (winner === "PLAYER") {
      stiliukas = style.a;
    } else if (winner === "NOBODY") {
      stiliukas = style.b;
    } else {
      stiliukas = style.c;
    }
  }

  return (
    <>
      <div className={style.wins}>
        <p>{winner === false ? "GAME IN PROGRESS" : "GAME OVER"}</p>
        <p className={stiliukas2}>
          WINNER is: <span className={stiliukas}>{winner}</span>
        </p>
      </div>

      <div className={style.field}>
        <Button
          className={style.field1}
          id={1}
          active={componentStates[0]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field2}
          id={2}
          active={componentStates[1]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field3}
          id={3}
          active={componentStates[2]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field4}
          id={4}
          active={componentStates[3]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field5}
          id={5}
          active={componentStates[4]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field6}
          id={6}
          active={componentStates[5]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field7}
          id={7}
          active={componentStates[6]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field8}
          id={8}
          active={componentStates[7]}
          phone={isActive}
          end={winner}
        />
        <Button
          className={style.field9}
          id={9}
          active={componentStates[8]}
          phone={isActive}
          end={winner}
        />
      </div>
    </>
  );
}
