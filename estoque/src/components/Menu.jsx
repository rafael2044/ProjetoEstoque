import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
export default function Menu(){
    const { isAuthenticated, logout } = useAuth();
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <Link className='navbar-brand fs-2 fw-bold' to="/">Sistema de Estoque</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0s'>
                            <li className='nav-item'>
                                <Link to="/" className='nav-link fs-5'>Pagina Inicial</Link>
                            </li>
                            {isAuthenticated?(
                                <>
                                    <li className='nav-item'>
                                    <Link to="/users" className='nav-link fs-5'>Usuários</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/suppliers" className='nav-link fs-5'>Fornecedores</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/products" className='nav-link fs-5'>Produtos</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/stocks" className='nav-link fs-5'>Estoque</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/stockmovements" className='nav-link fs-5'>Movimentação</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link fs-5' onClick={logout}>Sair</Link>
                                    </li>
                                </>
                            ):(
                                <>
                                    <li className='nav-item'>
                                        <Link to="/login" className='nav-link fs-5'>Entrar</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                
            </nav>
        </>
    )
}