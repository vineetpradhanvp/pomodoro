import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/clock.module.css";

export default function Clock(props) {
  const [timer, setTimer] = useState(props.timer * 60);
  const circleRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const msRef = useRef(null);
  const animationRef = useRef(null);
  const animateOptions = {
    duration: timer * 1000,
    easing: "linear",
    fill: "forwards",
  };
  const animateRev = [{ strokeDashoffset: "0" }];
  const animateRevOptions = {
    duration: 1000,
    easing: "linear",
    fill: "forwards",
  };
  useEffect(() => {
    circleRef.current.style.setProperty(
      "--dash-array",
      circleRef.current.getTotalLength()
    );
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);
  useEffect(() => {
    props.setStarted(0);
    if (animationRef.current) {
      circleRef.current.animate(animateRev, animateRevOptions);
      setTimeout(() => animationRef.current.cancel(), 1000);
    }
    setTimer(props.timer * 60);
  }, [props.timer]);
  useEffect(() => {
    msRef.current = new Date();
    if (!timer) {
      props.setStarted(0);
      props.setRunning(0);
      setTimer(props.timer * 60);
      circleRef.current.animate(animateRev, animateRevOptions);
    }
  }, [timer]);

  const changeTimerState = () => {
    if (!props.started) {
      props.setStarted(1);
      props.setRunning(1);
      animationRef.current = circleRef.current.animate(
        { strokeDashoffset: `${circleRef.current?.getTotalLength()}` },
        animateOptions
      );
      intervalRef.current = setInterval(
        () => setTimer((prev) => prev - 1),
        1000
      );
      timeoutRef.current = setTimeout(
        () => clearInterval(intervalRef.current),
        timer * 1000
      );
    } else if (props.running) {
      msRef.current = 1000 - (new Date() - new Date(msRef.current));
      props.setRunning(0);
      animationRef.current.pause();
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    } else if (!props.running) {
      props.setRunning(1);
      animationRef.current.play();
      if (msRef.current) {
        setTimeout(() => {
          setTimer((prev) => prev - 1);
          intervalRef.current = setInterval(
            () => setTimer((prev) => prev - 1),
            1000
          );
          timeoutRef.current = setTimeout(
            () => clearInterval(intervalRef.current),
            timer * 1000 - 1000
          );
        }, msRef.current);
      } else {
        intervalRef.current = setInterval(
          () => setTimer((prev) => prev - 1),
          1000
        );
        timeoutRef.current = setTimeout(
          () => clearInterval(intervalRef.current),
          timer * 1000
        );
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.clock}>
        <div className={styles.timer}>
          {Math.floor(timer / 60)}:
          {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </div>
        <button className={styles.pauseBtn} onClick={() => changeTimerState()}>
          {!props.started ? "START" : props.running ? "PAUSE" : "RESUME"}
        </button>
        <svg className={styles.svg} height="98%" width="98%">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            strokeWidth={9}
            strokeLinecap="round"
            className={styles.circle}
            ref={circleRef}
          />
        </svg>
      </div>
    </div>
  );
}
