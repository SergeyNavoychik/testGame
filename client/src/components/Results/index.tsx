import React from "react";

import styles from "./Results.module.css";

interface IProps {
  countWins: number;
  countPlayedGames: number;
}

function Results({ countWins, countPlayedGames }: IProps) {
  return (
    <div className={styles.wrapper}>
      {countWins} / {countPlayedGames}
    </div>
  );
}

export default Results;
