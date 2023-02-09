import React, { useState } from "react";
import { motion } from "framer-motion";

import Input from "./input";

import styles from "../styles/settings.module.css";

export default function Settings(props) {
  const [color, setColor] = useState(props.color);
  const [font, setFont] = useState(props.font);
  const [pomodoro, setPomodoro] = useState(props.pomodoro);
  const [shortBreak, setShortBreak] = useState(props.shortBreak);
  const [longBreak, setLongBreak] = useState(props.longBreak);

  const applySettings = () => {
    if (!props.running) {
      props.setPomodoro(pomodoro);
      props.setShortBreak(shortBreak);
      props.setLongBreak(longBreak);
    }
    props.setFont(font);
    props.setColor(color);
    props.setShowModal(0);
  };
  const dropIn = {
    initial: {
      y: "100vh",
    },
    animate: {
      y: "0",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 350,
      },
    },
    exit: {
      y: "100vh",
    },
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        variants={dropIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={styles.header}>
          <span>Settings</span>
          <button
            className={`material-icons-outlined ${styles.closeBtn}`}
            onClick={() => props.setShowModal(0)}
          >
            close
          </button>
        </div>
        <div className={styles.properties}>
          <div className={styles.modeWrapper}>
            <span className={styles.propertyLabel}>
              T I M E ( M I N U T E S )
            </span>
            <div className={styles.modeInputWrapper}>
              <span className={styles.modeLabel}>pomodoro</span>
              <Input
                value={pomodoro}
                onChange={(val) => setPomodoro(val)}
                running={props.running}
              />
            </div>
            <div className={styles.modeInputWrapper}>
              <span className={styles.modeLabel}>short break</span>
              <Input
                value={shortBreak}
                onChange={(val) => setShortBreak(val)}
                running={props.running}
              />
            </div>
            <div className={styles.modeInputWrapper}>
              <span className={styles.modeLabel}>long break</span>
              <Input
                value={longBreak}
                onChange={(val) => setLongBreak(val)}
                running={props.running}
              />
            </div>
            {props.running ? (
              <div className={styles.modeWarning}>
                The pomodoro timer is running. You cannot change its value
              </div>
            ) : null}
          </div>
          <div className={styles.fontWrapper}>
            <span className={styles.propertyLabel}>F O N T</span>
            <div className={styles.fonts}>
              <button
                className={`${styles.font} ${
                  font === "'Kumbh Sans', sans-serif" && styles.activeFont
                }`}
                onClick={() => setFont("'Kumbh Sans', sans-serif")}
              ></button>
              <button
                className={`${styles.font} ${
                  font === "'Roboto Slab', serif" && styles.activeFont
                }`}
                onClick={() => setFont("'Roboto Slab', serif")}
              ></button>
              <button
                className={`${styles.font} ${
                  font === "'Space Mono', monospace" && styles.activeFont
                }`}
                onClick={() => setFont("'Space Mono', monospace")}
              ></button>
            </div>
          </div>
          <div className={styles.colorWrapper}>
            <span className={styles.propertyLabel}>C O L O R</span>
            <div className={styles.colors}>
              <button
                className={`${styles.color} ${
                  color === "rgb(248, 112, 112)" && styles.activeColor
                } material-icons-outlined`}
                onClick={() => setColor("rgb(248, 112, 112)")}
              ></button>
              <button
                className={`${styles.color} ${
                  color === "rgb(112, 243, 248)" && styles.activeColor
                } material-icons-outlined`}
                onClick={() => setColor("rgb(112, 243, 248)")}
              ></button>
              <button
                className={`${styles.color} ${
                  color === "rgb(216, 129, 248)" && styles.activeColor
                } material-icons-outlined`}
                onClick={() => setColor("rgb(216, 129, 248)")}
              ></button>
            </div>
          </div>
        </div>
        <button className={styles.applyBtn} onClick={() => applySettings()}>
          Apply
        </button>
      </motion.div>
    </motion.div>
  );
}
