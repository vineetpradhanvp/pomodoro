import React from "react";
import { motion } from "framer-motion";

import styles from "../styles/message.module.css";

export default function Message(props) {
  const clickHandler = () => {
    props.setMessage(0);
    clearTimeout(props.messageTimeoutRef.current);
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
      className={styles.message}
      onClick={() => clickHandler()}
      variants={dropIn}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      A timer is running. Pause it to change mode.
    </motion.div>
  );
}
