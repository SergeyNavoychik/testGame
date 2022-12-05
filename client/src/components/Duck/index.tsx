import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import {
  MAX_DUCK_FLY_DURATION,
  MIN_DUCK_FLY_DURATION,
  TIME_HIDE_KILLED_DUCK,
} from "../../constants";
import { getRandomFromRange, isRandomBooleanEqTrue } from "../../utils";

import QuackSound from "./audio/quack.mp3";

import styles from "./Duck.module.css";

interface IProps {
  isKilled: boolean;
  onClick: () => void;
}

type FlyDirection = "left" | "right";

function Duck({ isKilled, onClick }: IProps) {
  const [isHideKilled, setIsHideKilled] = useState(false);
  const [flyDirection] = useState<FlyDirection>(
    isRandomBooleanEqTrue() ? "left" : "right"
  );
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(Math.random() * 100);
  const [duckFlyDuration] = useState(
    Math.round(getRandomFromRange(MIN_DUCK_FLY_DURATION, MAX_DUCK_FLY_DURATION))
  );
  const QuackAudio = useMemo(() => {
    const audio = new Audio(QuackSound);
    audio.loop = true;
    return audio;
  }, []);
  const intervalFly = useRef<NodeJS.Timer>();

  const fly = useCallback(() => {
    const updateFlyInterval = 100;
    let currentFlyDuration = 0;
    intervalFly.current = setInterval(() => {
      QuackAudio.play();
      currentFlyDuration += updateFlyInterval;
      setXPosition((currentFlyDuration * 100) / duckFlyDuration);
      setYPosition((currentYPosition) => {
        const yMovement = Math.random() * 10;
        const yPositionNew = isRandomBooleanEqTrue()
          ? currentYPosition + yMovement
          : currentYPosition - yMovement;
        if (yPositionNew < 0) return 0;
        if (yPositionNew > 100) return 100;
        return yPositionNew;
      });

      if (currentFlyDuration >= duckFlyDuration) {
        clearInterval(intervalFly.current);
        QuackAudio.pause();
      }
    }, updateFlyInterval);
  }, [duckFlyDuration, QuackAudio]);

  useEffect(() => {
    let timeoutHide: undefined | NodeJS.Timeout;
    if (isKilled) {
      QuackAudio.pause();
      timeoutHide = setTimeout(() => {
        setIsHideKilled(true);
      }, TIME_HIDE_KILLED_DUCK);
    }

    return () => {
      clearTimeout(timeoutHide);
      QuackAudio.pause();
    };
  }, [isKilled, QuackAudio]);

  useEffect(() => {
    if (!isKilled) fly();

    return () => clearInterval(intervalFly.current);
  }, [isKilled, fly]);

  const getStyles = () => {
    const duckStyles: Record<string, string> = { top: `${yPosition}%` };
    if (flyDirection === "right") {
      duckStyles.left = `${xPosition}%`;
    } else {
      duckStyles.right = `${xPosition}%`;
    }
    return duckStyles;
  };

  if (isHideKilled) return null;

  if (isKilled) {
    return (
      <div
        className={classNames(styles.duck_killed, {
          [styles.duck_flyDirectionLeft]: flyDirection === "left",
        })}
        style={getStyles()}
      />
    );
  }

  return (
    <div
      role="presentation"
      className={classNames(styles.duck_fly, {
        [styles.duck_flyFinished]: xPosition >= 100,
        [styles.duck_flyDirectionLeft]: flyDirection === "left",
      })}
      onClick={onClick}
      style={getStyles()}
    />
  );
}

export default Duck;
