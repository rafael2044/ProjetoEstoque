import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:3000/api/login', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({username, password})
            });
        
            if (!response.ok) {
                const data = await response.json();
                console.log(data.message);
                throw new Error('Login failed');
            }
            const data = await response.json();
            const { tokenAccess, access_level, expiredIn } = data;

            await login(tokenAccess, access_level, expiredIn);
            navigate('/');
        } catch (error) {
          console.error('Erro ao fazer login:', error);
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