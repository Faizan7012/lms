import React, { useState } from "react";

export const AuthContext = React.createContext();
let userlms = JSON.parse(localStorage.getItem('userlms'))||{};
const tokenlms = JSON.parse(localStorage.getItem('tokenlms'))||'';
function AuthContextProvider({ children }) {
  const authlms = tokenlms ? true : false;
  const [isAuth,setIsAuth] = useState(authlms);
  const [user , setUser] = useState(userlms);
  const [token , setToken] = useState(tokenlms)

  const logout = ()=>{
     setIsAuth(false);
     setUser({});
     setToken('')
      localStorage.remove('tokenlms')
      localStorage.removeItem('userlms')
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth , user , setUser , logout , token , setToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;