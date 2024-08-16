import { useState } from 'react';
import './App.css';
import Quiz from './utils/quizData';
import Question from './components/Question';

function App() {
const [currentQuestionIndex, setCurrentQuestionIndex]=useState(0);
const cuurentQuestion = Quiz[currentQuestionIndex];



  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold text-4xl fixed top-[20%]'>Quiz Game</h1>
      <Question question={cuurentQuestion} setCurrentQuestionIndex={setCurrentQuestionIndex} currentQuestionIndex={currentQuestionIndex}/>
    </div>
  );
}

export default App;
