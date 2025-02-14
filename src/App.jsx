import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [response, setResponse] = useState(null);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [showHearts, setShowHearts] = useState(false);
  const [hideNoButton, setHideNoButton] = useState(false);

  const handleAsk = () => {
    setShowQuestion(true);
  };

  const handleResponse = (answer) => {
    if (answer === "yes") {
      setResponse(answer);
      setShowHearts(true);
      setHideNoButton(true);
    }
  };

  const handleMouseOverNo = () => {
    const randomTop = Math.random() * 300;
    const randomLeft = Math.random() * 300;
    setNoButtonStyle({
      position: "relative",
      top: `${randomTop}px`,
      left: `${randomLeft}px`,
    });
  };

  useEffect(() => {
    if (showHearts) {
      const interval = setInterval(() => {
        const heart = document.createElement("div");
        heart.innerText = "❤️";
        heart.style.position = "absolute";
        heart.style.fontSize = "2rem";
        heart.style.top = `${Math.random() * window.innerHeight}px`;
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.animation = "float 3s ease-in-out forwards";

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [showHearts]);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-gradient" style={{ backgroundColor: '#f8d7da' }}>
      {!showQuestion ? (
        <div className="text-center">
          <h1 className="display-3 text-red font-weight-bold mb-4 animate__animated animate__bounce animate__infinite">
            Happy Valentine&apos;s Day!
          </h1>
          <button
            onClick={handleAsk}
            className="btn btn-danger btn-lg shadow-lg rounded-pill px-5 py-3 mb-5"
          >
            I have a question for you...
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="display-4 text-red font-weight-bold mb-4">
            Will you be my Valentine?
          </h2>
          <div className="d-flex justify-content-center mb-5">
            <button
              onClick={() => handleResponse("yes")}
              className="btn btn-success btn-lg shadow-lg mr-4 rounded-pill px-5 py-3"
            >
              Yes
            </button>
            {!hideNoButton && (
              <button
                onClick={() => handleResponse("no")}
                onMouseOver={handleMouseOverNo}
                style={noButtonStyle}
                className="btn btn-secondary btn-lg shadow-lg rounded-pill px-5 py-3"
              >
                No
              </button>
            )}
          </div>
          {response && (
            <p className={`display-4 mt-4 font-weight-bold ${response === "yes" ? "text-success" : "text-muted"}`}>
              {response === "yes" ? "Yay! ❤️" : "Oh, maybe next time."}
            </p>
          )}
        </div>
      )}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-200px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;
