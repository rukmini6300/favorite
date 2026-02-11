import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import teddyAnimation from "./assets/teddy.json";
import confettiAnimation from "./assets/confetti.json";
import "./App.css";

function App() {
  const [step, setStep] = useState("initial");
  const [count, setCount] = useState(5);
  const [answer, setAnswer] = useState(null);
  const messages = [
    "Hey 👀",
    "I have something for you 💕",
    "Just wait a bit 🧸",
    "Almost there ⏳",
    "Now click the button 💌"
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [enableBtn, setEnableBtn] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });

  useEffect(() => {
    let countdownTimer;
    let messageTimer;
    const MESSAGE_DELAY = 2000;
    if (step === "teddy" && count > 0) {
      countdownTimer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }

    if (step === "teddy" && count === 0) {
      setStep("valentine");
    }
    if (showHint && msgIndex < messages.length) {
      messageTimer = setTimeout(() => {
        setMsgIndex((prev) => prev + 1);
        setCursorPos({
          x: 100 + Math.random() * 150,
          y: 100 + Math.random() * 200,
        });
      }, MESSAGE_DELAY);
    }

    if (showHint && msgIndex === messages.length) {
      setShowHint(false);
      setEnableBtn(true);
    }

    return () => {
      if (countdownTimer) clearTimeout(countdownTimer);
      if (messageTimer) clearTimeout(messageTimer);
    };
  }, [
    step,
    count,
    showHint,
    msgIndex,
    messages.length
  ]);

  const handleClick = () => {
    setStep("teddy");
    setCount(5);
  };

  return (
    <>
      {showHint && (
        <>
          {/* Fake cursor */}
          <div
            className="fake-cursor"
            style={{ left: cursorPos.x, top: cursorPos.y }}
          >
            🖱️
          </div>

          {/* Tooltip message */}
          <div
            className="tooltip-outside"
            style={{ left: cursorPos.x + 10, top: cursorPos.y }}
          >
            {messages[msgIndex]}
          </div>
        </>
      )}
      <div className="box">
        <div className="hearts">
          <span>💖</span>
          <span>❤️</span>
          <span>💘</span>
          <span>💕</span>
          <span>💗</span>
          <span>💞</span>
        </div>
        {step === "initial" && (
          <>
            <h2>💝 You have a surprise 💖</h2>


            <button
              className="sticker"
              onClick={handleClick}
              disabled={!enableBtn}
              style={{
                opacity: enableBtn ? 1 : 0.5,
                cursor: enableBtn ? "pointer" : "not-allowed",
              }}
            >
              Click me 💌
            </button>

          </>
        )}
        {step === "teddy" && (
          <>
            <div className="countdown">{count}</div>

            <p className="msg">I Love You 🧸💖</p>

            <Lottie
              animationData={teddyAnimation}
              loop
              style={{ width: 280 }}
            />
          </>
        )}

        {step === "valentine" && (
          <div className="valentine-box">
            <Lottie
              animationData={confettiAnimation}
              loop
              style={{ width: 300 }}
            />

            <h3 className="question">
              Will you be my Valentine? 💖🥹
            </h3>
            {!answer ? (
              <div className="actions">
                <button
                  className="yes-btn"
                  onClick={() => setAnswer("yes")}
                >
                  Yes 💕
                </button>
                <button
                  className="no-btn"
                  onClick={() => setAnswer("no")}
                >
                  No 🙈
                </button>
              </div>
            ) : (
              <div className="answer-box">
                <p className="answer-text">
                  {answer === "yes"
                    ? <p className="text">💕 Yayyy! 😍💖 Na heart ippudu full happy mode lo undi… Thanks ra, you made my world beautiful 🌍✨</p>
                    : <p className="text">Aww… it’s okay 💖 Nuvvu happy ga unte ade naaku chaalu 😊✨ 💖</p>}
                </p>

                <button
                  className="back-btn"
                  onClick={() => setAnswer(null)}
                >
                  💖 Back
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}

export default App;
