import { useState, createContext } from 'react';
import { LogIn } from "./pages/login/Login.jsx";
import { Dashboard } from "./pages/dashboard/Dashboard.jsx";
import "./App.css";

export const UserContext = createContext();

export const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user === null ? <LogIn /> : <Dashboard />} 
    </UserContext.Provider>
  );
};
