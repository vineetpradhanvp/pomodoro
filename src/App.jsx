import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Clock from "./components/clock";
import Message from "./components/message";
import Modes from "./components/modes";
import Settings from "./components/settings";

import "./styles/index.css";

export default function App() {
  const [mode, setMode] = useState(0);
  const [showModal, setShowModal] = useState(0);
  const [font, setFont] = useState("'Kumbh Sans', sans-serif");
  const [color, setColor] = useState("rgb(248, 112, 112)");
  const [pomodoro, setPomodoro] = useState(30);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [started, setStarted] = useState(0);
  const [running, setRunning] = useState(0);
  const [message, setMessage] = useState(0);
  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    document
      .querySelector(":root")
      .style.setProperty("--selected-color", color);
  }, [color]);
  useEffect(() => {
    document.querySelector(":root").style.setProperty("--selected-font", font);
  }, [font]);

  return (
    <>
      <header>pomodoro</header>
      <Modes
        mode={mode}
        setMode={setMode}
        setMessage={setMessage}
        running={running}
        messageTimeoutRef={messageTimeoutRef}
      />
      <Clock
        timer={mode === 0 ? pomodoro : mode === 1 ? shortBreak : longBreak}
        started={started}
        setStarted={setStarted}
        running={running}
        setRunning={setRunning}
      />
      <button
        className={"settings-btn material-icons"}
        onClick={() => setShowModal(1)}
      >
        settings
      </button>
      <AnimatePresence>
        {showModal ? (
          <Settings
            setShowModal={setShowModal}
            font={font}
            setFont={setFont}
            color={color}
            setColor={setColor}
            pomodoro={pomodoro}
            setPomodoro={setPomodoro}
            shortBreak={shortBreak}
            setShortBreak={setShortBreak}
            longBreak={longBreak}
            setLongBreak={setLongBreak}
            running={running}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {message ? (
          <Message
            messageTimeoutRef={messageTimeoutRef}
            setMessage={setMessage}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
