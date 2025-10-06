import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; 
import "./QuizCard.css";

function QuizCard({ id, title }) {
  const navigate = useNavigate();

  // Random gradient generator
  const gradients = [
    "linear-gradient(145deg, #e0f2fe, #f0f9ff)", // blue
    "linear-gradient(145deg, #fce7f3, #fdf2f8)", // pink
    "linear-gradient(145deg, #fef9c3, #fefce8)", // yellow
    "linear-gradient(145deg, #dcfce7, #f0fdf4)", // green
    "linear-gradient(145deg, #ede9fe, #f5f3ff)"  // purple
  ];
  const randomGradient = gradients[id % gradients.length]; // stable color per quiz

  const handleDeleteQuiz = async () => {
    if (!window.confirm("Are you sure you want to delete this quiz and all its questions?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/quiz/delete/${id}`);
      alert("Quiz deleted successfully!");
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete quiz");
    }
  };

  return (
    <div className="quiz-card" style={{ background: randomGradient }}>
      {/* Icons pinned top-right */}
      <div className="card-icons">
        <FiEdit2 className="icon edit-icon" onClick={() => navigate(`/edit-quiz/${id}`)} />
        <FiTrash2 className="icon delete-icon" onClick={handleDeleteQuiz} />
      </div>

      {/* Title centered below icons */}
      <h3 className="quiz-title">{title}</h3>

      {/* Start Quiz button at bottom */}
      <Link to={`/quiz/${id}`}>
        <button className="start-btn">Start Quiz</button>
      </Link>
    </div>
  );
}

export default QuizCard;
