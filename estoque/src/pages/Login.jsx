import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import api from '../services/api';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/login",{username, password}) 
            
            if (response.data?.error) {
                console.log(response.data.error);
                throw new Error('Login failed');
            }
            const { accessToken, refreshToken, user } = response.data;
            await login(accessToken, refreshToken, user);
            navigate("/")

        } catch (error) {
          console.error('Erro ao fazer login:', error.data);
          // Aqui você pode adicionar uma mensagem de erro para o usuário
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit} className='container h-100'>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col align-self-center">
                        <div className="mb-3 w-auto">
                            <input
                                className='form-control w-auto'
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 w-auto">
                            <input
                                className='form-control w-auto'
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className='btn btn-primary' type="submit">Entrar</button>
                    </div>
                </div>
            </form>
        </>    
    )
}