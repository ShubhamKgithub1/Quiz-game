import { useState } from "react";
import Quiz from "./utils/quizData";
import Question from "./components/Question";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentQuestion = Quiz[currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-4xl fixed top-[20%]">Quiz Game</h1>
      <Question
        question={currentQuestion}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        currentQuestionIndex={currentQuestionIndex}
        onAnswer={handleAnswer}
        correctAnswersCount={correctAnswersCount}
        setCorrectAnswersCount={setCorrectAnswersCount}
      />
    </div>
  );
};

export default App;
