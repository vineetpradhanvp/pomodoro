import React from "react";

import styles from "../styles/modes.module.css";

export default function Modes(props) {
  const onModeChange = (i) => {
    if (props.running) {
      props.setMessage(1);
      props.messageTimeoutRef.current = setTimeout(
        () => props.setMessage(0),
        5000
      );
      return;
    }
    props.setMode(i);
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div
          className={styles.activeEle}
          style={{
            transform:
              props.mode === 0
                ? "translate(0%)"
                : props.mode === 1
                ? "translate(100%)"
                : "translate(200%)",
          }}
        ></div>
        <button
          className={`${styles.btn} ${
            props.mode === 0 ? styles.activeBtn : null
          }`}
          onClick={() => onModeChange(0)}
        >
          pomodoro
        </button>
        <button
          className={`${styles.btn} ${
            props.mode === 1 ? styles.activeBtn : null
          }`}
          onClick={() => onModeChange(1)}
        >
          short break
        </button>
        <button
          className={`${styles.btn} ${
            props.mode === 2 ? styles.activeBtn : null
          }`}
          onClick={() => onModeChange(2)}
        >
          long break
        </button>
      </nav>
    </div>
  );
}
