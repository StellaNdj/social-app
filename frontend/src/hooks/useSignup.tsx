import { useState } from "react";
import { useAuthContext } from "./useAuthContext.tsx";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext();

  const signup = async (email, password, firstName, lastName, username) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, firstName, lastName, username})
    });

    const json = await response.json();

    if(!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if(response.ok) {

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(json))

      // Update AuthContext
      dispatch({type: 'LOGIN', payload: json})


      setIsLoading(false);

    }
  }
  return { signup, isLoading, error}
};
