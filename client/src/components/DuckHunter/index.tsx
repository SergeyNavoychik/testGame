import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSocket from "../../hooks/useSocket";
import Duck from "../Duck";
import Field from "../Field";
import Results from "../Results";

import AWPSound from "./audio/awp.mp3";

import styles from "./DuckHunter.module.css";

interface IGameConfig {
  timeRestartGame: number;
}

function DuckHunter() {
  const [countWins, setCountWins] = useState(0);
  const [countPlayedGames, setCountPlayedGames] = useState(0);
  const [isDuckKilled, setIsDuckKilled] = useState(false);
  const [gameConfig, setGameConfig] = useState<IGameConfig>();
  const intervalRestart = useRef<NodeJS.Timer>();
  const AWPAudio = useMemo(() => new Audio(AWPSound), []);
  const socket = useSocket();

  const startGame = useCallback(() => {
    setCountPlayedGames((prevCountPlayedGames) => prevCountPlayedGames + 1);
    setIsDuckKilled(false);
  }, []);

  useEffect(() => {
    if (gameConfig?.timeRestartGame) {
      if (!intervalRestart.current) startGame();
      intervalRestart.current = setInterval(
        startGame,
        gameConfig.timeRestartGame
      );
    }

    return () => clearInterval(intervalRestart.current);
  }, [startGame, gameConfig?.timeRestartGame]);

  useEffect(() => {
    socket.on("gameConfig", (config: IGameConfig) => {
      setGameConfig(config);
    });

    return () => {
      socket.off("gameConfig");
    };
  }, [socket]);

  const handleDuckKilled = () => {
    setIsDuckKilled(true);
    setCountWins(countWins + 1);
    AWPAudio.play();
  };

  if (!gameConfig) return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <Results countWins={countWins} countPlayedGames={countPlayedGames} />
      <Field>
        <Duck
          key={countPlayedGames}
          isKilled={isDuckKilled}
          onClick={handleDuckKilled}
        />
      </Field>
    </div>
  );
}

export default DuckHunter;
