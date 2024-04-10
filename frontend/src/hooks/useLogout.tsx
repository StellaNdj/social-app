import { useAuthContext } from "./useAuthContext.tsx";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch({type: 'LOGOUT'});
  }
  return { logout };
}
