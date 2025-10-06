import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateQuiz.css";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateQuiz = async () => {
    if (!title.trim()) {
      setError("Quiz title is required");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quiz/save`, { title });
      console.log("Created quiz:", response.data);
      const createdQuizId = response.data.id; // assuming API returns created quiz object
      navigate(`/add-question/${createdQuizId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create quiz");
    }
  };
  const handleBack = () => {
    navigate("/"); // go back to home page
  };

  return (
    <div className="create-quiz-container">
    <div className="back-btn-container">
        <button className="back-btn" onClick={handleBack}>← Back</button>
      </div>
      <h2>Create New Quiz</h2>
      
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button className="submit-btn" onClick={handleCreateQuiz}>
        Create Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
