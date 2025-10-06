import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useQuestions from "../hooks/useQuestions";
import axios from "axios";
import "./QuizDetail.css";

function QuizDetail() {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();
  const { data: questions, loading, error } = useQuestions(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionId, setSessionId] = useState(null); // NEW: store session ID

  // Setup timer when questions load
  useEffect(() => {
    if (questions && questions.length > 0) {
      setTimeLeft(questions.length * 60); // 1 min per question
    }
  }, [questions]);

  // Countdown logic
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit when time ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  if (loading) return <h2>Loading questions...</h2>;
  if (error) return <h2>Failed to load questions</h2>;
  if (!questions || questions.length === 0) return <h2>No questions available</h2>;

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionKey) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionKey }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    try {
      // Prepare payload
      const payload = questions.map(q => ({
        questionId: q.id,
        selectedOption: answers[q.id] || ""
      }));
      // console.log("Submitting payload:", payload);
      // Submit answers -> returns sessionId
      const submitResponse = await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/question/submit/${id}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      const newSessionId = submitResponse.data;
      // console.log("Session ID:", newSessionId);
      setSessionId(newSessionId);
      // Get score using sessionId
      const scoreResponse = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}/question/score/${newSessionId}`
      );
      // console.log("Score data:", scoreResponse.data);
      setScore(scoreResponse.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const handleRestart = () => {
    // Reset everything to start a new session
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setCurrentIndex(0);
    setTimeLeft(questions.length * 60);
    setSessionId(null); // reset session ID
  };

  const handleBack = () => navigate("/");

  // format time (mm:ss)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="quiz-detail">
      <div className="back-btn-container">
        <button className="back-btn" onClick={handleBack}>← Back</button>
      </div>

      <h2>Quiz {id}</h2>

      {!submitted ? (
        <div className="question-card">
          {/* Timer */}
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>

          <h3>Q{currentIndex + 1}. {currentQuestion.question}</h3>
          <ul>
            {["option1", "option2", "option3", "option4"].map((key) => {
              const text = currentQuestion[key];
              const isSelected = answers[currentQuestion.id] === key;

              return (
                <li
                  key={key}
                  className={`option ${isSelected ? "selected" : ""}`}
                  onClick={() => handleOptionClick(key)}
                >
                  {text}
                </li>
              );
            })}
          </ul>

          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <div className="result-screen">
          <h2>You scored {score} / {questions.length}</h2>
          <button className="submit-btn" onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;