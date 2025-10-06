import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const useQuizzes = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
      ;(async ()=>{
        try {
          setLoading(true)
          setError(false)
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/getallquiz`)
          console.log(response.data);
          setData(response.data)
          setLoading(false)
        } catch (error) {
          setError(true)
          setLoading(false)
        }
        
      })()
  },[])
  return { data, error, loading };
  
}

export default useQuizzes
