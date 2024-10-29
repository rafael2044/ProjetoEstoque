import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAccessLevel, setUserAccessLevel] = useState(null);

  useEffect(() => {
    
    const checkToken = async()=>{
        const token = localStorage.getItem('tokenAccess');
        if(!token){
            setIsAuthenticated(false);
            return
        }

        try{
            const res = await fetch("http://127.0.0.1:3000/api/validate-token",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization":`Bearer ${token}`,
                }
            })

            if(res.ok){
                const {message} = await res.json();
                console.log(message)
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
        }catch(error){
            console.error('Erro ao validar o token:', error);
            setIsAuthenticated(false);
        }
    };
    checkToken()
  }, []);

  const login = (token, access_level, expiredIn) => {
    localStorage.setItem('tokenAccess', token);
    localStorage.setItem('expiredIn', expiredIn)
    setUserAccessLevel(access_level)  
    setIsAuthenticated(true);
  };

  const checkToken =  async()=>{
    const token = localStorage.getItem('tokenAccess');
    if(!token){
        setIsAuthenticated(false);
        return
    }
    try{
        const res = await fetch("http://127.0.0.1:3000/api/validate-token",{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                "Authorization":`Bearer ${token}`,
            }
        })

        if(res.ok){
            const {message} = await res.json();
            console.log(message)
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        } 
    }catch(error){
        console.error('Erro ao validar o token:', error);
        setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tokenAccess');
    setUserAccessLevel(null)
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userAccessLevel, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
