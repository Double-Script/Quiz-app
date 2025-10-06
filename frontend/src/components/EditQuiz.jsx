import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditQuiz.css";

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const resQuiz = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/getquizid/${quizId}`);
        if (resQuiz.data.length > 0) {
          setQuizTitle(resQuiz.data[0].title);
        }
        const resQuestions = await axios.get(`${import.meta.env.VITE_API_URL}/question/quizquestions/${quizId}`);
        setQuestions(resQuestions.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/question/delete/${questionId}`);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete question");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/quiz/update/${quizId}`, { title: quizTitle });
      for (const q of questions) {
        await axios.put(`${import.meta.env.VITE_API_URL}/question/update/${q.id}/${quizId}`, {
          question: q.question,
          option1: q.option1,
          option2: q.option2,
          option3: q.option3,
          option4: q.option4,
          correctans: q.correctans
        });
      }
      alert("Quiz updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update quiz/questions");
    }
  };

  const handleBack = () => navigate("/");

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="edit-quiz-container">
      {/* Back Button */}
      <div className="back-btn-container">
        <button className="back-btn" onClick={handleBack}>← Back</button>
      </div>

      <h2>Edit Quiz</h2>

      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
      />

      <h3>Questions</h3>
      {questions.map((q, index) => (
        <div key={q.id} className="question-card-edit">
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
            placeholder="Question"
          />
          <input
            type="text"
            value={q.option1}
            onChange={(e) => handleQuestionChange(index, "option1", e.target.value)}
            placeholder="Option 1"
          />
          <input
            type="text"
            value={q.option2}
            onChange={(e) => handleQuestionChange(index, "option2", e.target.value)}
            placeholder="Option 2"
          />
          <input
            type="text"
            value={q.option3}
            onChange={(e) => handleQuestionChange(index, "option3", e.target.value)}
            placeholder="Option 3"
          />
          <input
            type="text"
            value={q.option4}
            onChange={(e) => handleQuestionChange(index, "option4", e.target.value)}
            placeholder="Option 4"
          />
          <select
            value={q.correctans}
            onChange={(e) => handleQuestionChange(index, "correctans", e.target.value)}
          >
            <option value="option1">Option1</option>
            <option value="option2">Option2</option>
            <option value="option3">Option3</option>
            <option value="option4">Option4</option>
          </select>

          <button className="delete-question-btn" onClick={() => handleDeleteQuestion(q.id)}>
            Delete Question
          </button>
        </div>
      ))}

      <button className="update-quiz-btn" onClick={handleUpdate}>Update Quiz & Questions</button>
    </div>
  );
}

export default EditQuiz;
