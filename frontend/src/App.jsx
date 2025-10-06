import { useState, useEffect } from 'react'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useQuizzes from "./hooks/useQuizzes";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import QuizDetail from "./components/QuizDetail";
import CreateQuiz from "./components/CreateQuiz";
import AddQuestion from "./components/AddQuestion";
import EditQuiz from "./components/EditQuiz";

function App() {
  // const { data, error, loading } = useQuizzes('http://192.168.0.107:8080/quiz/getallquiz');

  // if (error) {
  //   return <h1>Something went wrong</h1>
  // }
  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  return (
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/add-question/:quizId" element={<AddQuestion />} />
        <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />

      </Routes>
    </Router>
    
  )
}

export default App
