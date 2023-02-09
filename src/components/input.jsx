import React from "react";

import styles from "../styles/input.module.css";

export default function Input(props) {
  const changeHandler = (e) => {
    if (!props.running) {
      const val = parseInt(e.target.value);
      if (!val) props.onChange(0);
      if (val >= 1 && val <= 999) props.onChange(val);
    }
  };
  const incrementValue = () => {
    if (!props.running && props.value < 999) props.onChange((prev) => prev + 1);
  };
  const decrementValue = () => {
    if (!props.running && props.value > 1) props.onChange((prev) => prev - 1);
  };

  return (
    <div className={styles.wrapper}>
      <input type="text" onChange={changeHandler} value={props.value} />
      <div className={styles.btnGroup}>
        <button onClick={() => incrementValue()}>
          <svg width={14} height={7} className={styles.svg}>
            <path
              d="M 1 6 L 7 2 L 13 6"
              fill="transparent"
              stroke="rgb(30, 33, 63)"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button onClick={() => decrementValue()}>
          <svg width={14} height={7} className={styles.svg}>
            <path
              d="M 1 1 L 7 5 L 13 1"
              fill="transparent"
              stroke="rgb(30, 33, 63)"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
