import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddQuestion.css";

function AddQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate(); // ✅ added

  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctans: "option1",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/question/save/${quizId}`, questionData);
      setMessage("Question added successfully!");
      setQuestionData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctans: "option1",
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to add question");
    }
  };

  const handleBack = () => {
    navigate("/"); // go back to home page
  };

  return (
    <div className="add-question-container">
      {/* Back button below navbar */}
      <div className="back-btn-container">
        <button className="back-btn" onClick={handleBack}>← Back</button>
      </div>

      <h2>Add Question for Quiz ID {quizId}</h2>

      <input
        type="text"
        name="question"
        placeholder="Question"
        value={questionData.question}
        onChange={handleChange}
      />
      <input
        type="text"
        name="option1"
        placeholder="Option 1"
        value={questionData.option1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="option2"
        placeholder="Option 2"
        value={questionData.option2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="option3"
        placeholder="Option 3"
        value={questionData.option3}
        onChange={handleChange}
      />
      <input
        type="text"
        name="option4"
        placeholder="Option 4"
        value={questionData.option4}
        onChange={handleChange}
      />

      <select name="correctans" value={questionData.correctans} onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>

      <button className="submit-btn" onClick={handleAddQuestion}>
        Add Question
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddQuestion;
