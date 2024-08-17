import { useState, useEffect } from "react";
import Quiz from "../utils/quizData";

const Question = ({
  question,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  onAnswer,
  correctAnswersCount,
  setCorrectAnswersCount,
}) => {
  const [answer, setAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const handleClick = (option) => {
    const isCorrect = option === question.correctAnswer;
    setAnswer(option);
    onAnswer(isCorrect);
    setIsCountdownActive(true);
  };

  const updateQuestion = () => {
    if (currentQuestionIndex < Quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
    setAnswer(null);
    setCountdown(3);
    setIsCountdownActive(false);
  };

  const startAgain = () => {
    setAnswer(null);
    setCurrentQuestionIndex(0);
    setQuizComplete(false);
    setCorrectAnswersCount(0);
    setCountdown(5);
    setIsCountdownActive(false);
  };

  // Countdown effect
  useEffect(() => {
    let interval;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      updateQuestion();
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdown]);

  const isCorrect = answer === question.correctAnswer;

  return (
    <div className="border rounded-lg p-4 text-center w-96 transition-all transform duration-500">
      {!quizComplete ? (
        <div>
          <h1 className="font-semibold text-lg">{question.question}</h1>
          <div className="flex flex-col mt-4 items-center">
            {question.options.map((option) => (
              <button
                key={option}
                className={`text-black my-3 border w-full px-4 active:scale-x-[0.98] bg-slate-100 hover:bg-slate-300 transition-all transform duration-200`}
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            ))}
            {answer && (
              <h3
                className={`border px-4 py-[2px] font-semibold ${
                  isCorrect
                    ? "bg-green-300 text-black"
                    : "bg-gray-400 text-black"
                } self-start`}
              >
                {isCorrect ? "Correct ✓" : "Incorrect X"}
              </h3>
            )}
          </div>
          {!quizComplete && (
            <button
              className="bg-blue-500 w-full mt-4 py-1 text-white font-semibold active:bg-blue-400 hover:scale-x-95 transition-all transform duration-300 active:scale-x-[0.97]"
              onClick={updateQuestion}
            >
              {isCountdownActive
                ? `Next Question In: ${countdown}s`
                : "Skip Question"}
            </button>
          )}
        </div>
      ) : (
        <div>
          <h1 className="font-semibold text-lg">Quiz Complete</h1>
          <h1 className="font-semibold text-base pt-4">
            Total: {correctAnswersCount}
          </h1>
          <button
            className="bg-blue-500 w-full mt-4 py-1 text-white font-semibold active:bg-blue-400 hover:scale-x-95 transition-all transform duration-300 active:scale-x-[0.97]"
            onClick={startAgain}
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
