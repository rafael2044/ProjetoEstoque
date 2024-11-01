import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [currentUser, setCurrentUser] = useState(null);
  console.log(`isAuthenticated AUTHPROVIDER: ${isAuthenticated}`)

  useEffect(() => {
    
    const fetchMe = async()=>{
      console.log("Validando Token...")
      try{
          const res = await api.get("/api/validate-token");
          setIsAuthenticated(true);
          setToken(res.data.accessToken);
          setCurrentUser(res.data.user)
          setLoading(false)
          console.log(`Resposta da Validação da Token: ${res.data.message}`)
        }catch{
          setToken(null)
          setIsAuthenticated(false);
          setLoading(false)
          setCurrentUser(null)
      }
    };
    fetchMe()
  }, []);

  useLayoutEffect(()=>{
    const authInterceptor = api.interceptors.request.use((config)=>{
      config.headers.Authorization = 
        !config._retry && token
        ? `Bearer ${token}`
        : config.headers.Authorization;
      return config
    })

    return ()=>{
      api.interceptors.request.eject(authInterceptor);
    }
  }, [token])


  useLayoutEffect(()=>{
    const refreshInterceptor = api.interceptors.response.use(
      (response)=> response,
      async(error)=>{
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const refreshToken = localStorage.getItem("refreshToken")
            const response = await api.get('/api/refresh-token', {headers:{'Authorization': `refreshToken ${refreshToken}`}});
            setLoading(false)
            setToken(response.data.accessToken);
            setCurrentUser(response.data.user)
            setIsAuthenticated(true)

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            originalRequest._retry = true;

            return api(originalRequest);
          }catch {
            setToken(null)
          }
        }
        return Promise.reject(error);
      }
    );
    
    return ()=>{
      api.interceptors.response.eject(refreshInterceptor);
    }
  }, [token])

  const login = async (accessToken, refreshToken, user) => {
    setToken(accessToken)
    setIsAuthenticated(true);
    setCurrentUser(user)
    setLoading(false)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem("accessToken", accessToken)
  };

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false);
    setLoading(false)
    setCurrentUser(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, setLoading, currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
