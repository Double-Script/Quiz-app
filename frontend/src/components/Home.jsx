import QuizCard from "./QuizCard";
import "./Home.css";
import useQuizzes from "../hooks/useQuizzes";
import { Link } from "react-router-dom";

function Home() {
  const { data: quizzes, loading, error } = useQuizzes(`${import.meta.env.VITE_API_URL}/quiz/getallquiz`);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Something went wrong!</h2>;
// console.log("API URL:", `${import.meta.env.VITE_API_URL}/quiz/getallquiz`);

  return (
    
    <div className="home-container">
      {/* <div className="create-quiz-btn-container">
        <Link to="/create-quiz">
          <button className="create-quiz-btn">Create New Quiz</button>
        </Link>
      </div> */}

      {Array.isArray(quizzes) && quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <QuizCard key={quiz.id} id={quiz.id} title={quiz.title} />
        ))
      ) : (
        <h2>No quizzes found</h2>
      )}
    </div>
  );
}

export default Home;
