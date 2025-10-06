import { useState, useEffect } from "react";
import axios from "axios";

const useQuestions = (quizId) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quizId) return;

    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/question/quizquestions/${quizId}`
        );
        console.log("Questions:", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [quizId]);

  return { data, error, loading };
};

export default useQuestions;
